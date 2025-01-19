'use client';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Header from "../components/Header";

export default function LoginPage() {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const { login } = useAuth(); 
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); //verhindert Standardformular-Submit
    
        const { username, password } = formData; // Entpacke `formData`
    
        // Überprüfen, ob Felder leer sind
        if (!username || !password) {
            alert('Bitte alle Felder ausfüllen.');
            return;
        }
    
        try {
            // API-Request
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }), // Sende NUR Strings/JSON
            });
    
            const data = await response.json(); // Antwort parsen
    
            if (response.ok) {
                login(data); // Daten an AuthContext übergeben
                alert('Login erfolgreich!');
                window.location.href = '/Dashboard'; // Weiterleitung
            } else {
                alert(data.message || 'Login fehlgeschlagen.');
            }
        } catch (error) {
            console.error('Fehler beim Login:', error);
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
                        width: "400px",
                        height: "600px",
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        paddingTop: "120px",
                    }}
                >
                    <h1 className="text-5xl font-trash-hand text-black mb-6">Einloggen</h1>
                    <form
                        onSubmit={handleSubmit}
                        className="px-6 pt-4 pb-6"
                        style={{
                            width: "70%",
                            height: "60%",
                        }}
                    >
                        <div className="mb-4 w-full">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="username"
                            >
                                E-Mail-Adresse / Nutzername
                            </label>
                            <input
                                id="username"
                                type="text"
                                placeholder="E-Mail-Adresse / Nutzername"
                                value={formData.username}
                                onChange={handleChange}
                                className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-green-500"
                            />
                        </div>

                        <div className="mb-6 w-full">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="password"
                            >
                                Passwort
                            </label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Passwort"
                                value={formData.password}
                                onChange={handleChange}
                                className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-green-500"
                            />
                        </div>

                        <div className="flex items-center justify-between w-full">
                            <button
                                type="submit"
                                className="bg-[#A9D09A] hover:bg-[#90B883] text-black font py-2 px-4 rounded focus:outline-none"
                            >
                                Einloggen
                            </button>
                        </div>
                    </form>

                    <div className="mt-4">
                        <p className="text-sm text-gray-600">
                            Noch keinen Account?{' '}
                            <button
                                className="text-[#A9D09A] hover:underline font-bold"
                                onClick={() => window.location.href = '/Register'}
                            >
                                Registrieren
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
