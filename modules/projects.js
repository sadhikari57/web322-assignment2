const projectData = require("../data/projectData.json");
const sectorData = require("../data/sectorData.json");

let projects = [];

function initialize() {
    return new Promise((resolve, reject) => {
        try {
            // Clear the projects array first (just in case it has existing data)
            projects = [];

            // Use forEach to iterate through projectData and add copies to projects array
            projectData.forEach(project => {
                // Find matching sector
                const matchingSector = sectorData.find(sector => 
                    sector.id === project.sector_id
                );
                
                // Create a copy of the project with the new sector property
                const projectWithSector = {
                    ...project,
                    sector: matchingSector ? matchingSector.sector_name : null
                };
                
                // Add the project copy to the projects array
                projects.push(projectWithSector);
            });
            
            resolve();
        } catch (err) {
            reject("Error in initialize function: " + err);
        }
    });
}

function getAllProjects() {
    return new Promise((resolve, reject) => {
        try {
            resolve(projects);
        } catch (err) {
            reject("Error in getAllProjects function: " + err);
        }
    });
}

function getProjectById(projectId) {
    return new Promise((resolve, reject) => {
        try {
            const project = projects.find(p => p.id === projectId);
            console.log(project);
            
            if (project) {
                resolve(project);
            } else {
                reject("Unable to find requested project");
            }
        } catch (err) {
            reject("Error in getProjectById function: " + err);
        }
    });
}

function getProjectsBySector(sector) {
    return new Promise((resolve, reject) => {
        try {
            // Input validation
            if (!sector || typeof sector !== 'string') {
                reject("Sector parameter must be a non-empty string");
                return;
            }

            // Convert search term to lowercase
            const searchTerm = sector.toLowerCase();

            // Filter projects based on sector match
            const matchingProjects = projects.filter(project => {
                // Ensure project has a sector property before trying to search
                if (!project.sector) return false;
                
                // Convert project sector to lowercase and check if it includes search term
                return project.sector.toLowerCase().includes(searchTerm);
            });
            
            // Return matching projects if found
            if (matchingProjects.length > 0) {
                resolve(matchingProjects);
            } else {
                reject(`No projects found for sector search: ${sector}`);
            }

        } catch (err) {
            reject(`Error in getProjectsBySector function: ${err}`);
        }
    });
}

module.exports = {
    initialize,
    getAllProjects,
    getProjectById,
    getProjectsBySector
};

// Testing code (can be removed after testing)
if (require.main === module) {
    console.log('Testing projects module...\n');

    // Test initialize
    initialize()
        .then(() => {
            console.log('Initialization successful!');
            
            // Test getAllProjects
            return getAllProjects();
        })
        .then(allProjects => {
            console.log('\ngetAllProjects test:');
            console.log(`Total projects: ${allProjects.length}`);
            
            // Test getProjectById with ID 9
            return getProjectById(9);
        })
        .then(project => {
            console.log('\ngetProjectById test (ID: 9):');
            console.log(project);
            
            // Test getProjectsBySector
            return getProjectsBySector('agriculture');
        })
        .then(sectorProjects => {
            console.log('\ngetProjectsBySector test (sector: agriculture):');
            console.log(`Found ${sectorProjects.length} projects`);
            sectorProjects.forEach(project => {
                console.log(`- ${project.id}: ${project.sector}`);
            });
        })
        .catch(err => {
            console.error('\nAn error occurred during testing:', err);
        })
        .finally(() => {
            console.log('\nTesting complete!');
        });
}