import React, { useState, useEffect } from 'react'
import { Button, message, Input, Row, Col, Card, Form, Select, Switch } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import masterService from 'services/MasterService';
import { useNavigate } from 'react-router-dom';
import { AUTH_DETAILS } from 'constants/AuthConstant';
import { useSelector } from 'react-redux';



const ADD = 'ADD'
const EDIT = 'EDIT'
const { Option } = Select;


const ChangePassword = () => {

    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [submitLoading, setSubmitLoading] = useState(false)
    
    useEffect(() => {
        
    }, []);

    

    const onFinish = () => {
        setSubmitLoading(true)
        form.validateFields().then(values => {
            setTimeout(() => {
                setSubmitLoading(false)
                
                const resp = masterService.changePassword(values);
                resp
                    .then((res) => {
                        //console.log(res)
                        if (res.status === 200) {
                            form.resetFields()
                            message.success(res.message);
                            const userDetail = JSON.parse(localStorage.getItem(AUTH_DETAILS));
                            if(userDetail.is_change == 0) {
                                userDetail.is_change = 1;
                                localStorage.setItem(AUTH_DETAILS, JSON.stringify(userDetail));
                                window.location.reload();
                            }
                        }
                    })
                    .catch((err) => { });
                    
                                    
                  
                  //navigate(`/dashboards/college`)

                    //message.success(`Product saved`);
                
            }, 1500);
        }).catch(info => {
            setSubmitLoading(false)
            console.log('info', info)
            message.error('Please enter all required field ');
        });
    };

    
    

    return (
        <>
            <Form
                layout="vertical"
                form={form}
                name="advanced_search"
                className="ant-advanced-search-form"
                
            >

                <div className="container123" >
                    <Card title={`Change Password`}>
                    <Row gutter={16}>
                    <Col xs={24} sm={24} md={8}></Col>
                    <Col xs={24} sm={24} md={8}>
                        <Row gutter={16}>
                            <Col xs={24} sm={24} md={24}>
                                <Form.Item name="current_password" label="Current Password"
                                 rules={
                                    [
                                        {
                                            required: true,
                                            message: 'Please input your current password'
                                        }
                                    ]
                                }
                                >
                                    <Input.Password />
                                </Form.Item>
                            </Col>
                            
                            <Col xs={24} sm={24} md={24}>
                                <Form.Item name="new_password" label="New Password"
                                 rules={
                                    [
                                        {
                                            required: true,
                                            message: 'Please input your new password'
                                        }
                                    ]
                                }
                                >
                                    <Input.Password />
                                </Form.Item>
                            </Col>
                            
                            <Col xs={24} sm={24} md={24}>
                                <Form.Item name="confirmpassword" label="Confirm Password"
                                rules={
                                    [
                                        {
                                            required: true,
                                            message: 'Please confirm your password'
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(rule, value) {
                                                if (!value || getFieldValue('new_password') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject('Password not matched!');
                                            },
                                        })
                                    ]
                                }
                                >
                                    <Input.Password />
                                </Form.Item>
                            </Col>
                                     



                        </Row>

                        <Row>
                            <Col xs={24} sm={24} md={12}>
                                <Button type="primary" onClick={() => onFinish()} htmlType="submit" loading={submitLoading} >
                                    Save
                                </Button>
                            </Col>
                        </Row>
                        </Col>
                        <Col xs={24} sm={24} md={8}></Col>
                        
                        
                        </Row>


                    </Card>
                </div>
            </Form>
        </>
    )
}

export default ChangePassword
