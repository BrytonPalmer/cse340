import { getProjectDetails } from '../models/projects.js';
import { 
    getAllCategories,
    getCategoryById,
    getProjectsForCategory,
    getCategoriesForProject,
    updateCategoryAssignments,
    createCategory,
    updateCategory
} from '../models/categories.js';

import { body, validationResult } from 'express-validator';

/* ---------------------------------------------------------
   VALIDATION RULES FOR CREATE & EDIT CATEGORY
--------------------------------------------------------- */

const categoryValidation = [
    body('category_name')
        .trim()
        .notEmpty()
        .withMessage('Category name is required')
        .isLength({ max: 100 })
        .withMessage('Category name cannot exceed 100 characters')
        .isLength({ min: 3 })
        .withMessage('Category name must be at least 3 characters')
];

/* ---------------------------------------------------------
   EXISTING CONTROLLERS
--------------------------------------------------------- */

// List all categories
const showCategoriesPage = async (req, res) => {
    const data = await getAllCategories();
    res.render("categories", {
        title: "Categories",
        categories: data.rows
    });
};

// Category details page
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
   NEW: CREATE CATEGORY
--------------------------------------------------------- */

// GET /new-category
const showNewCategoryForm = async (req, res) => {
    res.render("new-category", {
        title: "Add New Category"
    });
};

// POST /new-category
const processNewCategoryForm = async (req, res) => {
    const results = validationResult(req);

    if (!results.isEmpty()) {
        results.array().forEach(error => req.flash('error', error.msg));
        return res.redirect('/new-category');
    }

    const { category_name } = req.body;

    const categoryId = await createCategory(category_name);

    req.flash('success', 'Category created successfully!');
    res.redirect(`/category/${categoryId}`);
};

/* ---------------------------------------------------------
   NEW: EDIT CATEGORY
--------------------------------------------------------- */

// GET /edit-category/:id
const showEditCategoryForm = async (req, res) => {
    const categoryId = req.params.id;
    const categoryDetails = await getCategoryById(categoryId);

    if (!categoryDetails) {
        req.flash('error', 'Category not found.');
        return res.redirect('/categories');
    }

    res.render("edit-category", {
        title: "Edit Category",
        categoryDetails
    });
};

// POST /edit-category/:id
const processEditCategoryForm = async (req, res) => {
    const categoryId = req.params.id;

    const results = validationResult(req);
    if (!results.isEmpty()) {
        results.array().forEach(error => req.flash('error', error.msg));
        return res.redirect(`/edit-category/${categoryId}`);
    }

    const { category_name } = req.body;

    await updateCategory(categoryId, category_name);

    req.flash('success', 'Category updated successfully!');
    res.redirect(`/category/${categoryId}`);
};

/* ---------------------------------------------------------
   EXISTING: ASSIGN CATEGORIES TO PROJECT
--------------------------------------------------------- */

const showAssignCategoriesForm = async (req, res) => {
    try {
        const projectId = req.params.projectId;

        const project = await getProjectDetails(projectId);
        if (!project) {
            req.flash('error', 'Project not found.');
            return res.redirect('/projects');
        }

        const allCategories = await getAllCategories();
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

const processAssignCategoriesForm = async (req, res) => {
    try {
        const projectId = req.params.projectId;
        const categoryIds = req.body.categoryIds;

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
    showNewCategoryForm,
    processNewCategoryForm,
    showEditCategoryForm,
    processEditCategoryForm,
    categoryValidation,
    showAssignCategoriesForm,
    processAssignCategoriesForm
};