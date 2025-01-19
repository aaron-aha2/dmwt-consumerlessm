'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

function CommentForm() {
    const [name, setName] = useState(''); //Name des Nutzers
    const [content, setContent] = useState(''); //Erfolgstext
    const [message, setMessage] = useState(''); //Erfolg/Fehler-Nachricht
    const [comments, setComments] = useState([]); //Liste der Erfolge (intern)

    //Erfolge laden
    const fetchComments = async () => {
        try {
            const response = await axios.get('/api/comments');
            setComments(response.data.comments); //Erfolge speichern
        } catch (error) {
            console.error('Fehler beim Laden der Erfolge:', error);
        }
    };

    //Erfolge beim ersten Laden abrufen
    useEffect(() => {
        fetchComments();
    }, []);

    //Formular absenden
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            //Erfolg absenden
            await axios.post('/api/comments', {
                name: name,
                content: content,
            });

            setMessage('Erfolg erfolgreich geteilt!');
            setName('');
            setContent('');

            //Erfolge erneut abrufen
            fetchComments();
        } catch (error) {
            setMessage('Fehler beim Teilen des Erfolgs.');
            console.error('Fehler:', error);
        }
    };

    return (
        <div className="bg-[#F0F7EC] min-h-screen">
            {/* Header */}
            <Header/>

            {/* Erfolg teilen Formular */}
            <div className="flex flex-col items-center pt-24">
                <div className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-lg">
                    {/* Überschrift */}
                    <h2 className="text-[5rem] font-trash-hand text-black text-center mb-5">
                        Kleine Erfolge teilen
                    </h2>
                    <p className="mb-10">Erzähle uns von deinem Weg zu weniger Konsum und inspiriere andere. Gib deinen Namen ein und schreibe, was du erreicht hast oder was dich motiviert. Erfahre außerdem, wie Personen durch Consumerlessm ihren Konsum reduziert haben. Gemeinsam schaffen wir Veränderung!</p>

                    {/* Formular */}
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Name */}
                        <div>
                            <label className="block text-xl font-anonymous-pro text-gray-700 mb-3">
                                Dein Name:
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full px-4 py-3 bg-[#A9D09A] text-gray-800 rounded focus:outline-none focus:ring focus:ring-[#90B883] shadow"
                            />
                        </div>

                        {/* Erfolg */}
                        <div>
                            <label className="block text-xl font-anonymous-pro text-gray-700 mb-3">
                                Auf welchen Erfolg bist du stolz?
                            </label>
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                                rows="6"
                                className="w-full px-4 py-3 bg-[#A9D09A] text-gray-800 rounded focus:outline-none focus:ring focus:ring-[#90B883] shadow"
                            />
                        </div>

                        {/* Absenden-Button */}
                        <button
                            type="submit"
                            className="w-full bg-[#A9D09A] hover:bg-[#90B883] text-gray-800 py-3 rounded-lg text-xl font-bold shadow-lg"
                        >
                            Erfolg teilen
                        </button>
                    </form>

                    {/* Nachricht */}
                    {message && (
                        <p className="text-center text-lg font-anonymous-pro text-gray-700 mt-6">
                            {message}
                        </p>
                    )}
                </div>

                {/* Erfolge anzeigen */}
                <div className="max-w-3xl w-full mt-12">
                    <h3 className="text-3xl font-anonymous-pro text-gray-800 mb-6">
                        Geteilte Erfolge:
                    </h3>

                    {/* Erfolgsliste */}
                    {comments.length > 0 ? (
                        <ul className="space-y-6 mb-6">
                            {comments.map((comment, index) => (
                                <li
                                    key={index}
                                    className="bg-white p-6 rounded-lg shadow flex flex-col"
                                >
                                    <p className="font-bold text-lg text-gray-900 mb-2">
                                        {comment.name}
                                    </p>
                                    <p className="text-gray-700">{comment.content}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-700">Noch keine Erfolge geteilt.</p>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default CommentForm;
