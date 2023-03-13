import { Menu } from 'antd';
import 'antd/dist/reset.css';
import {Routes, Route, useNavigate} from "react-router-dom";
import Apartments from "./Apartments/Apartments.jsx";
import Dashboard from "./Dashboard/Dashboard.jsx";
import Rooms from "./Rooms/Rooms.jsx";
import Landing from "./Rooms/Landing.jsx";
import {useEffect, useState} from "react";

const menuItems = [
    {label:"الشقق", key:"/"},
    {label: "شقة منفردة", key: "/apartments"},
    {label: "الغرف", key:"/rooms"},
    {label: "المستأجرين", key: "/tenants"},
    {label: "Sign out", key:"signOut"}
];

const handleClick = (key, navigate) => {
    if (key !== "signOut") {
        navigate(key);
    }
}
const MenuContent = () => {

    // general data pool
    // TODO: get all data from main_apartments, rooms, tenants

    const [apartmentsData, setApartmentsData] = useState([]);
    const [apartmentsExist, setApartmentsExist] = useState(false);

    const [roomsData, setRoomsData] = useState([]);
    const [roomsExist, setRoomsExist] = useState(false);

    const [tenantsData, setTenantsData] = useState([]);
    const [tenantsExist, setTenantsExist] = useState(false);

    useEffect(()=>{
        const fetchData = async () => {
            const response = await fetch("http://localhost:3000/general/apartments",{
                method: "GET",
            })
                .then(res=>res.json())
                .then(data=>{
                    setApartmentsData(data);
                    setApartmentsExist(true);
                });
        }
        fetchData();
    },[]);

    useEffect(()=>{
        const fetchData = async () => {
            const response = await fetch("http://localhost:3000/general/rooms",{
                method: "GET",
            })
                .then(res=>res.json())
                .then(data=>{
                    setRoomsData(data);
                    setRoomsExist(true);
                });
        }
        fetchData();
    },[]);

    useEffect(()=>{
        const fetchData = async () => {
            const response = await fetch("http://localhost:3000/general/tenants",{
                method: "GET",
            })
                .then(res=>res.json())
                .then(data=>{
                    setTenantsData(data);
                    setTenantsExist(true);
                });
        }
        fetchData();
    },[]);

    useEffect(()=>{
        if(apartmentsExist && roomsExist && tenantsExist){
            console.log(apartmentsData);
            console.log(roomsData);
            console.log(tenantsData);
        }
    },[apartmentsExist, roomsExist, tenantsExist]);

    return (
        <div>
            <Routes>
                <Route path="/" element={<div><Apartments /></div>}></Route>
                <Route path="/rooms" element={<Dashboard />}></Route>
                <Route path="/apartments" element={<div><Landing /></div>}></Route>
                <Route path={"/apartments/:id"} element={<div><Rooms /></div>}></Route>
                <Route path="/tenants" element={<div>Profile</div>}></Route>
            </Routes>
        </div>
    );
}
const App = () => {
    const navigate = useNavigate();

    return (
        <div style={{display: 'flex', flexDirection: "row-reverse"}}>
            <Menu
                items={menuItems}
                onClick={(item) => handleClick(item.key, navigate)}

            />
                <MenuContent />
            </div>
    );
}
export default App;