import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': "application/json"
    },
});


// add response interceptors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if(error.response && error.response.status === 401){
            // Handle Unauthorized errors (e.g redirect to login)
            console.error('Unauthorized access - redirect to login')
        }
        return Promise.reject(error)
    }
);


export const register = async (data: {name: string; email: string; password: string;}) => {
    return api.post('/auth/register', data);
};

export const verifyEmail = async (token: string) =>{
    return api.get('/auth/verify', {params: {token}});
}

export const login = async(data: {email: string; password: string}) =>{
    return api.post('/auth/login', data);
};

export const logout = async () =>{
    return api.get('/auth/logout');
};


export const forgotPassord = async(email: string) =>{
    return api.post('/auth/forgot-password', {email})
};

export const resetPassword = async(data: {token: string; password: string})=>{
    return api.post('/auth/reset-password', data);
};

export const getCurrentUser = async() => {
    return api.get('/auth/me')
}


export default api;

