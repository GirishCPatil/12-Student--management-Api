const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('student_management', 'root', 'Girish@21', {
    host: 'localhost',
    dialect: 'mysql'
});


async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

testConnection();
module.exports = sequelize;






















// const mysql = require('mysql2');


// const db= mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'Girish@21',
//     database: 'student_management'
// }); 



// db.connect((err) => {
//     if (err) {
//         console.error('Error connecting to the database:', err);
//         return;
//     }
//     console.log('Connected to the database.');
// });

// module.exports = db;

