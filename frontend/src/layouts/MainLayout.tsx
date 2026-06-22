import React, { useState, useEffect } from 'react';
import { Layout, Menu, Badge, Avatar, Dropdown, Typography } from 'antd';
import {
  DashboardOutlined,
  TeamOutlined,
  ApartmentOutlined,
  FileProtectOutlined,
  SafetyCertificateOutlined,
  BellOutlined,
  BarChartOutlined,
  FileExcelOutlined,
  AuditOutlined,
  UserOutlined,
  LogoutOutlined,
  ToolOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import api from '../services/api';

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [user, setUser] = useState<{ full_name: string; role: string } | null>(null);

  useEffect(() => {
    fetchUser();
    fetchNotificationCount();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await api.get('/auth/me');
      setUser(res.data);
    } catch {
      navigate('/login');
    }
  };

  const fetchNotificationCount = async () => {
    try {
      const res = await api.get('/notifications/count');
      setUnreadCount(res.data.unread_count);
    } catch {}
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const menuItems = [
    { key: '/', icon: <DashboardOutlined />, label: 'Панель управления' },
    { key: '/departments', icon: <ApartmentOutlined />, label: 'Подразделения' },
    { key: '/professions', icon: <ToolOutlined />, label: 'Профессии' },
    { key: '/workers', icon: <TeamOutlined />, label: 'Работники' },
    { key: '/briefings', icon: <FileProtectOutlined />, label: 'Инструктажи' },
    { key: '/knowledge-checks', icon: <SafetyCertificateOutlined />, label: 'Проверка знаний' },
    { key: '/analytics', icon: <BarChartOutlined />, label: 'Аналитика' },
    { key: '/reports', icon: <FileExcelOutlined />, label: 'Отчеты' },
    { key: '/notifications', icon: <BellOutlined />, label: 'Уведомления' },
    { key: '/audit', icon: <AuditOutlined />, label: 'Журнал аудита' },
    { key: '/users', icon: <UserOutlined />, label: 'Пользователи' },
  ];

  const userMenuItems = [
    { key: 'logout', icon: <LogoutOutlined />, label: 'Выйти', onClick: handleLogout },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Text strong style={{ color: '#fff', fontSize: collapsed ? 14 : 16 }}>
            {collapsed ? 'ОТ' : 'ОТ и ПБ'}
          </Text>
        </div>
        <Menu
          theme="dark"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
        />
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text strong style={{ fontSize: 18 }}>
            Система учета инструктажей и проверки знаний
          </Text>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Badge count={unreadCount} size="small">
              <BellOutlined style={{ fontSize: 20, cursor: 'pointer' }} onClick={() => navigate('/notifications')} />
            </Badge>
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Avatar icon={<UserOutlined />} />
                <Text>{user?.full_name}</Text>
              </div>
            </Dropdown>
          </div>
        </Header>
        <Content style={{ margin: 24, padding: 24, background: '#fff', borderRadius: 8 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
