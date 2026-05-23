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

export { getProjectsByOrganizationId }; 