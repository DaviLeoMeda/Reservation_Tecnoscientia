import axios from "axios";
import { API_ROOT } from "./api-config";

export async function createReservation(deskId, date, amOrPm) {
    try {
        const response = await axios.post(`${API_ROOT}/reservations`, {
            desk_id: deskId,
            date: date,
            am_or_pm: amOrPm,
        });

        console.log('Response from post', response);
        return response.data;

    } catch (error) {
        console.error('Errore durante la creazione della prenotazione:', error);
        throw error;
    }
};

export async function deleteReservation(reservationId) {
    try {
        const response = await axios.delete(`${API_ROOT}/reservations/${reservationId}`);

        console.log('Response from delete', response);
        return response;

    } catch (error) {
        console.error('Errore durante la cancellazione della prenotazione:', error);
        throw error;
    }
}

export async function listMyReservations() {
    const response = await fetch(`${API_ROOT}/reservations`);
    const data = await response.json();
    return data;
}
