import React, { useEffect, useState } from 'react';
import { List, Badge, Button, Typography, Tag, Space, message } from 'antd';
import { BellOutlined, CheckOutlined } from '@ant-design/icons';
import api from '../services/api';
import type { Notification } from '../types';

const { Title, Text } = Typography;

const typeLabels: Record<string, string> = {
  briefing_approaching: 'Приближается инструктаж',
  briefing_overdue: 'Просрочен инструктаж',
  check_approaching: 'Приближается проверка',
  check_overdue: 'Просрочена проверка',
};
const typeColors: Record<string, string> = {
  briefing_approaching: 'orange',
  briefing_overdue: 'red',
  check_approaching: 'orange',
  check_overdue: 'red',
};

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await api.get('/notifications/');
      setNotifications(res.data);
    } catch {} finally { setLoading(false); }
  };

  const markAllRead = async () => {
    const unreadIds = notifications.filter(n => !n.is_read).map(n => n.id);
    if (unreadIds.length === 0) return;
    try {
      await api.post('/notifications/mark-read', { notification_ids: unreadIds });
      message.success('Все отмечены как прочитанные');
      fetchData();
    } catch {}
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Title level={4}>Уведомления</Title>
        <Button icon={<CheckOutlined />} onClick={markAllRead}>
          Отметить все как прочитанные
        </Button>
      </div>
      <List
        loading={loading}
        dataSource={notifications}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Badge dot={!item.is_read}>
                  <BellOutlined style={{ fontSize: 20 }} />
                </Badge>
              }
              title={
                <Space>
                  <Tag color={typeColors[item.notification_type]}>{typeLabels[item.notification_type]}</Tag>
                  <Text strong={!item.is_read}>{item.title}</Text>
                </Space>
              }
              description={
                <div>
                  <Text>{item.message}</Text>
                  <br />
                  <Text type="secondary">{new Date(item.created_at).toLocaleString('ru')}</Text>
                </div>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default Notifications;
