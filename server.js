const express = require('express');
const app = express();
const path = require('path');
const db = require('./db');
const _port = 3000;

/* one way to load html files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
})*/

//make static pages with express
app.use(express.static(path.join(__dirname, 'dist')));
//get all data in the database
app.get('/api/users', async (req, res) => {
    try {
        let results = await db.getAll();
        res.json(results); 
    }catch(err){
        res.send(err);  
    }
})
//insert new data into the database
app.post('/api/user', async (req, res) => {
    try {
        let results = await db.insertData();
        res.send(results); 
    }catch(err){
        res.send(err);  
    }
})
//update data in the database
app.put('/api/update/:id', async (req, res) => {
    try {
        let results = await db.updateData(req.params.id);
        res.send(results); 
    }catch(err){
        res.send(err);  
    }
})
//delete data from the database
app.delete('/api/delete/:id', async (req, res) => {
    try {
        let results = await db.deleteData(req.params.id);
        res.send(results); 
    }catch(err){
        res.send(err);  
    }
})
//db.createTable();

app.listen(_port, (err) => {
    if (err) {throw err;}
    console.log(`Server running on port: ${_port}`)
});