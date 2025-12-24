const express= require('express');
const  router= express.Router();
const db= require('../utils/db');
const { addNewStudent, getAllStudents, getStudentById, updateStudentById, deleteStudentById } = require('../controllers/studentController');

// POST /students → Insert a new student.
router.post('/add', addNewStudent);
// GET /students → Retrieve all students.
router.get('/all', getAllStudents);
// GET /students/:id → Retrieve a student by ID.
router.get('/:id', getStudentById);
// PUT /students/:id → Update student details.
router.put('/update/:id', updateStudentById);
// DELETE /students/:id → Delete a student by ID.
router.delete('/delete/:id', deleteStudentById);

module.exports= router;


