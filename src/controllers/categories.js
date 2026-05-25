import { getProjectDetails } from '../models/projects.js';
import { 
    getAllCategories,
    getCategoryById,
    getProjectsForCategory,
    getCategoriesForProject,
    updateCategoryAssignments
} from '../models/categories.js';

// Existing:
const showCategoriesPage = async (req, res) => {
    const data = await getAllCategories();
    res.render("categories", {
        title: "Categories",
        categories: data.rows
    });
};

// Existing: Category details page
const showCategoryDetailsPage = async (req, res) => {
    const categoryId = req.params.id;

    const category = await getCategoryById(categoryId);
    if (!category) {
        return res.status(404).render("errors/404", { title: "Category Not Found" });
    }

    const projects = await getProjectsForCategory(categoryId);

    res.render("category", {
        title: category.name,
        category,
        projects
    });
};

/* ---------------------------------------------------------
   NEW CONTROLLERS FOR ASSIGNING CATEGORIES TO PROJECTS
--------------------------------------------------------- */

// Show the form to assign categories to a project
const showAssignCategoriesForm = async (req, res) => {
    try {
        const projectId = req.params.projectId;

        // Load project details
        const project = await getProjectDetails(projectId);
        if (!project) {
            req.flash('error', 'Project not found.');
            return res.redirect('/projects');
        }

        // Load all categories
        const allCategories = await getAllCategories();

        // Load categories currently assigned to this project
        const assignedCategories = await getCategoriesForProject(projectId);

        const title = "Assign Categories to Project";

        res.render('assign-categories', {
            title,
            project,
            allCategories,
            assignedCategories
        });

    } catch (error) {
        console.error("Error loading assign categories form:", error);
        req.flash('error', 'Unable to load category assignment form.');
        res.redirect('/projects');
    }
};

// Process the form submission
const processAssignCategoriesForm = async (req, res) => {
    try {
        const projectId = req.params.projectId;
        const categoryIds = req.body.categoryIds; // may be undefined, string, or array

        await updateCategoryAssignments(projectId, categoryIds);

        req.flash('success', 'Categories updated successfully!');
        res.redirect(`/project/${projectId}`);

    } catch (error) {
        console.error("Error updating category assignments:", error);
        req.flash('error', 'Unable to update categories.');
        res.redirect(`/project/${projectId}/assign-categories`);
    }
};

/* ---------------------------------------------------------
   EXPORTS
--------------------------------------------------------- */

export { 
    showCategoriesPage,
    showCategoryDetailsPage,
    showAssignCategoriesForm,
    processAssignCategoriesForm
};