import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input, Alert, Row, Col, DatePicker, Select, Radio } from "antd";
import { signUp, showAuthMessage, showLoading, hideAuthMessage } from 'store/slices/authSlice';
import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion"
import masterService from 'services/MasterService';

const rules = {
	email: [
		{ 
			required: true,
			message: 'Please input your email address'
		},
		{ 
			type: 'email',
			message: 'Please enter a validate email!'
		}
	],
	password: [
		{ 
			required: true,
			message: 'Please input your password'
		}
	],
	confirm: [
		{ 
			required: true,
			message: 'Please confirm your password!'
		},
		({ getFieldValue }) => ({
			validator(_, value) {
				if (!value || getFieldValue('password') === value) {
					return Promise.resolve();
				}
				return Promise.reject('Passwords do not match!');
			},
		})
	]
}
const { Option } = Select;
export const RegisterForm = (props) => {
	const dateFormat = "DD/MM/YYYY";
	const { signUp, showLoading, token, loading, redirect, message, showMessage, hideAuthMessage, allowRedirect = true } = props
	const [form] = Form.useForm();
	const [countryList, setCountryList] = useState([]);

	const navigate = useNavigate();

	const listCountryData = () => {
		const reqeustParam = {};
		try {
		  const resp = masterService.getCountry(reqeustParam);
		  resp
			.then((res) => {
			  //console.log(res.data)
			  setCountryList(res.data);
			})
			.catch((err) => {});
		} catch (errors) {
		  console.log(errors);
		}
	  };
	const onSignUp = () => {
    	form.validateFields().then(values => {
			showLoading()
      //console.log(values)
			signUp(values)
		}).catch(info => {
			console.log('Validate Failed:', info);
		});
	}

	useEffect(() => {
		listCountryData()
		if (token !== null && allowRedirect) {
			navigate(redirect)
		}
		if (showMessage) {
			const timer = setTimeout(() => hideAuthMessage(), 3000)
			return () => {
				clearTimeout(timer);
			};
		}
	}, []);
	
	return (
		<>
			<motion.div 
				initial={{ opacity: 0, marginBottom: 0 }} 
				animate={{ 
					opacity: showMessage ? 1 : 0,
					marginBottom: showMessage ? 20 : 0 
				}}> 
				<Alert type="error" showIcon message={message}></Alert>
			</motion.div>
			<Form form={form} layout="vertical" name="register-form" onFinish={onSignUp}>
			<Row className="" gutter={16}>
			<Col xs={24} sm={24} md={12}>
                <Form.Item
                  name="first_name"
                  label="First Name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter first name!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Form.Item
                  name="last_name"
                  label="Last Name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter last name!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Form.Item name="middle_name" label="Middel Name">
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Form.Item
                  name="dob"
                  label="Date of Birth"
                  rules={[
                    {
                      required: true,
                      message: "Please enter date of birth!",
                    },
                  ]}
                >
                  <DatePicker format={dateFormat} className="w-100" />
                </Form.Item>
              </Col>
			  <Col xs={24} sm={24} md={12}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your email!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={12}>
                <Form.Item
                  name="mobile"
                  label="Mobile"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your mobile!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12}>
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
                                                </Col>
                                                <Col xs={24} sm={24} md={12}>
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
                                                </Col>

              <Col xs={24} sm={24} md={12}>
                <Form.Item
                  label="Country"
                  name="country_id"
                  rules={[
                    {
                      required: true,
                      message: "Please select country!",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder="Select Country"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {countryList &&
                      countryList.map((countrylist, index) => {
                        return (
                          <Option
                            key={`country${index}`}
                            value={countrylist.id}
                          >
                            {countrylist.name}
                          </Option>
                        );
                      })}
                  </Select>
                </Form.Item>
              </Col>
			  <Col xs={24} sm={24} md={12}>
                <Form.Item name="gender" label="Gender">
                  <Radio.Group>
                    <Radio value="Male">Male</Radio>
                    <Radio value="Female">Female</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>

				</Row>
				<Form.Item>
					<Button type="primary" htmlType="submit" block loading={loading}>
						Sign Up
					</Button>
				</Form.Item>
			</Form>
		</>
	)
}

const mapStateToProps = ({auth}) => {
	const { loading, message, showMessage, token, redirect } = auth;
  return { loading, message, showMessage, token, redirect }
}

const mapDispatchToProps = {
	signUp,
	showAuthMessage,
	hideAuthMessage,
	showLoading
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm)
