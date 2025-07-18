import { io } from "socket.io-client";

const URL_BACKEND = process.env.NEXT_PUBLIC_URL_BACKEND;

const socket = io(URL_BACKEND, {
  withCredentials: true,
});

export { socket }