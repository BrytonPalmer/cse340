import db from "./db.js";
import pool from './db.js';

// 1️⃣ Get all categories
export async function getAllCategories() {
    const sql = "SELECT * FROM categories ORDER BY name;";
    return db.query(sql);
}

// 2️⃣ Get a single category by ID
export async function getCategoryById(id) {
    const sql = `
        SELECT category_id, name
        FROM categories
        WHERE category_id = $1;
    `;
    const result = await db.query(sql, [id]);
    return result.rows[0];
}

// 3️⃣ Get all categories assigned to a specific project
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

// 4️⃣ Get all projects for a specific category
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

/* ---------------------------------------------------------
   NEW FUNCTIONS FOR ASSIGNING CATEGORIES TO PROJECTS
--------------------------------------------------------- */

// 5️⃣ Internal helper — assign ONE category to ONE project
// (Not exported)
const assignCategoryToProject = async (projectId, categoryId) => {
    const sql = `
        INSERT INTO project_categories (project_id, category_id)
        VALUES ($1, $2)
    `;
    await db.query(sql, [projectId, categoryId]);
};

// 6️⃣ Update all category assignments for a project
export async function updateCategoryAssignments(projectId, categoryIds) {
    // If no categories selected, treat as empty array
    if (!categoryIds) {
        categoryIds = [];
    }

    // If only one checkbox was selected, Express sends a string
    if (!Array.isArray(categoryIds)) {
        categoryIds = [categoryIds];
    }

    // Remove all existing category assignments
    const deleteSql = `
        DELETE FROM project_categories
        WHERE project_id = $1
    `;
    await db.query(deleteSql, [projectId]);

    // Add new assignments
    for (const categoryId of categoryIds) {
        await assignCategoryToProject(projectId, categoryId);
    }
}

/* ---------------------------------------------------------
   EXPORTS
--------------------------------------------------------- */

