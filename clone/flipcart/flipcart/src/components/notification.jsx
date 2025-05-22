import React, { useEffect, useState } from 'react';
import { FaBell } from 'react-icons/fa';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const fetchNotifications = () => {
    fetch('http://localhost:5001/api/notifications') // user_id = 1
      .then(res => res.json())
      .then(data => setNotifications(data));
      console.log(notifications);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markAsRead = (id) => {
    fetch(`http://localhost:5001/api/notifications/${id}/read`, { method: 'PUT' })
    
      .then(() => fetchNotifications());
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <div className="relative p-5 z-50">
      <button onClick={() => setShowDropdown(!showDropdown)} className="relative">
        <FaBell className="text-2xl text-gray-800" />
        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1">
            {unreadCount}
          </span>
        )}
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-3 w-72 bg-white shadow-lg rounded-lg z-10">
          {notifications.map(notif => (
            <div
              key={notif.id}
              onClick={() => markAsRead(notif.id)}
              className={`p-3 border-b cursor-pointer hover:bg-gray-100 ${notif.is_read ? 'bg-white' : 'bg-gray-100 font-semibold'}`}
            >
              <h4>{notif.title}</h4>
              <p className="text-sm text-gray-600">{notif.message}</p>
              <span className="text-xs text-gray-500">{new Date(notif.created_at).toLocaleString()}</span>
            </div>
          ))}
          {notifications.length === 0 && (
            <div className="p-3 text-center text-gray-600">No notifications</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Notifications;
