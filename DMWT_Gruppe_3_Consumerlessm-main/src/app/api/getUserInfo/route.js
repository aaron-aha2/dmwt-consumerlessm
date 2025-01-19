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
        const url = new URL(req.url);
        const email = url.searchParams.get('email');

        if (!email) {
            return new Response(JSON.stringify({ error: 'Email ist erforderlich' }), { status: 400 });
        }

        const user = await sql`
            SELECT nutzername FROM "LoginDaten" WHERE email = ${email}
        `;

        if (user.length === 0) {
            return new Response(JSON.stringify({ error: 'Benutzer nicht gefunden' }), { status: 404 });
        }

        return new Response(JSON.stringify({ nutzername: user[0].nutzername }), { status: 200 });
    } catch (error) {
        console.error('Fehler beim Abrufen des Benutzers:', error);
        return new Response(
            JSON.stringify({ error: 'Fehler beim Abrufen des Benutzers', detail: error.message }),
            { status: 500 }
        );
    }
}
