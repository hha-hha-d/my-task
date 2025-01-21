import axios from "axios";

import { WORKING_URL } from "../../variables/mysqlDB";


export default async function  searchPerson (value) {
    console.log(value)
    if(value.length !== 0) {
        return axios.post(`${WORKING_URL + '/search_person'}`, {
            token: sessionStorage.getItem('token'),
            value
        });
    }

}