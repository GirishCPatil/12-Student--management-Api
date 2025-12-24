const db = require('../utils/db');

const addNewStudent= (req, res) => {
    const { name, email,age } = req.body;
    if (!name || !email || !age) {
        return res.status(400).json({ error: 'Name, email, and age are required' });
    }
    const query = 'INSERT INTO students (name, email, age) VALUES (?, ?, ?)';
    db.query(query, [name, email, age], (err, result) => {
        if (err) {
            console.error('Error adding student:', err);
            res.status(500).json({ error: 'Failed to add student' });
        } else {
            res.status(201).json({ message: 'Student added successfully', studentId: result.insertId });
        }
    });
};

const getAllStudents= (req, res) => {
    const query = 'SELECT * FROM students';
    db.query(query, (err, results) => {
        if (err) {  
            console.error('Error retrieving students:', err);
            res.status(500).json({ error: 'Failed to retrieve students' });
        }

        res.status(200).json(results);
    });
}

const getStudentById= (req, res) => {
    const studentId = req.params.id;
    const query = 'SELECT * FROM students WHERE id = ?';
    db.query(query, [studentId], (err, results) => {
        if (err) {  
            console.error('Error retrieving student:', err);
            res.status(500).json({ error: 'Failed to retrieve student' });
        } else if (results.length === 0) {
            res.status(404).json({ error: 'Student not found' });
        } else {
            res.status(200).json(results[0]);
        }   
    });
}

const updateStudentById= (req, res) => {
    const studentId = req.params.id;
    const { name, email, age } = req.body;
    if (!name || !email || !age) {
        return res.status(400).json({ error: 'Name, email, and age are required' });
    }

    const query = 'UPDATE students SET name = ?, email = ?, age = ? WHERE id = ?';
    db.query(query, [name, email, age, studentId], (err, result) => {
        if (err) {
            console.error('Error updating student:', err);
            res.status(500).json({ error: 'Failed to update student' });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Student not found' });
        } else {
            res.status(200).json({ message: 'Student updated successfully' });
        }   
    });
}

const deleteStudentById= (req, res) => {
    const studentId = req.params.id;
    const query = 'DELETE FROM students WHERE id = ?';  
    db.query(query, [studentId], (err, result) => {
        if (err) {  
            console.error('Error deleting student:', err);
            res.status(500).json({ error: 'Failed to delete student' });
        }
        else if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Student not found' });
        }   
        else {
            res.status(200).json({ message: 'Student deleted successfully' });
        }   
    });
}

module.exports= {
    addNewStudent,
    getAllStudents,
    getStudentById,
    updateStudentById,
    deleteStudentById
};