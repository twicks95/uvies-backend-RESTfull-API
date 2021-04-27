// Core modules
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//
const wrapper = require('../../helpers/wrapper')
const authModel = require('./auth_model')

module.exports = {
  register: async (req, res) => {
    try {
      const { userEmail, userPassword, userName } = req.body

      // check email availability
      const checkingUserEmail = await authModel.getDataConditions({
        user_email: userEmail
      })
      const checkingUserName = await authModel.getDataConditions({
        user_name: userName
      })

      // If checkingUserName returned an object within array
      if (checkingUserEmail.length > 0 && checkingUserName.length > 0) {
        return wrapper.response(res, 409, 'Email and Username Already Exist')
      } else if (checkingUserEmail.length > 0) {
        return wrapper.response(res, 409, 'Email Has Been Registered')
      } else if (checkingUserName.length > 0) {
        return wrapper.response(
          res,
          409,
          'Username Already Used and Has Been Registered'
        )
      } else {
        // password encrypting process
        const salt = bcrypt.genSaltSync(10)
        const encryptedPassword = bcrypt.hashSync(userPassword, salt)

        const setData = {
          user_name: userName,
          user_email: userEmail,
          user_password: encryptedPassword
        }

        const result = await authModel.register(setData)
        delete result.user_password
        return wrapper.response(res, 200, 'Success Register User', result)
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

          // token creating process
          const token = jwt.sign({ ...payLoad }, 'RAHASIA', {
            expiresIn: '24h'
          })

          const result = { ...payLoad, token }
          return wrapper.response(res, 200, 'Login Success', result)
        } else {
          return wrapper.response(res, 400, 'Wrong Password')
        }
      } else {
        return wrapper.response(res, 404, 'Email / Account Not Found')
      }
    } catch (error) {
      return wrapper.response(res, 400, 'Bad Request', error)
    }
  }
}
