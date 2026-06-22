import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, Select, DatePicker, Space, message, Typography, Popconfirm, Tag } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import api from '../services/api';
import type { Worker, Department, Profession } from '../types';

const { Title } = Typography;

const Workers: React.FC = () => {
  const navigate = useNavigate();
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [professions, setProfessions] = useState<Profession[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editing, setEditing] = useState<Worker | null>(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [wRes, dRes, pRes] = await Promise.all([
        api.get('/workers/'),
        api.get('/departments/'),
        api.get('/professions/'),
      ]);
      setWorkers(wRes.data);
      setDepartments(dRes.data);
      setProfessions(pRes.data);
    } catch {} finally { setLoading(false); }
  };

  const handleSubmit = async (values: any) => {
    const payload = { ...values, hire_date: values.hire_date.format('YYYY-MM-DD') };
    try {
      if (editing) {
        await api.put(`/workers/${editing.id}`, payload);
        message.success('Работник обновлен');
      } else {
        await api.post('/workers/', payload);
        message.success('Работник добавлен');
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
      await api.delete(`/workers/${id}`);
      message.success('Удалено');
      fetchData();
    } catch (err: any) {
      message.error(err.response?.data?.detail || 'Ошибка');
    }
  };

  const openEdit = (worker: Worker) => {
    setEditing(worker);
    form.setFieldsValue({ ...worker, hire_date: dayjs(worker.hire_date) });
    setModalVisible(true);
  };

  const statusColors: Record<string, string> = {
    active: 'green',
    on_leave: 'orange',
    dismissed: 'red',
  };
  const statusLabels: Record<string, string> = {
    active: 'Активен',
    on_leave: 'В отпуске',
    dismissed: 'Уволен',
  };

  const columns = [
    { title: 'Таб. №', dataIndex: 'personnel_number', key: 'pn' },
    {
      title: 'ФИО',
      key: 'name',
      render: (_: any, r: Worker) => `${r.last_name} ${r.first_name} ${r.middle_name || ''}`,
    },
    {
      title: 'Подразделение',
      dataIndex: 'department_id',
      key: 'dept',
      render: (id: number) => departments.find(d => d.id === id)?.name || '-',
    },
    {
      title: 'Профессия',
      dataIndex: 'profession_id',
      key: 'prof',
      render: (id: number) => professions.find(p => p.id === id)?.name || '-',
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      render: (s: string) => <Tag color={statusColors[s]}>{statusLabels[s]}</Tag>,
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_: any, record: Worker) => (
        <Space>
          <Button icon={<EyeOutlined />} onClick={() => navigate(`/workers/${record.id}`)} size="small" />
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
        <Title level={4}>Работники</Title>
        <Space>
          <Input.Search placeholder="Поиск..." onSearch={setSearchText} style={{ width: 250 }} allowClear />
          <Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditing(null); form.resetFields(); setModalVisible(true); }}>
            Добавить
          </Button>
        </Space>
      </div>
      <Table
        columns={columns}
        dataSource={workers.filter(w =>
          !searchText || `${w.last_name} ${w.first_name} ${w.personnel_number}`.toLowerCase().includes(searchText.toLowerCase())
        )}
        rowKey="id"
        loading={loading}
      />
      <Modal
        title={editing ? 'Редактировать работника' : 'Новый работник'}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={() => form.submit()}
        width={600}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="personnel_number" label="Табельный номер" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="last_name" label="Фамилия" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="first_name" label="Имя" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="middle_name" label="Отчество">
            <Input />
          </Form.Item>
          <Form.Item name="department_id" label="Подразделение" rules={[{ required: true }]}>
            <Select options={departments.map(d => ({ value: d.id, label: d.name }))} />
          </Form.Item>
          <Form.Item name="profession_id" label="Профессия" rules={[{ required: true }]}>
            <Select options={professions.map(p => ({ value: p.id, label: p.name }))} />
          </Form.Item>
          <Form.Item name="hire_date" label="Дата приема" rules={[{ required: true }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="total_experience_years" label="Общий стаж (лет)">
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="profession_experience_years" label="Стаж по профессии (лет)">
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="status" label="Статус">
            <Select options={[
              { value: 'active', label: 'Активен' },
              { value: 'on_leave', label: 'В отпуске' },
              { value: 'dismissed', label: 'Уволен' },
            ]} />
          </Form.Item>
          <Form.Item name="card_uid" label="UID карты">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Workers;
