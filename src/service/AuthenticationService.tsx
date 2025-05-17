import axios from 'axios'

const API_URL = import.meta.env.REACT_APP_API_URL

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
export const VISITOR = 'visitor'
export const ADMIN = 'admin'
export const AUTH1 = 'auth1'
export const AUTH2 = 'auth2'

function AuthenticationService () {

    function executeLogin(username, password) {
        return axios.get(`${API_URL}/user/login`,
            {
                headers: {
                    authorization: this.createBasicAuthToken(username, password)
                }
            }
        )
    }

    function setAuthorities(authorities) {
        if (authorities.includes("READ_PRIVILEGE")) {
            sessionStorage.setItem(VISITOR, true)
        }
        if (authorities.includes("WRITE_PRIVILEGE")) {
            sessionStorage.setItem(ADMIN, true)
        }
    }

   function isAdmin() {
        return sessionStorage.getItem(ADMIN);
    }

    function setAuth(username, password) {
        sessionStorage.setItem(AUTH1, username)
        sessionStorage.setItem(AUTH2, password)
    }

    function  getAuth1() {
        return sessionStorage.getItem(AUTH1)
    }

    function getAuth2() {
        return sessionStorage.getItem(AUTH2)
    }

    function getAuth() {
        return {
            authorization: this.createBasicAuthToken(this.getAuth1(), this.getAuth2())
        }
    }

    function  getAxiosConfig() {
        return {
            headers: {
                "Content-Type": "application/json",
            },
            authorization: this.createBasicAuthToken(this.getAuth1(), this.getAuth2())
        }
    }

    function  createBasicAuthToken(username, password) {
        return 'Basic ' + window.btoa(username + ":" + password)
    }

    function  registerSuccessfulLogin(username, password) {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
        this.setupAxiosInterceptors(this.createBasicAuthToken(username, password))
        this.setAuth(username, password)
    }

    function  logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        sessionStorage.removeItem(AUTH1);
        sessionStorage.removeItem(AUTH2);
        sessionStorage.setItem(ADMIN, 'false');
    }

    function   isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) {
            return false
        } else {
            return true
        }
    }

    function    getLoggedInUserName() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) {
            return ''
        } else {
            return user
        }
    }

    function   setupAxiosInterceptors(token) {
        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    config.headers.authorization = token
                }
                return config
            }
        )
    }
}

export default new AuthenticationService()

