import create from 'zustand'
import { api } from '../utils/api'
import jwtDecode from  'jwt-decode'


interface User {
    id: string,
    email: string
}

interface AuthState {
    user: User | null;
    login: (email: string, password: string)=>Promise<void>;
    register: (email: string, password: string) =>Promise<void>;
    logout: ()=> void;
    loadUser: () => void;
}

export const useAuthStore = create<AuthState>((set: void) => ({
    user: null,
    login: async(email: string, password: string) => {
        const {data} = await api.post("/auth/login", {email, password});
        localStorage.setItem("token", data.token);
        set({user: jwtDecode<User>(data.token)});
    }
}))