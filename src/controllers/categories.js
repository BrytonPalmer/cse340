import { getAllCategories } from '../models/categories.js';

const showCategoriesPage = async (req, res) => {
    const data = await getAllCategories();
    res.render("categories", {
        title: "Categories",
        categories: data.rows
    });
};

export { showCategoriesPage };