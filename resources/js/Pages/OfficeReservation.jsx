import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';

import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import { Calendar } from 'primereact/calendar';
        
        

export default function OfficeReservation() 
{

    const [date, setDate] = useState(null);
    const [showCalendar, setShowCalendar] = useState(false);
    
    const toggleCalendar = () => {
      setShowCalendar(!showCalendar);
    };
  
    return (
      <div>
        <button onClick={toggleCalendar}>Mostra calendario</button>
        {showCalendar && (
          <div>
            <h3>Seleziona una data:</h3>
            <Calendar
              value={date}
              onChange={(e) => setDate(e.value)}
              showIcon={true} // Mostra l'icona del calendario
              inline={true} // Mostra il calendario in modo fisso
            />
          </div>
        )}
      </div>
    );
}