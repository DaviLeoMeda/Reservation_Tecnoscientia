import NavigationBar from '@/Components/NavigationBar';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Route, Routes } from 'react-router-dom';
import { DeskAvailability } from './DeskAvailability';
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
					<div role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-1">
						<Routes>
							<Route path="/offices/*">
								<Route index element={<OfficesTable />} />
								<Route path=":officeId" element={<OfficeReservation userId={auth.user.id}  />} />
								<Route path=":officeId/:formattedDate" element={<DeskAvailability userId={auth.user.id}/>} />
							</Route>
							<Route path="/meetingroom" element={<MeetingRoom />} />
      						  
						</Routes>
					</div>

					
					
				</div>
			</div>
		</AuthenticatedLayout>
	);
}
