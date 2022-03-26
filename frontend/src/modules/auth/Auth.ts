import axios from "axios";
import { LOGIN_URL, SIGNUP_URL } from "../constants";
import { User } from "../user/User";

export interface AuthRoot {
    tokens: Tokens;
    user: User;
}

export interface Tokens {
    refresh: string;
    access: string;
}


export const Login = async (username: string, password: string) => {
    var loginresponse: any
    await axios.post<AuthRoot>(LOGIN_URL, { username: username, password: password })
        .then(response => {
            loginresponse = response.data
        })

    return loginresponse
}
export const Signup = async (username: string, password: string, email: string, password2: string, agreeterms: string) => {
    var Signupresponse: any
    await axios.post<AuthRoot>(SIGNUP_URL, { username: username, email: email, password: password, password2: password2, agreeterms: agreeterms })
        .then(response => {
            Signupresponse = response.data
        })

    return Signupresponse
}
