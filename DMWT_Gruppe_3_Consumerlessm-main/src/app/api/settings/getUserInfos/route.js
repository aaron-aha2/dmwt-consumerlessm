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
        const email = req.headers.get('Authorization'); // Email aus Token oder Header
        if (!email) {
            return new Response(JSON.stringify({ error: 'E-Mail erforderlich' }), { status: 400 });
            
        }

        const user = await sql`SELECT email, öffentlich FROM "LoginDaten" WHERE email = ${email}`;
        if (!user.length) {
            return new Response(JSON.stringify({ error: 'Benutzer nicht gefunden' }), { status: 404 });
        }

        return new Response(JSON.stringify(user[0]), { status: 200 });
    } catch (error) {
        console.error('Fehler:', error);
        return new Response(JSON.stringify({ error: 'Serverfehler' }), { status: 500 });
    }
}
