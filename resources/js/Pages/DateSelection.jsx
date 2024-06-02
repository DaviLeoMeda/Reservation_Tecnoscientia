import { SelectionBreadcrumb } from '@/Components/SelectionBreadcrumb';
import { format } from 'date-fns';
import { Calendar } from 'primereact/calendar';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';



export default function DateSelection({ userId }) {

  const [date, setDate] = useState(null);
  const [formattedDate, setFormattedDate] = useState('');


  const { officeId } = useParams();
  let numberOffice = officeId;

  useEffect(() => {
    console.log(date);
  }, [date]);

  const handleDateChange = (e) => {
    setDate(e.value);
    const formattedDateValue = format(e.value, 'yyyy-MM-dd');
    setFormattedDate(formattedDateValue);
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  return (
    <>
      <div className='m-auto'>
        <nav>
          <SelectionBreadcrumb officeId={numberOffice} />
        </nav>
      </div>

      <section className="flex items-center justify-evenly">
        <div className="m-auto bg-blue-200 p-3 rounded-xl">
          <Calendar
            value={date}
            onChange={handleDateChange}
            inline={true}
            minDate={tomorrow}
            style={{ fontSize: '16px' }}
          />
        </div>
        <div className="w-130 p-3 bg-blue-700 rounded-full border-x-white text-center text-white">
          {formattedDate ? (<Link to={`/offices/${numberOffice}/dates/${formattedDate}/desks`}>
            Check desk availability on <em>{formattedDate}</em>
          </Link>) : "Select a date"}
        </div>
      </section>

    </>

  );
}