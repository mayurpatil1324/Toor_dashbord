import React, { useState } from 'react'
import { Card, Row, Col, Form, Input, Button, message, Result } from "antd";
import { MailOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { BASE_URL_IMAGE } from 'configs/AppConfig';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from 'services/AuthService';

const backgroundStyle = {
    backgroundImage: 'url(/img/others/img-17.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
}

const ResetPassword = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(true)
    const [showMessage, setShowMessage] = useState("")
    const navigate = useNavigate();
    const theme = useSelector(state => state.theme.currentTheme)

    const onSend = values => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            //console.log(values)	
            
            const resp = AuthService.resetPassword(values);
            resp
                .then((res) => {
                    //console.log(res)
                    if (res.status === 200) {
                        //console.log(res)
                        setShowForm(false)
                        setShowMessage(res.message)
                    }
                })
                .catch((err) => { });
            //message.success('New password has send to your email!');
        }, 1500);
    };

    return (
        <div className="h-100" style={backgroundStyle}>
            <div className="container d-flex flex-column justify-content-center h-100">
                <Row justify="center">
                    <Col xs={20} sm={20} md={20} lg={10}>
                        <Card>
                            <div className="my-2">
                                <div className="text-center">
                                    <img className="img-fluid" src={`${BASE_URL_IMAGE}/img/${theme === 'light' ? 'color-logo.png' : 'color-logo.png'}`} alt="" />
                                    {showForm &&
                                        <h3 className="mt-3 font-weight-bold">Reset Password?</h3>
                                    }
                                    { /* <p className="mb-4">Enter your Email to reset password</p> */}
                                </div>
                                <Row justify="center">
                                    {showForm &&
                                        <Col xs={24} sm={24} md={20} lg={20}>
                                            <Form form={form} layout="vertical" name="forget-password" onFinish={onSend}>
                                                <Form.Item
                                                    name="otp"
                                                    label="OTP"
                                                    rules={
                                                        [
                                                            {
                                                                required: true,
                                                                message: 'Please input your OTP'
                                                            }
                                                        ]
                                                    }>
                                                    <Input placeholder="OTP" />

                                                </Form.Item>
                                                <Form.Item
                                                    name="password"
                                                    label="Password"
                                                    rules={
                                                        [
                                                            {
                                                                required: true,
                                                                message: 'Please input your password'
                                                            }
                                                        ]
                                                    }>
                                                    <Input.Password placeholder="Password" />

                                                </Form.Item>
                                                <Form.Item
                                                    name="confirmpassword"
                                                    label="Confirm Password"
                                                    rules={
                                                        [
                                                            {
                                                                required: true,
                                                                message: 'Please confirm your password'
                                                            },
                                                            ({ getFieldValue }) => ({
                                                                validator(rule, value) {
                                                                    if (!value || getFieldValue('password') === value) {
                                                                        return Promise.resolve();
                                                                    }
                                                                    return Promise.reject('Password not matched!');
                                                                },
                                                            })
                                                        ]
                                                    }>
                                                    <Input.Password placeholder="Confirm Password" />

                                                </Form.Item>

                                                <Form.Item style={{ marginBottom: '0px' }}>
                                                    <Button loading={loading} type="primary" htmlType="submit" block>{loading ? 'Sending' : 'Send'}</Button>
                                                </Form.Item>
                                                <Link to="/login">Log In</Link>
                                            </Form>
                                        </Col>
                                    }
                                    {!showForm &&
                                        <Col xs={24} sm={24} md={20} lg={20}>

                                            <Result
                                                status="success"
                                                title={showMessage}
                                                subTitle=""
                                                extra={[
                                                    <Button type="primary" key="login" onClick={() => navigate(`/login`)}>
                                                        Go to Log In
                                                    </Button>,
                                                ]}
                                            />

                                        </Col>
                                    }
                                </Row>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default ResetPassword

