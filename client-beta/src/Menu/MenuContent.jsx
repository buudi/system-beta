import {useState, useEffect} from "react";
import { Routes, Route} from "react-router-dom";
import { fetchAllData } from "../api.js";
import Rooms from "../Rooms/Rooms.jsx";
import Landing from "../Rooms/Landing.jsx";
import Dashboard from "../Dashboard/Dashboard.jsx";
import Apartments from "../Apartments/Apartments.jsx";

const MenuContent = () => {
    const [data, setData] = useState({ apartments: [], rooms: [], tenants: [] });

    useEffect(() => {
        const fetchData = async () => {
            const { apartmentsResponse, roomsResponse, tenantsResponse, contractsResponse } = await fetchAllData();
            setData({
                apartments: apartmentsResponse,
                rooms: roomsResponse,
                tenants: tenantsResponse,
                contracts: contractsResponse
            });
        };

        fetchData();
    }, []);

    useEffect(() => {
        const { apartments, rooms, tenants } = data;
        if (apartments.length && rooms.length && tenants.length) {
            console.log(apartments);
            console.log(rooms);
            console.log(tenants);
        }
    }, [data]);

    return (
        <div>
            <Routes>
                <Route path="/" element={<Apartments data={data} />} />
                <Route path="/rooms" element={<Dashboard />} />
                <Route path="/apartments" element={<Landing />} />
                <Route path="/apartments/:id" element={<Rooms data={data}/>} />
                <Route path="/tenants" element={"Profile"} />
            </Routes>
        </div>
    );
};

export default MenuContent;