import React, { useState, useEffect } from 'react';
import { 
  FiBell, 
  FiCheck, 
  FiTrash2, 
  FiClock,
  FiPackage,
  FiTruck,
  FiDollarSign,
  FiAlertCircle
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('unread');
  const navigate = useNavigate();
  const API_BASE_URL = 'http://localhost:3000'

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`${API_BASE_URL}/api/notifications`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setNotifications(response.data);
      } catch (error) {
        toast.error('Failed to load notifications');
        console.error('Notification error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const markAsRead = async (id) => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.patch(`${API_BASE_URL}/api/notifications/${id}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotifications(notifications.map(n => 
        n._id === id ? { ...n, read: true } : n
      ));
      toast.success('Marked as read');
    } catch (error) {
      toast.error('Failed to mark as read');
    }
  };

  const deleteNotification = async (id) => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.delete(`${API_BASE_URL}/api/notifications/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotifications(notifications.filter(n => n._id !== id));
      toast.success('Notification deleted');
    } catch (error) {
      toast.error('Failed to delete notification');
    }
  };

  const markAllAsRead = async () => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.patch(`${API_BASE_URL}/api/notifications/mark-all-read`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotifications(notifications.map(n => ({ ...n, read: true })));
      toast.success('All marked as read');
    } catch (error) {
      toast.error('Failed to mark all as read');
    }
  };

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'order':
        return <FiPackage className="text-accent" size={18} />;
      case 'payment':
        return <FiDollarSign className="text-success" size={18} />;
      case 'shipment':
        return <FiTruck className="text-primary" size={18} />;
      case 'system':
        return <FiAlertCircle className="text-error" size={18} />;
      default:
        return <FiBell className="text-primary" size={18} />;
    }
  };

  const filteredNotifications = notifications
    .filter(n => activeTab === 'unread' ? !n.read : true)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center text-text">
          <FiBell className="mr-2 text-primary" size={24} /> 
          Notifications
        </h1>
        
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('unread')}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === 'unread' 
                ? 'bg-primary text-white' 
                : 'bg-background text-text'
            }`}
          >
            Unread
          </button>
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === 'all' 
                ? 'bg-primary text-white' 
                : 'bg-background text-text'
            }`}
          >
            All Notifications
          </button>
          {notifications.some(n => !n.read) && (
            <button
              onClick={markAllAsRead}
              className="px-4 py-2 rounded-lg bg-accent text-white font-medium"
            >
              Mark All as Read
            </button>
          )}
        </div>
      </div>

      {filteredNotifications.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <FiBell className="mx-auto text-4xl text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-text">
            No {activeTab === 'unread' ? 'unread' : ''} notifications
          </h3>
          <p className="text-gray-500 mt-2">
            {activeTab === 'unread' 
              ? "You're all caught up!" 
              : "You haven't received any notifications yet"}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {filteredNotifications.map(notification => (
              <li 
                key={notification._id} 
                className={`px-4 py-4 hover:bg-background transition-colors ${
                  !notification.read ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 pt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <p className={`text-sm font-medium ${
                        !notification.read ? 'text-text font-bold' : 'text-gray-600'
                      }`}>
                        {notification.title}
                      </p>
                      <span className="text-xs text-gray-500">
                        {new Date(notification.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {notification.message}
                    </p>
                    <div className="mt-2 flex space-x-3">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification._id)}
                          className="text-xs text-primary hover:text-primary-dark"
                        >
                          Mark as read
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification._id)}
                        className="text-xs text-error hover:text-error-dark flex items-center"
                      >
                        <FiTrash2 className="mr-1" /> Delete
                      </button>
                      {notification.link && (
                        <button
                          onClick={() => navigate(notification.link)}
                          className="text-xs text-accent hover:text-accent-dark"
                        >
                          View details
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Notifications;