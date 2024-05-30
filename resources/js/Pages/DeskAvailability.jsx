import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { DeskReservation } from "@/Components/DeskReservation";
import { getDeskAvailability } from "@/Services/desk-service";


export function DeskAvailability({ userId }) {
    const { officeId, formattedDate } = useParams();
    const [desks, setDesks] = useState([]);


    useEffect(() => {
        getDesk();
    }, []);


    const getDesk = async () => {
        try {
            const data = await getDeskAvailability(officeId, formattedDate);
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
                            <h2 className="truncate text-gray-900 py-5 text-center mx-auto ">Desk {desk.name}</h2>
                            <div className="my-3 flex justify-evenly">
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