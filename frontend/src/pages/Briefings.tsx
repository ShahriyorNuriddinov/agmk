import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, DatePicker, InputNumber, message, Typography, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import api from '../services/api';
import type { Briefing, Department, Worker } from '../types';

const { Title } = Typography;

const briefingTypeLabels: Record<string, string> = {
  primary: 'Первичный',
  repeat: 'Повторный',
  unplanned: 'Внеплановый',
  targeted: 'Целевой',
};

const statusColors: Record<string, string> = { valid: 'green', approaching: 'orange', overdue: 'red' };
const statusLabels: Record<string, string> = { valid: 'Действителен', approaching: 'Приближается', overdue: 'Просрочен' };

const Briefings: React.FC = () => {
  const [briefings, setBriefings] = useState<Briefing[]>([]);
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [briefingType, setBriefingType] = useState<string>('');

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [bRes, wRes, dRes] = await Promise.all([
        api.get('/briefings/'),
        api.get('/workers/'),
        api.get('/departments/'),
      ]);
      setBriefings(bRes.data);
      setWorkers(wRes.data);
      setDepartments(dRes.data);
    } catch {} finally { setLoading(false); }
  };

  const handleSubmit = async (values: any) => {
    const payload = {
      ...values,
      conducted_at: values.conducted_at.toISOString(),
    };
    try {
      await api.post('/briefings/', payload);
      message.success('Инструктаж записан');
      setModalVisible(false);
      form.resetFields();
      fetchData();
    } catch (err: any) {
      message.error(err.response?.data?.detail || 'Ошибка');
    }
  };

  const columns = [
    {
      title: 'Работник',
      dataIndex: 'worker_id',
      key: 'worker',
      render: (id: number) => {
        const w = workers.find(w => w.id === id);
        return w ? `${w.last_name} ${w.first_name}` : '-';
      },
    },
    {
      title: 'Вид',
      dataIndex: 'briefing_type',
      key: 'type',
      render: (t: string) => briefingTypeLabels[t] || t,
    },
    {
      title: 'Дата проведения',
      dataIndex: 'conducted_at',
      key: 'date',
      render: (d: string) => new Date(d).toLocaleString('ru'),
    },
    { title: 'Инструктор', dataIndex: 'instructor_name', key: 'instructor' },
    {
      title: 'Следующая дата',
      dataIndex: 'next_briefing_date',
      key: 'next',
      render: (d: string | null) => d || '-',
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      render: (s: string) => <Tag color={statusColors[s]}>{statusLabels[s]}</Tag>,
    },
    {
      title: 'Подтвержден',
      key: 'confirmed',
      render: (_: any, r: Briefing) =>
        r.worker_confirmed && r.instructor_confirmed
          ? <Tag color="green">Да</Tag>
          : <Tag color="orange">Нет</Tag>,
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Title level={4}>Учет инструктажей</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => { form.resetFields(); setModalVisible(true); }}>
          Провести инструктаж
        </Button>
      </div>
      <Table columns={columns} dataSource={briefings} rowKey="id" loading={loading} />
      <Modal
        title="Новый инструктаж"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={() => form.submit()}
        width={600}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="worker_id" label="Работник" rules={[{ required: true }]}>
            <Select
              showSearch
              filterOption={(input, option) =>
                (option?.label as string)?.toLowerCase().includes(input.toLowerCase())
              }
              options={workers.map(w => ({ value: w.id, label: `${w.personnel_number} - ${w.last_name} ${w.first_name}` }))}
            />
          </Form.Item>
          <Form.Item name="briefing_type" label="Вид инструктажа" rules={[{ required: true }]}>
            <Select
              onChange={(v) => setBriefingType(v)}
              options={[
                { value: 'primary', label: 'Первичный на рабочем месте' },
                { value: 'repeat', label: 'Повторный' },
                { value: 'unplanned', label: 'Внеплановый' },
                { value: 'targeted', label: 'Целевой' },
              ]}
            />
          </Form.Item>
          <Form.Item name="conducted_at" label="Дата и время проведения" rules={[{ required: true }]}>
            <DatePicker showTime style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="department_id" label="Подразделение" rules={[{ required: true }]}>
            <Select options={departments.map(d => ({ value: d.id, label: d.name }))} />
          </Form.Item>
          <Form.Item name="instructor_name" label="Инструктирующее лицо" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          {briefingType === 'repeat' && (
            <Form.Item name="repeat_period_days" label="Периодичность (дней)">
              <InputNumber min={1} style={{ width: '100%' }} />
            </Form.Item>
          )}
          {(briefingType === 'unplanned' || briefingType === 'targeted') && (
            <Form.Item name="reason" label="Основание" rules={[{ required: true }]}>
              <Input.TextArea rows={3} />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default Briefings;
