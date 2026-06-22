import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, Space, message, Typography, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import api from '../services/api';
import type { Department } from '../types';

const { Title } = Typography;

const Departments: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingDept, setEditingDept] = useState<Department | null>(null);
  const [form] = Form.useForm();

  useEffect(() => { fetchDepartments(); }, []);

  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const res = await api.get('/departments/');
      setDepartments(res.data);
    } catch {} finally { setLoading(false); }
  };

  const handleSubmit = async (values: any) => {
    try {
      if (editingDept) {
        await api.put(`/departments/${editingDept.id}`, values);
        message.success('Подразделение обновлено');
      } else {
        await api.post('/departments/', values);
        message.success('Подразделение создано');
      }
      setModalVisible(false);
      form.resetFields();
      setEditingDept(null);
      fetchDepartments();
    } catch (err: any) {
      message.error(err.response?.data?.detail || 'Ошибка');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/departments/${id}`);
      message.success('Удалено');
      fetchDepartments();
    } catch (err: any) {
      message.error(err.response?.data?.detail || 'Ошибка');
    }
  };

  const openEdit = (dept: Department) => {
    setEditingDept(dept);
    form.setFieldsValue(dept);
    setModalVisible(true);
  };

  const columns = [
    { title: 'Код', dataIndex: 'code', key: 'code' },
    { title: 'Наименование', dataIndex: 'name', key: 'name' },
    { title: 'Руководитель', dataIndex: 'head_name', key: 'head_name' },
    { title: 'Численность', dataIndex: 'personnel_count', key: 'personnel_count' },
    {
      title: 'Действия',
      key: 'actions',
      render: (_: any, record: Department) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => openEdit(record)} size="small" />
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
        <Title level={4}>Подразделения (Цеха / Шахты)</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditingDept(null); form.resetFields(); setModalVisible(true); }}>
          Добавить
        </Button>
      </div>
      <Table columns={columns} dataSource={departments} rowKey="id" loading={loading} />
      <Modal
        title={editingDept ? 'Редактировать подразделение' : 'Новое подразделение'}
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
          <Form.Item name="head_name" label="Руководитель">
            <Input />
          </Form.Item>
          <Form.Item name="personnel_count" label="Численность">
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Departments;
