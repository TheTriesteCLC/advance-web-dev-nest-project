import React, { useEffect, useState } from "react";
import { Drawer, Badge, List, Button } from "antd";
import { BellOutlined } from "@ant-design/icons";

const NotifyList = [
  {
    id: 1,
    content: "You have a new order",
    status: "unread",
  },
  {
    id: 2,
    content: "New user registered",
    status: "unread",
  },
  {
    id: 3,
    content: "Product is running out of stock",
    status: "unread",
  },
];

const Notifications = () => {
  const [visible, setVisible] = useState(false);
  const [notifications, setNotifications] = useState(NotifyList);

  const handleMarkAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: "read" } : item))
    );
  };

  const unreadCount = notifications.filter(
    (notification) => notification.status === "unread"
  ).length;

  return (
    <div className=" mt-3">
      <Badge count={unreadCount}>
        <BellOutlined
          style={{ fontSize: "24px", cursor: "pointer" }}
          onClick={() => setVisible(true)}
        />
      </Badge>

      <Drawer
        title="Notifications"
        placement="right"
        onClose={() => setVisible(false)}
        open={visible}
      >
        <List
          dataSource={notifications}
          renderItem={(item) => (
            <List.Item
              actions={
                item.status === "unread"
                  ? [
                      <Button
                        type="link"
                        onClick={() => handleMarkAsRead(item.id)}
                      >
                        Mark as Read
                      </Button>,
                    ]
                  : []
              }
            >
              <List.Item.Meta
                title={item.content}
                description={item.status === "unread" ? "Unread" : "Read"}
              />
            </List.Item>
          )}
        />
      </Drawer>
    </div>
  );
};

export default Notifications;
