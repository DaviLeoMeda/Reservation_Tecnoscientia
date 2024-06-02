import { API_ROOT } from "./api-config";
export let officeCache = {};

export async function getOfficeName(officeId) {
    if (!(officeId in officeCache)) {
        const response = await fetch(`${API_ROOT}/offices/${officeId}`);
        const data = await response.json();
        officeCache[officeId] = data;
    }

    return officeCache[officeId].name;
}

export async function getOffices() {
    const response = await fetch(`${API_ROOT}/offices`);
    const data = await response.json();

    data.forEach(o => {
        officeCache[o.id] = o;
    });

    return data;
}

