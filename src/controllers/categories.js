import { 
    getAllCategories,
    getCategoryById,
    getProjectsForCategory
} from '../models/categories.js';

// Existing:
const showCategoriesPage = async (req, res) => {
    const data = await getAllCategories();
    res.render("categories", {
        title: "Categories",
        categories: data.rows
    });
};

// NEW: Category details page
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

export { 
    showCategoriesPage,
    showCategoryDetailsPage
};

