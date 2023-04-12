import React, {useState, useEffect} from "react";
import {Button, Form, Input, Modal, Select} from "antd";

const AddRoom = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [vacantRooms, setVacantRooms] = useState([]);
    const [isError, setIsError] = useState(false);

    useEffect(() => {

        // the below code filters room based on whether they're vacant, however
        // there is still no useful case where we need to use vacantRooms
        if(props.selectedAptRooms.length != 0){
            const filteredRooms = props.selectedAptRooms.filter(room => room.vacant === true);
            setVacantRooms(filteredRooms);
        }
    },[props.selectedAptRooms]);

    // the below useEffect is just for testing, you can remove it later if you wish
    useEffect(()=>{
        // console.log("from the useEffect, ", vacantRooms);
    },[vacantRooms])

    const showModal = () => {
        setIsModalOpen(true);
    }
    const handleOK = () => {
        setIsModalOpen(false);
    }
    const handleCancel = () => {
        setIsModalOpen(false);
    }
    const handleChange = (value, option) => {
        if (option.disabled){
            alert("DON'T!!!");
        }
        console.log(`selected ${value}`);
    };

    // const handleSelect = (value, option) => {
    //     if (option.disabled){
    //         alert("DON'T!!!");
    //     }
    //     console.log(`selected ${value}`);
    // };

    const onFinish = async (values) => {
        console.log('Success:', values);
        const handleResponse = await props.handleAddition(values);
        if (handleResponse.type === "error"){
            setIsError(true);
        } else {
            setIsError(false);
            handleOK();
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const _style_addRoom = {
        display: "flex",
        flexDirection: "row-reverse",
        paddingBottom: 10
    };

    const _ar1 = {
        ButtonText: "اضافة مستأجر",
        ModalTitleText: "اضافة مستأجر في بناية الاندلس",
        cancelText: "إلغاء",
        roomNumber: "اختر رمز الغرفة",
        roomNumber2: "او ادخل  رمز الغرفة يدوياً",
        tenantName: "اسم المستأجر",
        tenantNumber: "رقم هاتف المستأجر",
        tenantEID: "رقم الهوية",
        rent: "الإيجار",
        contractStart: "بداية العقد",
        contractEnd: "نهاية العقد (استحقاق)",
    };
    const _ar2 = {};
    const arText = {
        ButtonText: "اضافة شقة جديدة",
        ModalTitleText: "اضافة شقة جديدة",
        cancelText: "إلغاء",
        buildingNameText: "اسم البناية",
        buildingMsgText: "الرجاء إدخال اسم البناية!",
        apartmentNumberText: "رقم الشقة",
        apartmentNumberMsgText: "الرجاء إدخال رقم الشقة!",
        addressText: "العنوان",
        addressMsgText: 'الرجاء إدخال العنوان!',
        addBtnText: "إضافة",
    }


    return (
        <div
            className="addRoom"
            style={_style_addRoom}>
            <Button
                type="primary"
                onClick={showModal}
            > + {_ar1.ButtonText}</Button>
            <Modal
                title={_ar1.ModalTitleText}
                open={isModalOpen}
                onCancel={handleCancel} // for the X button on top
                maskClosable={false}
                footer={[
                    // the الغاء button at the bottom
                    <Button key="cancel" onClick={handleCancel}>{_ar1.cancelText}</Button>
                ]}
            >
                {
                    isError && (
                        <h1> error error error !!! </h1>
                    )
                }
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >

                    <Form.Item
                        label={_ar1.roomNumber}
                        name={"roomNumber"}
                        rules={[{
                            required: true,
                            message: arText.buildingMsgText,
                        }]}

                    >
                        <Select
                            // defaultValue="lucy"
                            style={{ width: 120 }}
                            onChange={handleChange}
                            // onSelect={handleSelect}

                            options={props.selectedAptRooms.map(room => ( room.vacant ? (
                                    {
                                        value: room.room_number,
                                        label: room.room_number,
                                    }
                                ) : (
                                    {
                                        value:room.room_number,
                                        label: room.room_number,
                                        disabled: true,
                                        title: "Dont just dont!!"
                                    }
                                )
                                )
                            )}
                        />
                    </Form.Item>

                    <Form.Item
                        label= {_ar1.tenantName}
                        name="tenantName"
                        rules={[
                            {
                                required: true,
                                message: arText.apartmentNumberMsgText,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label= {_ar1.tenantNumber}
                        name="tenantNumber"
                        rules={[
                            {
                                required: true,
                                message: arText.addressMsgText,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label= {_ar1.tenantEID}
                        name="tenantEID"
                        rules={[
                            {
                                required: true,
                                message: arText.addressMsgText,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label= {_ar1.rent}
                        name="rent"
                        rules={[
                            {
                                required: true,
                                message: arText.addressMsgText,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label= {_ar1.contractStart}
                        name="settleIn"
                        rules={[
                            {
                                required: true,
                                message: arText.addressMsgText,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label= {_ar1.contractEnd}
                        name="contractEnd"
                        rules={[
                            {
                                required: true,
                                message: arText.addressMsgText,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            {arText.addBtnText}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Button onClick={() => console.log("vacant",vacantRooms)}>check console</Button>
        </div>
    );
}

export default AddRoom;