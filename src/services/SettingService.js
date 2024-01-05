import fetch from "auth/FetchMasterInterceptor";


const SettingService = {}

SettingService.getMenu = function (data) {
	return fetch({
		url: '/setting/menu',
		method: 'post',
		data: data
	})
}

SettingService.getUser = function (data) {
	return fetch({
		url: '/user/list',
		method: 'post',
		data: data
	})
}

SettingService.getDetails = function (data) {
	return fetch({
		url: '/user/details',
		method: 'post',
		data: data
	})
}

SettingService.updateDetails = function (data) {
	return fetch({
		url: '/user/update',
		method: 'post',
		data: data
	})
}

SettingService.AddUser = function (data) {
	return fetch({
		url: '/user/create',
		method: 'post',
		data: data
	})
}

SettingService.deleteUser = function (data) {
	return fetch({
		url: '/user/delete',
		method: 'post',
		data: data
	})
}

SettingService.updateUser = function (data) {
	return fetch({
		url: '/user/edit',
		method: 'post',
		data: data
	})
}

//update permission status active / inactive
SettingService.updatePermission = function (data) {
	return fetch({
		url: '/permissions/edit',
		method: 'post',
		data: data
	})
}

SettingService.notification = function (data) {
	return fetch({
		url: '/notification/list',
		method: 'post',
		data: data
	})
}

export default SettingService;