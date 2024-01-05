import React from 'react'
import RegisterForm from '../../components/RegisterForm'
import { Card, Row, Col } from "antd";
import { useSelector } from 'react-redux'
import { BASE_URL_IMAGE } from 'configs/AppConfig';

const backgroundStyle = {
	backgroundImage: `url(${BASE_URL_IMAGE}/img/others/img-17.jpg)`,
	backgroundRepeat: 'no-repeat',
	backgroundSize: 'cover'
}

const RegisterOne = props => {
	const theme = useSelector(state => state.theme.currentTheme)
	return (
		<div className="" style={backgroundStyle}>
			<div className="container d-flex flex-column justify-content-center">
				<Row justify="center">
					<Col xs={20} sm={20} md={20} lg={18}>
						<Card>
							<div className="">
								<div className="text-center">
								<img className="img-fluid" src={`${BASE_URL_IMAGE}/img/${theme === 'light' ? 'color-logo.png': 'color-logo.png'}`} alt="" />
									<p>New Student Registration</p>
								</div>
								<Row justify="center">
									<Col xs={24} sm={24} md={20} lg={20}>
										<RegisterForm {...props}/>
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

export default RegisterOne
