const express = require("express");
const path = require("path");

const app = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser");
mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    description: String

});
const Contact = mongoose.model('Contact', contactSchema);

const port = 80;
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res) => {
    const con = "This is the best content on the internet so far so use it wisely"
    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res) => {
    const con = "This is the best content on the internet so far so use it wisely"
    const params = {}
    res.status(200).render('contact.pug', params);
})
app.post('/contact', (req, res) => {
    const myData = new Contact(req.body);
    myData.save().then(() => {
        res.send('This item has been saved to the database')
    }).catch(() => {
        res.status(400).send('item was not saved to the databse')
    })


});


app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});
