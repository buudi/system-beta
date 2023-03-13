import {useState, useEffect} from "react";
import {Button} from 'antd';
import ApartmentsTable from "./ApartmentsTable.jsx";
import AddApartment from "./AddApartment.jsx";
import dataSource from "./seedData.js";

const ApartmentStyles = {
    margin: 50,
    padding: 50
}
const Apartments = () => {
    const [apartmentsData, setApartmentsData] = useState([]);
    const [fetchedData, setFetchedData] = useState([]);
    const [dataExists, setDataExists] = useState(false);
    const [keyCount, setKeyCount] = useState(apartmentsData.length + 1);

    useEffect( () => {
        const fetchData = async () => {
            const response = await fetch("http://localhost:3000/general/apartments", {
                method: "GET",
            })
                .then(res=>res.json())
                .then(data=>{
                    setFetchedData(data);
                    setDataExists(true);
                });
        };
        fetchData();
    }, []);
    useEffect(()=>{
        const newArr = fetchedData.map(item=>({
            key: item.apt_id,
            building: item.building_name,
            apartmentNumber: item.apt_number,
            rooms: item.total_rooms,
            revenue: 5000,
            expenses: 2000
        }));
        setApartmentsData(newArr);
    },[fetchedData])

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
        console.log(dataExists);
        console.log(apartmentsData);
        console.log(fetchedData);
    }

    const textTitle_ = "جميع الشقق"
    return (
         <div className="apartments" style={ApartmentStyles}>
            <h1 style={{display: 'flex', flexDirection:"row-reverse"}}>{textTitle_}</h1>
             <AddApartment dataSource={apartmentsData} handleAddition={handleAddition}/>
             <Button onClick={handleCheckConsole}>Check Console</Button>
             <ApartmentsTable dataSource={apartmentsData} dataExists={dataExists}/>
         </div>
    );
};
export default Apartments;
