
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
