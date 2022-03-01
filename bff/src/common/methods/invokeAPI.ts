import axios , { AxiosRequestConfig } from 'axios';
import { ErrorResponseDto } from '../../modules/desktop/functions/dto/error.dto';
import { ResponseDto } from '../../modules/desktop/functions/dto/response.dto';

export const InvokeAPI = async (url: string, method, data, headers, port: number) : Promise<ResponseDto | ErrorResponseDto> =>{
    var config : AxiosRequestConfig<any> = {
        method: method,
        url: `http://localhost:${port}${url}`,
    };

    if(data !== undefined) {
        config['data'] = data;
    }

    if(headers !== undefined) {
        config['headers'] = headers;
    }
    
    let msg : ResponseDto | ErrorResponseDto;
    await axios(config)
    .then(response => {
        msg = { statusCode: response.status, data: response.data };
    })
    .catch(error => {
        msg = { statusCode: error.response.status, data: error.response.data };
    });
    return msg;
}
