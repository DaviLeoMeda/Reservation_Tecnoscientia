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

export async function createReservation(userId, formattedDate) {
    try {
      const response = await fetch('http://localhost:8000/api/postReservation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          desk_id: null,
          reservation_day: formattedDate,
          morning_busy: false,
          afternoon_busy: false,
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
