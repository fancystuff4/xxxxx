import { HttpException, InternalServerErrorException } from '@nestjs/common';
import axios , { AxiosRequestConfig, AxiosResponse } from 'axios';

export const InvokeAPI = async (
        url: string, 
        method, 
        data, 
        headers, 
        port: number
    ) : Promise<any> => {
        
    var config : AxiosRequestConfig<any> = {
        method: method,
        url: `http://localhost:${port}${url}`,
        timeout: 10000
    };

    if(data !== undefined) {
        config['data'] = data;
    }

    if(headers !== undefined) {
        config['headers'] = headers;
    }
    
    let msg : any;
    await axios(config)
    .then(response => {
        msg = response.data;
    })
    .catch(error => {
        if (error.response) {
            throw new HttpException(error.response.data, error.response.status)
        } else {
            throw new InternalServerErrorException(["Cannot Reach Server"])
        }
    });
    return msg;
}
