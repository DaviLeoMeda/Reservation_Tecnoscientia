export function DeskReservation({ currentUser, deskState, amOrPm }) {
    let clazz = '';
    let message = '';

    console.log("currentUser and state", currentUser, deskState);

    if (deskState === 'free') {
        clazz = 'bg-emerald-300';
        message = 'Reserve for ' + amOrPm;
    } else if (deskState == currentUser) {
        clazz = 'bg-yellow-300';
        message = 'Cancel reservation';
    } else {
        clazz = 'bg-red-600';
        message = 'Busy'
    }
    
    return (
        <button className={clazz +" p-2 rounded-xl"}>{message}</button>
    )
}