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
          user_name: `${firstName} ${lastName}`,
          user_email: email,
          user_password: encryptedPassword,
          user_phone_number: phoneNumber,
          user_updated_at: new Date(Date.now())
        }
      }

      const result = await userModel.updateUser(setData, id)
      delete result.user_password
      return wrapper.response(res, 200, 'Success Update User Data', result)
    } catch (error) {
      return wrapper.response(res, 400, 'Bad Request', error)
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { id } = req.params

      const result = await userModel.deleteUser(id)
      return wrapper.response(res, 200, 'Success Delete User', result)
    } catch (error) {
      return wrapper.response(res, 400, 'Bad Request', error)
    }
  }
}
