import db from "./db.js";

export async function getAllProjects() {
    const sql = `
        SELECT 
            p.project_id,
            p.title,
            p.description,
            p.location,
            p.date,
            o.name AS organization_name
        FROM projects p
        JOIN organizations o
        ON p.organization_id = o.organization_id
        ORDER BY p.date;
    `;
    return db.query(sql);
}