import fetch from 'auth/FetchInterceptor'

const AuthService = {}

AuthService.login = function (data) {
	//console.log(data)
	
	return fetch({
		url: '/auth/login',
		method: 'post',
		data: data
	})
}

AuthService.register = function (data) {
	return fetch({
		url: '/auth/register',
		method: 'post',
		data: data
	})
}

AuthService.logout = function () {
	return fetch({
		url: '/auth/logout',
		method: 'post'
	})
}

AuthService.loginInOAuth = function () {
	return fetch({
		url: '/auth/loginInOAuth',
		method: 'post'
	})
}

AuthService.forgotPassword = function (data) {
	return fetch({
		url: '/auth/password/email',
		method: 'post',
		data: data
	})
}
AuthService.resetPassword = function (data) {
	return fetch({
		url: '/auth/password/verify',
		method: 'post',
		data: data
	})
}



export default AuthService;