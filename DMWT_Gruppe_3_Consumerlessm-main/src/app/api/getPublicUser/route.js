import postgres from 'postgres';

const sql = postgres({
    host: 'aws-0-eu-central-1.pooler.supabase.com',
    port: 6543,
    database: 'postgres',
    username: 'postgres.krgdanoctggnvlkyseyc',
    password: 'Consumerlessm1!',
});

export async function GET(req) {
    try {
        // Abrufen aller öffentlichen Benutzer aus der Datenbank
        const publicUsers = await sql`
            SELECT id, nutzername, email FROM "LoginDaten" WHERE öffentlich = TRUE
        `;

        if (publicUsers.length === 0) {
            return new Response(JSON.stringify({ error: 'Keine öffentlichen Benutzer gefunden' }), { status: 404 });
        }

        return new Response(JSON.stringify({ users: publicUsers }), { status: 200 });
    } catch (error) {
        console.error('Fehler beim Abrufen der öffentlichen Benutzer:', error);
        return new Response(
            JSON.stringify({ error: 'Fehler beim Abrufen der öffentlichen Benutzer', detail: error.message }),
            { status: 500 }
        );
    }
}
