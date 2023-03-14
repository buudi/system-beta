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
        width: '15%',
    },
    {
        title: "اسم المستأجر",
        dataIndex: "tenantName",
        key: "tenantName",
        width: '15%',

    },

    {
        title: "رقم الهاتف",
        dataIndex: "tenantNumber",
        key: "tenantNumber",
        width: '15%',


    },
    {
        title: "رقم الهوية",
        dataIndex: "tenantEID",
        key: "tenantEID",
        width: '15%',

    },
    {
        title: "الإيجار (درهم)",
        dataIndex: "rent",
        key: "rent",
        width: '15',

    },
    {
        title: "بداية العقد",
        dataIndex: "contractStart",
        key: "contractStart",
        width: '15%',

    },
    {
        title: "نهاية العقد (استحقاق)",
        dataIndex: "contractEnd",
        key: "contractEnd",
        width: '10%',

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
                contractStart: values.contractStart,
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

    const mapTenantToPreviewData = (roomNumber, tenant) => {
        return {
            key: tenant.room_id,
            roomNumber: roomNumber,
            tenantName: tenant.name,
            tenantNumber: tenant.phone_number,
            tenantEID: tenant.emirates_id,
            rent: tenant.assigned_monthly_rent,
            contractStart: tenant.date_settle_in,

            // TODO: figure out the contractEnd
            contractEnd: "04_2023",
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

    // const handleClick = () => {
    //     const { rooms, tenants, apartments } = props.data;
    //
    //     const apartment = findApartmentById(apartments, id);
    //
    //     if (!apartment) {
    //         console.log("apartment not found!!");
    //         return;
    //     }
    //
    //     const selectedRooms = filterRoomsByApartmentId(rooms, id);
    //
    //     const selectedTenants = selectedRooms.reduce((result, room) => {
    //         const tenantsInRoom = filterTenantsByRoomId(tenants, room.room_id);
    //         return [...result, ...tenantsInRoom];
    //     }, []);
    //
    //     const dataToPreview = selectedTenants.map(tenant => {
    //         const room = selectedRooms.find(room => room.room_id === tenant.room_id);
    //         return mapTenantToPreviewData(room.room_number, tenant);
    //     });
    //
    //     setRoomsData(dataToPreview);
    //     setAptTitle(`شقة ${apartment.building_name} ${apartment.apt_number}`);
    // };

    // END

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