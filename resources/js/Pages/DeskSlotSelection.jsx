import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { DeskReservation } from "@/Components/DeskReservation";
import { getDeskAvailability } from "@/Services/desk-service";


export function DeskSlotSelection({ userId }) {
    const { officeId, formattedDate } = useParams();
    const [desks, setDesks] = useState([]);


    useEffect(() => {
        const loadDeskAvailability = async () => {
            try {
                const data = await getDeskAvailability(officeId, formattedDate);
                setDesks(data);
            } catch (error) {
                console.error('Errore durante il recupero degli uffici:', error);
            }
        };

        loadDeskAvailability();
    }, []);


    return (
        <>
            <header className="bg-white shadow p-4 text-center">
                <h1>Desk Availability</h1>
            </header>
            <section>
                <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-2">
                    {desks.map((desk) => (
                        <li key={desk.id} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
                            <div className="flex-1 truncate">
                                <h2 className="truncate text-gray-900 py-5 text-center mx-auto ">Desk {desk.name}</h2>
                                <div className="my-3 flex justify-evenly">
                                    <DeskReservation currentUser={userId} deskState={desk.am} amOrPm='morning' />
                                    <DeskReservation currentUser={userId} deskState={desk.pm} amOrPm='afternoon' />
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </>
    );

}