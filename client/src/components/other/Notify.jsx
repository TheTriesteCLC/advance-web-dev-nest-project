import React, { useEffect, useState } from "react";
import { Drawer, Badge, List, Button, Tag, message } from "antd";
import { BellOutlined } from "@ant-design/icons";
import useSocket from "../../hooks/useSocket";
import CustomerService from "../../services/Customer.service";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

const Notifications = () => {
  const [visible, setVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const profile = useSelector((state) => state.profile);

  const { state, initialize, send } = useSocket();

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const response = await CustomerService.notification.getNotification(
        profile._id
      );
      if (response.data) {
        const sortedNotifications = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setNotifications(sortedNotifications);
        const unreadCount = notifications.filter((item) => !item.isRead).length;
        if (unreadCount > 0) {
          message.info(`Bạn có thông báo mới`);
        }
      }
    } catch (error) {
      message.error("Không thể tải thông báo");
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initialize(profile._id);
    fetchNotifications();
    console.log("state", state);
  }, [state]);

  const handleMarkAsRead = async (id) => {
    try {
      await CustomerService.notification.readNotification(id);
      setNotifications((prev) =>
        prev.map((item) => (item._id === id ? { ...item, isRead: true } : item))
      );
      message.success("Đã đánh dấu là đã đọc");
    } catch (error) {
      message.error("Không thể đánh dấu là đã đọc");
      console.error("Error marking as read:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await CustomerService.notification.deleteNotification(id);
      setNotifications((prev) => prev.filter((item) => item._id !== id));
      message.success("Đã xóa thông báo");
    } catch (error) {
      message.error("Không thể xóa thông báo");
      console.error("Error deleting notification:", error);
    }
  };

  const unreadCount = notifications.filter((item) => !item.isRead).length;

  return (
    <div className="mt-3">
      <Badge count={unreadCount}>
        <BellOutlined
          style={{ fontSize: "24px", cursor: "pointer" }}
          onClick={() => setVisible(true)}
        />
      </Badge>

      <Drawer
        title="Thông Báo"
        placement="right"
        onClose={() => setVisible(false)}
        open={visible}
        width={400}
      >
        <List
          loading={loading}
          itemLayout="vertical"
          dataSource={notifications}
          renderItem={(item) => (
            <List.Item
              key={item._id}
              actions={[
                <Button
                  type="link"
                  onClick={() => handleMarkAsRead(item._id)}
                  disabled={item.isRead}
                >
                  {item.isRead ? "Đã đọc" : "Đánh dấu đã đọc"}
                </Button>,
                <Button
                  type="link"
                  danger
                  onClick={() => handleDelete(item._id)}
                >
                  Xóa
                </Button>,
              ]}
              className={`${!item.isRead ? "bg-blue-50" : ""} rounded-lg mb-2`}
            >
              <List.Item.Meta
                title={
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">{item.title}</span>
                    {!item.isRead && <Tag color="blue">Mới</Tag>}
                  </div>
                }
                description={
                  <div>
                    <p>{item.content}</p>
                    <p className="text-gray-400 text-sm">
                      {dayjs(item.createdAt).format("DD/MM/YYYY HH:mm")}
                    </p>
                  </div>
                }
              />
            </List.Item>
          )}
          locale={{
            emptyText: "Không có thông báo nào",
          }}
        />
      </Drawer>
    </div>
  );
};

export default Notifications;
