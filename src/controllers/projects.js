import { getAllProjects } from '../models/projects.js';

const showProjectsPage = async (req, res) => {
    const data = await getAllProjects();
    res.render("projects", {
        title: "Service Projects",
        projects: data.rows
    });
};

export { showProjectsPage };