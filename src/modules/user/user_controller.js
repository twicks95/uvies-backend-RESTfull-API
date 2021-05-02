const fs = require('fs')
const bcrypt = require('bcrypt')

const userModel = require('./user_model')
const wrapper = require('../../helpers/wrapper')

module.exports = {
  updateUser: async (req, res) => {
    try {
      const { id } = req.params
      const {
        firstName,
        lastName,
        email,
        phoneNumber,
        changePassword
      } = req.body

      let setData
      if (!changePassword) {
        setData = {
          user_profile_picture: req.file ? req.file.filename : '',
          user_name: `${firstName} ${lastName}`,
          user_email: email,
          user_phone_number: phoneNumber,
          user_updated_at: new Date(Date.now())
        }
      } else {
        // password encrypting process
        const salt = bcrypt.genSaltSync(10)
        const encryptedPassword = bcrypt.hashSync(changePassword, salt)

        setData = {
          user_profile_picture: req.file ? req.file.filename : '',
          user_name: `${firstName} ${lastName}`,
          user_email: email,
          user_password: encryptedPassword,
          user_phone_number: phoneNumber,
          user_updated_at: new Date(Date.now())
        }
      }

      const dataToUpdate = await userModel.getUserById(id)
      if (dataToUpdate.length > 0) {
        const imageToDelete = dataToUpdate[0].user_profile_picture
        const isImageExist = fs.existsSync(
          `src/uploads/uploads/user_profile_picture/${imageToDelete}`
        )

        if (isImageExist) {
          fs.unlink(
            `src/uploads/user_profile_picture/${imageToDelete}`,
            (err) => {
              if (err) throw err
            }
          )
        }

        const result = await userModel.updateUser(setData, id)
        delete result.user_password
        return wrapper.response(res, 200, 'Success Update User Data', result)
      } else {
        return wrapper.response(
          res,
          404,
          'Failed! No Data With Id ' + id + ' To Be Updated'
        )
      }
    } catch (error) {
      return wrapper.response(res, 400, 'Bad Request', error)
    }
  },

  updateUserStatus: async (req, res) => {
    try {
      const { id } = req.params
      const result = await userModel.updateUser({ user_status: 1 }, id)
      return wrapper.response(res, 200, 'Success Update Account Status', result)
    } catch (error) {
      return wrapper.response(res, 400, 'Bad Request', error)
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { id } = req.params

      const dataToUpdate = await userModel.getUserById(id)
      const imageToDelete = dataToUpdate[0].user_profile_picture
      const isImageExist = fs.existsSync(
        `src/uploads/uploads/user_profile_picture/${imageToDelete}`
      )

      if (isImageExist) {
        fs.unlink(
          `src/uploads/user_profile_picture/${imageToDelete}`,
          (err) => {
            if (err) throw err
          }
        )
      }

      const result = await userModel.deleteUser(id)
      return wrapper.response(res, 200, 'Success Delete User', result)
    } catch (error) {
      return wrapper.response(res, 400, 'Bad Request', error)
    }
  }
}
