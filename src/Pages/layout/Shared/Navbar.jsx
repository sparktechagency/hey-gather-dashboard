import { useState, useEffect } from 'react'
import { MdNotificationsNone } from 'react-icons/md'
import { FaUserCircle } from 'react-icons/fa'
import { Popover } from 'antd'
import { Link } from 'react-router-dom'
import { useGetProfileDataQuery } from '../../../redux/profileApis'
import {
  useGetAllNotificationsQuery,
  useReadNotificationsMutation,
} from '../../../redux/notificationsApis'

const Navbar = () => {
  const { data: profileData } = useGetProfileDataQuery()
  const { data: notificationsData, isLoading } = useGetAllNotificationsQuery()
  const [readNotification] = useReadNotificationsMutation()

  const [visible, setVisible] = useState(false)
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    if (notificationsData?.success && notificationsData?.data) {
      setNotifications(notificationsData.data)
    }
  }, [notificationsData])

  const handleVisibleChange = (visible) => {
    setVisible(visible)
  }

  const handleAllAsRead = async () => {
    try {
      for (const notification of notifications) {
        console.log(notification._id)
        if (!notification.read_by_admin) {
          await readNotification({ id: notification._id })
        }
      }
      setVisible(false)
    } catch (error) {
      console.error('Error marking notifications as read:', error)
    }
  }

  const handleReadNotification = async (id) => {
    try {
      await readNotification({ id })
    } catch (error) {
      console.error('Error marking notification as read:', error)
    }
  }

  const formatNotificationTime = (createdAt) => {
    const date = new Date(createdAt)
    const now = new Date()
    const diffInSeconds = Math.floor((now - date) / 1000)

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} minutes ago`
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`
    if (diffInSeconds < 604800)
      return `${Math.floor(diffInSeconds / 86400)} days ago`

    return date.toLocaleDateString()
  }

  const NotificationContent = () => (
    <div className="w-80 max-h-96 overflow-y-auto bg-white rounded-md shadow-md border p-4">
      <div className="border-b pb-2 flex justify-between items-center">
        <h3 className="text-lg font-semibold">Notifications</h3>
        <button
          onClick={handleAllAsRead}
          className="text-blue-500 text-sm hover:underline"
        >
          Mark all as read
        </button>
      </div>
      <div className="mt-3">
        {isLoading ? (
          <p className="text-center text-gray-500">Loading notifications...</p>
        ) : notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification._id}
              className={`mb-5 p-3 border-b ${
                notification.read_by_admin ? '' : 'bg-gray-100'
              }`}
              onClick={() => handleReadNotification(notification._id)}
            >
              <div className="flex justify-between">
                <p className="text-sm font-semibold">{notification.title}</p>
              </div>
              <p className="text-sm text-gray-800">{notification.message}</p>
              <div className="flex justify-between items-center mt-1">
                <p className="text-xs text-gray-500">
                  {formatNotificationTime(notification.createdAt)}
                </p>
                <p className="text-xs text-gray-500">
                  From: {notification.user.name}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No new notifications</p>
        )}
      </div>
    </div>
  )

  const unreadCount = notifications.filter((n) => !n.read_by_admin).length

  return (
    <div className="flex justify-between items-center bg-white p-5 shadow-md rounded-md">
      <p className="text-2xl font-bold text-[#0033A0]">Dashboard</p>
      <div className="flex items-center gap-4">
        <Popover
          content={<NotificationContent />}
          trigger="click"
          placement="bottomRight"
          open={visible}
          onOpenChange={handleVisibleChange}
        >
          <button className="relative text-2xl text-blue-600 p-2 rounded-full border transition duration-300 bg-blue-900 hover:bg-blue-700 hover:shadow-md">
            <MdNotificationsNone className="text-white" />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs h-5 w-5 flex items-center justify-center font-bold rounded-full">
                {unreadCount}
              </span>
            )}
          </button>
        </Popover>
        <Link
          to="/profile"
          className="flex items-center gap-2 border p-2 rounded-md text-white bg-blue-900 transition duration-300 hover:bg-blue-700 hover:shadow-md"
        >
          <FaUserCircle className="text-3xl text-white" />
          <div className="text-left">
            <p className="text-sm font-semibold">{profileData?.data?.name}</p>
            <p className="text-xs">{profileData?.data?.email}</p>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Navbar
