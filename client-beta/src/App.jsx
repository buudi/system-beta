import { Menu } from 'antd';
import 'antd/dist/reset.css';
import {Routes, Route, useNavigate} from "react-router-dom";
import Apartments from "./Apartments/Apartments.jsx";
import Dashboard from "./Dashboard/Dashboard.jsx";
import Sample from "./Sample/Sample";
import Landing from "./Sample/Landing.jsx";

const menuItems = [
    {label:"الشقق", key:"/"},
    {label: "شقة منفردة", key: "/apartments"},
    {label: "Dashboard", key:"/dashboard"},
    {label: "Profile", key: "/profile"},
    {label: "Sign out", key:"signOut"}
];

const handleClick = (key, navigate) => {
    if (key !== "signOut") {
        navigate(key);
    }
}
const MenuContent = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<div><Apartments /></div>}></Route>
                <Route path="/dashboard" element={<Dashboard />}></Route>
                <Route path="/apartments" element={<div><Landing /></div>}></Route>
                <Route path={"/apartments/:id"} element={<div><Sample /></div>}></Route>
                <Route path="/profile" element={<div>Profile</div>}></Route>

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