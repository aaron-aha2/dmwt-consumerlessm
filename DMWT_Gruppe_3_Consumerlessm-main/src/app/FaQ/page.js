// src/app/Support/page.js
'use client';
import Footer from "../components/Footer";

import { useState } from "react";
import Header from "../components/Header";

export default function Supportpage() {
    // State für die aktive Frage
    const [activeIndex, setActiveIndex] = useState(null);

    // Funktion, um eine Frage ein- oder auszuklappen
    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const faqItems = [
        
            {
                question: "Was bedeutet minimalistisches Leben?",
                answer: "Minimalismus bedeutet, sich auf das Wesentliche zu konzentrieren und unnötige Dinge aus dem Leben zu entfernen, um mehr Raum für das zu schaffen, was wirklich zählt."
            },
            {
                question: "Warum weniger Besitz mehr Freiheit bringt?",
                answer: "Weniger Besitz bedeutet weniger Verantwortung und weniger Stress. Du kannst dich auf das konzentrieren, was dir wirklich Freude bereitet und mehr Zeit für Erfahrungen statt für Dinge haben."
            },
            {
                question: "Wie kann Konsumverzicht mein Leben verbessern?",
                answer: "Durch bewussten Konsumverzicht schaffst du Platz für das Wesentliche und reduzierst die Ablenkung durch unnötige materielle Dinge. Das führt zu mehr Klarheit und Zufriedenheit."
            },
            {
                question: "Wie lebe ich minimalistischer im Alltag?",
                answer: "Indem du regelmäßig überprüfst, was du wirklich brauchst, bewusst einkaufst und dich von Dingen trennst, die dir keine Freude oder Nutzen bringen."
            },
            {
                question: "Welche Vorteile hat ein minimalistischer Lebensstil?",
                answer: "Minimalismus fördert geistige Klarheit, reduziert Stress und spart Ressourcen, sowohl finanziell als auch emotional."
            },
            {
                question: "Wie kann ich meine Ausgaben reduzieren?",
                answer: "Erstelle ein Budget, vermeide Impulskäufe und investiere in langlebige, qualitativ hochwertige Produkte, die deinen Bedürfnissen entsprechen."
            },
            {
                question: "Wie kann Minimalismus zu mehr Zufriedenheit führen?",
                answer: "Indem du dich auf Erfahrungen und Beziehungen statt auf materiellen Besitz konzentrierst, findest du tiefere Erfüllung und wahre Freude."
            },
            {
                question: "Was sind einfache Schritte für den Einstieg in den Minimalismus?",
                answer: "Beginne mit einer Bestandsaufnahme deines Besitzes, entscheide, was du wirklich brauchst."
            },
            
            {
                question: "Wie kann eine minimalistische Lebensweise die Umwelt schonen?",
                answer: "Weniger Konsum bedeutet weniger Abfall und Ressourcennutzung. Du trägst aktiv zum Umweltschutz bei, indem du achtsam mit deinen Ressourcen umgehst."
            },
        
        
        
    ];

    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Header */}
            <Header />

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-16">
                <h1 className="text-6xl font-trash-hand text-gray-800 mb-8 text-center">
                    FAQ
                </h1>

                {/* FAQ Section */}
                <section className="space-y-6">
                    {faqItems.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg p-4 cursor-pointer transition-transform hover:scale-105"
                            style={{
                                filter: 'drop-shadow(-10px 0 3px #A9D09A)', // Schatten nur auf der linken Seite
                            }}
                            onClick={() => toggleAccordion(index)}
                        >
                            {/* Question */}
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-bold text-gray-900">
                                    {item.question}
                                </h2>
                                {/* Arrow Icon */}
                                <svg
                                    className={`w-5 h-5 text-gray-600 transform transition-transform ${
                                        activeIndex === index ? "rotate-180" : ""
                                    }`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </div>

                            {/* Answer */}
                            {activeIndex === index && (
                                <p className="mt-3 text-gray-700">{item.answer}</p>
                            )}
                
                        </div>
                    ))}
                </section>
            </main>
            <Footer />
        </div>
    );
}
