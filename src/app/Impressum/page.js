'use client';
import Header from "../components/Header";
import Footer from "../components/Footer";
export default function Impressum() {
  return (
    <div>
    <div className="pt-24 min-h-screen bg-gray-50 flex flex-col text-center items-center justify-center px-4">
        <Header />
      <div className="w-[800px] bg-white shadow-md rounded-lg p-6 mb-12">
        <h1 className="ueberschrift">
          Impressum
        </h1>
        <div className="text-gray-800 space-y-4">
          <div>
            <h2 className="font-semibold text-lg">Verantwortlich für den Inhalt:</h2>
            <p className="mb-10">
              Max Mustermann<br />
              Musterstraße 1<br />
              12345 Musterstadt<br />
              Deutschland
            </p>
          </div>
          <div>
            <h2 className="font-semibold text-lg">Kontakt:</h2>
            <p className="mb-5">
              Telefon: +49 (0)123 456 789<br />
              E-Mail: <a href="mailto:kontakt@musterwebsite.de" className="text-green-600 hover:underline">kontakt@musterwebsite.de</a>
            </p>
          </div>
          <div>
            <h2 className="font-semibold text-lg">Umsatzsteuer-Identifikationsnummer:</h2>
            <p className="mb-5">DE123456789</p>
          </div>
          <div>
            <h2 className="font-semibold text-lg">Handelsregister:</h2>
            <p className="mb-5">Amtsgericht Musterstadt, HRB 12345</p>
          </div>
          <div>
            <h2 className="font-semibold text-lg">Haftungsausschluss:</h2>
            <p className="mb-5">
              Trotz sorgfältiger Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt
              der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
            </p>
          </div>
          <div>
            <h2 className="font-semibold text-lg">Urheberrecht:</h2>
            <p>
              Alle Inhalte und Grafiken auf dieser Website unterliegen dem deutschen Urheberrecht. Die unautorisierte
              Nutzung, Reproduktion oder Weitergabe ist untersagt.
            </p>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
}
