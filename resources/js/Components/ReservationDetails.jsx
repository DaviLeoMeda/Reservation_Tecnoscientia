import { format } from "date-fns"
import './ReservationDetails.css';

const formatDate = d => format(d, 'EEEE, MMM do')
const formatTimeSlot = m => m ? 'morning' : 'afternoon'


export function ReservationDetails({ reservation: r }) {
    return (
        <div>
            <div>
                <span className="field-label">Date: </span>
                <span className="field-value">{formatDate(r.reservation_day)}</span>
            </div>
            <div>
                <span className="field-label">Office: </span>
                <span className="field-value">{r.desk.office.name}</span>
            </div>
            <div>
                <span className="field-label">Desk: </span>
                <span className="field-value">{r.desk.name}</span>
            </div>
            <div>
                <span className="field-label">Time: </span>
                <span className="field-value">{formatTimeSlot(r.morning_busy)}</span>
            </div>
        </div>
    )
}