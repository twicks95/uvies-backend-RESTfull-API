const multer = require('multer')
const path = require('path')
const wrapper = require('../helpers/wrapper')

const uploadFile = (uploadPath) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `src/uploads/${uploadPath}`)
    },
    filename: function (req, file, cb) {
      cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
    }
  })

  const fileFilter = (req, file, cb) => {
    const extList = ['.jpg', '.jpeg', '.png']
    const ext = path.extname(file.originalname).toLowerCase()
    if (extList.includes(ext)) {
      cb(null, true)
    } else {
      cb(new Error('The image extension must be jpg, jpeg, or png'), false)
    }
  }

  const uploadFilter = (req, res, next) => {
    upload(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        return wrapper.response(
          res,
          401,
          'File too large. Size allowed must be equal to or below 1 Megabyte',
          null
        )
      } else if (err) {
        // An unknown error occurred when uploading.
        return wrapper.response(res, 401, err.message, null)
      }
      // Everything went fine.
      next()
    })
  }

  const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 1000000 }
  }).single('image')

  return uploadFilter
}

module.exports = uploadFile
