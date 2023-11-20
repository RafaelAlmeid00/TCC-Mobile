import { io, Socket } from "socket.io-client";
import getToken from "../../controllers/tokencontroller";

interface CustomSocket extends Socket {
    auth: {
        token?: string;
    };
}

export const GetSocket = async () => {
    const tokenuser: any = await getToken();
    const token = tokenuser ? tokenuser : '';
    
    console.log(token);
    const socket: CustomSocket = createCustomSocket(token);
    return socket
}

const createCustomSocket = (token?: string): CustomSocket => {
    console.log('tokem no socket', token);
    
    const socket = io("https://easypass-iak1.onrender.com", {
        autoConnect: false,
        auth: {
            token: token,
        },
        withCredentials: true,
    });

    return socket as CustomSocket;
};

export const socket = GetSocket()