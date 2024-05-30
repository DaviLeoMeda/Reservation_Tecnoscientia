import NavigationBar from '@/Components/NavigationBar';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Desk } from '../Pages/Desk';
import MeetingRoom from '../Pages/MeetingRoom';
import OfficeReservation from '../Pages/OfficeReservation';
import OfficesTable from '../Pages/OfficesTable';


export default function Dashboard({ auth }) {



	
	return (
		<AuthenticatedLayout
			user={auth.user}
			header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
		>
			<NavigationBar />
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