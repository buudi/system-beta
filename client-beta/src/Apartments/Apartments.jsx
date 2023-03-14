import {useState, useEffect} from "react";
import {Button} from 'antd';
import ApartmentsTable from "./ApartmentsTable.jsx";
import AddApartment from "./AddApartment.jsx";

const ApartmentStyles = {
    margin: 50,
    padding: 50
}
const Apartments = (props) => {
    const [apartmentsData, setApartmentsData] = useState([]);
    const [keyCount, setKeyCount] = useState(apartmentsData.length + 1);

    useEffect(()=>{
        const { apartments } = props.data;
        const newArr = apartments.map(item=>({
            key: item.apt_id,
            building: item.building_name,
            apartmentNumber: item.apt_number,
            rooms: item.total_rooms,
            revenue: 5000,
            expenses: 2000
        }));
        setApartmentsData(newArr);
    },[props.data.apartments])

    const handleAddition = (values) => {
        setKeyCount(keyCount+1);
        let temp = [{
            key:keyCount,
            building: values.building,
            apartmentNumber: values.apartmentNumber,
            rooms: values.rooms,
            revenue: 5000,
            expenses: 2000,
        },];
        setApartmentsData(apartmentsData.concat(temp));
    };
    const handleCheckConsole = () => {
        console.log(apartmentsData);
    }

    const textTitle_ = "جميع الشقق"
    return (
         <div className="apartments" style={ApartmentStyles}>
            <h1 style={{display: 'flex', flexDirection:"row-reverse"}}>{textTitle_}</h1>
             <AddApartment dataSource={apartmentsData} handleAddition={handleAddition}/>
             <Button onClick={handleCheckConsole}>Check Console</Button>
             <ApartmentsTable dataSource={apartmentsData} />
         </div>
    );
};
export default Apartments;
