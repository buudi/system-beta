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

    const [roomsData, setRoomsData] = useState(dataSource);
    const [keyCount, setKeyCount] = useState(1);
    const [matches, setMatches] = useState(
        window.matchMedia("(min-width: 768px)").matches
    )


    useEffect(() => {
        window
            .matchMedia("(min-width: 768px)")
            .addEventListener('change', e => setMatches( e.matches ));
    }, []);

    const handleAddition = (values) => {
        setKeyCount(keyCount+1);
        let temp = [
            {
                key:keyCount,
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

    const handleClick = () => {
        const {rooms, tenants, apartments} = props.data;
        console.log("apartment data", apartments);
        console.log("rooms data: ", rooms);
        console.log("tenants data: ", tenants);
        let apt = {};
        for (let i = 0; i < apartments.length; i++){
            if (apartments[i].apt_id === parseInt(id)){
                apt = {
                    id: id,
                    building_name : apartments[i].building_name,
                    apt_number:  apartments[i].apt_number
                }
            }
        }
        if(Object.keys(apt).length === 0){
            console.log("apartment not found!!")
        } else {
            console.log("apt_data: ",  apt);
        }

        let selectedRooms = [];

        for (let i = 0; i < rooms.length; i++){
            if(rooms[i].apt_id === parseInt(id)){
                let room = rooms[i];
                selectedRooms.push({
                    room_id: room.room_id,
                    room_number: room.room_number
                })
            }
        }

        let selectedTenants = [];
        let dataToPreview = [];

        for (let i = 0; i < tenants.length; i++){
            for (let j = 0; j < selectedRooms.length; j++ ){
                if (tenants[i].room_id === selectedRooms[j].room_id && !selectedTenants.includes(tenants[i].name)){
                    let tenant = tenants[i];
                    selectedTenants.push({
                        tenant_id: tenant.tenant_id,
                        room_id: tenant.room_id,
                        room_number: selectedRooms[j].room_number,
                        name: tenant.name,
                        phone_number: tenant.phone_number,
                        emirates_id: tenant.emirates_id,
                        date_settle_in: tenant.date_settle_in,
                        assigned_monthly_rent : tenant.assigned_monthly_rent
                    });
                    dataToPreview.push({
                        key: selectedRooms[j].room_id,
                        roomNumber: selectedRooms[j].room_number,
                        tenantName: tenant.name,
                        tenantNumber: tenant.phone_number,
                        tenantEID: tenant.emirates_id,
                        rent: tenant.assigned_monthly_rent,
                        contractStart: tenant.date_settle_in,

                        // TODO: figure out the contractEnd
                        contractEnd: "04_2023",
                    })
                }
            }
        }

        setRoomsData(dataToPreview);
    }

    const _titleH1 = `شقة ${id}`;
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
            <Button onClick={handleClick}>Check Console</Button>
            <div>
                {matches && (
                    <div style={{width:'100%'}}>
                        <Table
                            dataSource={roomsData}
                            columns={columns}
                            scroll={{
                                x: 'max-content'
                            }} />
                    </div>
                )}
                {!matches && (
                    <div style={{width:200}}>
                        <Table
                            dataSource={roomsData}
                            columns={columns}
                            />
                    </div>
                )}
            </div>
        </div>
    );
};

export default  Rooms;