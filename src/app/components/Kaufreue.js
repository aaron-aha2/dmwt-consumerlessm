'use client';
import Header from "../components/Header";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useState, useRef } from "react";

// Registrierung der Chart-Komponenten
ChartJS.register(ArcElement, Tooltip, Legend);

export default function KaufreuePage() {
    const [showChart, setShowChart] = useState(false); // Zustand für Diagramm
    const chartRef = useRef(null); // Referenz für das Diagramm

    const handleToggleChart = () => {
        setShowChart(!showChart);
        if (!showChart) {
            // Nur beim Anzeigen wird gescrollt
            setTimeout(() => {
                chartRef.current.scrollIntoView({ behavior: "smooth" });
            }, 100);
        }
    };
    const data = {
        labels: [
            "Zu hoher Preis im Nachhinein",
            "Fehlender Nutzen oder Zweck",
            "Spontankäufe ohne Überlegung",
            "Qualitätsprobleme oder Defekte",
            "Soziale und umweltbezogene Reue",
        ],
        datasets: [
            {
                data: [30, 25, 20, 15, 10], // Prozentwerte
                backgroundColor: [
                    "#FF6F61", // Pastellrot
                    "#6BAED6", // Pastellblau
                    "#FFD966", // Pastellgelb
                    "#88D498", // Pastellgrün
                    "#C299FC", // Pastelllila
                ],
                hoverBackgroundColor: [
                    "#FF5A4F", // Etwas dunkleres Pastellrot
                    "#5B9CC6", // Etwas dunkleres Pastellblau
                    "#FFC84D", // Etwas dunkleres Pastellgelb
                    "#76C488", // Etwas dunkleres Pastellgrün
                    "#B58CEB", // Etwas dunkleres Pastelllila
                ],
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
                labels: {
                    font: {
                        family: 'Anonymous Pro',
                        size: 16,
                    },
                },
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const label = context.label || '';
                        const value = context.raw || 0;
                        return `${label}: ${value}%`;
                    },
                },
            },
        },
    };

    return (
        <div>
            {/* Header-Komponente */}
            <Header />

            {/* Hauptinhalt */}
            <div className="flex flex-col items-center justify-center bg-white min-h-screen p-10">
                {/* Prozentanzeige */}
                <div className="flex items-baseline mb-4">
                <h1
                    className="text-[8rem] font-trash-hand text-black leading-none relative"
                    style={{
                        textShadow: "4px 4px 0 #A9D09A", // Fester grüner Schatten mit 100% Deckkraft
                    }}
                >
                    82
                </h1>
                <h1 className="text-[5rem] text-black ml-2" style={{ fontFamily: 'Arial, bold-serif' }}>
                    %
                </h1>
                </div>
                <hr className="hr-mitte" />

                {/* Haupttext */}
                <p className="text-3xl font-anonymous-pro text-center text-black mb-6">
                    der Verbraucher:innen erleben negative Gefühle nach unnötigen Käufen.
                </p>

                {/* Beschreibungstext */}
                <p className="text-lg font-anonymous-pro text-center text-gray-600 max-w-3xl mb-8">
                    Impulsives Verhalten beim Einkaufen ist keine Seltenheit. Häufig führen spontane Entscheidungen, der Wunsch nach Belohnung oder äußere Einflüsse dazu, dass Konsument:innen Produkte erwerben, die später als unnötig wahrgenommen werden. Solche Käufe können nicht nur zu Reuegefühlen führen, sondern auch finanzielle und emotionale Belastungen verursachen. Reflektieren Sie Ihre Entscheidungen, um bewusster zu konsumieren.
                </p>

                {/* Button */}
                <button
                    className="mt-2 bg-white text-black border-2 border-[#A9D09A] px-6 py-2 rounded hover:bg-[#A9D09A] hover:text-white"
                    onClick={handleToggleChart}
                >
                    {showChart ? "Weniger anzeigen" : "Mehr dazu"}
                </button>
            </div>

            {/* Diagramm-Bereich */}
            {showChart && (
                <div
                    ref={chartRef} // Referenz für das Scrollen
                    className="flex flex-col items-center justify-center bg-white min-h-screen p-0"
                >
                    <h2 className="text-4xl sm:text-3xl font-bold mb-0 text-center">
                        Konsum und Emotionen
                    </h2>
                    <p className="text-lg sm:text-base text-gray-600 text-center mb-6 max-w-xl">
                        Dieses Diagramm zeigt die prozentuale Verteilung der Verbraucher:innen,
                        die nach unnötigen Käufen negative Gefühle erleben.
                    </p>
                    <div className="relative w-full max-w-[450px]">
                        {/* Diagramm */}
                        <Doughnut data={data} options={options} />
                        {/* 82 Beschriftung */}
                        <div
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
                        >
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
