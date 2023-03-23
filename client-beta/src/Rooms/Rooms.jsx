import {Table, Button, Breadcrumb} from "antd"
import dataSource from "./seedData.js";
import AddRoom from "./AddRoom"
import {useState, useEffect} from "react";
import {useParams, Link} from "react-router-dom";

const columns = [
    {
        title: "رقم الغرفة",
        dataIndex: "roomNumber",
        key: "roomNumber",
    },
    {
        title: "اسم المستأجر",
        dataIndex: "tenantName",
        key: "tenantName",
    },

    {
        title: "رقم الهاتف",
        dataIndex: "tenantNumber",
        key: "tenantNumber",
    },
    {
        title: "رقم الهوية",
        dataIndex: "tenantEID",
        key: "tenantEID",
    },
    {
        title: "الإيجار (درهم)",
        dataIndex: "rent",
        key: "rent",
    },
    {
        title: "تاريخ السكن",
        dataIndex: "settleIn",
        key: "settleIn",
    },
    {
        title: "العقد الحالي",
        dataIndex: "contractStart",
        key: "contractStart",
    },
    {
        title: "نهاية العقد (استحقاق)",
        dataIndex: "contractEnd",
        key: "contractEnd",
    },
];

const _style_sampleComp = {
    margin: 50,
    padding: 50
};

const Rooms = (props) => {
    const id = useParams().id;

    const [roomsData, setRoomsData] = useState([]);
    const [keyCount, setKeyCount] = useState(1);
    const [aptTitle, setAptTitle] = useState(`شقة ${id}`);


    // TODO: remake the handleAddition to add tenant to the database
    const handleAddition = (values) => {
        setKeyCount(keyCount+1);
        let temp = [
            {
                key:keyCount, // to be removed
                roomNumber: values.roomNumber,
                tenantName: values.tenantName,
                tenantNumber: values.tenantNumber,
                tenantEID: values.tenantEID,
                rent: values.rent,
                settleIn: values.settleIn,
                contractEnd: values.contractEnd,
            },
        ];
        setRoomsData(roomsData.concat(temp));
    };


    // START: refactored code based on chat gpt suggestions
    const findApartmentById = (apartments, id) => {
        return apartments.find(apartment => apartment.apt_id === parseInt(id));
    };

    const filterRoomsByApartmentId = (rooms, id) => {
        return rooms.filter(room => room.apt_id === parseInt(id));
    };

    const filterTenantsByRoomId = (tenants, roomId) => {
        return tenants.filter(tenant => tenant.room_id === roomId);
    };

    const convertDate = (date) => {
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    };

    const mapTenantToPreviewData = (roomNumber, tenant) => {
        return {
            key: tenant.room_id,
            roomNumber: roomNumber,
            tenantName: tenant.name,
            tenantNumber: tenant.phone_number,
            tenantEID: tenant.emirates_id,
            rent: 2000,
            settleIn: "2023-03-23",
            contractStart: "2023-03-23",
            contractEnd: "2023-04-23",
        };
    };
    useEffect(()=>{
        const { rooms, tenants, apartments } = props.data;

        const apartment = findApartmentById(apartments, id);

        if (!apartment) {
            console.log("apartment not found!!");
            return;
        }

        const selectedRooms = filterRoomsByApartmentId(rooms, id);

        const selectedTenants = selectedRooms.reduce((result, room) => {
            const tenantsInRoom = filterTenantsByRoomId(tenants, room.room_id);
            return [...result, ...tenantsInRoom];
        }, []);

        const dataToPreview = selectedTenants.map(tenant => {
            const room = selectedRooms.find(room => room.room_id === tenant.room_id);
            return mapTenantToPreviewData(room.room_number, tenant);
        });

        setRoomsData(dataToPreview);
        setAptTitle(`شقة ${apartment.building_name} ${apartment.apt_number}`);
    },[props.data]);

    const _titleH1 = aptTitle;
    return (
        <div className="sample-comp" style={_style_sampleComp}>
            <Breadcrumb
                style={{paddingBottom:20}}
                items={[
                    {
                        title: <Link to={'/'}>جميع الشقق</Link>,
                    },
                    {
                        title: _titleH1,
                    },
                ]}
            />

            <h1 style={{display:"flex", flexDirection: "row-reverse"}}>{_titleH1}</h1>
            <AddRoom handleAddition={handleAddition}/>
            {/*<Button onClick={handleClick}>Check Console</Button>*/}
            <Table  dataSource={roomsData} columns={columns}/>

        </div>
    );
};

export default  Rooms;