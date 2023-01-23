const axios = require('axios');

const BASE_URL = 'http://127.0.0.1:8000/api';
const TOKEN = 'bb88b67fc082959d9bd1a257c3586e6dc2ccbedc';
const USER_ID = 378231953517577948

async function get_users() {
    try {
        const response = await axios.get(`${BASE_URL}/users/`);
        return response.data;
    } catch (error) {
        throw error.response.data
    }
}

async function get_token({ username, password }) {
    try {
        const response = await axios.post(`${BASE_URL}/api-token-auth/`, {
            username,
            password
        })
        return response.data
    } catch (error) {
        throw (error.response.data)
    }
}

async function get_user({ token, id }) {
    try {
        const response = await axios.get(`${BASE_URL}/users/${id}/`, {
            headers: {
                Authorization: `Token ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw (error.response.data)
    }
}

// get_token({ username: 'test2', password: 'test1234' }).then(res => console.log(res)).catch(err => console.error('Error: ', err))
// get_user({ id: USER_ID, token: TOKEN }).then(res => console.log(res)).catch(err => console.error('Error: ', err))

console.log(USER_ID)