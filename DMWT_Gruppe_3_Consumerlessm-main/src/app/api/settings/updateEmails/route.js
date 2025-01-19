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
        const { email, newEmail } = await req.json();

        if (!email || !newEmail) {
            console.error('Fehlende Eingaben:', { email, newEmail });
            return new Response(JSON.stringify({ error: 'E-Mail erforderlich' }), { status: 400 });
        }

        const result = await sql`
            UPDATE "LoginDaten"
            SET email = ${newEmail}
            WHERE nutzername = ${email}
        `;

        if (result.count === 0) {
            console.error('Benutzer nicht gefunden:', email);
            return new Response(JSON.stringify({ error: 'Benutzer nicht gefunden' }), { status: 404 });
        }

        return new Response(JSON.stringify({ message: 'E-Mail erfolgreich aktualisiert' }), { status: 200 });
    } catch (error) {
        console.error('Serverfehler beim Aktualisieren der E-Mail:', error);
        return new Response(JSON.stringify({ error: 'Serverfehler' }), { status: 500 });
    }
}
