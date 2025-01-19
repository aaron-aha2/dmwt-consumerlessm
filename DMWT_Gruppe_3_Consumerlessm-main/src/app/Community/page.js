'use client';

import { useEffect, useState } from 'react';
import Header from '../components/Header';

export default function Community() {
    const [users, setUsers] = useState([]); //Zustand für öffentliche Benutzer
    const [loading, setLoading] = useState(true); //Zustand für Ladeanzeige

    useEffect(() => {
        // Daten von der API abrufen
        const fetchUsers = async () => {
            try {
                const response = await fetch('/api/getPublicUser');
                const data = await response.json();
                setUsers(data.users || []);
            } catch (error) {
                console.error('Fehler beim Abrufen der Benutzer:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div>
            <Header />
            <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-[#F0F7EC]">
                <img
                    src="/communities.png"
                    alt="Communities"
                    className="w-[8rem] h-[8rem] object-contain mb-4"
                />
              
                <h1
                    className="text-8xl font-trash-hand text-black"
                    style={{
                        display: "inline-block",
                        boxShadow: "0px -5px 0px 0px #000 inset",
                    }}
                >
                    Community
                </h1>

                {loading ? (
                    <p className="text-2xl font-anonymous-pro text-gray-700 mt-8">Lade öffentliche Benutzer:innen...</p>
                ) : users.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mt-24">
                        {users.map((user) => (
                            <div
                                key={user.id}
                                className="p-6 bg-white rounded-lg shadow-lg border border-gray-200 flex flex-col items-center space-y-3"
                            >
                                <h2 className="text-2xl font-bold text-gray-800 font-anonymous-pro">
                                    {user.nutzername}
                                </h2>
                                <p className="text-lg text-gray-600 font-anonymous-pro">{user.email}</p>
                                <a
                                    href={`mailto:${user.email}`}
                                    className="bg-[#A9D09A] hover:bg-[#90B883] text-white font-bold py-2 px-4 rounded"
                                >
                                    Per E-Mail kontaktieren
                                </a>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-2xl font-anonymous-pro text-gray-700 mt-8">Es gibt keine öffentlichen Benutzer:innen.</p>
                )}
            </div>
        </div>
    );
}
