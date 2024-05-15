import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';


export function Desk() {
    const { officeId , formattedDate } = useParams();
    const [desks, setDesks] = useState([]);


    useEffect(() => {
        getDesk();
    }, []);


    const getDesk = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/getDesk');
            const data = await response.json();
            setDesks(data);
            console.log(desks)
        } catch (error) {
            console.error('Errore durante il recupero degli uffici:', error);
        }
    };




    return (

        <>

            <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-2">
      	    	{desks.filter(desk => desk.office_id === parseInt(officeId)).map((desk) => (
      	    	  <li key={desk.id} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
      	    	      <div className="flex-1 truncate">
      	    	        <div className="flex items-center space-x-3 text-center">
      	    	          <h3 className="truncate text-sm font-medium text-gray-900 py-5 text-center">Desk {desk.name}</h3>
      	    	        </div>
      	    	      </div>
      	    	  </li>
      	    	))}
    	    </ul>
        </>
        // <div>
        //     Ecco il Desk

        //     <p>Office n° {officeId}</p>  
        //     <p>Date selected {formattedDate}</p>
        // </div>
    );

}