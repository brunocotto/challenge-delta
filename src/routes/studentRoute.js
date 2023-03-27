// import controller
const multer = require('multer')
const multerConfig = require('../config/multer')
const studentController = require('../controllers/studentController')
const router = require('express').Router()

router.get('/', studentController.listStudent)

router.get('/:id', studentController.listStudentById)

router.post(
  '/',
  multer(multerConfig).single('file'),
  studentController.createStudent,
)

router.put('/:id', studentController.updateStudentById)

router.delete('/:id', studentController.deleteStudentById)

module.exports = router
