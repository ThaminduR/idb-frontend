import cookies from 'js-cookie'
import axios from 'axios'
import { API_BASE_URL } from '../constants/constants'
import { createContext, useContext } from 'react';

export const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function getUser() {
    const jwt = cookies.get('authtoken')
    try {
        if (jwt) {
            const username = cookies.get('username')
            return username
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}



export function logout() {
    axios.post(API_BASE_URL + 'logout')
    cookies.remove('authtoken')
    cookies.remove('username')
}