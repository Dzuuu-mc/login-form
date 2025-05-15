const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const hbs = require('hbs')
const path = require('path')

const app = express()
const PORT = 3030

app.use(express.static(path.join(__dirname, 'views')));

app.use (express.static(path.join(__dirname, './public')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'hbs');


const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'login'
})

db.connect(err => {
    if (err) throw err; 
    console.log('Mysql Connected...');
})

app.get('/', (req, res)  =>{
    res.render('index')
})

app.post('/', (req, res) => {
    const {name, password} = req.body;
    const query = 'SELECT * FROM users WHERE name = ? AND password = ?' 
    
    db.query(query, [name, password], (err, results) => {
        if (err) throw err;

        if(results.length > 0){
            res.render('pages2');
            console.log('login succesfully')
        } else {
            res.render('index', {error: 'name or password flase'})
            console.log('name or password false')
        }
    });

});

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})