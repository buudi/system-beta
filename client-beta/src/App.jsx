import { Menu } from 'antd';
import 'antd/dist/reset.css';
import {useNavigate} from "react-router-dom";
import MenuContent from "./Menu/MenuContent.jsx";
import { menuItems } from "./Menu/menuItems.js";

const handleClick = (key, navigate) => {
    if (key !== "signOut") {
        navigate(key);
    }
};

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