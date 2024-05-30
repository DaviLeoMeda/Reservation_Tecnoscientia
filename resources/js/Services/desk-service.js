import axios from "axios";

const API_ROOT = '/api';

export async function getDeskAvailability(officeId, date) {
  const response = await fetch(`${API_ROOT}/offices/${officeId}/desk-availability/${date}`);
  const data = await response.json();
  return data;
}

export async function getOffices() {
  const response = await fetch(`${API_ROOT}/offices`);
  const data = await response.json();
  return data;
}

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
