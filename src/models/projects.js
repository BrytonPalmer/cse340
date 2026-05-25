import db from "./db.js";
import pool from './db.js';


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

const getProjectsByOrganizationId = async (organizationId) => {
    const query = `
        SELECT
          project_id,
          organization_id,
          title,
          description,
          location,
          date
        FROM projects
        WHERE organization_id = $1
        ORDER BY date;
    `;
    
    const queryParams = [organizationId];
    const result = await db.query(query, queryParams);

    return result.rows;
};

export async function getUpcomingProjects(limit) {
    const sql = `
        SELECT 
            p.project_id,
            p.title,
            p.description,
            p.date,
            p.location,
            p.organization_id,
            o.name AS organization_name
        FROM projects p
        JOIN organizations o
            ON p.organization_id = o.organization_id
        WHERE p.date >= CURRENT_DATE
        ORDER BY p.date ASC
        LIMIT $1;
    `;

    const result = await db.query(sql, [limit]);
    return result.rows;
}

export async function getProjectDetails(id) {
    const sql = `
        SELECT 
            p.project_id,
            p.title,
            p.description,
            p.date,
            p.location,
            p.organization_id,
            o.name AS organization_name
        FROM projects p
        JOIN organizations o
            ON p.organization_id = o.organization_id
        WHERE p.project_id = $1;
    `;

    const result = await db.query(sql, [id]);
    return result.rows[0];
}

const createProject = async (title, description, location, date, organizationId) => {
    const query = `
        INSERT INTO projects (title, description, location, date, organization_id)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING project_id
    `;
    const result = await pool.query(query, [
        title,
        description,
        location,
        date,
        organizationId
    ]);
    return result.rows[0].project_id;
};


export { 
    getProjectsByOrganizationId, createProject
};