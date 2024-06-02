import { SelectionBreadcrumb } from '@/Components/SelectionBreadcrumb';
import { getOffices } from '@/Services/desk-service';
import { useEffect, useState } from 'react';
import { FaBuilding } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function OfficeSelection() {
	const [offices, setOffices] = useState([]);

	useEffect(() => {
		loadOffices();
	}, []);

	const loadOffices = async () => {
		try {
			const data = await getOffices();
			setOffices(data);
		} catch (error) {
			console.error('Errore durante il recupero degli uffici:', error);
		}
	};

	return (

		<>
			<div className='m-auto w-full'>
				<nav>
					<SelectionBreadcrumb />
				</nav>

			</div>
			<section>
				<ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-2">
					{offices.map((office) => (
						<li key={office.id} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
							<Link to={`/offices/${office.id}/dates`} className="flex w-full justify-center items-center space-x-6 p-6">
								<FaBuilding />
								&nbsp;
								{office.name}
							</Link>
						</li>
					))}
				</ul>
			</section>
		</>
	);
}