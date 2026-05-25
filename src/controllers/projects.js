import { 
    getUpcomingProjects,
    getProjectDetails
} from '../models/projects.js';

const NUMBER_OF_UPCOMING_PROJECTS = 5;

// Show the next 5 upcoming projects
export async function showProjectsPage(req, res) {
    try {
        const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);

        res.render("projects", {
            title: "Upcoming Service Projects",
            projects
        });
    } catch (error) {
        console.error("Error loading upcoming projects:", error);
        res.status(500).send("Server Error");
    }
}

// Show details for a single project
export async function showProjectDetailsPage(req, res) {
    try {
        const projectId = req.params.id;
        const project = await getProjectDetails(projectId);

        if (!project) {
            return res.status(404).render("errors/404", {
                title: "Project Not Found"
            });
        }

        res.render("project", {
            title: project.title,
            project
        });
    } catch (error) {
        console.error("Error loading project details:", error);
        res.status(500).send("Server Error");
    }
}
