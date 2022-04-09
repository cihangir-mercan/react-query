import db from "./db";

export async function getTexts() {
    return db.table("texts")
        .toCollection()
        .reverse()
        .sortBy("id");
}

export function addText(textToAdd) {
    return db.table("texts")
        .add(textToAdd);
}