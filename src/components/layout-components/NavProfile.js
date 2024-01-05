import React from 'react';
import { Dropdown, Avatar } from 'antd';
import { useDispatch } from 'react-redux'
import { LogoutOutlined, LockOutlined } from '@ant-design/icons';
import NavItem from './NavItem';
import Flex from 'components/shared-components/Flex';
import { signOut } from 'store/slices/authSlice';
import styled from '@emotion/styled';
import { FONT_WEIGHT, MEDIA_QUERIES, SPACER, FONT_SIZES } from 'constants/ThemeConstant'
import { BASE_URL_IMAGE } from 'configs/AppConfig';
import { signInUserData } from 'mock/data/authData';
import { useNavigate } from 'react-router-dom';
const Icon = styled.div(() => ({
	fontSize: FONT_SIZES.LG
}))

const Profile = styled.div(() => ({
	display: 'flex',
	alignItems: 'center'
}))

const UserInfo = styled('div')`
	padding-left: ${SPACER[2]};

	@media ${MEDIA_QUERIES.MOBILE} {
		display: none
	}
`

const Name = styled.div(() => ({
	fontWeight: FONT_WEIGHT.SEMIBOLD
}))

const Title = styled.span(() => ({
	opacity: 0.8
}))

// const MenuItem = (props) => (
// 	<Flex as="a" href={props.path} alignItems="center" gap={SPACER[2]}>
// 		<Icon>{props.icon}</Icon>
// 		<span>{props.label}</span>
// 	</Flex>
// )

const MenuItemSignOut = (props) => {

	const dispatch = useDispatch();

	const handleSignOut = () => {
		dispatch(signOut())
	}

	return (
		<div onClick={handleSignOut}>
			<Flex alignItems="center" gap={SPACER[2]} >
				<Icon>
					<LogoutOutlined />
				</Icon>
				<span>{props.label}</span>
			</Flex>
		</div>
	)
}
const MenuItemChangePassword = (props) => {
		const navigate = useNavigate()
	
	const handleSignOut = () => {
		navigate("/dashboards/change-password")
	}

	return (
		<div onClick={handleSignOut}>
			<Flex alignItems="center" gap={SPACER[2]} >
				<Icon>
					<LockOutlined />
				</Icon>
				<span>{props.label}</span>
			</Flex>
		</div>
	)
}



const items = [
	{
		key: 'Change Password',
		label: <MenuItemChangePassword label="Change Password" />,
	},
	{
		key: 'Sign Out',
		label: <MenuItemSignOut label="Sign Out" />,
	}
]

export const NavProfile = ({mode}) => {
	const imgsrc = signInUserData.profile || `${BASE_URL_IMAGE}/img/avatars/profile.png`;
	
	return (
		<Dropdown placement="bottomRight" menu={{items}} trigger={["click"]}>
			<NavItem mode={mode}>
				<Profile>
					{<Avatar src={imgsrc} /> }
					<UserInfo className="profile-text">
						<Name>{signInUserData.name}</Name>
						<Title>{signInUserData.email}</Title>
					</UserInfo>
				</Profile>
			</NavItem>
		</Dropdown>
	);
}

export default NavProfile
