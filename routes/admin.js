
const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const clientController = require('../controllers/clientController');
const adminController = require('../controllers/adminController');

// Projects
router.get('/projects', projectController.getAllProjects);
router.get('/projects/add', projectController.getAddProject);
router.post('/projects/add', projectController.createProject);
router.get('/projects/delete/:id', projectController.deleteProject);

// Clients
router.get('/clients', clientController.getAllClients);
router.get('/clients/add', clientController.getAddClient);
router.post('/clients/add', clientController.createClient);
router.get('/clients/delete/:id', clientController.deleteClient);

// General Admin
router.get('/contacts', adminController.getContacts);
router.get('/newsletter', adminController.getNewsletter);

// Dashboard redirect (optional, or just list projects as default)
router.get('/', (req, res) => res.redirect('/admin/projects'));

module.exports = router;
