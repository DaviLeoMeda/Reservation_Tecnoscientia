import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { DeskReservation } from "@/Components/DeskReservation";
import { createReservation, getDeskAvailability, cancelReservation } from "@/Services/desk-service";

import { ConfirmPopup } from 'primereact/confirmpopup';
import { confirmPopup } from 'primereact/confirmpopup';
import { Toast } from 'primereact/toast';
import { useRef } from "react";


export function DeskSlotSelection({ userId }) {
    const { officeId, formattedDate } = useParams();
    const [desks, setDesks] = useState([]);

    const toast = useRef(null);


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

    const confirmReservationCreation = (target, deskName, amOrPm) => {
        return new Promise((resolve, reject) => {
            confirmPopup({
                target: target,
                message: `Are you sure you want to book '${deskName}' for ${amOrPm}?`,
                icon: 'pi pi-info-circle',
                accept: () => {
                    resolve(true);
                },
                reject: () => {
                    resolve(false);
                }
            });
        });
    }

    const confirmReservationCancellation = (target, deskName, amOrPm) => {
        return new Promise((resolve, reject) => {
            confirmPopup({
                target: target,
                message: `Are you sure you want to cancel the reservation for '${deskName}' in the ${amOrPm}?`,
                icon: 'pi pi-info-circle',
                accept: () => {
                    resolve(true);
                },
                reject: () => {
                    resolve(false);
                }
            });
        });
    };


    const handleNewReservation = (deskId, deskName, amOrPm) => async (event) => {

        const desk = desks.find(d => d.id === deskId);
        const slot = desk[amOrPm];

        
        const confirmed = await confirmReservationCreation(event.currentTarget, deskName, amOrPm);
        if (!confirmed) {
            toast.current.show({ severity: 'warn', summary: 'Cancelled', detail: 'Reservation cancelled' });
            return;
        }
        let newReservation = null;
        try {
            newReservation = await createReservation(userId, deskId, formattedDate, amOrPm);
            if (!newReservation) {
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Reservation could not be created' });
                return;
            }
        } catch (error) {
            console.error('Errore durante la creazione della prenotazione:', error);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Reservation not created' });
            return;
        }
        setDesks((prevDesks) => {
            return prevDesks.map((desk) => {
                if (desk.id === deskId) {
                    return {...desk, [amOrPm]: {status: userId, reservation_id: newReservation.reservation_id}};
                }
                return desk;
            });
        });

            toast.current.show({ severity: 'success', summary: 'Success', detail: 'Reservation created' });
    };

    const handleCancelReservation = (deskId, deskName, amOrPm) => async (event) => {

        const desk = desks.find(d => d.id === deskId);
        const slot = desk[amOrPm];

        if (slot.status !== 'free' && slot.status === userId) {
            const confirmed = await confirmReservationCancellation(event.currentTarget, deskName, amOrPm);
            if (!confirmed) {
                toast.current.show({ severity: 'warn', summary: 'Cancelled', detail: 'Cancellation cancelled' });
                return;
            }

            try {
                const cancelled = await cancelReservation(slot.reservation_id);
                if (!cancelled) {
                    toast.current.show({ severity: 'error', summary: 'Error', detail: 'Reservation could not be cancelled' });
                    return;
                }
            } catch (error) {
                console.error('Errore durante la cancellazione della prenotazione:', error);
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Reservation not cancelled' });
                return;
            }

            setDesks((prevDesks) => {
                return prevDesks.map((desk) => {
                    if (desk.id === deskId) {
                        return {
                            ...desk,
                            [amOrPm]: { status: 'free', reservation_id: null }
                        };
                    }
                    return desk;
                });
            });

            toast.current.show({ severity: 'success', summary: 'Success', detail: 'Reservation cancelled' });
        } else {

        }

    };

    return (
        <>
            <header className="bg-white shadow p-4 text-center">
                <h1>Desk Availability</h1>
            </header>
            <Toast ref={toast} />
            <ConfirmPopup />
            <section>
                <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-2">
                    {desks.map((desk) => (
                        <li key={desk.id} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
                            <div className="flex-1 truncate">
                                <h2 className="truncate text-gray-900 py-5 text-center mx-auto ">Desk {desk.name}</h2>
                                <div className="my-3 flex justify-evenly">
                                    <DeskReservation
                                        currentUser={userId}
                                        deskState={desk.am.status}
                                        amOrPm='morning'
                                        onReserve={handleNewReservation(desk.id, desk.name, 'am')}
                                        onCancel={handleCancelReservation(desk.id, desk.name, 'am')}
                                    />
                                    <DeskReservation
                                        currentUser={userId}
                                        deskState={desk.pm.status}
                                        amOrPm='afternoon'
                                        onReserve={handleNewReservation(desk.id, desk.name, 'pm')}
                                        onCancel={handleCancelReservation(desk.id, desk.name, 'pm')}
                                    />
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </>
    );

}