'use client';

import { useState, useEffect } from 'react';
import { FiEdit2 } from 'react-icons/fi'; // Icon-Bibliothek für den Stift
import { useAuth } from '../../context/AuthContext'; // Authentifizierungskontext
import Header from '../components/Header';

export default function Settings() {
    const { user, logout } = useAuth(); // Benutzerinformationen aus AuthContext
    const [settings, setSettings] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        isPublic: false,
    });

    const [editMode, setEditMode] = useState({
        email: false,
        password: false,
        isPublic: false,
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`/api/settings/getUserInfos`, {
                    method: 'GET',
                    headers: {
                        Authorization: user?.email,
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    setSettings({
                        email: data.email || '',
                        password: '',
                        confirmPassword: '',
                        isPublic: data.öffentlich || false,
                    });
                } else {
                    console.error('Fehler beim Abrufen der Benutzerdaten:', data.error);
                }
            } catch (error) {
                console.error('Fehler beim Laden der Benutzerdaten:', error);
            }
        };

        if (user?.email) fetchUserData();
    }, [user]);

    const toggleEditMode = (field) => {
        setEditMode({
            ...editMode,
            [field]: !editMode[field],
        });
    };

    const handleSave = async (e) => {
        e.preventDefault();

        // Passwort validieren
        if (settings.password && settings.password !== settings.confirmPassword) {
            alert('Passwörter stimmen nicht überein.');
            return;
        }

        try {
            // E-Mail aktualisieren
            if (editMode.email) {
                const response = await fetch('/api/settings/updateEmail', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: user.email, newEmail: settings.email }),
                });
                const data = await response.json();
                if (!response.ok) throw new Error(data.error);
            }

            // Passwort aktualisieren
            if (editMode.password) {
                const response = await fetch('/api/settings/updatePassword', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: user.email,
                        oldPassword: settings.password,
                        newPassword: settings.password,
                    }),
                });
                const data = await response.json();
                if (!response.ok) throw new Error(data.error);
            }

            // Öffentlich-Status aktualisieren
            if (editMode.isPublic) {
                const response = await fetch('/api/settings/updateVisibility', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: user.email, isPublic: settings.isPublic }),
                });
                const data = await response.json();
                if (!response.ok) throw new Error(data.error);
            }

            alert('Einstellungen erfolgreich gespeichert!');
            setEditMode({ email: false, password: false, isPublic: false });
        } catch (error) {
            console.error('Fehler beim Speichern:', error);
            alert(`Fehler beim Speichern: ${error.message}`);
        }
    };

    const handleDeleteAccount = async () => {
        const confirmed = window.confirm(
            'Möchten Sie Ihr Konto wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.'
        );
        if (!confirmed) return;

        try {
            const response = await fetch('/api/settings/deleteProfile', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: user.email }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error);
            }

            alert('Ihr Konto wurde erfolgreich gelöscht.');
            logout(); // Benutzer ausloggen
        } catch (error) {
            console.error('Fehler beim Löschen des Kontos:', error);
            alert('Fehler beim Löschen des Kontos. Bitte versuchen Sie es später erneut.');
        }
    };

    return (
        <div>
            <Header />
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#F0F7EC] py-12">
                <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-md border border-gray-200">
                    <h1 className="text-4xl font-bold text-gray-800 mb-6">Einstellungen</h1>
                    <form onSubmit={handleSave} className="space-y-6">
                        {/* E-Mail-Adresse */}
                        <div>
                            <div className="flex items-center justify-between">
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                                    E-Mail-Adresse
                                </label>
                                <button
                                    type="button"
                                    onClick={() => toggleEditMode('email')}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <FiEdit2 />
                                </button>
                            </div>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={settings.email}
                                onChange={(e) =>
                                    setSettings({ ...settings, email: e.target.value })
                                }
                                disabled={!editMode.email}
                                className={`w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring ${
                                    editMode.email ? 'focus:ring-[#A9D09A]' : 'bg-gray-100 cursor-not-allowed'
                                }`}
                            />
                        </div>

                        {/* Passwort ändern */}
                        <div>
                            <div className="flex items-center justify-between">
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                                    Neues Passwort
                                </label>
                                <button
                                    type="button"
                                    onClick={() => toggleEditMode('password')}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <FiEdit2 />
                                </button>
                            </div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={settings.password}
                                onChange={(e) =>
                                    setSettings({ ...settings, password: e.target.value })
                                }
                                disabled={!editMode.password}
                                className={`w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring ${
                                    editMode.password ? 'focus:ring-[#A9D09A]' : 'bg-gray-100 cursor-not-allowed'
                                }`}
                            />
                            {editMode.password && (
                                <div>
                                    <label
                                        className="block text-gray-700 font-bold mb-2"
                                        htmlFor="confirmPassword"
                                    >
                                        Passwort bestätigen
                                    </label>
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        value={settings.confirmPassword}
                                        onChange={(e) =>
                                            setSettings({ ...settings, confirmPassword: e.target.value })
                                        }
                                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-[#A9D09A]"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Öffentliches Profil */}
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="isPublic" className="block text-gray-700 font-bold">
                                    Öffentliches Profil
                                </label>
                                <button
                                    type="button"
                                    onClick={() => toggleEditMode('isPublic')}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <FiEdit2 />
                                </button>
                            </div>
                            <input
                                id="isPublic"
                                name="isPublic"
                                type="checkbox"
                                checked={settings.isPublic}
                                onChange={(e) =>
                                    setSettings({ ...settings, isPublic: e.target.checked })
                                }
                                disabled={!editMode.isPublic}
                                className="h-5 w-5 text-[#A9D09A] focus:ring-[#A9D09A] border-gray-300"
                            />
                        </div>

                        {/* Konto löschen */}
                        <div>
                            <button
                                type="button"
                                onClick={handleDeleteAccount}
                                className="w-full bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded font-bold"
                            >
                                Konto löschen
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#A9D09A] text-white py-3 px-4 rounded hover:bg-[#90B883] font-bold"
                        >
                            Änderungen speichern
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
