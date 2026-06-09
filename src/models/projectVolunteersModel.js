import db from '../db/index.js'

async function addVolunteer(userId, projectId) {
    const result = await db.query(
        `INSERT INTO project_volunteers (user_id, project_id)
         VALUES ($1, $2)
         ON CONFLICT (user_id, project_id) DO NOTHING
         RETURNING *`,
        [userId, projectId]
    )
    return result.rows[0]
}

async function removeVolunteer(userId, projectId) {
    await db.query(
        `DELETE FROM project_volunteers
         WHERE user_id = $1 AND project_id = $2`,
        [userId, projectId]
    )
}

async function isUserVolunteeringForProject(userId, projectId) {
    const result = await db.query(
        `SELECT 1
         FROM project_volunteers
         WHERE user_id = $1 AND project_id = $2`,
        [userId, projectId]
    )
    return result.rowCount > 0
}

async function getUserVolunteerProjects(userId) {
    const result = await db.query(
        `SELECT p.*
         FROM projects p
         JOIN project_volunteers pv ON pv.project_id = p.project_id
         WHERE pv.user_id = $1
         ORDER BY p.project_id`,
        [userId]
    )
    return result.rows
}

export {
    addVolunteer,
    removeVolunteer,
    isUserVolunteeringForProject,
    getUserVolunteerProjects
}