const Student = require('../models/Student')

exports.listStudent = async (req, res) => {
  try {
    const students = await Student.find()

    return res.status(200).json(students)
  } catch (err) {
    return res.status(400).json({ error: 'Error loading students.' })
  }
}

exports.listStudentById = async (req, res) => {
  const { id } = req.params.id

  if (!id) {
    return res.status(404).json({ error: 'Id not a found.' })
  }
  try {
    const student = await Student.findById(id)

    return res.status(200).json(student)
  } catch (err) {
    return res.status(400).json({ error: 'Error loading student.' })
  }
}

exports.createStudent = async (req, res) => {
  const { username, email, adress } = req.body

  if (req.file === undefined || req.file == null) {
    // // validations
    res
      .status(400)
      .json({ msg: 'Unable to create student without image file.' })
    return
  }

  if (!username) {
    res.status(400).json({ error: 'Name is required.' })
    return
  }

  if (!email) {
    res.status(400).json({ error: 'Email is required.' })
    return
  }

  if (!adress) {
    res.status(400).json({ error: 'Adress is required.' })
    return
  }

  // student exist
  if (await Student.findOne({ email })) {
    res.status(409).json({ msg: 'Student already exists.' })
    return
  }

  try {
    const { size, key, location: url, originalname: name } = req.file

    const student = await Student.create({
      username,
      email,
      adress,
      name,
      size,
      key,
      url,
    })

    await student.save()

    return res.status(201).json({ student })
  } catch (err) {
    return res.status(400).json({ error: 'Error creating student.' })
  }
}

exports.updateStudentById = async (req, res) => {
  try {
    const { username, email, adress } = req.body

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      {
        username,
        email,
        adress,
      },
      { new: true },
    )
    await student.save()

    return res.status(200).json({ student })
  } catch (error) {
    return res.status(400).send({ error: 'Error updating student.' })
  }
}

exports.deleteStudentById = async (req, res) => {
  try {
    await Student.deleteOne({ _id: req.params.id })

    return res.status(200).json({ message: 'Student removed successfully.' })
  } catch (err) {
    console.log(err)
    return res.status(400).json({ error: 'Error deleting student.' })
  }
}
