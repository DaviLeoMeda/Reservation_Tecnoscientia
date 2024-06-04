import NavigationBar from '@/Components/NavigationBar';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Route, Routes } from 'react-router-dom';
import DateSelection from './DateSelection';
import { DeskSlotSelection } from './DeskSlotSelection';
import { Landing } from './Landing';
import OfficeSelection from './OfficeSelection';
import { MyReservations } from './MyReservations';


export default function Root({ auth }) {
	return (
		<AuthenticatedLayout
			user={auth.user}
			header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
		>
			<NavigationBar />
			<Head title="Reservations" />

			<div className="py-6">
				<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
					<Routes>
						<Route path="/" element={<Landing />} />
						<Route path="/offices/*">
							<Route index element={<OfficeSelection />} />
							<Route path=":officeId/dates" element={<DateSelection userId={auth.user.id} />} />
							<Route path=":officeId/dates/:formattedDate/desks" element={<DeskSlotSelection userId={auth.user.id} />} />
						</Route>
						<Route path="/my-reservations" element={<MyReservations />} />
					</Routes>
				</div>
			</div>
		</AuthenticatedLayout>
	);
}
