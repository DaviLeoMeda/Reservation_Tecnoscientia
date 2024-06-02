import { getOfficeName } from "@/Services/office-service";
import { BreadCrumb } from 'primereact/breadcrumb';
import { useEffect } from 'react';
import { useState } from 'react';
import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';


export function SelectionBreadcrumb({ officeId, date }) {
    const [officeName, setOfficeName] = useState('???');

    useEffect(() => {
        const resolveOffice = async () => {
            const n = await getOfficeName(officeId);
            setOfficeName(n);
        }

        resolveOffice();
    }, [officeId]);

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