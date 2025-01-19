import postgres from 'postgres';

// Verbindung zur Datenbank
const sql = postgres({
    host: 'aws-0-eu-central-1.pooler.supabase.com',
    port: 6543,
    database: 'postgres',
    username: 'postgres.krgdanoctggnvlkyseyc',
    password: 'Consumerlessm1!',
});
export async function POST(req) {
    try {
        const { datum, uhrzeit, titel, beschreibung, ort, autor } = await req.json();
        console.log('Empfangene Daten vom Frontend:', { datum, uhrzeit, titel, beschreibung, ort, autor });

        // Validierung der Eingabewerte
        if (!datum || !uhrzeit || !titel || !beschreibung || !ort || !autor) {
            throw new Error('Ein oder mehrere Felder sind leer oder nicht definiert.');
        }

        // Zeitformat validieren (Regex für HH:MM:SS+TZ)
        const timeRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)([+-][0-1]\d:[0-5]\d|Z)?$/;
        if (!timeRegex.test(uhrzeit)) {
            throw new Error('Die Uhrzeit ist nicht im korrekten Format (HH:MM:SS+TZ).');
        }

        // Einfügen der Daten in die Datenbank
        const [newEvent] = await sql`
            INSERT INTO "Veranstaltungen" (datum, uhrzeit, titel, beschreibung, ort, autor)
            VALUES (${datum}, ${uhrzeit}, ${titel}, ${beschreibung}, ${ort}, ${autor})
            RETURNING id, datum, uhrzeit, titel AS title, beschreibung AS description, ort AS location, autor
        `;

        return new Response(
            JSON.stringify({
                message: 'Veranstaltung erfolgreich hinzugefügt',
                event: newEvent,
            }),
            { status: 201, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error('Fehler beim Hinzufügen der Veranstaltung:', error.message);
        return new Response(
            JSON.stringify({ message: 'Fehler beim Hinzufügen der Veranstaltung', error: error.message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
