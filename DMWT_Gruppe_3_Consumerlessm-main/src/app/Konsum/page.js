'use client';

import { useState } from 'react';
import Header from '../components/Header';
import { Pie, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
} from 'chart.js';

// Chart.js registrieren
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function Konsumtracker() {
    const [answers, setAnswers] = useState({});
    const [showResult, setShowResult] = useState(false);

    const handleAnswerChange = (question, value) => {
        setAnswers({ ...answers, [question]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowResult(true);
    };

    // Daten für das Kreisdiagramm
    const pieChartData = {
        labels: ['Umweltbewusst', 'Praktisch', 'Spontan'],
        datasets: [
            {
                data: [
                    (answers['Frage 1'] === 'Regional' ? 50 : answers['Frage 1'] === 'Praktisch' ? 30 : 20),
                    (answers['Frage 2'] === 'Selten' ? 50 : answers['Frage 2'] === 'Gelegentlich' ? 30 : 20),
                    (answers['Frage 3'] === 'Umweltfreundlich' ? 50 : answers['Frage 3'] === 'Gemischt' ? 30 : 20),
                ],
                backgroundColor: ['#A9D09A', '#F7CCAC', '#FF847C'],
                borderColor: ['#FFFFFF'],
                borderWidth: 1,
            },
        ],
    };

    // Daten für das Balkendiagramm
    const barChartData = {
        labels: ['Lebensmittel', 'Kleidung', 'Mobilität'],
        datasets: [
            {
                label: 'Nachhaltigkeitspunkte',
                data: [
                    answers['Frage 1'] === 'Regional' ? 10 : answers['Frage 1'] === 'Praktisch' ? 5 : 2,
                    answers['Frage 2'] === 'Selten' ? 10 : answers['Frage 2'] === 'Gelegentlich' ? 5 : 2,
                    answers['Frage 3'] === 'Umweltfreundlich' ? 10 : answers['Frage 3'] === 'Gemischt' ? 5 : 2,
                ],
                backgroundColor: ['#A9D09A', '#90B883', '#FF847C'],
                borderColor: ['#7A9D09A', '#6B835C', '#C6695D'],
                borderWidth: 1,
            },
        ],
    };

    // Dynamischer Text basierend auf den Antworten
    const getResultText = () => {
        const scores = {
            Regional: 10,
            Praktisch: 5,
            Spontan: 2,
            Selten: 10,
            Gelegentlich: 5,
            Häufig: 2,
            Umweltfreundlich: 10,
            Gemischt: 5,
            Auto: 2,
        };

        const totalScore =
            scores[answers['Frage 1']] +
            scores[answers['Frage 2']] +
            scores[answers['Frage 3']];

        if (totalScore >= 25) {
            return 'Du bist auf einem großartigen Weg zu einem nachhaltigen Lebensstil! Weiter so!';
        } else if (totalScore >= 15) {
            return 'Du achtest bereits oft auf Nachhaltigkeit, aber es gibt noch Verbesserungspotenzial.';
        } else {
            return 'Es gibt viel Raum für Verbesserungen. Schon kleine Veränderungen können viel bewirken!';
        }
    };

    return (
        <div>
            <Header />
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#F0F7EC] py-12">
                
            <div className="flex flex-col items-center justify-center">
    <img
        src="/analysis.png"
        alt="Analysis Icon"
        className="w-[7rem] h-[7rem] object-contain mt-8"
    />
    <h1 className="text-[6rem] font-trash-hand text-black">Konsumtracker</h1>
    <p className="text-lg font-anonymous-pro text-gray-700 max-w-3xl text-center">
        Finde heraus, wie nachhaltig dein Konsumverhalten ist und entdecke Potenziale für Verbesserungen!
    </p>
</div>

                {!showResult ? (
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white p-8 rounded-lg shadow-md border border-gray-200 w-full max-w-4xl mb-12"
                    >
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Beantworte die folgenden Fragen:</h2>

                        {/* Frage 1 */}
                        <div className="mb-6">
                            <p className="text-lg font-semibold text-gray-800 mb-4">
                                Wie gestaltest du deinen Lebensmitteleinkauf?
                            </p>
                            <div className="space-y-2">
                                <label className="flex items-center space-x-3">
                                    <input
                                        type="radio"
                                        name="Frage 1"
                                        value="Regional"
                                        onChange={() => handleAnswerChange('Frage 1', 'Regional')}
                                        className="h-5 w-5 text-[#A9D09A] focus:ring-[#A9D09A] border-gray-300"
                                    />
                                    <span>🌾 Regional und bewusst: Ich achte auf regionale und unverpackte Produkte.</span>
                                </label>
                                <label className="flex items-center space-x-3">
                                    <input
                                        type="radio"
                                        name="Frage 1"
                                        value="Praktisch"
                                        onChange={() => handleAnswerChange('Frage 1', 'Praktisch')}
                                        className="h-5 w-5"
                                    />
                                    <span>🛒 Praktisch und günstig: Ich kaufe, was schnell verfügbar ist.</span>
                                </label>
                                <label className="flex items-center space-x-3">
                                    <input
                                        type="radio"
                                        name="Frage 1"
                                        value="Spontan"
                                        onChange={() => handleAnswerChange('Frage 1', 'Spontan')}
                                        className="h-5 w-5"
                                    />
                                    <span>🤷‍♂️ Spontan und unüberlegt: Ich kaufe oft spontan.</span>
                                </label>
                            </div>
                        </div>

                        {/* Frage 2 */}
                        <div className="mb-6">
                            <p className="text-lg font-semibold text-gray-800 mb-4">
                                Wie oft kaufst du neue Kleidung, und wie entscheidest du dich dabei?
                            </p>
                            <div className="space-y-2">
                                <label className="flex items-center space-x-3">
                                    <input
                                        type="radio"
                                        name="Frage 2"
                                        value="Selten"
                                        onChange={() => handleAnswerChange('Frage 2', 'Selten')}
                                        className="h-5 w-5"
                                    />
                                    <span>👗 Selten und nachhaltig: Ich kaufe selten und nachhaltig.</span>
                                </label>
                                <label className="flex items-center space-x-3">
                                    <input
                                        type="radio"
                                        name="Frage 2"
                                        value="Gelegentlich"
                                        onChange={() => handleAnswerChange('Frage 2', 'Gelegentlich')}
                                        className="h-5 w-5"
                                    />
                                    <span>👜 Gelegentlich: Ich kaufe neue Kleidung, aber schaue auf Nachhaltigkeit.</span>
                                </label>
                                <label className="flex items-center space-x-3">
                                    <input
                                        type="radio"
                                        name="Frage 2"
                                        value="Häufig"
                                        onChange={() => handleAnswerChange('Frage 2', 'Häufig')}
                                        className="h-5 w-5"
                                    />
                                    <span>🛍️ Oft und modisch: Ich kaufe häufig und modisch.</span>
                                </label>
                            </div>
                        </div>

                        {/* Frage 3 */}
                        <div className="mb-6">
                            <p className="text-lg font-semibold text-gray-800 mb-4">
                                Wie bewegst du dich hauptsächlich im Alltag fort?
                            </p>
                            <div className="space-y-2">
                                <label className="flex items-center space-x-3">
                                    <input
                                        type="radio"
                                        name="Frage 3"
                                        value="Umweltfreundlich"
                                        onChange={() => handleAnswerChange('Frage 3', 'Umweltfreundlich')}
                                        className="h-5 w-5"
                                    />
                                    <span>🚲 Umweltfreundlich: Fahrrad, zu Fuß oder öffentliche Verkehrsmittel.</span>
                                </label>
                                <label className="flex items-center space-x-3">
                                    <input
                                        type="radio"
                                        name="Frage 3"
                                        value="Gemischt"
                                        onChange={() => handleAnswerChange('Frage 3', 'Gemischt')}
                                        className="h-5 w-5"
                                    />
                                    <span>🚌 Gemischt: Mal Auto, mal Fahrrad oder Bus.</span>
                                </label>
                                <label className="flex items-center space-x-3">
                                    <input
                                        type="radio"
                                        name="Frage 3"
                                        value="Auto"
                                        onChange={() => handleAnswerChange('Frage 3', 'Auto')}
                                        className="h-5 w-5"
                                    />
                                    <span>🚗 Auto-basiert: Fast ausschließlich Auto.</span>
                                </label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#A9D09A] text-white py-2 px-4 rounded hover:bg-[#90B883]"
                        >
                            Ergebnisse anzeigen
                        </button>
                    </form>
                ) : (
                    <div className="w-full max-w-4xl">
                        <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 mb-12">
                            <h2 className="text-3xl font-bold text-gray-800 mb-6">Dein Konsumprofil</h2>
                            <div className="w-[300px] mx-auto">
                                <Pie data={pieChartData} />
                            </div>
                        </div>
                        <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 mb-12">
                            <h2 className="text-3xl font-bold text-gray-800 mb-6">Kategorienvergleich</h2>
                            <Bar data={barChartData} />
                        </div>
                        <p className="text-lg text-gray-600 text-center mt-4">{getResultText()}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
