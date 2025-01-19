import postgres from 'postgres';

const sql = postgres({
    host: 'aws-0-eu-central-1.pooler.supabase.com',
    port: 6543,
    database: 'postgres',
    username: 'postgres.krgdanoctggnvlkyseyc',
    password: 'Consumerlessm1!',
});

export async function POST(req) {
    try {
        const { nutzername, email, passwort } = await req.json(); //Extrahiert die Anfrage-Daten aus dem Anfragekörper
        console.log('Daten empfangen:', { nutzername, email, passwort });

        if (!nutzername || !email || !passwort) {
            return new Response(
                JSON.stringify({ message: 'Alle Felder sind erforderlich.' }),
                { status: 400 }
            );
        }

        //Neuen Benutzer in die Datenbank einfügen
        await sql`
            INSERT INTO "LoginDaten" (nutzername, email, passwort, created_at)
            VALUES (${nutzername}, ${email}, ${passwort}, NOW())
        `;

        return new Response(
            JSON.stringify({ message: 'Benutzer erfolgreich registriert.' }),
            { status: 201 }
        );
    } catch (error) {
        //Fehlerbehandlung
        console.error('Fehler bei der Registrierung:', error);
        return new Response(
            JSON.stringify({ message: 'Fehler bei der Registrierung.', error: error.message }),
            { status: 500 }
        );
    }
}

export async function GET(req) {
    try {
        //Abrufen aller Benutzer aus der Datenbank
        const users = await sql`
            SELECT id, nutzername, email, created_at
            FROM "LoginDaten"
            ORDER BY id DESC
        `;

        return new Response(
            JSON.stringify({ users }),
            { status: 200 }
        );
    } catch (error) {
        console.error('Fehler beim Abrufen der Benutzer:', error);
        return new Response(
            JSON.stringify({ message: 'Fehler beim Abrufen der Benutzer.', error: error.message }),
            { status: 500 }
        );
    }
}

export async function OPTIONS(req) {
    return new Response(
        JSON.stringify({ message: `Methode ${req.method} nicht erlaubt` }),
        {
            status: 405,
            headers: { Allow: 'GET, POST' },
        }
    );
}
