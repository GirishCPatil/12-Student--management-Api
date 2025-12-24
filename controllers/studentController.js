const db = require('../utils/db');
const studentModel = require('../models/student');

const addNewStudent = async (req, res) => {
    try {
        const { name, email, age } = req.body;
        if (!name || !email || !age) {
            return res.status(400).json({ error: 'Name, email, and age are required' });
        }
        const student = await studentModel.create({ name, email, age });
        res.status(201).json({ message: 'Student added successfully', student });
    } catch (error) {
        console.error('Error adding student:', error);
        res.status(500).json({ error: 'Failed to add student' });

    }

};

const getAllStudents = (req, res) => {
    studentModel.findAll()
        .then(students => {
            res.status(200).json(students);
        })
        .catch(error => {
            console.error('Error retrieving students:', error);
            res.status(500).json({ error: 'Failed to retrieve students' });
        });
        
    // const query = 'SELECT * FROM students';
    // db.query(query, (err, results) => {
    //     if (err) {  
    //         console.error('Error retrieving students:', err);
    //         res.status(500).json({ error: 'Failed to retrieve students' });
    //     }

    //     res.status(200).json(results);
    // });
}

const getStudentById = async (req, res) => {
    try {
        const studentId = req.params.id;
        const student = await studentModel.findByPk(studentId);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.status(200).json(student);
    } catch (error) {
        console.error('Error retrieving student:', error);
        res.status(500).json({ error: 'Failed to retrieve student' });
    }   

    // const studentId = req.params.id;
    // const query = 'SELECT * FROM students WHERE id = ?';
    // db.query(query, [studentId], (err, results) => {
    //     if (err) {  
    //         console.error('Error retrieving student:', err);
    //         res.status(500).json({ error: 'Failed to retrieve student' });
    //     } else if (results.length === 0) {
    //         res.status(404).json({ error: 'Student not found' });
    //     } else {
    //         res.status(200).json(results[0]);
    //     }   
    // });
}

const updateStudentById = async (req, res) => {

    try {
        const studentId = req.params.id;
        const { name, email, age } = req.body;
        const student = await studentModel.findByPk(studentId);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        student.name = name || student.name;
        student.email = email || student.email;
        student.age = age || student.age;
        await student.save();
        res.status(200).json({ message: 'Student updated successfully', student });
    } catch (error) {

        console.error('Error updating student:', error);
        res.status(500).json({ error: 'Failed to update student' });
    }



    // const studentId = req.params.id;
    // const { name, email, age } = req.body;
    // if (!name || !email || !age) {
    //     return res.status(400).json({ error: 'Name, email, and age are required' });
    // }

    // const query = 'UPDATE students SET name = ?, email = ?, age = ? WHERE id = ?';
    // db.query(query, [name, email, age, studentId], (err, result) => {
    //     if (err) {
    //         console.error('Error updating student:', err);
    //         res.status(500).json({ error: 'Failed to update student' });
    //     } else if (result.affectedRows === 0) {
    //         res.status(404).json({ error: 'Student not found' });
    //     } else {
    //         res.status(200).json({ message: 'Student updated successfully' });
    //     }   
    // });
}

const deleteStudentById = async (req, res) => {


    try {
        const studentId = req.params.id;
        const student = await studentModel.findByPk(studentId);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        await student.destroy();
        res.status(200).json({ message: 'Student deleted successfully' });

    } catch (error) {

        console.error('Error deleting student:', error);
        res.status(500).json({ error: 'Failed to delete student' });
    }
    // const studentId = req.params.id;
    // const query = 'DELETE FROM students WHERE id = ?';  
    // db.query(query, [studentId], (err, result) => {
    //     if (err) {  
    //         console.error('Error deleting student:', err);
    //         res.status(500).json({ error: 'Failed to delete student' });
    //     }
    //     else if (result.affectedRows === 0) {
    //         res.status(404).json({ error: 'Student not found' });
    //     }   
    //     else {
    //         res.status(200).json({ message: 'Student deleted successfully' });
    //     }   
    // });
}

module.exports = {
    addNewStudent,
    getAllStudents,
    getStudentById,
    updateStudentById,
    deleteStudentById
};