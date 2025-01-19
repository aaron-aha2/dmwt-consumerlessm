import sql from './db.js'

async function getUsersOver(name) {
    const users = await sql`
        select *
        from "Kommentare"
        where name = ${name}
    `
    return users
}

getUsersOver("Anni").then((users) => {
    console.log("Ergebnisse:", users);
});