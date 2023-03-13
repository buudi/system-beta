import {useState} from "react";
import {Button, Form, Input, Modal} from "antd";


const AddRoom = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    }
    const handleOK = () => {
        setIsModalOpen(false);
    }
    const handleCancel = () => {
        setIsModalOpen(false);
    }

    const onFinish = (values) => {
        console.log('Success:', values);
        props.handleAddition(values);
        handleOK();
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
        roomNumber: "رقم الغرفة",
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
                onCancel={handleCancel}
                maskClosable={false}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>{_ar1.cancelText}</Button>
                ]}
            >
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
                        name="roomNumber"
                        rules={[
                            {
                                required: true,
                                message: arText.buildingMsgText,
                            },
                        ]}
                    >
                        <Input />
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
                        name="contractStart"
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
        </div>
    );
}

export default AddRoom;