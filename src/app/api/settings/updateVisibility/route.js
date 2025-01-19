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
        const { email, isPublic } = await req.json();

        if (!email) {
            return new Response(JSON.stringify({ error: 'E-Mail erforderlich' }), { status: 400 });
        }

        await sql`
            UPDATE "LoginDaten"
            SET öffentlich = ${isPublic}
            WHERE email = ${email}
        `;

        return new Response(JSON.stringify({ message: 'Status erfolgreich geändert' }), { status: 200 });
    } catch (error) {
        console.error('Fehler beim Ändern des Status:', error);
        return new Response(JSON.stringify({ error: 'Serverfehler' }), { status: 500 });
    }
}
