const Contact = require('../models/Contact');
const Newsletter = require('../models/Newsletter');

exports.getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.render('admin/contact_list', { contacts, title: 'Contact Submissions' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.getNewsletter = async (req, res) => {
    try {
        const subscribers = await Newsletter.find().sort({ subscribedAt: -1 });
        res.render('admin/newsletter_list', { subscribers, title: 'Newsletter Subscribers' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
