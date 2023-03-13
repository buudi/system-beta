import {Button, Input, Form} from "antd";
import {useNavigate} from "react-router-dom";

const Landing = () => {

    const navigate = useNavigate();
    const onFinish = (values) => {
        console.log('Success:', values);
        navigate(`/apartments/${values.apartmentNumber}`);
        // location = (`/apartments/${values.apartmentNumber}`);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const _textTitle = "ادخل رقم الشقة";
    return (
        <div className={"landing"} style={{padding: 30, margin: 30}} >
            <div className={"landingTitle"} style={{display:"flex", flexDirection: "row-reverse"}}>
                <h1>{_textTitle}</h1>
            </div>
            <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <div style={{display:"flex", flexDirection: "row-reverse"}}>
                    <p>{":رقم الشقة"}</p>
                    <Form.Item
                        name={"apartmentNumber"}
                        rules={[
                            {
                                required: true,
                                message: 'Please input Apartment Number',
                            },
                        ]}
                    >
                        <div style={{marginRight:5}}>
                            <Input />
                        </div>
                    </Form.Item>
                </div>

                <Form.Item>
                    <div className={"proceedButton"} style={{display:"flex",flexDirection:"row-reverse"}}>
                        <Button
                            type={"primary"}
                            htmlType={"submit"}
                        > {"نفذ"} </Button>
                    </div>

                </Form.Item>
            </Form>


        </div>
    );
}

export default Landing;