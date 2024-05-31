import { Link } from 'react-router-dom';

export default function NavigationBar() {
    return <nav className="py-6 bg-white shadow flex justify-end">
        <Link className='px-10' to="/offices">
            Desks per day
        </Link>
        <Link className='px-10' to="/my-reservations">
            My Reservations
        </Link>
    </nav>
}