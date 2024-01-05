import React, { useState } from 'react'
import { Card, Row, Col, Form, Input, Button, message } from "antd";
import { MailOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { BASE_URL_IMAGE } from 'configs/AppConfig';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from 'services/AuthService';

const backgroundStyle = {
	backgroundImage: `url(${BASE_URL_IMAGE}/img/others/img-17.jpg)`,
	backgroundRepeat: 'no-repeat',
	backgroundSize: 'cover'
}

const ForgotPassword = () => {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const theme = useSelector(state => state.theme.currentTheme)

	const onSend = values => {
		setLoading(true)
		setTimeout(() => {
		
		//console.log(values)	
		const reqeustParam = {};
		const resp = AuthService.forgotPassword(values);
      	resp
        .then((res) => {
          //console.log(res)
		  setLoading(false)
			if(res.status === 200){
				navigate("/reset-password")
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
									<img className="img-fluid" src={`${BASE_URL_IMAGE}/img/${theme === 'light' ? 'color-logo.png': 'color-logo.png'}`} alt="" />
									<h3 className="mt-3 font-weight-bold">Forgot Password?</h3>
									<p className="mb-4">Enter your Email to reset password</p>
								</div>
								<Row justify="center">
									<Col xs={24} sm={24} md={20} lg={20}>
										<Form form={form} layout="vertical" name="forget-password" onFinish={onSend}>
											<Form.Item 
												name="email" 
												
												rules={
													[
														{ 
															required: true,
															message: 'Please input your email address'
														},
														{ 
															type: 'email',
															message: 'Please enter a validate email!'
														}
													]
												}>
												<Input placeholder="Email Address" prefix={<MailOutlined className="text-primary" />}/>
												
											</Form.Item>
											
											<Form.Item style={{marginBottom:'0px'}}>
												<Button loading={loading} type="primary" htmlType="submit" block>{loading? 'Sending' : 'Send'}</Button>
											</Form.Item>
											<Link to="/login">Log In</Link>
										</Form>
									</Col>
								</Row>
							</div>
						</Card>
					</Col>
				</Row>
			</div>
		</div>
	)
}

export default ForgotPassword

