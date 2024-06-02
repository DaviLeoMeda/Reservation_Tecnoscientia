import { API_ROOT } from "./api-config";

export async function getDeskAvailability(officeId, date) {
  const response = await fetch(`${API_ROOT}/offices/${officeId}/desk-availability/${date}`);
  const data = await response.json();
  return data;
}


