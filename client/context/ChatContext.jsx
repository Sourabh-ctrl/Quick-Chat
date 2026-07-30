import { useCallback, useContext, useEffect, useRef } from "react";
import { createContext } from "react";
import { AuthContext } from "./AuthContext";
import { useState } from "react";
import toast from "react-hot-toast";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [unseenMessages, setUnseenMessages] = useState({});
  const latestRequestUserIdRef = useRef(null);

  const { socket, axios } = useContext(AuthContext);

  const getUsers = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/messages/users");
      if (data.success) {
        setUsers(data.users);
        setUnseenMessages(data.unseenMessages);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }, [axios]);

  const getMessages = useCallback(
    async (userId) => {
      latestRequestUserIdRef.current = userId;
      try {
        const { data } = await axios.get(`/api/messages/${userId}`);
        if (data.success && latestRequestUserIdRef.current === userId) {
          setMessages(data.messages);
        }
      } catch (error) {
        toast.error(error.message);
      }
    },
    [axios],
  );

  const sendMessage = useCallback(
    async (messageData) => {
      try {
        const { data } = await axios.post(
          `/api/messages/send/${selectedUser._id}`,
          messageData,
        );
        if (data.success) {
          setMessages((prev) => [...prev, data.newMessage]);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    },
    [axios, selectedUser],
  );

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      const senderId = newMessage.sender?._id || newMessage.senderId;

      if (selectedUser && selectedUser._id === senderId) {
        newMessage.seen = true;
        setMessages((prev) => [...prev, newMessage]);
        axios.put(`/api/messages/mark/${newMessage._id}`);
      } else {
        setUnseenMessages((prev) => ({
          ...prev,
          [senderId]: (prev[senderId] ? prev[senderId] : 0) + 1,
        }));
      }
    };

    socket.on("newMessage", handleNewMessage);
    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, selectedUser, axios]);

  useEffect(() => {
    if (!selectedUser) {
      setMessages([]);
      latestRequestUserIdRef.current = null;
      return;
    }

    // Clear previous chat immediately to avoid stale content while loading.
    setMessages([]);
    getMessages(selectedUser._id);
  }, [selectedUser, getMessages]);

  const value = {
    messages,
    getMessages,
    selectedUser,
    sendMessage,
    setSelectedUser,
    unseenMessages,
    setUnseenMessages,
    users,
    getUsers,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
