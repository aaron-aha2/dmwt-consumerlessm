'use client';

import { useState, useEffect } from 'react';
import {
    format,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    addDays,
    subMonths,
    addMonths,
    isSameDay,
    isSameMonth,
    parseISO,
} from 'date-fns';
import { de } from 'date-fns/locale';
import { useAuth } from '../../context/AuthContext';
export default function Calendar() {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [bookmarkedEvents, setBookmarkedEvents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newEvent, setNewEvent] = useState({ date: '', time: '', title: '', description: '', location: '' });
    const { isLoggedIn, user } = useAuth();

    // **Zentralisierte Funktion zum Abrufen von Events**
    const fetchEvents = async () => {
        try {
            const response = await fetch('/api/getEvents');
            if (!response.ok) throw new Error('Fehler beim Abrufen der Veranstaltungen');
            const data = await response.json();
            console.log('Events geladen:', data.events);
            setEvents(data.events || []);
        } catch (error) {
            console.error('Fehler beim Abrufen der Veranstaltungen:', error.message);
        }
    };

    // Initiales Abrufen der Events beim Laden der Komponente
    useEffect(() => {
        fetchEvents();
    
        // Vorgemerkte Events aus LocalStorage laden
        const storedBookmarks = localStorage.getItem('bookmarkedEvents');
        if (storedBookmarks) {
            setBookmarkedEvents(JSON.parse(storedBookmarks));
        }
    }, []);
    
    const handleAddEvent = async () => {
        if (!newEvent.date || !newEvent.time || !newEvent.title || !newEvent.description || !newEvent.location) {
            alert('Bitte fülle alle Felder aus.');
            return;
        }

        try {
            const formattedEvent = {
                datum: newEvent.date,
                uhrzeit: `${newEvent.time}:00+01:00`,
                titel: newEvent.title,
                beschreibung: newEvent.description,
                ort: newEvent.location,
                autor: user?.nutzername || 'Unbekannt',
            };

            const response = await fetch('/api/addEvent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formattedEvent),
            });

            if (!response.ok) throw new Error('Fehler beim Hinzufügen der Veranstaltung.');

            console.log('Neues Event hinzugefügt');
            setIsModalOpen(false);
            fetchEvents(); // Events nach dem Hinzufügen neu abrufen
        } catch (error) {
            console.error('Fehler beim Hinzufügen der Veranstaltung:', error.message);
        }
    };

    const handleDeleteEvent = async (eventId) => {
        try {
            const response = await fetch('/api/deleteEvent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: eventId }),
            });

            if (!response.ok) throw new Error('Fehler beim Löschen der Veranstaltung.');

            console.log('Event erfolgreich gelöscht');
            fetchEvents(); // Events nach dem Löschen neu abrufen
        } catch (error) {
            console.error('Fehler beim Löschen der Veranstaltung:', error.message);
        }
    };

    const renderEvents = () => {
        const selectedDayEvents = events.filter((event) =>
            event.datum && isSameDay(parseISO(event.datum), selectedDate)
        );
    
        if (selectedDayEvents.length === 0) {
            return <p className="text-gray-600">Keine Events für diesen Tag.</p>;
        }
    
        return selectedDayEvents.map((event) => (
            <div key={event.id} className="bg-white p-4 rounded-lg shadow-md mb-4">
                <h2 className="font-anonymous-pro text-lg text-gray-800">{event.titel}</h2>
                <p className="text-sm text-gray-500">🗓 {format(parseISO(event.datum), 'dd.MM.yyyy')}</p>
                <p className="text-sm text-gray-500">⏰ {event.uhrzeit.split('+')[0]}</p>
                <p className="text-sm text-gray-700">{event.beschreibung}</p>
                <p className="text-sm text-gray-500">📍 {event.ort}</p>
                <p className="text-sm text-gray-500">👤 Autor: {event.autor}</p>
                {/* Absagen-Button nur für den Autor sichtbar */}
                {isLoggedIn && user?.nutzername === event.autor && (
                    <button
                        className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        onClick={() => handleDeleteEvent(event.id)}
                    >
                        Absagen
                    </button>
                )}
                {/* Vormerken-Button nur sichtbar, wenn der Benutzer nicht der Autor ist */}
                {isLoggedIn && user?.nutzername !== event.autor && (
                    <button
                    className="mt-2 bg-transparent border-2 border-[#A9D09A] text- black px-4 py-2 rounded hover:bg-[#A9D09A] hover:text-white hover:border-[#90B883]"
                    onClick={() => handleBookmarkEvent(event)}
                    >
                        Vormerken
                    </button>
                )}
            </div>
        ));
    };
    const handleRemoveBookmark = (eventId) => {
        const updatedBookmarks = bookmarkedEvents.filter((event) => event.id !== eventId);
        setBookmarkedEvents(updatedBookmarks);
    
        // Aktualisiere den LocalStorage
        localStorage.setItem('bookmarkedEvents', JSON.stringify(updatedBookmarks));
    };
    
    
    
    const renderCalendar = () => {
        const startMonth = startOfMonth(currentMonth);
        const endMonth = endOfMonth(currentMonth);
        const startDate = startOfWeek(startMonth, { locale: de });
        const endDate = endOfWeek(endMonth, { locale: de });
    
        const rows = [];
        let days = [];
        let day = startDate;
    
        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                const currentDay = day;
                const dayEvents = events.filter((event) =>
                    event.datum && isSameDay(currentDay, parseISO(event.datum))
                );
                days.push(
                    <div
                        key={currentDay.toISOString()}
                        className={`border p-2 text-center cursor-pointer ${
                            isSameDay(currentDay, selectedDate) ? 'bg-[#A9D09A] text-white' : 'bg-white'
                        } ${!isSameMonth(currentDay, currentMonth) ? 'text-gray-400' : ''}`}
                        onClick={() => setSelectedDate(new Date(currentDay))}
                    >
                        <p className="font-bold">{format(currentDay, 'd')}</p>
                        {dayEvents.length > 0 && (
                            <p className="text-xs text-gray-600">{dayEvents.length} Event(s)</p>
                        )}
                    </div>
                );
                day = addDays(day, 1);
            }
            rows.push(<div key={`row-${day}`} className="grid grid-cols-7">{days}</div>);
            days = [];
        }
    
        return rows;
    };
    const handleBookmarkEvent = (event) => {
        const updatedBookmarks = [...bookmarkedEvents, event];
        setBookmarkedEvents(updatedBookmarks);
    
        // Speichere die vorgemerkten Events im LocalStorage
        localStorage.setItem('bookmarkedEvents', JSON.stringify(updatedBookmarks));
    };
    
    
    const renderBookmarkedEvents = () => {
        if (bookmarkedEvents.length === 0) {
            return <p className="text-gray-600">Keine vorgemerkten Events.</p>;
        }

        return bookmarkedEvents.map((event) => (
            <div key={event.id} className="bg-white p-4 rounded-lg shadow-md mb-4">
                <h2 className="font-anonymous-pro text-lg text-gray-800">{event.titel}</h2>
                <p className="text-sm text-gray-500">🗓 {event.datum}</p>
                <p className="text-sm text-gray-500">📍 {event.ort}</p>
                <button
                    className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    onClick={() => handleRemoveBookmark(event.id)}
                >
                    Entfernen
                </button>
            </div>
        ));
    };

    return (
        <>
        {!isLoggedIn && (
        <div className="bg-[#F0F7EC] p-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="ueberschrift text-center mt-8">Eventkalender</h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                    <div className="col-span-1 bg-gray-100 p-6 rounded-lg shadow-lg">
                        <div className="flex justify-between items-center mb-4">
                            <button
                                className="bg-[#A9D09A] text-white px-4 py-2 rounded hover:bg-[#A9D09A]"
                                onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                            >
                                ◀ Zurück
                            </button>
                            <h2 className="font-anonymous-pro text-xl text-gray-800">
                                {format(currentMonth, 'MMMM yyyy', { locale: de })}
                            </h2>
                            <button
                                className="bg-[#A9D09A] text-white px-4 py-2 rounded hover:bg-[#90B883]"
                                onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                            >
                                Weiter ▶
                            </button>
                        </div>
                        <div className="grid grid-cols-7 gap-1">
                            <div className="font-bold text-gray-600">Mo</div>
                            <div className="font-bold text-gray-600">Di</div>
                            <div className="font-bold text-gray-600">Mi</div>
                            <div className="font-bold text-gray-600">Do</div>
                            <div className="font-bold text-gray-600">Fr</div>
                            <div className="font-bold text-gray-600">Sa</div>
                            <div className="font-bold text-gray-600">So</div>
                        </div>
                        {renderCalendar()}
                    </div>
                    <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                        <h2 className="font-anonymous-pro text-xl text-gray-800 mb-4">
                            Events am {format(selectedDate, 'dd.MM.yyyy')}
                        </h2>
                        {renderEvents()}
                        {isLoggedIn && (
                            <button
                                className="mt-4 bg-[#A9D09A] text-white px-4 py-2 rounded hover:bg-[#90B883]"
                                onClick={() => setIsModalOpen(true)}
                            >
                                Neue Veranstaltung hinzufügen
                            </button>
                        )}
                    </div>
                </div>
                {isLoggedIn && (
                    <div className="bg-gray-50 mt-8 p-6 rounded-lg shadow-lg">
                        <h3 className="font-anonymous-pro text-xl text-gray-800 mb-4">
                            Vorgemerkte Events
                        </h3>
                        {renderBookmarkedEvents()}
                    </div>
                )}
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="font-anonymous-pro text-xl text-gray-800 mb-4">
                            Neue Veranstaltung hinzufügen
                        </h2>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Datum</label>
                            <input
                                type="date"
                                value={newEvent.date}
                                onChange={(e) =>
                                    setNewEvent({ ...newEvent, date: e.target.value })
                                }
                                className="w-full px-4 py-2 border rounded-lg"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Uhrzeit</label>
                            <input
                                type="time"
                                value={newEvent.time}
                                onChange={(e) =>
                                    setNewEvent({ ...newEvent, time: e.target.value })
                                }
                                className="w-full px-4 py-2 border rounded-lg"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Titel</label>
                            <input
                                type="text"
                                value={newEvent.title}
                                onChange={(e) =>
                                    setNewEvent({ ...newEvent, title: e.target.value })
                                }
                                className="w-full px-4 py-2 border rounded-lg"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Beschreibung</label>
                            <textarea
                                value={newEvent.description}
                                onChange={(e) =>
                                    setNewEvent({ ...newEvent, description: e.target.value })
                                }
                                className="w-full px-4 py-2 border rounded-lg"
                            ></textarea>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Ort</label>
                            <input
                                type="text"
                                value={newEvent.location}
                                onChange={(e) =>
                                    setNewEvent({ ...newEvent, location: e.target.value })
                                }
                                className="w-full px-4 py-2 border rounded-lg"
                            />
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Abbrechen
                            </button>
                            <button
                                className="bg-[#A9D09A] text-white px-4 py-2 rounded hover:bg-[#90B883]"
                                onClick={handleAddEvent}
                            >
                                Hinzufügen
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div> 
    )}

    {isLoggedIn && (
        <div className="bg-white p-6">
              <div className="max-w-7xl mx-auto">
                     <h1 className="ueberschrift text-center mt-8">Eventkalender</h1>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                            <div className="col-span-1 bg-gray-100 p-6 rounded-lg shadow-lg">
                                 <div className="flex justify-between items-center mb-4">
                                     <button
                                        className="bg-[#A9D09A] text-white px-4 py-2 rounded hover:bg-[#A9D09A]"
                                        onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                                        >
                                      ◀ Zurück
                                    </button>
                                        <h2 className="font-anonymous-pro text-xl text-gray-800">
                                            {format(currentMonth, 'MMMM yyyy', { locale: de })}
                                        </h2>
                                        <button
                                            className="bg-[#A9D09A] text-white px-4 py-2 rounded hover:bg-[#90B883]"
                                            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                                            >
                                                Weiter ▶
                                        </button>
                                        </div>
                                        <div className="grid grid-cols-7 gap-1">
                                            <div className="font-bold text-gray-600">Mo</div>
                                            <div className="font-bold text-gray-600">Di</div>
                                            <div className="font-bold text-gray-600">Mi</div>
                                            <div className="font-bold text-gray-600">Do</div>
                                            <div className="font-bold text-gray-600">Fr</div>
                                            <div className="font-bold text-gray-600">Sa</div>
                                            <div className="font-bold text-gray-600">So</div>
                                        </div>
                                        {renderCalendar()}
                                    </div>
                                    <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                                        <h2 className="font-anonymous-pro text-xl text-gray-800 mb-4">
                                            Events am {format(selectedDate, 'dd.MM.yyyy')}
                                        </h2>
                                        {renderEvents()}
                                        {isLoggedIn && (
                                            <button
                                                className="mt-4 bg-[#A9D09A] text-white px-4 py-2 rounded hover:bg-[#90B883]"
                                                onClick={() => setIsModalOpen(true)}
                                            >
                                                Neue Veranstaltung hinzufügen
                                            </button>
                                        )}
                                    </div>
                                </div>
                                {isLoggedIn && (
                                    <div className="bg-gray-50 mt-8 p-6 rounded-lg shadow-lg">
                                        <h3 className="font-anonymous-pro text-xl text-gray-800 mb-4">
                                            Vorgemerkte Events
                                        </h3>
                                        {renderBookmarkedEvents()}
                                    </div>
                                )}
                            </div>
                            {isModalOpen && (
                                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                                        <h2 className="font-anonymous-pro text-xl text-gray-800 mb-4">
                                            Neue Veranstaltung hinzufügen
                                        </h2>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 mb-2">Datum</label>
                                            <input
                                                type="date"
                                                value={newEvent.date}
                                                onChange={(e) =>
                                                    setNewEvent({ ...newEvent, date: e.target.value })
                                                }
                                                className="w-full px-4 py-2 border rounded-lg"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 mb-2">Uhrzeit</label>
                                            <input
                                                type="time"
                                                value={newEvent.time}
                                                onChange={(e) =>
                                                    setNewEvent({ ...newEvent, time: e.target.value })
                                                }
                                                className="w-full px-4 py-2 border rounded-lg"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 mb-2">Titel</label>
                                            <input
                                                type="text"
                                                value={newEvent.title}
                                                onChange={(e) =>
                                                    setNewEvent({ ...newEvent, title: e.target.value })
                                                }
                                                className="w-full px-4 py-2 border rounded-lg"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 mb-2">Beschreibung</label>
                                            <textarea
                                                value={newEvent.description}
                                                onChange={(e) =>
                                                    setNewEvent({ ...newEvent, description: e.target.value })
                                                }
                                                className="w-full px-4 py-2 border rounded-lg"
                                            ></textarea>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 mb-2">Ort</label>
                                            <input
                                                type="text"
                                                value={newEvent.location}
                                                onChange={(e) =>
                                                    setNewEvent({ ...newEvent, location: e.target.value })
                                                }
                                                className="w-full px-4 py-2 border rounded-lg"
                                            />
                                        </div>
                                        <div className="flex justify-end space-x-4">
                                            <button
                                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                                onClick={() => setIsModalOpen(false)}
                                            >
                                                Abbrechen
                                        </button>
                                        <button
                                                className="bg-[#A9D09A] text-white px-4 py-2 rounded hover:bg-[#90B883]"
                                                onClick={handleAddEvent}
                                            >
                                         Hinzufügen
                                     </button>
                                 </div>
                             </div>
                         </div>
                    )}
                </div>
            )}
        </>
    );
}
