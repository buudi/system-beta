import {Button, Modal, Form, Input} from "antd";
import {useState} from "react";
const AddApartment = (props) => {
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

    const _style_addApartment = {
        display: "flex",
        flexDirection: "row-reverse",
        paddingBottom: 10
    };

    const arText = {
        ButtonText: "اضافة شقة جديدة",
        ModalTitleText: "اضافة شقة جديدة",
        cancelText: "إلغاء",
        buildingNameText: "اسم البناية",
        buildingMsgText: "الرجاء إدخال اسم البناية!",
        apartmentNumberText: "رقم الشقة",
        apartmentNumberMsgText: "الرجاء إدخال رقم الشقة!",
        roomsText: "عدد الغرف",
        roomsMsgText: 'الرجاء إدخال عدد الغرف!',
        addBtnText: "إضافة",
    }

    return (
        <div
            className="addApartment"
            style={_style_addApartment}>
            <Button
                type="primary"
                onClick={showModal}
            > + {arText.ButtonText}</Button>
            <Modal
                title={arText.ModalTitleText}
                open={isModalOpen}
                onCancel={handleCancel}
                maskClosable={false}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>{arText.cancelText}</Button>
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
                        label={arText.buildingNameText}
                        name="building"
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
                        label= {arText.apartmentNumberText}
                        name="apartmentNumber"
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
                        label= {arText.roomsText}
                        name="rooms"
                        rules={[
                            {
                                required: true,
                                message: arText.roomsMsgText,
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

export default AddApartment;