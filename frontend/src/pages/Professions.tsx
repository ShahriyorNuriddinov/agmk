import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Space, message, Typography, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import api from '../services/api';
import type { Profession } from '../types';

const { Title } = Typography;

const Professions: React.FC = () => {
  const [professions, setProfessions] = useState<Profession[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editing, setEditing] = useState<Profession | null>(null);
  const [form] = Form.useForm();

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await api.get('/professions/');
      setProfessions(res.data);
    } catch {} finally { setLoading(false); }
  };

  const handleSubmit = async (values: any) => {
    try {
      if (editing) {
        await api.put(`/professions/${editing.id}`, values);
        message.success('Обновлено');
      } else {
        await api.post('/professions/', values);
        message.success('Создано');
      }
      setModalVisible(false);
      form.resetFields();
      setEditing(null);
      fetchData();
    } catch (err: any) {
      message.error(err.response?.data?.detail || 'Ошибка');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/professions/${id}`);
      message.success('Удалено');
      fetchData();
    } catch (err: any) {
      message.error(err.response?.data?.detail || 'Ошибка');
    }
  };

  const columns = [
    { title: 'Код', dataIndex: 'code', key: 'code' },
    { title: 'Наименование', dataIndex: 'name', key: 'name' },
    {
      title: 'Действия',
      key: 'actions',
      render: (_: any, record: Profession) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => { setEditing(record); form.setFieldsValue(record); setModalVisible(true); }} size="small" />
          <Popconfirm title="Удалить?" onConfirm={() => handleDelete(record.id)}>
            <Button icon={<DeleteOutlined />} danger size="small" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Title level={4}>Профессии</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditing(null); form.resetFields(); setModalVisible(true); }}>
          Добавить
        </Button>
      </div>
      <Table columns={columns} dataSource={professions} rowKey="id" loading={loading} />
      <Modal
        title={editing ? 'Редактировать профессию' : 'Новая профессия'}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="code" label="Код" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="name" label="Наименование" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Professions;
