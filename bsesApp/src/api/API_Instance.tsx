import axios from "axios";
import { API_BASE_URL } from "./ApiConfig";

export const apiWithNoHeaders = async(endPoint : string, data : any) => {
    const response = await axios({
        method : "POST",
        url : API_BASE_URL + endPoint,
        data : data
    })
    return response
}

export const apiWithHeaders = async(endPoint : string, data : any) => {
    const response = await axios({
        method : "POST",
        headers : {
            "device-type" : "mobile"
        },
        url : API_BASE_URL + endPoint,
        data : data
    })
    return response
}