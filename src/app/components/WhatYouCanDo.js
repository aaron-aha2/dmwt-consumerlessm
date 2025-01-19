export default function WhatYouCanDo() {
    return (
        <div className="hintergrund hintergrund-relative">
            <h1 className="ueberschrift">Was du tun kannst</h1>
            <div className="container container-relative">

                {/*Second Hand Section*/}
                <div className="secondHand">
                    <div className="relative bg-cover bg-center"
                         style={{
                             backgroundImage: "url('/Rahmen6.svg')",
                             backgroundRepeat: "no-repeat",
                             backgroundSize: "500px 500px",
                             overflow: "visible",
                             width: "500px",
                             height: "500px",
                             alignItems: "center",
                             display: "flex",
                             flexDirection: "column",
                             justifyContent: "center",
                         }}>
                        <img src="iphone.svg" alt="Iphone Illustration" className="illustration" />
                        <p className="font-bold text-3xl">Second Hand</p>
                        <p className={"body body-centred"}>Kaufe Second-Hand-Produkte und verkaufe deine alten Sachen</p>
                    </div>
                </div>


                {/*DIY Section*/}
                <div className="diy">
                    <div className="relative bg-cover bg-center"
                         style={{
                             backgroundImage: "url('/Rahmen5.svg')",
                             backgroundRepeat: "no-repeat",
                             width: "500px",
                             height: "500px",
                             backgroundSize: "500px 500px",
                             overflow: "visible",
                             alignItems: "center",
                             display: "flex",
                             flexDirection: "column",
                             justifyContent: "center",
                         }}>
                        <img src="jacke-haengend.svg" alt="Jacke Illustration" className="illustration illustration-jacke" />
                        <p className="font-bold text-3xl">DIY/Upcycling</p>
                        <p className={"body body-centred"}>Mache deine eigenen Produkte und repariere kaputte Dinge</p>
                    </div>
                </div>


                {/*Mehrweg Section*/}
                <div className="mehrweg">
                    <div className="relative bg-cover bg-center"
                         style={{
                             backgroundImage: "url('/Rahmen4.svg')",
                             backgroundRepeat: "no-repeat",
                             width: "400px",
                             height: "400px",
                             overflow: "visible",
                             backgroundSize: "400px 400px",
                             alignItems: "center",
                             display: "flex",
                             flexDirection: "column",
                             justifyContent: "center",
                         }}>
                        <img src="flasche.svg" alt="Flasche Illustration" className="illustration" />
                        <p className="font-bold text-3xl">Mehrweg</p>
                        <p className={"body body-centred"}>Verwende langlebige und wiederverwendbare Produkte</p>
                    </div>
                </div>

            </div>
        </div>
    );
}
