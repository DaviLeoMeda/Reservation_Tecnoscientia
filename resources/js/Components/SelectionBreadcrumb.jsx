import { BreadCrumb } from 'primereact/breadcrumb';
import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';


export function SelectionBreadcrumb({ officeId, date }) {
    const officeName = '???';

    const items = [];
    if (officeId) {
        items.push({
            label: officeName,
            template: () => <span><Link to="/offices">Office</Link>: {officeName}</span>
        })


        if (date) {
            items.push({
                label: date,
                template: () => <span><Link to={`/offices/${officeId}/dates`}>Date</Link>: {date}</span>
            })
        } else {
            items.push({
                label: 'Dates'
            })
        }

    
    } else {
        items.push({
            label: 'Offices',
        })
    }

    const home = {
        template: () => <Link to={`/`}><FaHome /></Link>
    }

    return (
        <BreadCrumb className='my-4' home={home} model={items} />
    );
}