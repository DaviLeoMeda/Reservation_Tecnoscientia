import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import { Link, Outlet, Route, Routes } from 'react-router-dom';
import OfficeReservation from './OfficeReservation';


export default function OfficesTable()
{


    const [offices, setOffices] = useState([]);

	useEffect(() => {
        getOffice();
    }, []);

	

	const getOffice = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/getOffice');
            const data = await response.json();
            setOffices(data);
        } catch (error) {
            console.error('Errore durante il recupero degli uffici:', error);
        }
    };




    return (
        <>
            <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-2">
      	    	{offices.map((office) => (
      	    	  <li key={office.id} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
      	    	    <Link to={`/offices/${office.id}`} className="flex w-full items-center justify-between space-x-6 p-6">
      	    	      <div className="flex-1 truncate">
      	    	        <div className="flex items-center space-x-3">
      	    	          <h3 className="truncate text-sm font-medium text-gray-900">{office.name} & {office.id}</h3>
      	    	        </div>
      	    	      </div>
      	    	      <div>
      	    	        <span>Reservations ---&gt; </span>
      	    	      </div> 
      	    	    </Link>
					<Outlet />
      	    	  </li>
      	    	))}
    	    </ul>
		    
            
        </>
    )
}