import axios from 'axios'
import { API_BASE_URL } from '../constants/constants'
import { logout } from './AuthenticationService'

export function handleresponse(res) {
    if (res.data.code === 401) {
        axios.post(API_BASE_URL + 'refreshjwt')
            .then(function (response) {
                if (response.data.code === 401) {
                    logout();
                    location.reload(true)
                } else {
                    return res.data
                }
            })
    }
    else {
        return res.data
    }
}