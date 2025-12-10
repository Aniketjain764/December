const Project = require('../models/Project');
const Client = require('../models/Client');
const Contact = require('../models/Contact');
const Newsletter = require('../models/Newsletter');

exports.getHomePage = async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 }).limit(4);
        const clients = await Client.find().sort({ createdAt: -1 }).limit(4);
        res.render('index', { title: 'Home', projects, clients });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.submitContact = async (req, res) => {
    const { name, email, mobile, city, message } = req.body;
    try {
        await Contact.create({
            fullname: name, // Map form field 'name' to model field 'fullname'
            email,
            mobile,
            city,
            message
        });
        res.render('index', { title: 'Home', message: 'Message sent successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).render('index', { title: 'Home', error: 'Server Error' });
    }
};

exports.subscribeNewsletter = async (req, res) => {
    const { email } = req.body;
    try {
        await Newsletter.create({ email });
        res.render('index', { title: 'Home', message: 'Subscribed successfully!' });
    } catch (err) {
        console.error(err);
        if (err.code === 11000) { // MongoDB duplicate key error code
            res.render('index', { title: 'Home', message: 'Already subscribed!' });
        } else {
            res.status(500).render('index', { title: 'Home', error: 'Server Error' });
        }
    }
};
