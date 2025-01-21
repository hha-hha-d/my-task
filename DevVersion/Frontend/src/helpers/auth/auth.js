import axios from "axios";

import { WORKING_URL } from "../../variables/mysqlDB";
import { AUTH_ROUTE } from "../../variables/mysqlDB";


export default async function  auth ({login, password}) {
    return axios.post(`${WORKING_URL + AUTH_ROUTE}`, {
        login,
        password
    });
}