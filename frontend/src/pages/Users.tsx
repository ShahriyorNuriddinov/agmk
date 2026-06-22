import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, message, Typography, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import api from '../services/api';
import type { User, Department } from '../types';

const { Title } = Typography;

const roleLabels: Record<string, string> = {
  admin: 'Администратор',
  manager: 'Руководитель',
  department_head: 'Начальник цеха',
  section_head: 'Начальник участка',
  instructor: 'Инструктор',
  safety_engineer: 'Инженер по ОТ',
  viewer: 'Просмотр',
};

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [uRes, dRes] = await Promise.all([
        api.get('/users/'),
        api.get('/departments/'),
      ]);
      setUsers(uRes.data);
      setDepartments(dRes.data);
    } catch {} finally { setLoading(false); }
  };

  const handleSubmit = async (values: any) => {
    try {
      await api.post('/auth/register', values);
      message.success('Пользователь создан');
      setModalVisible(false);
      form.resetFields();
      fetchData();
    } catch (err: any) {
      message.error(err.response?.data?.detail || 'Ошибка');
    }
  };

  const columns = [
    { title: 'Логин', dataIndex: 'username', key: 'username' },
    { title: 'ФИО', dataIndex: 'full_name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    {
      title: 'Роль',
      dataIndex: 'role',
      key: 'role',
      render: (r: string) => <Tag>{roleLabels[r] || r}</Tag>,
    },
    {
      title: 'Активен',
      dataIndex: 'is_active',
      key: 'active',
      render: (v: boolean) => v ? <Tag color="green">Да</Tag> : <Tag color="red">Нет</Tag>,
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Title level={4}>Пользователи системы</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => { form.resetFields(); setModalVisible(true); }}>
          Добавить
        </Button>
      </div>
      <Table columns={columns} dataSource={users} rowKey="id" loading={loading} />
      <Modal
        title="Новый пользователь"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={() => form.submit()}
        width={500}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="username" label="Логин" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Пароль" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item name="full_name" label="ФИО" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input />
          </Form.Item>
          <Form.Item name="role" label="Роль" rules={[{ required: true }]}>
            <Select options={Object.entries(roleLabels).map(([k, v]) => ({ value: k, label: v }))} />
          </Form.Item>
          <Form.Item name="department_id" label="Подразделение">
            <Select allowClear options={departments.map(d => ({ value: d.id, label: d.name }))} />
          </Form.Item>
          <Form.Item name="card_uid" label="UID карты">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Users;
