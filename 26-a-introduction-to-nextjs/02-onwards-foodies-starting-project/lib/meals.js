import sql from "better-sqlite3";

const db = sql("meals.db");

//обращение к базе данных для получения всех блюд из БД
export async function getMeals() {
    await new Promise(resolve => setTimeout(resolve, 2000));
    // throw new Error("Loading meals failed.");
    return db.prepare("SELECT * FROM meals").all();
}

export function getMeal(slug) {
    return db.prepare(`SELECT * FROM meals WHERE slug = ?`).get(slug);
}
