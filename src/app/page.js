'use client'
import Header from './components/Header';
import Hero from './components/Hero';
import Community from './components/Community';
import Kaufreue from './components/Kaufreue';
import WhatYouCanDo from './components/WhatYouCanDo';
import Footer from './components/Footer';
import { useAuth } from '../context/AuthContext';
import Dashboard from './components/Calendar';
import Calendar from './components/Calendar';


export default function Home() {
  
  const { isLoggedIn, logout } = useAuth(); //Zugriff auf Login-Status und Logout-Funktion
  
  return (
    <div className="body">
        <div className="Header"> <Header/> </div>
        <div> <Hero/> </div>
        <div id="kaufreue-section"> <Kaufreue/> </div>
        <div id="what-you-can-do-section"><WhatYouCanDo/></div>
        {!isLoggedIn && <div> <Community /> </div>}
        <div id="calendar-section"> <Calendar /> </div>
        <div><Footer/></div>
    </div>
  );
}
