import { ReservationDetails } from "@/Components/ReservationDetails";
import { listMyReservations } from "@/Services/reservation-service";
import { useEffect, useState } from "react";

export function MyReservations({ }) {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        (async () => {
            const data = await listMyReservations();
            setReservations(data);
        })();
    },
        []);


    return (<>
        <header className="bg-white shadow p-4 text-center">
            <h1>My Reservations</h1>
        </header>
        <section>
            <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-2">
                {reservations.map(r => (
                    <li className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow p-8"
                        key={r.id}>
                        <ReservationDetails reservation={r} />
                    </li>
                ))}
            </ul>
        </section>
    </>
    );

}