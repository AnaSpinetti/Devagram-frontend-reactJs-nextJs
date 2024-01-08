import { LoaderHelper } from "@/helpers/LoaderHelper";
import axios from "axios";

export default class HttpService{
    constructor(){
        this.axios = axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_URL + '/api'
        });

        this.reqCounter = 0;
        this.axios.interceptors.request.use((config) =>{
            this.reqCounter++;
            if(this.reqCounter === 1){
                LoaderHelper.show();
            }
            const token = localStorage.getItem('token');
            if(token){
                config.headers.Authorization = 'Bearer ' + token;
            }

            return config;
        })

        this.axios.interceptors.response.use((response) =>{
            this.reqCounter--;
            if(this.reqCounter === 0){
                LoaderHelper.hide();
            }
    
            return response;
        })
    }

    post(url, data){
        return this.axios.post(url, data);
    }

    get(url){
        return this.axios.get(url);
    }

    put(url, data){
        return this.axios.put(url, data);
    }
}