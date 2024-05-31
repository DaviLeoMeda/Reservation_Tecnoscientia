import { Link } from 'react-router-dom';

export default function NavigationBar() {
    return <nav className="py-6 bg-white shadow flex justify-around">
        <div>
            <Link className='px-10' to="/">
                Dashboard
            </Link>
        </div>
        <div className="flex items-center">
            <Link className='px-10' to="/offices">
                Desks per day
            </Link>
            <Link className='px-10' to="/my-reservations">
                My Reservations
            </Link>
        </div>
    </nav>
}