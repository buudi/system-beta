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
    const [selectedAptRooms, setSelectedAptRooms] = useState([]);
    const [keyCount, setKeyCount] = useState(1);
    const [aptTitle, setAptTitle] = useState(`شقة ${id}`);


    // TODO: remake the handleAddition to add tenant to the database

    const postData = async (data) => {
        const response = await fetch("http://localhost:3000/tenant/addTenant",{
            method: "POST",
            mode: "cors",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data)
        });
        console.log(response.json());
        setKeyCount(keyCount+1);
    }
    const handleAddition = (values) => {
        let temp = {
            aptId: id,
            roomNumber: values.roomNumber,
            tenantName: values.tenantName,
            tenantEID: values.tenantEID,
            tenantNumber: parseInt(values.tenantNumber),
            rent: parseInt(values.rent),
            settleIn: values.settleIn,
            contractEnd: values.contractEnd,
        };
        // setRoomsData(roomsData.concat(temp));
        postData(temp);

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
        date = new Date(date);
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    };

    const mapTenantToPreviewData = (roomNumber, tenant, contract) => {
        return {
            key: tenant.room_id, // since multiple tenants can have the same room_id this won't work anymore
            roomNumber: roomNumber,
            tenantName: tenant.name,
            tenantNumber: tenant.phone_number,
            tenantEID: tenant.emirates_id,
            rent: parseInt(contract.rent),
            settleIn: convertDate(tenant.date_settle_in),
            contractStart: convertDate(contract.contract_start) ,
            contractEnd: convertDate(contract.contract_end) ,
        };
    };
    useEffect( ()=>{
        const { rooms, tenants, apartments, contracts } =  props.data;

        const apartment =  findApartmentById(apartments, id);


        // do not remove! the below if statement is essential
        if (!apartment) {
            // console.log("apartment not found!!");
            // until apartment is filled with a value, the if statement will return outside, the useEffect
            //  will update itself once apartments data has been successfully fetched.
            return;
        }

        const selectedRooms = filterRoomsByApartmentId(rooms, id);
        setSelectedAptRooms(selectedRooms);

        const selectedTenants = tenants.filter(tenant => tenant.apt_id === parseInt(id));
        const selectTheContract = (tenant_id) => {
            return contracts.filter(contract => contract.active && contract.tenant_id === tenant_id );
        }

        // console.log("look here:", selectTheContract("e2f068f7-c490-4e66-9984-ebf51254630a") );

        const dataToPreview = selectedTenants.map(tenant => {
            const room = selectedRooms.find(room => room.room_id === tenant.room_id);
            const selectedContract = selectTheContract(tenant.tenant_id);
            return mapTenantToPreviewData(room.room_number, tenant, selectedContract[0]);
        });

        setRoomsData(dataToPreview);
        setAptTitle(`شقة ${apartment.building_name} ${apartment.apt_number}`);
    },[props.data, keyCount]);

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
            <AddRoom handleAddition={handleAddition} selectedAptRooms={selectedAptRooms}/>
            {/*<Button onClick={handleClick}>Check Console</Button>*/}
            <Table  dataSource={roomsData} columns={columns}/>

        </div>
    );
};

export default  Rooms;