const Client = require('../models/Client');

exports.getAllClients = async (req, res) => {
    try {
        const clients = await Client.find().sort({ createdAt: -1 });
        res.render('admin/clients_list', { clients, title: 'Manage Clients' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.getAddClient = (req, res) => {
    res.render('admin/client_add', { title: 'Add Client' });
};

exports.createClient = async (req, res) => {
    const { name, designation, description, image_path } = req.body;
    try {
        await Client.create({
            name,
            role: designation, // Map form field to model field
            description,
            imageUrl: image_path // Map form field to model field
        });
        res.redirect('/admin/clients');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error adding client');
    }
};

exports.deleteClient = async (req, res) => {
    const { id } = req.params;
    try {
        await Client.findByIdAndDelete(id);
        res.redirect('/admin/clients');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting client');
    }
};
