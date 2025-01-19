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
        const { username, password } = await req.json(); //Daten aus der Anfrage entpacken

        if (!username || !password) { //Eingabefelder prüfen
            return new Response(
                JSON.stringify({ message: 'Alle Felder sind erforderlich.' }),
                { status: 400 }
            );
        }

        //Nutzer mit Nutzername oder Email suchen
        const user = await sql`
            SELECT * FROM "LoginDaten"
            WHERE nutzername = ${username} OR email = ${username}
        `;

        if (user.length === 0) {
            return new Response(
                JSON.stringify({ message: 'Benutzer nicht gefunden.' }),
                { status: 404 }
            );
        }

        //Passwort prüfen
        const isPasswordValid = password === user[0].passwort;
        if (!isPasswordValid) {
            return new Response(
                JSON.stringify({ message: 'Ungültiges Passwort.' }),
                { status: 401 }
            );
        }

        //Benutzer-Daten zurückgeben (ohne Passwort)
        const { nutzername, email } = user[0];
        return new Response(
            JSON.stringify({
                message: 'Login erfolgreich.',
                user: { nutzername, email }, //Rückgabe Daten
            }),
            { status: 200 }
        );
    } catch (error) {
        console.error('Fehler beim Login:', error);
        return new Response(
            JSON.stringify({ message: 'Serverfehler.', error: error.message }),
            { status: 500 }
        );
    }
}
