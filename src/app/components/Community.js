import Link from "next/link";
export default function Community() {
    return (
<div id ="community-section" className="p-20 items-center justify-center flex flex-col">
    <h1 className="ueberschrift">Community</h1>
    
    {/*<img className="mx-auto mb-16 rounded" src="community.jpg" alt="Peoples holding each others" width="600" height="250"></img>*/}
    <p className="mb-10 font-anonymous-pro text-center text-2xl">So hilft dir Consumerlessm, deinen Konsum zu reduzieren:</p>
    
    <div className="container">
        {/*Feld 1*/}
        <div className="item">
            <div className="icon">
                <img src="goal.png" alt="Zielscheibe Icon" className="icon-img"></img>
            </div>
            <div>
            <h1 className="font-bold text-lg">Challenges</h1>
            <p>Entdecke spannende Herausforderungen, um deinen Konsum zu reduzieren</p>
            </div>
        </div>

        {/*Feld 2*/}
        <div className="item">
            <div className="icon">
                <img src="ressourcen.png" alt="Ressources Icon" className="icon-img"></img>
            </div>
            <div>
                <h1 className="font-bold text-lg">Ressourcen</h1>
                <p>Erhalte exklusive Tipps, Anleitungen und Tools für einen bewussten Lebensstil</p>
            </div>
        </div>

        {/*Feld 3*/}
        <div className="item">
            <div className="icon">
                <img src="community_support.png" alt="Community Support Icon" className="icon-img"></img>
            </div>
            <div>
                <h1 className="font-bold text-lg">Community-Support</h1>
                <p>Vernetze dich mit Gleichgesinnten und teile deine Erfolge</p>
            </div>
        </div>

        {/*Feld 4*/}
        <div className="item">
            <div className="icon">
                <img src="events.png" alt="Events Icon" className="icon-img"></img>
            </div>
            <div>
                <h1 className="font-bold text-lg">Events</h1>
                <p>Nimm an Webinaren, Workshops und Events teil</p>
            </div>
        </div>
    </div>
    <p className="mb-5 mt-10 font-anonymous-pro text-center text-3xl italic">Entdecke die Community, die dich inspiriert</p>
    <Link href="/Register">
    <button className="mt-2 bg-white text-black border-2 border-[#A9D09A] px-6 py-2 rounded hover:bg-[#A9D09A] hover:text-white"    >
                Jetzt registrieren!
    </button>
    </Link>

</div>
    );
}