'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext'; // AuthContext verwenden
import Header from '../components/Header';

export default function Profile() {
    const { user } = useAuth(); // Aktuell angemeldeter Benutzer
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        isPublic: false,
    });
    const fetchUserData = async () => {
        if (!user || !user.email) {
            console.warn('Kein Benutzer angemeldet');
            return;
        }
    
        try {
            const response = await fetch(`/api/profile?email=${encodeURIComponent(user.email)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`, // Falls Authentifizierung benötigt wird
                },
            });
    
            if (!response.ok) {
                throw new Error('Fehler beim Abrufen der Benutzerdaten');
            }
    
            const data = await response.json();
            setUserData({
                name: data.name || 'Nutzer',
                email: data.email || 'Nicht verfügbar',
                isPublic: data.isPublic || false,
            });
        } catch (error) {
            console.error('Fehler beim Abrufen der Benutzerdaten:', error);
        }
    };
    

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (!user || !user.email) {
                    console.warn('Kein Benutzer angemeldet');
                    return;
                }

                const response = await fetch(`/api/profile?email=${user.email}`);
                const data = await response.json();

                if (response.ok) {
                    setUserData({
                        name: data.name || 'Nutzer',
                        email: data.email || 'Nicht verfügbar',
                        isPublic: data.isPublic || false,
                    });
                } else {
                    console.error('Fehler beim Abrufen der Benutzerdaten:', data.error);
                }
            } catch (error) {
                console.error('Fehler beim Abrufen der Benutzerdaten:', error);
            }
        };

        fetchUserData();
    }, [user]);

    return (
        <div>
            <Header />
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#F0F7EC]">
            <h1 className="text-[8rem] font-trash-hand text-black text-center mb-6">
                    DEIN PROFIL
                </h1>

                <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-md">
                    {/* Profilkopf */}
                    <div className="flex items-center space-x-6">
                        <img
                            src="/profile.png"
                            alt="Profilbild"
                            className="w-24 h-24 rounded-full border border-gray-300"
                        />
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">
                                {userData.name || 'Nutzer'}
                            </h1>
                            <p className="text-gray-600">
                                Willkommen auf deinem Profil!
                            </p>
                        </div>
                    </div>

                    {/* Benutzerinformationen */}
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold text-gray-800">Deine Informationen</h2>
                        <ul className="mt-4 text-gray-600 space-y-2">
                            <li>
                                <strong>E-Mail:</strong> {userData.email}
                            </li>
                            <li>
                                <strong>Profil öffentlich:</strong>{' '}
                                {userData.isPublic ? 'Ja' : 'Nein'}
                            </li>
                        </ul>
                    </div>

                    {/* Aktionen */}
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold text-gray-800">Aktionen</h2>
                        <p className="mt-4 text-gray-600">
                            Möchtest du dein Profil aktualisieren oder weitere Informationen hinzufügen?
                        </p>
                        <button className="mt-4 px-4 py-2 bg-[#A9D09A] text-white font-bold rounded hover:bg-[#a5d393]">
                            Profil bearbeiten
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
