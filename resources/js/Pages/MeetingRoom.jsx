import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import { Link, Route, Routes, useParams } from 'react-router-dom';

import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import { Calendar } from 'primereact/calendar';
import Desk from '../Pages/OfficeReservation';
        
        

export default function MeetingRoom() 
{

    const [date, setDate] = useState(null);
    const [showCalendar, setShowCalendar] = useState(false);

    
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
    };



    return (
        <div className="card flex justify-content-center">
            <Calendar value={date} onChange={(e) => setDate(e.value)} inline showWeek />
        </div>
          
        
      );
}