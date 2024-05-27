import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { DeskReservation } from "@/Components/DeskReservation";


export function DeskAvailability({ userId }) {
    const { officeId, formattedDate } = useParams();
    const [desks, setDesks] = useState([]);


    useEffect(() => {
        getDesk();
    }, []);


    const getDesk = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/offices/${officeId}/desk-availability/${formattedDate}`);
            const data = await response.json();
            setDesks(data);
            console.log(desks)
        } catch (error) {
            console.error('Errore durante il recupero degli uffici:', error);
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
                                <DeskReservation currentUser={userId} deskState={desk.am} amOrPm='morning' />
                                <DeskReservation currentUser={userId} deskState={desk.pm} amOrPm='afternoon' />
                            </div>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );

}