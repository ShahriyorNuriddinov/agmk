import React from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const { Title, Text } = Typography;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const onFinish = async (values: { username: string; password: string }) => {
    setLoading(true);
    try {
      const res = await api.post('/auth/login', values);
      localStorage.setItem('token', res.data.access_token);
      message.success('Успешный вход в систему');
      navigate('/');
    } catch (err: any) {
      message.error(err.response?.data?.detail || 'Ошибка входа');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f2f5' }}>
      <Card style={{ width: 400, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Title level={3}>Система ОТ и ПБ</Title>
          <Text type="secondary">АО «Алмалыкский ГМК»</Text>
        </div>
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item name="username" rules={[{ required: true, message: 'Введите имя пользователя' }]}>
            <Input prefix={<UserOutlined />} placeholder="Имя пользователя" size="large" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: 'Введите пароль' }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="Пароль" size="large" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block size="large">
              Войти
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
