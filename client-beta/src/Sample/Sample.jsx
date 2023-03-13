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

const _ar = {
    text_addTenant: "اضافة مستأجر",
};

const Sample = () => {
    const id = useParams().id;
    const [roomsData, setRoomsData] = useState(dataSource);
    const [keyCount, setKeyCount] = useState(roomsData.length + 1);
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
            <Button onClick={()=>console.log(roomsData)}>Check Console</Button>
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
                            scroll={{
                                x: 1300
                            }} />
                    </div>
                )}
                {/*<Table*/}
                {/*    dataSource={roomsData}*/}
                {/*    columns={columns}*/}
                {/*    scroll={{*/}
                {/*        x: 'max-content'*/}
                {/*    }}*/}
                {/*/>*/}
            </div>
        </div>
    );
};

export default  Sample;