import { format } from "date-fns"
import './ReservationDetails.css';
import { FaBuilding, FaClock, FaDesktop, FaRegCalendar } from 'react-icons/fa';

const formatDate = d => format(d, 'EEEE, MMM do')
const formatTimeSlot = m => m ? 'morning' : 'afternoon'


export function ReservationDetails({ reservation: r }) {
    return (
        <div>
            <div>
                <span className="field-label"><FaRegCalendar /></span>
                <span className="field-value">{formatDate(r.reservation_day)}</span>
            </div>
            <div>
                <span className="field-label"><FaClock /> </span>
                <span className="field-value">{formatTimeSlot(r.morning_busy)}</span>
            </div>
            <div>
                <span className="field-label"><FaBuilding /></span>
                <span className="field-value">{r.desk.office.name}</span>
            </div>
            <div>
                <span className="field-label"><FaDesktop /> </span>
                <span className="field-value">{r.desk.name}</span>
            </div>
        </div>
    )
}