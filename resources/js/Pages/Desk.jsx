import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';


export function Desk({ userId }) {
    const { officeId, formattedDate } = useParams();
    const [desks, setDesks] = useState([]);
    const [occupations, setOccupations] = useState([]);


    useEffect(() => {
        getDesk();
        getOccupation();
        console.log(occupations)
    }, []);


    const getDesk = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/offices/${officeId}/desks`);
            const data = await response.json();
            setDesks(data);
            console.log(desks)
        } catch (error) {
            console.error('Errore durante il recupero degli uffici:', error);
        }
    };

    const getOccupation = async() => {

        try {
            const response = await fetch(`http://localhost:8000/api/getOccupation?reservation_day=${formattedDate}`);
            const data = await response.json();
            setOccupations(data);
        } catch (error) {
            console.error('Errore durante il recupero degli uffici:', error);
        }

    };

    const getDeskOccupationStatus = (deskId, period) => {
        const occupation = occupations.find(occ => occ.desk_id === deskId);
        return occupation ? occupation[period] : false;
    };



    const createReservation = async (deskId, period) => {
        const currentStatus = getDeskOccupationStatus(deskId, period);
        const newStatus = !currentStatus;



        try {
          const response = await fetch('http://localhost:8000/api/postReservation', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user_id: userId,
              desk_id: deskId,
              reservation_day: formattedDate,
              morning_busy: period === 'morning_busy' ? newStatus : getDeskOccupationStatus(deskId, 'morning_busy'),
              afternoon_busy: period === 'afternoon_busy' ? newStatus : getDeskOccupationStatus(deskId, 'afternoon_busy'),
            }),
          });
          if (response.ok) {
            console.log('Prenotazione creata con successo!');
          } else {
            console.error('Errore durante la creazione della prenotazione:', response.statusText);
          }
        } catch (error) {
          console.error('Errore durante la creazione della prenotazione:', error);
        }
    };


    return (
        <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-2">
            {desks.map((desk) => (
                <li key={desk.id} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
                    <div className="flex-1 truncate">
                        <div className="space-x-3 text-center">
                            <h3 className="truncate text-sm font-medium text-gray-900 py-5 text-center mx-auto ">Desk {desk.name}</h3>
                            <div className="my-3 flex justify-around">
                                <button className={`p-2 rounded-xl ${getDeskOccupationStatus(desk.id, 'morning_busy') ? 'bg-red-300' : 'bg-emerald-300'}`}
                                onClick={() => createReservation(desk.id, 'morning_busy')}
                                >
                                    Morning Reservation
                                </button>
                                <button className={`p-2 rounded-xl ${getDeskOccupationStatus(desk.id, 'afternoon_busy') ? 'bg-red-300' : 'bg-emerald-300'}`}
                                onClick={() => createReservation(desk.id, 'afternoon_busy')}
                                >
                                    Afternoon Reservation
                                </button>
                            </div>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );

}