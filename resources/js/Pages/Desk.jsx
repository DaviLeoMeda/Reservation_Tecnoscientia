import { useParams } from "react-router-dom";


export function Desk() {
    const { numberOffice , formattedDate } = useParams();




    return (

        <div>
            Ecco il Desk

            <p>Office n° {numberOffice}</p>  
            <p>Date selected {formattedDate}</p>
        </div>
    );

}