import postgres from 'postgres';

// Verbindung zur Datenbank
const sql = postgres({
    host: 'aws-0-eu-central-1.pooler.supabase.com',
    port: 6543,
    database: 'postgres',
    username: 'postgres.krgdanoctggnvlkyseyc',
    password: 'Consumerlessm1!',
});

// POST-Methode: Kommentar hinzufügen
export async function POST(req) {
    try {
        // Parse die Anfrage-Daten
        const { name, content } = await req.json();
        console.log('Daten empfangen:', { name, content }); // Prüfen, ob die Daten richtig empfangen wurden

        // Füge den Kommentar in die Datenbank ein
        await sql`
            INSERT INTO "Kommentare" (name, kommentar)
            VALUES (${name}, ${content})
        `;

        return new Response(
            JSON.stringify({ message: 'Kommentar erfolgreich gespeichert' }),
            { status: 201 }
        );
    } catch (error) {
        // Fehlerprotokollierung
        console.error('Fehler beim Speichern des Kommentars:', error);
        return new Response(
            JSON.stringify({ message: 'Fehler beim Speichern des Kommentars', error: error.message }),
            { status: 500 }
        );
    }
}

// GET-Methode: Alle Kommentare abrufen
export async function GET(req) {
    try {
        // Abrufen aller Kommentare aus der Datenbank
        const comments = await sql`
            SELECT name, kommentar AS content
            FROM "Kommentare"
            ORDER BY id DESC
        `;

        return new Response(
            JSON.stringify({ comments }),
            { status: 200 }
        );
    } catch (error) {
        // Fehlerprotokollierung
        console.error('Fehler beim Abrufen der Kommentare:', error);
        return new Response(
            JSON.stringify({ message: 'Fehler beim Abrufen der Kommentare', error: error.message }),
            { status: 500 }
        );
    }
}

// Fehlerbehandlung für nicht unterstützte HTTP-Methoden (405)
export async function OPTIONS(req) {
    return new Response(
        JSON.stringify({ message: `Methode ${req.method} nicht erlaubt` }),
        {
            status: 405,
            headers: { Allow: 'GET, POST' },
        }
    );
}