import { format } from 'date-fns';
import { Calendar } from 'primereact/calendar';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';



export default function OfficeReservation() {

  const [date, setDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [formattedDate, setFormattedDate] = useState('');

  const { officeId } = useParams();
  let numberOffice = officeId;




  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  useEffect(() => {
    setShowCalendar(true);
  }, []);

  useEffect(() => {
    console.log(date);
  }, [date]);

  const handleDateChange = (e) => {
    setDate(e.value);
    const formattedDateValue = format(e.value, 'dd-MM-yyyy');
    setFormattedDate(formattedDateValue);
  };

  return (
    <div className="flex justify-center">

      <div>
        {showCalendar && (
          <div className="bg-blue-200 p-3 rounded-xl">
            <h3 className="mb-5">Seleziona una data:</h3>
            <Calendar
              value={date}
              onChange={handleDateChange}
              inline={true}
              showWeek
              style={{ width: '100%', fontSize: '16px' }}
            />
          </div>

        )}
        {formattedDate && <Link to={`/offices/${numberOffice}/${formattedDate}`} className="text-white flex justify-center">
          <div className="mt-7 p-3 bg-blue-700 rounded-full border-double border-4 border-x-white text-center ">
            <span>Prenota per <em>{formattedDate}</em></span>
          </div>
        </Link>
        }
      </div>

    </div>
  );
}