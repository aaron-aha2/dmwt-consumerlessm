import postgres from 'postgres';

const sql = postgres({
    host: 'aws-0-eu-central-1.pooler.supabase.com',
    port: 6543,
    database: 'postgres',
    username: 'postgres.krgdanoctggnvlkyseyc',
    password: 'Consumerlessm1!',
});

// GET-Methode: Veranstaltungen abrufen
export async function GET(req) {
    try {
        const events = await sql`
            SELECT 
                id, 
                datum, 
                uhrzeit, 
                titel AS titel, 
                beschreibung AS beschreibung, 
                ort AS ort, 
                autor AS autor
            FROM "Veranstaltungen"
            ORDER BY datum ASC, uhrzeit ASC
        `;
        return new Response(JSON.stringify({ events }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Fehler beim Abrufen der Veranstaltungen:', error.message);
        return new Response(
            JSON.stringify({ message: 'Fehler beim Abrufen der Veranstaltungen', error: error.message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
