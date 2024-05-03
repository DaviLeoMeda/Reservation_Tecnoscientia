import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {

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
		<AuthenticatedLayout
			user={auth.user}
			header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
		>
			<Head title="Dashboard" />

			<div className="py-12">
				<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
					<div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-10">
						<div className="p-6 text-gray-900">You're logged in!</div>

					</div>

					<ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-2">
    				  {offices.map((office) => (
    				    <li key={office.id} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
    				      	<a href='#' className="flex w-full items-center justify-between space-x-6 p-6">
    				      	  	<div className="flex-1 truncate">
    				      	  	  <div className="flex items-center space-x-3">
    				      	  	    <h3 className="truncate text-sm font-medium text-gray-900">{office.name}</h3>
    				      	  	  </div>
    				      	  	</div>
								<div>
									<span>Reservations ---&gt; </span>
								</div> 
    				      	</a>
    				    </li>
    				  ))}
    				</ul>
					<div className="mt-6 flex justify-center">
						<ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-1 w-1/2">
    					    <li className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
    					      	<a href='#' className="flex items-center justify-between space-x-6 p-6">
    					      	  	<div className="flex-1 truncate">
    					      	  	  <div className="flex items-center space-x-3">
    					      	  	    <h3 className="truncate text-sm font-medium text-gray-900">Meeting Room</h3>
    					      	  	  </div>
    					      	  	</div> 
									<div>
									  	<span>Reservations ---&gt; </span>
									</div>
    					      	</a>
    					    </li>
    					</ul>
					</div>
				</div>
			</div>
		</AuthenticatedLayout>
	);
}
