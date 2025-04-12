import Http from "@/services/interceptor";

interface IUser {
    email: string,
    name: string,
    password: string,
    phone: string
}

const register = async (data: IUser) => await Http.post("/api/auth/register", data);
const login = async (data: Omit<IUser, 'name' | 'phone'>) => await Http.post("/api/auth/login", data);

export { register, login };
