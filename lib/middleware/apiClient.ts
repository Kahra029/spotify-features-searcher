import axios from "axios"

export class ApiClient{
    static createInstance = (accessToken: string) =>{
        const instance = axios.create({
            baseURL: 'https://api.spotify.com/v1',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });
        return instance;
    }
    static async get<T>(url: string, accessToken: string){
        const instance = this.createInstance(accessToken);
        return await instance.get(url)
        .catch((e) => {
            return Promise.reject(e);
        })
    }

    static async post(url: string, accessToken: string, data?: any){
        const instance = this.createInstance(accessToken);
        return await instance.post(url, data)
        .catch((e) => {
            return Promise.reject(e);
        })
    }
}