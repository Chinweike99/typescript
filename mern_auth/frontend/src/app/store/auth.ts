import {create} from 'zustand';
import { api } from '../utils/api';
import { jwtDecode } from "jwt-decode";


interface User {
    id: string,
    email: string
}

interface AuthState {
    user: User | null;
    login: (email: string, password: string)=>Promise<void>;
    register: (name: string, email: string, password: string) =>Promise<void>;
    logout: ()=> void;
    loadUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,

    register: async(name, email, password) => {
        await api.post('/auth/register', {name, email, password});
    },

    login: async(email, password) => {
        const {data} = await api.post("/auth/login", {email, password});
        localStorage.setItem("token", data.token);
        set({user: jwtDecode<User>(data.token)});
    },

    logout: () => {
        localStorage.removeItem("token");
        set({ user: null });
      },
    
      loadUser: () => {
        const token = localStorage.getItem("token");
        if (token) {
          set({ user: jwtDecode<User>(token) });
        }
      },
}))