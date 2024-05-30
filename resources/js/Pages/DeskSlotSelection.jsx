import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { DeskReservation } from "@/Components/DeskReservation";
import { createReservation, deleteReservation, getDeskAvailability } from "@/Services/desk-service";

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

    const promptForConfirmation = (target, message) => {
        return new Promise((resolve) => {
            confirmPopup({
                target: target,
                message: message,
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


    const confirmReservationCreation = (target, deskName, amOrPm) => {
        return promptForConfirmation(target, `Are you sure you want to reserve '${deskName}' for ${amOrPm}?`);
    }

    const confirmReservationDeletion = (target, deskName, amOrPm) => {
        return promptForConfirmation(target, `Are you sure you want to delete reservation for '${deskName}' for ${amOrPm}?`);
    }

    const handleNewReservation = (deskId, deskName, amOrPm) => async (event) => {
        const confirmed = await confirmReservationCreation(event.currentTarget, deskName, amOrPm);
        if (!confirmed) {
            toast.current.show({ severity: 'warn', summary: 'Cancelled', detail: 'Reservation cancelled' });
            return;
        }

        let newReservation = null;
        try {
            newReservation = await createReservation(deskId, formattedDate, amOrPm);
            if (!newReservation) {
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Reservation could not be created' });
                return;
            }
        } catch (error) {
            console.error('Errore durante la creazione della prenotazione:', error);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'An error occurred: reservation not created' });
            return;
        }

        setDesks((prevDesks) => {
            return prevDesks.map((desk) => {
                if (desk.id === deskId) {
                    return { ...desk, [amOrPm]: { user: userId, reservation: newReservation.id } };
                }
                return desk;
            });
        });

        toast.current.show({ severity: 'success', summary: 'Success', detail: 'Reservation created' });
    };

    const handleDeleteReservation = (deskId, deskName, reservation, amOrPm) => async (event) => {
        const confirmed = await confirmReservationDeletion(event.currentTarget, deskName, amOrPm);
        if (!confirmed) {
            toast.current.show({ severity: 'warn', summary: 'Cancelled', detail: 'Operation cancelled' });
            return;
        }

        try {
            const deleteResponse = await deleteReservation(reservation.reservation);
            if (!deleteResponse) {
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Reservation could not be deleted' });
                return;
            }
        } catch (error) {
            console.error('Errore durante la cancellazione della prenotazione:', error);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'An error occurred: reservation not deleted' });
            return;
        }

        setDesks((prevDesks) => {
            return prevDesks.map((desk) => {
                if (desk.id === deskId) {
                    return { ...desk, [amOrPm]: [] };
                }
                return desk;
            });
        });

        toast.current.show({ severity: 'success', summary: 'Success', detail: 'Reservation deleted' });
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
                                        deskState={desk.am}
                                        amOrPm='morning'
                                        onReserve={handleNewReservation(desk.id, desk.name, 'am')}
                                        onDelete={handleDeleteReservation(desk.id, desk.name, desk.am, 'am')}
                                    />
                                    <DeskReservation
                                        currentUser={userId}
                                        deskState={desk.pm}
                                        amOrPm='afternoon'
                                        onReserve={handleNewReservation(desk.id, desk.name, 'pm')}
                                        onDelete={handleDeleteReservation(desk.id, desk.name, desk.pm, 'pm')}
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