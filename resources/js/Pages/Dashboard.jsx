import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import { Link, Route, Routes } from 'react-router-dom';
import OfficeReservation from '../Pages/OfficeReservation';
import OfficesTable from '../Pages/OfficesTable';
import MeetingRoom from '../Pages/MeetingRoom';
import { Desk } from '../Pages/Desk';


export default function Dashboard({ auth }) {



	
	return (
		<AuthenticatedLayout
			user={auth.user}
			header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
		>

			<nav className="py-6 bg-white shadow flex justify-around">
				<div>
					<Link className='px-10' to="/dashboard">
						Dashboard
					</Link>
				</div>
				<div className="flex items-center">
					<Link className='px-10' to="/offices">
                        Offices
                    </Link>
                    <Link className='px-10' to="/meetingroom">
                        Meeting Room
                    </Link>
				</div>
			</nav>
			<Head title="Dashboard" />

			<div className="py-12">
				<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
					<div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-10">
						<div className="p-6 text-gray-900">You're logged in!</div>
					</div>


					<div role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-1">
						<Routes>
							<Route path="/" element={<Dashboard />} />
							<Route path="/offices">
								<Route index element={<OfficesTable />} />
								<Route path=":officeId" element={<OfficeReservation />} />
								<Route path=":officeId/:formattedDate" element={<Desk />} />
							</Route>
							<Route path="/meetingroom" element={<MeetingRoom />} />
      						  
						</Routes>
					</div>

					
					
				</div>
			</div>
		</AuthenticatedLayout>
	);
}
