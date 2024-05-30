export function DeskReservation({ currentUser, deskState, amOrPm, onReserve, onCancel }) {
    let clazz = '';
    let message = '';
    let handler = null;

    if (deskState === 'free') {
        clazz = 'bg-lime-600 text-lime-200 border-lime-200';
        message = 'Reserve for ' + amOrPm;
        handler = onReserve;
    } else if (deskState == currentUser) {
        clazz = 'bg-yellow-400 text-orange-600 border-orange-600';
        message = 'Cancel for ' + amOrPm;
        handler = onCancel;
    } else {
        clazz = 'bg-red-600 text-red-200 border-red-200';
        message = 'Busy in the ' + amOrPm;
        handler = () => {};
    }

    return (
        <button 
            className={clazz + " p-2 rounded-xl w-48 border-2"}
            onClick={handler}
        >{message}</button>
    )
}