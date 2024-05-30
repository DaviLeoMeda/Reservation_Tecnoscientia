import { format } from 'date-fns';
import { Calendar } from 'primereact/calendar';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';



export default function OfficeReservation({ userId }) {

  const [date, setDate] = useState(null);
  const [formattedDate, setFormattedDate] = useState('');

  const { officeId } = useParams();
  let numberOffice = officeId;

  useEffect(() => {
    console.log(date);
  }, [date]);

  const handleDateChange = (e) => {
    setDate(e.value);
    const formattedDateValue = format(e.value, 'yyyy-MM-dd');
    setFormattedDate(formattedDateValue);
  };

  const createReservation = async () => {
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

  return (
    <div className="flex justify-center">

      <div>
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

        {formattedDate && <Link to={`/offices/${numberOffice}/${formattedDate}`} onClick={createReservation} className="text-white flex justify-center">
          <div className="mt-7 p-3 bg-blue-700 rounded-full border-double border-4 border-x-white text-center ">
            <span>Prenota per <em>{formattedDate}</em></span>
          </div>
        </Link>
        }
      </div>

    </div>
  );
}