import React, { useContext } from "react";
import { useEffect } from "react";
import socketio from "socket.io-client";
import { BASE_URL5 } from "../constants";

export const SOCKET_URL = BASE_URL5;
export const socket = socketio.connect(SOCKET_URL);

export const SocketContext = React.createContext();

const SocketContextProvider = ({ children }) => {
  useEffect(() => {
    console.log(socket, "socket");
    socket.on("connect", () => {
      console.log("connected");
    });
    // socket.on("message", (a) => console.log(a));
    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketContextProvider };
// export const useSocketContext = useContext(SocketContext);

// const socket = socketio.connect("http://localhost:3005");
//   const [isConnected, setIsConnected] = useState(socket.connected);
//   useEffect(() => {
//     socket.on("connect", () => {
//       setIsConnected(true);
//       console.log("connected");
//     });

//     socket.on("disconnect", () => {
//       setIsConnected(false);
//     });

//     socket.on("message", (m) => console.log(m, "check m"));
//     return () => {
//       socket.off("connect");
//       socket.off("disconnect");
//     };
//   }, []);
