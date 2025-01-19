import postgres from 'postgres';

// Datenbankverbindung herstellen
const sql = postgres({
    host: 'aws-0-eu-central-1.pooler.supabase.com',
    port: 6543,
    database: 'postgres',
    username: 'postgres.krgdanoctggnvlkyseyc',
    password: 'Consumerlessm1!',
});

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const email = searchParams.get('email'); // Abruf der E-Mail aus der Query

        if (!email) {
            return new Response(JSON.stringify({ error: 'E-Mail ist erforderlich' }), { status: 400 });
        }

        // Datenbankabfrage, um den Benutzer mit der angegebenen E-Mail zu finden
        const user = await sql`
            SELECT nutzername, email, öffentlich
            FROM "LoginDaten"
            WHERE email = ${email}
        `;

        if (user.length === 0) {
            return new Response(
                JSON.stringify({ error: 'Benutzer nicht gefunden' }),
                { status: 404 }
            );
        }

        // Benutzerinformationen zurückgeben
        return new Response(
            JSON.stringify({
                name: user[0].nutzername,
                email: user[0].email,
                isPublic: user[0].öffentlich,
            }),
            { status: 200 }
        );
    } catch (error) {
        console.error('Fehler beim Abrufen der Benutzerdaten:', error.message);
        return new Response(
            JSON.stringify({ error: 'Serverfehler', details: error.message }),
            { status: 500 }
        );
    }
}
