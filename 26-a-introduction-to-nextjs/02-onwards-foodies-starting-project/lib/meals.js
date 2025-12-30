import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";
import { redirect } from "next/navigation";
import { put } from "@vercel/blob";

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

export async function saveMeal(meal) {
    meal.slug = slugify(meal.title, { lower: true });
    meal.instructions = xss(meal.instructions);

    const extension = meal.image.name.split(".").pop();
    const fileName = `${meal.slug}.${extension}`;

    await put(`meals/${fileName}`, meal.image, {
        access: "public", // Делаем публичным
        token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    meal.image = `${fileName}`;
    db.prepare(
        `
        INSERT INTO meals
            (title, summary, instructions, creator,creator_email, image, slug)
        VALUES (
            @title,
            @summary,
            @instructions,
            @creator,
            @creator_email,
            @image,
            @slug
        )
    `,
    ).run(meal);
}
