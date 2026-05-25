import db from "./db.js";

export async function getAllCategories() {
    const sql = "SELECT * FROM categories ORDER BY name;";
    return db.query(sql);
}

export async function getCategoryById(id) {
    const sql = `
        SELECT category_id, name
        FROM categories
        WHERE category_id = $1;
    `;
    const result = await db.query(sql, [id]);
    return result.rows[0];
}

// 2️⃣ Get all categories for a given project
export async function getCategoriesForProject(projectId) {
    const sql = `
        SELECT c.category_id, c.name
        FROM categories c
        JOIN project_categories pc
            ON c.category_id = pc.category_id
        WHERE pc.project_id = $1
        ORDER BY c.name;
    `;
    const result = await db.query(sql, [projectId]);
    return result.rows;
}

// 3️⃣ Get all projects for a given category
export async function getProjectsForCategory(categoryId) {
    const sql = `
        SELECT 
            p.project_id,
            p.title,
            p.date,
            p.location,
            o.name AS organization_name
        FROM projects p
        JOIN project_categories pc
            ON p.project_id = pc.project_id
        JOIN organizations o
            ON p.organization_id = o.organization_id
        WHERE pc.category_id = $1
        ORDER BY p.date;
    `;
    const result = await db.query(sql, [categoryId]);
    return result.rows;
}