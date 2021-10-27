const express = require('express');
require('dotenv').config();
const nugsu = require('./database/connect');
const calculate = require('./grading/grading')
const port = process.env.PORTER || 3007;
const cors = require('cors');

const app = express();

//middlewares, parse JSONs
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// LOGIN and LOGOUT FUNCTONALITY

app.post('/api/login', (req, res) => {
    const { username, password } = req.body || req.query;
    let sql = "SELECT * FROM users WHERE username = ? AND password = ?";
    nugsu.query(sql, [username, password], (err, result) => {
        if(err) return res.status(404).send({
            message: "Failed to login",
            log: result,
            error: true
        });
        res.status(200).json({
            message: "Login susccess!",
            isLogged: true,
            data: result[0]
        });
    });
})


app.post('/api/register', (req, res) => {

    const { username, password } = req.body
    console.log(username, password)

    let sql1 = `
        CREATE TABLE IF NOT EXISTS users (
            prof_id INT PRIMARY KEY AUTO_INCREMENT,
            username VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL);
    `;
    let sql2 = 'INSERT INTO users (username, password) VALUES (?,?);';

    nugsu.query(sql1, (err) => {
        if(err) return res.status(401).send({
            message: 'Unable to create table.',
            error: true
        });
        nugsu.query(sql2, [username, password], (err) => {
            if(err) return res.status().send({
                message: 'Cannot register! Check internet connection of yours.',
                error: true
            });
            res.status(201).send('Successfully registered!');
        })
    })
});

//STUDENT CRUD
app.get('/', (req, res) => {
    nugsu.query('SELECT * FROM studentx', (err, result) => {
        if(err) {
            res.status(401)
                .send({ message: "You aren't a professor in this school!", 
                        error: true });
            console.warn(err)
        }
        res.status(200).json(result)
    });
});

app.get('/:studentID', (req, res) => {

    const { studentID } = req.params
    let sql = "SELECT student_id, fname, lname, school_year FROM studentx WHERE student_id = '" +studentID+"'"; 
    nugsu.query(sql, (err, result) => {
        if(err) return res.status(404).send({ 
                        message: "Unable to view this student!", 
                        error: true });
        res.status(200).json(result)
    });
});

app.post('/add', (req, res) => {
    const { student_id, fname, lname, school_year } = req.body
    let sql = "INSERT INTO studentx (student_id, fname, lname, school_year) VALUES (?, ?, ?, ?);"; 
    nugsu.query(sql, [ student_id, fname, lname, school_year], (err, result) => {
        if(err) return res.status(401).send({ message: "yOU can't add new student if you are not a professor or admin!", 
            error: true,
            english: 'Bad'
        });
        res.status(201).json(result)
    });
});

app.put('/:studentID/edit', (req, res) => {

    const {studentID } = req.params;
    const { fname, lname, school_year, student_id } = req.body;

    let sql = "UPDATE studentx SET fname = ?, lname = ?, school_year = ?, student_id = ? WHERE st_id = '" +studentID+"'";  
    nugsu.query(sql, [fname, lname, school_year, student_id], (err, result) => {
        if(err) return res.status(401).send({ 
            message: "You aren't a professor in this school! You're not allowed to modify data!", 
            error: true
        });
        res.status(201).json(result)
    });
});

app.delete('/:studentID/drop', (req, res) => {

    const {studentID } = req.params;

    let sql = "DELETE FROM studentx WHERE student_id = '" +studentID+"'";  
    nugsu.query(sql, (err) => {
        if(err) return res.status(401).send({ 
            message: "You aren't a professor in this school! You're not allowed to modify data!", 
            error: true 
        });
        res.status(200).send("Deleted")
    });
});

//GRADES crud

app.get('/grades/:studentID', (req, res) => {
    const { studentID } =req.params;
    let sql = `SELECT prelims, midterms, finals, average FROM grades WHERE grade_id = '${studentID}'`;
    nugsu.query(sql, (err, results) => {
        if(err){
            console.warn(err)
            return res.status(401).send({ message: "Cannot get this student's grades!", error: true });
        }
        res.status(200).send(results[0]);
    })
})


app.post('/grades/post', (req, res) => {

   const { grade_id, prelims, midterms, finals } = req.body;
   const average = calculate(prelims, midterms, finals).toFixed(2);

   console.log(req.body)
   let sql =`CREATE TABLE IF NOT EXISTS grades (
    g_id INT PRIMARY KEY AUTO_INCREMENT,
    grade_id VARCHAR(255) NOT NULL,
    prelims VARCHAR(255) NOT NULL,
    midterms VARCHAR(255) NOT NULL,
    finals VARCHAR(255) NOT NULL,
    average VARCHAR(255) NOT NULL);`;

    let sql2 =  'INSERT INTO grades (grade_id, prelims, midterms, finals, average) VALUES (?,?,?,?,?)';

   nugsu.query(sql, (err) => {
        if(err) throw err;
        nugsu.query(sql2, [ grade_id, prelims, midterms, finals, average],
            (err) =>{
                if(err) return res.status(401).send({ 
                    message: "FAiled to edit this student's grades",
                    error: true
                });
                res.status(201).send("Edited");
            })
    })
});

app.put('/grades/update', (req, res) => {
    const { grade_id, prelims, midterms, finals } = req.body;
    const average = calculate(prelims, midterms, finals).toFixed(2);

    const sql = 'UPDATE grades SET prelims = ?, midterms = ?, finals = ?, average = ? WHERE grade_id = ?';

    nugsu.query(sql, [ prelims, midterms, finals, average, grade_id],
        (err) => {
            if(err) return res.status(401).send({ 
                message: "FAiled to update this student's grades",
                error: true 
            });
            res.status(201).send("UPDATED");
        })
})

app.listen(port, () => {
    console.log("RUNNING ON PORT: ", port);

    // nugsu.connect((err) => {
    //     if(err) console.log(err);
    //     console.log("connected!")
    // });
});