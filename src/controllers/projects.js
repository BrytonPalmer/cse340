import { getUpcomingProjects, getProjectDetails } from '../models/projects.js';
import { getCategoriesForProject } from '../models/categories.js';
import { createProject } from '../models/projects.js';
import { getAllOrganizations } from '../models/organizations.js';
import { body, validationResult } from 'express-validator';
import { updateProject } from '../models/projects.js';


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

// Show details for a single project (FINAL VERSION)
export async function showProjectDetailsPage(req, res) {
    try {
        const projectId = req.params.id;
        const project = await getProjectDetails(projectId);

        if (!project) {
            return res.status(404).render("errors/404", {
                title: "Project Not Found"
            });
        }

        const categories = await getCategoriesForProject(projectId);

        res.render("project", {
            title: project.title,
            project,
            categories
        });
    } catch (error) {
        console.error("Error loading project details:", error);
        res.status(500).send("Server Error");
    }
}

const projectValidation = [
    body('title')
        .trim()
        .notEmpty().withMessage('Title is required')
        .isLength({ min: 3, max: 200 }).withMessage('Title must be between 3 and 200 characters'),
    body('description')
        .trim()
        .notEmpty().withMessage('Description is required')
        .isLength({ max: 1000 }).withMessage('Description cannot exceed 1000 characters'),
    body('location')
        .trim()
        .notEmpty().withMessage('Location is required')
        .isLength({ max: 200 }).withMessage('Location cannot exceed 200 characters'),
    body('date')
        .notEmpty().withMessage('Date is required')
        .isISO8601().withMessage('Please provide a valid date'),
    body('organizationId')
        .notEmpty().withMessage('Organization is required')
        .isInt().withMessage('Organization must be a valid selection')
];

const showNewProjectForm = async (req, res) => {
    const organizations = await getAllOrganizations();
    const title = 'Add New Service Project';

    res.render('new-project', { title, organizations });
};

const processNewProjectForm = async (req, res) => {
    const results = validationResult(req);
    if (!results.isEmpty()) {
        results.array().forEach(error => req.flash('error', error.msg));
        return res.redirect('/new-project');
    }

    const { organizationId, title, description, location, date } = req.body;

    await createProject(title, description, location, date, organizationId);

    req.flash('success', 'Project created successfully!');
    res.redirect('/projects'); // adjust if your list route is different
};

export async function showEditProjectForm(req, res) {
    try {
        const projectId = req.params.id;

        const project = await getProjectDetails(projectId);
        if (!project) {
            req.flash('error', 'Project not found.');
            return res.redirect('/projects');
        }

        const organizations = await getAllOrganizations();

        res.render('edit-project', {
            title: "Edit Service Project",
            project,
            organizations
        });

    } catch (error) {
        console.error("Error loading edit project form:", error);
        req.flash('error', 'Unable to load edit form.');
        res.redirect('/projects');
    }
}

export async function processEditProjectForm(req, res) {
    try {
        const projectId = req.params.id;

        const { title, description, location, date, organizationId } = req.body;

        await updateProject(
            projectId,
            title,
            description,
            location,
            date,
            organizationId
        );

        req.flash('success', 'Project updated successfully!');
        res.redirect(`/project/${projectId}`);

    } catch (error) {
        console.error("Error updating project:", error);
        req.flash('error', 'Unable to update project.');
        res.redirect(`/edit-project/${req.params.id}`);
    }
}


export {
    // existing exports...
    showNewProjectForm,
    processNewProjectForm,
    projectValidation,
};