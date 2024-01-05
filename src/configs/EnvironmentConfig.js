const dev = {
  API_ENDPOINT_URL: 'http://192.168.0.139:18000/api'
};

const prod = {
  API_ENDPOINT_URL: 'http://192.168.0.139:18000/api'
};

const test = {
  API_ENDPOINT_URL: 'http://192.168.0.139:18000/api'
};

const getEnv = () => {
	switch (process.env.NODE_ENV) {
		case 'development':
			return dev
		case 'production':
			return prod
		case 'test':
			return test
		default:
			break;
	}
}

export const env = getEnv()
