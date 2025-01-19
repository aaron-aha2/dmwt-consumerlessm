'use client';
import { useState } from 'react';
import Header from "../components/Header";

export default function Registrierung() {
    const [formData, setFormData] = useState({
        nutzername: '',
        email: '',
        passwort: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { nutzername, email, passwort, confirmPassword } = formData;

        if (passwort !== confirmPassword) {
            alert('Passwörter stimmen nicht überein.');
            return;
        }

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nutzername, email, passwort }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Registrierung erfolgreich!');
                window.location.href = '/Login'; // Weiterleitung zur Login-Seite
            } else {
                alert(data.error || 'Fehler bei der Registrierung.');
            }
        } catch (err) {
            console.error('Fehler bei der Registrierung:', err);
            alert('Serverfehler. Bitte später erneut versuchen.');
        }
    };

    return (
        <div>
            <Header />
            <div className="flex flex-col items-center justify-center min-h-screen p-6">
                <div
                    className="relative bg-cover bg-center"
                    style={{
                        backgroundImage: "url('/Rahmen.svg')",
                        width: '400px',
                        height: '650px',
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        paddingTop: '100px',
                    }}
                >
                    <h1 className="text-5xl font-trash-hand text-black mb-6 text-center">Registrieren</h1>
                    <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nutzername">
                                Nutzername
                            </label>
                            <input
                                id="nutzername"
                                type="text"
                                placeholder="Nutzername"
                                value={formData.nutzername}
                                onChange={handleChange}
                                className="appearance-none border border-gray-300 rounded w-full max-w-[300px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-green-500"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                E-Mail-Adresse
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="E-Mail-Adresse"
                                value={formData.email}
                                onChange={handleChange}
                                className="appearance-none border border-gray-300 rounded w-full max-w-[300px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-green-500"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="passwort">
                                Passwort
                            </label>
                            <input
                                id="passwort"
                                type="password"
                                placeholder="Passwort"
                                value={formData.passwort}
                                onChange={handleChange}
                                className="appearance-none border border-gray-300 rounded w-full max-w-[300px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-green-500"
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                                Passwort bestätigen
                            </label>
                            <input
                                id="confirmPassword"
                                type="password"
                                placeholder="Passwort bestätigen"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="appearance-none border border-gray-300 rounded w-full max-w-[300px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-green-500"
                            />
                        </div>

                        <button
                            type="submit"
                            className="bg-[#A9D09A] hover:bg-[#90B883] text-white font-bold py-2 px-6 rounded focus:outline-none"
                        >
                            Registrieren
                        </button>
                    </form>

                    <div className="mt-4">
                        <p className="text-sm text-gray-600">
                            Bereits einen Account?{' '}
                            <button
                                className="text-[#A9D09A] hover:underline font-bold"
                                onClick={() => (window.location.href = '/Login')}
                            >
                                Einloggen
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
