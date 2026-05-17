import db from "./db.js";

export async function getAllCategories() {
    const sql = "SELECT * FROM categories ORDER BY name;";
    return db.query(sql);
}