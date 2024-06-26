import NavigationBar from '@/Components/NavigationBar';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Route, Routes } from 'react-router-dom';
import { DeskSlotSelection } from './DeskSlotSelection';
import MeetingRoom from './MeetingRoom';
import DateSelection from './DateSelection';
import OfficeSelection from './OfficeSelection';
import { Landing } from './Landing';


export default function Root({ auth }) {
	return (
		<AuthenticatedLayout
			user={auth.user}
			header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
		>
			<NavigationBar />
			<Head title="Root" />

			<div className="py-12">
				<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
					<div role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-1">
						<Routes>
							<Route path="/" element={<Landing />} />
							<Route path="/offices/*">
								<Route index element={<OfficeSelection />} />
								<Route path=":officeId/dates" element={<DateSelection userId={auth.user.id}  />} />
								<Route path=":officeId/dates/:formattedDate/desks" element={<DeskSlotSelection userId={auth.user.id}/>} />
							</Route>
							<Route path="/meetingroom" element={<MeetingRoom />} />
      						  
						</Routes>
					</div>
				</div>
			</div>
		</AuthenticatedLayout>
	);
}
