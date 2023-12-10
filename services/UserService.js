import HttpService from "./HttpService";

export default class UserService extends HttpService{
    async login(credentials){
        const {data} = await this.post('/auth/login', credentials)

        localStorage.setItem('name', data.name);
        localStorage.setItem('email', data.email);
        localStorage.setItem('token', data.token);

        const user = await this.get('/user');
        localStorage.setItem('id', user.data._id);
            
        if(user.data.avatar){
            localStorage.setItem('avatar', user.data.avatar);
        }
    }

    async register(data){
        return this.post('/auth/register', data)
    }

    isAuthenticated() {
        return localStorage.getItem('token') !== null;
    }
}