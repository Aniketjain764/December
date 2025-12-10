const Project = require('../models/Project');

exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.render('admin/projects_list', { projects, title: 'Manage Projects' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.getAddProject = (req, res) => {
    res.render('admin/project_add', { title: 'Add Project' });
};

exports.createProject = async (req, res) => {
    const { title, description, image_url, link } = req.body;
    try {
        await Project.create({
            title,
            description,
            imageUrl: image_url, // Map form field to model field
            link
        });
        res.redirect('/admin/projects');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error adding project');
    }
};

exports.deleteProject = async (req, res) => {
    const { id } = req.params;
    try {
        await Project.findByIdAndDelete(id);
        res.redirect('/admin/projects');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting project');
    }
};
