import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const userId = localStorage.getItem("id"); 

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/notification/user/${userId}`);
      setNotifications(res.data.data || []);
      const unread = res.data.data.filter((n) => !n.read).length;
      setUnreadCount(unread);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const markAllAsRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    setNotifications(updated);
    setUnreadCount(0);
  };

  useEffect(() => {
    if (userId) fetchNotifications();
  }, [userId]);

  return (
    <NotificationContext.Provider
      value={{ notifications, unreadCount, fetchNotifications, markAllAsRead }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
