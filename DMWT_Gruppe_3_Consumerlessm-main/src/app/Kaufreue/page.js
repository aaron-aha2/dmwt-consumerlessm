// src/app/Kaufreue/page.js
'use client';
import Header from "../components/Header";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Registrierung der Chart-Komponenten
ChartJS.register(ArcElement, Tooltip, Legend);

export default function KaufreuePage() {
    // Daten für das Kuchendiagramm
    const data = {
        labels: ["Negative Gefühle", "Keine negativen Gefühle"],
        datasets: [
            {
                data: [82, 18], // Prozentwerte
                backgroundColor: ["#FF6384", "#36A2EB"], // Farben
                hoverBackgroundColor: ["#FF4365", "#2196F3"], // Hover-Farben
            },
        ],
    };

    return (
        <div>
            {/* Header-Komponente */}
            <Header />

            {/* Kuchendiagramm */}
            <div className="flex flex-col items-center mt-10">
                <h1 className="text-3xl font-bold mb-6">Gefühle nach Käufen</h1>
                <div className="w-96 h-96">
                    <Doughnut data={data} />
                </div>
            </div>
        </div>
    );
}
