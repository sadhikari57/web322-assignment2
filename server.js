const express = require("express");
const projectData = require("./modules/projects");

const app = express();
const HTTP_PORT = process.env.PORT || 8080;

/********************************************************************************
* WEB322 – Assignment 02
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: Sandip Adhikari Student ID: 145433231 Date: 01/27/2025
*
********************************************************************************/


// Initialize the project data before starting the server
projectData.initialize()
    .then(() => {
        app.listen(HTTP_PORT, () => {
            console.log(`Server listening on port ${HTTP_PORT}`);
        });
    })
    .catch(err => {
        console.error("Failed to initialize project data:", err);
    });

// Routes
app.get("/", (req, res) => {
    res.send("Assignment 2: Sandip Adhikari - 145433231");
});

app.get("/solutions/projects", (req, res) => {
    projectData.getAllProjects()
        .then(data => res.json(data))
        .catch(err => res.status(500).send(err));
});

app.get("/solutions/projects/id-demo", (req, res) => {
    // Example: using project ID 9 as specified in the requirements
    projectData.getProjectById(9)
        .then(project => res.json(project))
        .catch(err => res.status(404).send(err));
});

app.get("/solutions/projects/sector-demo", (req, res) => {
    // Example: using "agriculture" as specified in the requirements
    projectData.getProjectsBySector("agriculture")
        .then(projects => res.json(projects))
        .catch(err => res.status(404).send(err));
});
