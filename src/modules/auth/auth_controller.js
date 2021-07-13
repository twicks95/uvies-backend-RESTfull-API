// Core modules
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
require('dotenv').config()

const wrapper = require('../../helpers/wrapper')
const authModel = require('./auth_model')

module.exports = {
  resetPassword: async (req, res) => {
    try {
      const { userEmail } = req.body

      const checkingUserEmail = await authModel.getDataConditions({
        user_email: userEmail
      })
      if (checkingUserEmail.length > 0) {
        const date = new Date()
        let newPassword =
          date.getMilliseconds().toString() + date.getSeconds().toString()

        if (newPassword.length < 4) {
          let getMinutes = date.getMinutes().toString()
          if (getMinutes.length < 2) {
            getMinutes = getMinutes + Math.ceil(Math.random() * 9).toString()
            newPassword = newPassword + getMinutes
          } else {
            newPassword = newPassword + getMinutes
          }
        }
        const salt = bcrypt.genSaltSync(10)
        const encryptedPassword = bcrypt.hashSync(newPassword, salt)
        const result = await authModel.resetPassword(
          {
            user_password: encryptedPassword,
            user_updated_at: new Date(Date.now())
          },
          userEmail
        )
        delete result.user_password

        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: process.env.SMTP_EMAIL, // generated ethereal user
            pass: process.env.SMTP_PASSWORD // generated ethereal password
          }
        })

        const mailOptions = await transporter.sendMail({
          from: '"Uvies" <uvies.movs@gmail.com>', // sender address
          to: userEmail, // list of receivers
          subject: "Uvies - Reset Account's Password", // Subject line
          html: `<h1>Hello.</h1></br><p>This email contains a reset password that has set to your account as your request. <br><br><span>Enter this password: </span><strong>${newPassword}</strong><br>=====================<br>Please change this password when you have successfully logged in to your account.</p>` // html body
        })

        transporter.sendMail(mailOptions, function (error, info) {
          if (!error) {
            // console.log('Email sent: ' + info.response)
            return wrapper.response(res, 200, 'Success Register User')
          } else {
            return wrapper.response(res, 400, 'Failed To Send Email')
          }
        })

        return wrapper.response(
          res,
          200,
          'Password Reset Has Sent To Email',
          result
        )
      } else {
        return wrapper.response(res, 404, 'Email Not Found')
      }
    } catch (error) {
      return wrapper.response(res, 400, 'Bad Request', error)
    }
  },

  resendActivationEmail: async (req, res) => {
    try {
      const { userEmail, userId } = req.query

      // check email availability
      const checkingUserEmail = await authModel.getDataConditions({
        user_email: userEmail
      })

      // If checkingEmail returned an object within array
      if (checkingUserEmail.length > 0) {
        return wrapper.response(res, 409, 'Email Not Found')
      } else {
        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: process.env.SMTP_EMAIL, // generated ethereal user
            pass: process.env.SMTP_PASSWORD // generated ethereal password
          }
        })

        const mailOptions = await transporter.sendMail({
          from: '"Uvies" <uvies.movs@gmail.com>', // sender address
          to: userEmail, // list of receivers
          subject: 'Uvies - Email account activation', // Subject line
          html: `<a href="http://${process.env.DB_HOST}:${process.env.PORT}/backend1/api/v1/user/activate/${userId}">Click this link</a><b> to activate your account.</b>` // html body
        })

        transporter.sendMail(mailOptions, function (error, info) {
          if (!error) {
            console.log('Email sent: ' + info.response)
            return wrapper.response(res, 200, 'Success Register User')
          } else {
            console.log(error)
            return wrapper.response(res, 400, 'Failed To Send Email')
          }
        })

        return wrapper.response(res, 200, 'Success Resend Email Activation')
      }
    } catch (error) {
      return wrapper.response(res, 400, 'Bad Request', error)
    }
  },

  register: async (req, res) => {
    try {
      const { userEmail, userPassword, userName } = req.body

      // check email availability
      const checkingUserEmail = await authModel.getDataConditions({
        user_email: userEmail
      })

      // If checkingEmail returned an object within array
      if (checkingUserEmail.length > 0) {
        return wrapper.response(res, 409, 'Email Has Been Registered')
      } else {
        // password encrypting process
        const salt = bcrypt.genSaltSync(10)
        const encryptedPassword = bcrypt.hashSync(userPassword, salt)

        const setData = {
          user_name: userName,
          user_email: userEmail,
          user_password: encryptedPassword,
          user_role: 'user'
        }

        const result = await authModel.register(setData)
        delete result.user_password

        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: process.env.SMTP_EMAIL, // generated ethereal user
            pass: process.env.SMTP_PASSWORD // generated ethereal password
          }
        })

        const mailOptions = await transporter.sendMail({
          from: '"Uvies" <uvies.movs@gmail.com>', // sender address
          to: result.user_email, // list of receivers
          subject: 'Uvies - Email account activation', // Subject line
          html: `<a href="http://${process.env.DB_HOST}:${process.env.PORT}/backend1/api/v1/user/activate/${result.id}">Click this link</a><b> to activate your account.</b>` // html body
        })

        transporter.sendMail(mailOptions, function (error, info) {
          if (!error) {
            console.log('Email sent: ' + info.response)
            return wrapper.response(res, 200, 'Success Register User')
          } else {
            console.log(error)
            return wrapper.response(res, 400, 'Failed To Send Email')
          }
        })

        return wrapper.response(res, 200, 'Success Create New User', result)
      }
    } catch (error) {
      return wrapper.response(res, 400, 'Bad Request', error)
    }
  },

  login: async (req, res) => {
    try {
      const { userEmail, userPassword } = req.body
      const checkingUserEmail = await authModel.getDataConditions({
        user_email: userEmail
      })

      // checking email availability in database
      if (checkingUserEmail.length > 0) {
        // If userEmail exist, as password in database has been encrypted, use bcrypt.compareSync to compare encrypted password with user inputted password in login form
        const doesPasswordMatch = bcrypt.compareSync(
          userPassword,
          checkingUserEmail[0].user_password
        )

        // if doesPasswordMatch returned true (means match)
        if (doesPasswordMatch) {
          const payLoad = checkingUserEmail[0]

          // remove object's property using delete
          delete payLoad.user_password

          // token signature creating process
          const token = jwt.sign({ ...payLoad }, 'RAHASIA', {
            expiresIn: '24h'
          })

          const result = { ...payLoad, token }
          return wrapper.response(res, 200, 'Login Success', result)
        } else {
          return wrapper.response(res, 401, 'Wrong Password')
        }
      } else {
        return wrapper.response(res, 404, 'Email / Account Not Found')
      }
    } catch (error) {
      return wrapper.response(res, 400, 'Bad Request', error)
    }
  }
}
