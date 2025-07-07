import React, { useState, useEffect } from 'react';
import { 
  FiBell, 
  FiShoppingBag, 
  FiAlertTriangle, 
  FiTruck,
  FiDollarSign,
  FiTrash2,
  FiCheck
} from 'react-icons/fi';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const FarmerNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('unread');
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`${API_BASE_URL}/api/farmers/notifications`, {
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

  const getFarmerIcon = (type) => {
    switch(type) {
      case 'new-order':
        return <FiShoppingBag className="text-green-500" size={18} />;
      case 'order-cancel':
        return <FiAlertTriangle className="text-red-500" size={18} />;
      case 'payment':
        return <FiDollarSign className="text-blue-500" size={18} />;
      case 'delivery':
        return <FiTruck className="text-purple-500" size={18} />;
      default:
        return <FiBell className="text-yellow-500" size={18} />;
    }
  };

  const markAsRead = async (id) => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.patch(`${API_BASE_URL}/api/farmers/notifications/${id}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotifications(notifications.map(n => 
        n._id === id ? { ...n, read: true } : n
      ));
    } catch (error) {
      toast.error('Failed to mark as read');
    }
  };

  const deleteNotification = async (id) => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.delete(`${API_BASE_URL}/api/farmers/notifications/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotifications(notifications.filter(n => n._id !== id));
      toast.success('Notification deleted');
    } catch (error) {
      toast.error('Failed to delete notification');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 flex items-center">
        <FiBell className="mr-2" /> Farmer Notifications
      </h1>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {notifications.length === 0 ? (
          <div className="p-8 text-center">
            <FiBell className="mx-auto text-4xl text-gray-400 mb-4" />
            <p className="text-gray-600">No notifications available</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {notifications.map(notification => (
              <li 
                key={notification._id} 
                className={`p-4 ${!notification.read ? 'bg-blue-50' : ''}`}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 pt-1">
                    {getFarmerIcon(notification.type)}
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex justify-between">
                      <p className={`font-medium ${!notification.read ? 'text-black' : 'text-gray-600'}`}>
                        {notification.title}
                      </p>
                      <span className="text-sm text-gray-500">
                        {new Date(notification.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-600 mt-1">{notification.message}</p>
                    <div className="mt-2 flex space-x-4">
                      {!notification.read && (
                        <button 
                          onClick={() => markAsRead(notification._id)}
                          className="text-sm text-blue-600 hover:text-blue-800"
                        >
                          Mark as read
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification._id)}
                        className="text-sm text-red-600 hover:text-red-800 flex items-center"
                      >
                        <FiTrash2 className="mr-1" /> Delete
                      </button>
                      {notification.link && (
                        <button
                          onClick={() => navigate(notification.link)}
                          className="text-sm text-green-600 hover:text-green-800"
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
        )}
      </div>
    </div>
  ); 
};

export default FarmerNotifications;