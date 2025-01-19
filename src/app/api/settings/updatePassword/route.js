import postgres from 'postgres';

const sql = postgres({
    host: 'aws-0-eu-central-1.pooler.supabase.com',
    port: 6543,
    database: 'postgres',
    username: 'postgres.krgdanoctggnvlkyseyc',
    password: 'Consumerlessm1!',
});
export async function PUT(req) {
    try {
        const { email, oldPassword, newPassword } = await req.json();

        if (!email || !oldPassword || !newPassword) {
            return new Response(JSON.stringify({ error: 'Alle Felder sind erforderlich' }), { status: 400 });
        }

        const user = await sql`
            SELECT * FROM "LoginDaten" WHERE email = ${email} AND passwort = ${oldPassword}
        `;
        if (!user.length) {
            return new Response(JSON.stringify({ error: 'Altes Passwort ist falsch' }), { status: 401 });
        }

        await sql`
            UPDATE "LoginDaten"
            SET passwort = ${newPassword}
            WHERE email = ${email}
        `;

        return new Response(JSON.stringify({ message: 'Passwort erfolgreich geändert' }), { status: 200 });
    } catch (error) {
        console.error('Fehler:', error);
        return new Response(JSON.stringify({ error: 'Serverfehler' }), { status: 500 });
    }
}