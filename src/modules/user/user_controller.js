const fs = require('fs')
const bcrypt = require('bcrypt')

const userModel = require('./user_model')
const wrapper = require('../../helpers/wrapper')

module.exports = {
  getUserById: async (req, res) => {
    try {
      const { id } = req.params

      const result = await userModel.getUserById(id)
      delete result[0].user_password

      result.length > 0
        ? wrapper.response(res, 200, 'Success Get User Data', result)
        : wrapper.response(res, 404, `Failed! No Data With Id ${id}`)
    } catch (error) {
      return wrapper.response(res, 400, 'Bad Request', error)
    }
  },

  updateUserData: async (req, res) => {
    try {
      const { id } = req.params
      const { firstName, lastName, email, phoneNumber } = req.body

      const setData = {
        user_name: `${firstName} ${lastName}`,
        user_email: email,
        user_phone_number: phoneNumber,
        user_updated_at: new Date(Date.now())
      }

      const dataToUpdate = await userModel.getUserById(id)
      if (dataToUpdate.length > 0) {
        const result = await userModel.updateUser(setData, id)
        delete result.user_password
        return wrapper.response(res, 200, 'Success Update User Data', result)
      } else {
        return wrapper.response(res, 404, 'Failed! No Data Is Updated')
      }
    } catch (error) {
      return wrapper.response(res, 400, 'Bad Request', error)
    }
  },

  updateUserImage: async (req, res) => {
    try {
      const { id } = req.params
      const setData = {
        user_profile_picture: req.file ? req.file.filename : '',
        user_updated_at: new Date(Date.now())
      }

      const dataToUpdate = await userModel.getUserById(id)
      if (dataToUpdate.length > 0) {
        const imageToDelete = dataToUpdate[0].user_profile_picture
        const isImageExist = fs.existsSync(
          `src/uploads/user_profile_picture/${imageToDelete}`
        )

        if (isImageExist && imageToDelete) {
          fs.unlink(
            `src/uploads/user_profile_picture/${imageToDelete}`,
            (err) => {
              if (err) throw err
            }
          )
        }

        const result = await userModel.updateUser(setData, id)
        return wrapper.response(res, 200, 'Success Update Image', result)
      } else {
        return wrapper.response(res, 404, 'Failed! No Data Is Updated')
      }
    } catch (error) {
      return wrapper.response(res, 400, 'Bad Request', error)
    }
  },

  updateUserPassword: async (req, res) => {
    try {
      const { id } = req.params
      const { newPassword, confirmPassword } = req.body
      const salt = bcrypt.genSaltSync(10)

      const dataToDelete = await userModel.getUserById(id)
      const isPasswordConfirmed = newPassword === confirmPassword
      if (dataToDelete.length > 0 && isPasswordConfirmed) {
        const encryptedPassword = bcrypt.hashSync(newPassword, salt)
        const setData = {
          user_password: encryptedPassword,
          user_updated_at: new Date(Date.now())
        }

        const result = await userModel.updateUser(setData, id)
        delete result.user_password

        return wrapper.response(
          res,
          200,
          'Success Update User Password',
          result
        )
      } else if (!isPasswordConfirmed) {
        return wrapper.response(
          res,
          401,
          "New And Confirm Password Didn't Match"
        )
      } else {
        return wrapper.response(res, 404, 'Failed! No Data Is Updated')
      }
    } catch (error) {
      return wrapper.response(res, 400, 'Bad Request', error)
    }
  },

  updateUserStatus: async (req, res) => {
    try {
      const { id } = req.params
      const result = await userModel.updateUser({ user_verification: '1' }, id)

      return wrapper.response(res, 200, 'Success Update Account Status', result)
    } catch (error) {
      return wrapper.response(res, 400, 'Bad Request', error)
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { id } = req.params

      const dataToDelete = await userModel.getUserById(id)
      if (dataToDelete.length > 0) {
        const imageToDelete = dataToDelete[0].user_profile_picture
        const isImageExist = fs.existsSync(
          `src/uploads/user_profile_picture/${imageToDelete}`
        )

        if (isImageExist && imageToDelete) {
          fs.unlink(
            `src/uploads/user_profile_picture/${imageToDelete}`,
            (err) => {
              if (err) throw err
            }
          )
        }

        await userModel.deleteUser(id)
        return wrapper.response(res, 200, 'Success Delete User', dataToDelete)
      } else {
        return wrapper.response(res, 404, 'Failed! No Data Is Deleted')
      }
    } catch (error) {
      return wrapper.response(res, 400, 'Bad Request', error)
    }
  }
}
