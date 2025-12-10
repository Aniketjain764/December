# Aniket WebApp – Full Stack Node.js + Express + MySQL Application

This is a full-stack web application built using Node.js, Express, MySQL and EJS. It includes a public landing page as well as an admin panel for managing the content of the website. The project demonstrates routing, database integration, templating, and separation of concerns using a clean folder structure.

---

## Features

### Public Website
- Hero section and structured content layout
- Contact form (Name, Email, Mobile, City) saving submissions into the contact_forms table
- Newsletter subscription saving emails into the newsletter table
- Horizontal scroll sections for Projects and Clients
- About Developer section included

---

## Admin Panel

Accessible at:  
http://localhost:3000/admin

Sections included:
- Contacts list (shows all contact form submissions)
- Newsletter subscribers list
- Projects section
- Clients section

(Note: Some CRUD operations for Projects and Clients are still being refined.)

---

## Tech Stack

Backend: Node.js, Express  
Frontend: EJS, HTML, CSS  
Database: MySQL  
Environment Variables: dotenv  
Architecture: MVC-style (routes, controllers, configs, views)

---

## Folder Structure

/config          – Database configuration  
/controllers     – Logic handlers for routes  
/routes          – App and admin routes  
/views           – EJS templates (partials and admin views)  
/public          – Static assets (CSS, images)  
server.js        – Application entry point  
.env.example     – Sample environment variables  
webapp_db.sql    – Database export file  

---

## How to Run

1. Install dependencies:
   npm install

2. Create a .env file using the fields from .env.example.

3. Import the database:
   Open MySQL Workbench and import webapp_db.sql.

4. Start the application:
   npm start

Public site:  
http://localhost:3000/

Admin panel:  
http://localhost:3000/admin

---

## Notes / Known Areas for Improvement

- Some CRUD operations for Projects and Clients are partially implemented and will be completed in future updates.
- Image handling and upload features can be added.
- Additional UI refinements and dynamic elements can be extended further.

---

## Developer

Aniket Jain  
Full Stack Developer – Node.js / Express / MySQL

The project was written with clarity and maintainability in mind and can be extended further as needed.
