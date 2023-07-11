import React, {useEffect, useState} from 'react';
import SelectedNameBoat from "@/components/SelectedNameBoat";
import SelectedDateBoat from "@/components/SelectedDateBoat";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Popup from "@/components/Popup";

const ChronoBoat = ({data, currentBoat, boat, setCurrentBoat}) => {
    const [popup, setPopup] = useState(false);
    const years = new Date().getFullYear();
    const months = new Date().getMonth();
    const dateNow = new Date(years, months).toLocaleDateString("fr-FR", {year: "numeric", month: "long"});
    const [text, setText] = useState("");
    const [selectedBoat, setSelectedBoat] = useState("");
    const [selectedDate, setSelectedDate] = useState(dateNow);
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);
    const [days, setDays] = useState(0);
    const date = new Date(boat["fields"]["date_passage"]).getTime();
    const now = new Date().getTime();
    const hoursSaison = new Date().getTimezoneOffset() * 60 * 1000;
    const hourClose = boat["fields"]["fermeture_a_la_circulation"];
    const hourClose2 = hourClose.substring(0, 2);
    const hourClose3 = hourClose2 * 60 * 60 * 1000;
    const hourClose4 = hourClose.substring(6, 3);
    const hourClose5 = hourClose4 * 60 * 1000;
    const hourClose6 = (hourClose3 + hourClose5 + date) + hoursSaison;
    const hourClose7 = new Date(hourClose6).toLocaleTimeString("fr-FR", {weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit"});
    const hourOpen = boat["fields"]["re_ouverture_a_la_circulation"];
    const hourOpen2 = hourOpen.substring(0, 2);
    const hourOpen3 = hourOpen2 * 60 * 60 * 1000;
    const hourOpen4 = hourOpen.substring(6, 3);
    const hourOpen5 = hourOpen4 * 60 * 1000;
    const hourOpen6 = (hourOpen3 + hourOpen5 + date) - (60 * 60 * 1000);
    const diff = hourClose6 - now;
    let timer;
    useEffect(() => {
        timer = setInterval(() => {
            let seconds = Math.floor(diff / 1000);
            let minutes = Math.floor(seconds / 60);
            let hours = Math.floor(minutes / 60);
            let days = Math.floor(hours / 24);
            hours %= 24;
            minutes %= 60;
            seconds %= 60;
            setSeconds(seconds);
            setMinutes(minutes);
            setHours(hours);
            setDays(days);
        }, 1000);
        return () => clearInterval(timer);
    }, [diff]);
    useEffect(() => {
        if (diff < 0) {
            clearInterval(timer);
            setCurrentBoat(currentBoat + 1);
        }
        if (new Date(hourClose6) < new Date() && new Date(hourOpen6) > new Date()) {
            setText("Le pont est fermé");
        } else {
            setText("Le pont est ouvert");
        }
        if (diff < 0 && currentBoat === data.length - 1) {
            setCurrentBoat(0);
            setText("Aucune fermeture prévue");
        }
    }, [diff, currentBoat, data.length, timer, hourClose6, hourOpen6, setCurrentBoat]);

    function handleClick() {
        setPopup(!popup);
    }

    return (
        <div className="w-screen h-full flex flex-col items-center">
            <header className="h-screen w-full flex flex-col justify-center items-center bg-transparent backdrop-blur ">
                <div className="w-full flex flex-col items-center text-center p-7">
                <h1 className="text-6xl text-white font-bold">Fermeture du pont Chaban Delmas</h1>
                </div>
                <div className="w-1/2 flex flex-col items-center text-white text-3xl font-bold">
                <p className=" font-bold mb-4">Prochaine fermeture:</p>
                    <p>{boat["fields"]["bateau"] === "MAINTENANCE" ? "" : "Nom du bateau:"} <span className="text-red-500 text-5xl font-black">{boat["fields"]["bateau"] === "MAINTENANCE" ? "Travaux de maintenance du pont" : data[currentBoat]["fields"]["bateau"]}</span></p>
                <p>Date: {hourClose7}</p>
                </div>

                <div className="flex gap-10 mt-10 font-bold">
                    <div className="w-60 h-60">
                    <CircularProgressbar
                      background={true}
                      strokeWidth={7}
                      value={days}
                      text={`${days} ${days < 1 ? "jour" : "jours" }`}
                      styles={buildStyles({
                        textColor: "white",
                        pathColor: "red",
                          trailColor: "rgba(0, 0, 0, 0.5)",
                        textSize: "15px",
                        strokeLinecap: "butt",
                        pathTransition: "none",
                        pathTransitionDuration: 0.5,
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                      })}
                    />
                  </div>
                    <div className="w-60 h-60">
                        <CircularProgressbar
                          background={true}
                          strokeWidth={7}
                          value={hours}
                          text={`${hours} ${hours < 1 ? "heure" : "heures" }`}
                          maxValue={24}
                          styles={buildStyles({
                            textColor: "white",
                            pathColor: "blue",
                              trailColor: "rgba(0, 0, 0, 0.5)",
                            strokeLinecap: "butt",
                            textSize: "15px",
                            pathTransition: "none",
                            pathTransitionDuration: 0.5,
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                          })}
                        />
                    </div>
                    <div className="w-60 h-60">
                        <CircularProgressbar
                          background={true}
                          strokeWidth={7}
                          value={minutes}
                          text={`${minutes} ${minutes < 1 ? "minute" : "minutes" }`}
                          maxValue={60}
                          styles={buildStyles({
                            textColor: "white",
                            pathColor: "yellow",
                              trailColor: "rgba(0, 0, 0, 0.5)",
                            strokeLinecap: "butt",
                            textSize: "15px",
                            pathTransition: "none",
                            pathTransitionDuration: 0.5,
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                          })}
                        />
                    </div>
                    <div className="w-60 h-60">
                        <CircularProgressbar
                          background={true}
                          strokeWidth={7}
                          value={seconds}
                          text={`${seconds} ${seconds < 1 ? "seconde" : "secondes" }`}
                          maxValue={60}
                          styles={buildStyles({
                              textColor: "white",
                              pathColor: "#12c912",
                              trailColor: "rgba(0, 0, 0, 0.5)",
                              textSize: "15px",
                              strokeLinecap: "butt",
                              pathTransition: "none",
                              pathTransitionDuration: 0.5,
                              backgroundColor: "rgba(0, 0, 0, 0.5)",
                          })}
                        />
                    </div>
                </div>
                    <p className={`text-4xl mt-6 font-black ${(new Date(hourClose6) < new Date() && new Date(hourOpen6) > new Date()) ? "text-red-500 animate-bounce" : "text-green-500"}`}>{text}</p>

            </header>
            <section className="w-full h-screen">
            <div className="flex flex-col justify-evenly items-center h-1/6 relative">
                <div className="flex gap-28">
            <SelectedNameBoat selectedBoat={selectedBoat} setSelectedBoat={setSelectedBoat}  data={data} />
            <SelectedDateBoat selectedDate={selectedDate} setSelectedDate={setSelectedDate} data={data} />
                </div>
                <div className="flex flex-col text-center text-white font-medium text-xl">
                    <p className="m-0">Les dates et tranches horaires signalées peuvent varier en fonction de nombreux paramètres, sachez que des modifications sont possibles!<br/>
                        {`Nombre de fermetures prévisionnelles pour l'année ${years}:`} <span className="text-lg font-black">{data.length}</span>
                    </p>
                </div>
            </div>

                <div className="flex w-11/12 m-auto h-4/6 overflow-y-auto px-20">
                <div className="w-full">
                <table className=" w-full">
                    <thead className="h-16 bg-gray-800/90 text-white">
                    <tr className="text-lg border border-white">
                        <th className=" px-4 py-2 w-3/12 border border-white">Nom du bateau ou raison</th>
                        <th className=" px-4 py-2 w-3/12 border  border-white">Date de fermeture</th>
                        <th className=" px-4 py-2 w-2/12 border  border-white">Heure de fermeture</th>
                        <th className=" px-4 py-2 w-2/12 border  border-white">Heure de ré-ouverture</th>
                        <th className=" px-4 py-2 w-2/12 border border-white">Type de fermeture</th>
                    </tr>
                    </thead>
                {data.filter((boat) =>
                boat["fields"]["date_passage"] &&
                ((selectedBoat === "" || boat["fields"]["bateau"] === selectedBoat) &&
                (selectedDate === "" || new Date(boat["fields"]["date_passage"])
                        .toLocaleDateString("fr-FR", {month: "long", year:"numeric"}).includes(selectedDate)))
                )
                .map((boat)  => (
                    <tbody key={boat["recordid"]} className="odd:bg-gray-500/70 even:bg-gray-700/70">
                    <tr className={((new Date(boat["fields"]["date_passage"])) < new Date(data[currentBoat]["fields"]["date_passage"]) ) ? "text-red-500 font-bold line-through decoration-2" : "text-white font-bold"}>
                        <td className=" px-4 py-2 border border-white">{boat["fields"]["bateau"] === "MAINTENANCE" ? "Travaux de maintenance du pont" : boat["fields"]["bateau"].toLowerCase().charAt(0).toUpperCase() + boat["fields"]["bateau"].toLowerCase().slice(1)}</td>
                        <td className="border px-4 py-2  border-white">{new Date(boat["fields"]["date_passage"]).toLocaleDateString("fr-FR", {weekday: "long", day: "numeric", month: "long", year: "numeric"})}</td>
                        <td className="border px-4 py-2  border-white">{boat["fields"]["fermeture_a_la_circulation"]}</td>
                        <td className="border px-4 py-2  border-white">{boat["fields"]["re_ouverture_a_la_circulation"]}</td>
                        <td className=" px-4 py-2 border  border-white">{boat["fields"]["type_de_fermeture"]}</td>
                    </tr>
                    </tbody>
                ))}
                </table>
                </div>
            </div>
                <footer className="flex items-end text-xl text-white font-bold h-1/6 w-full">
                    <div className="flex justify-center items-center gap-20 w-full h-5/6  bg-white/10 backdrop-blur-sm">
                        <p className="text-center">© 2023 - Tous droits réservés - <a href="https://www.juliendussart.fr" target="_blank" rel="noreferrer" className="text-blue-500">Julien DUSSART</a></p>
                        <p onClick={handleClick} className="cursor-pointer">Crédits</p>
                    </div>
                    </footer>
                {popup && <Popup setPopup={setPopup} />}
            </section>

        </div>
    );
};

export default ChronoBoat;
