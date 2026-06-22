import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, DatePicker, InputNumber, message, Typography, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import api from '../services/api';
import type { KnowledgeCheck, Worker } from '../types';

const { Title } = Typography;

const statusColors: Record<string, string> = { valid: 'green', approaching: 'orange', overdue: 'red' };
const statusLabels: Record<string, string> = { valid: 'Действующая', approaching: 'Истекающая', overdue: 'Просроченная' };
const resultLabels: Record<string, string> = { satisfactory: 'Удовлетворительно', unsatisfactory: 'Неудовлетворительно' };

const KnowledgeChecks: React.FC = () => {
  const [checks, setChecks] = useState<KnowledgeCheck[]>([]);
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [cRes, wRes] = await Promise.all([
        api.get('/knowledge-checks/'),
        api.get('/workers/'),
      ]);
      setChecks(cRes.data);
      setWorkers(wRes.data);
    } catch {} finally { setLoading(false); }
  };

  const handleSubmit = async (values: any) => {
    const payload = {
      ...values,
      check_date: values.check_date.format('YYYY-MM-DD'),
    };
    try {
      await api.post('/knowledge-checks/', payload);
      message.success('Проверка знаний записана');
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
      title: 'Дата проверки',
      dataIndex: 'check_date',
      key: 'date',
      render: (d: string) => new Date(d).toLocaleDateString('ru'),
    },
    { title: '№ протокола', dataIndex: 'protocol_number', key: 'protocol' },
    {
      title: 'Результат',
      dataIndex: 'result',
      key: 'result',
      render: (r: string) => (
        <Tag color={r === 'satisfactory' ? 'green' : 'red'}>
          {resultLabels[r]}
        </Tag>
      ),
    },
    {
      title: 'Следующая проверка',
      dataIndex: 'next_check_date',
      key: 'next',
      render: (d: string) => new Date(d).toLocaleDateString('ru'),
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
      render: (_: any, r: KnowledgeCheck) =>
        r.worker_confirmed && r.chairman_confirmed
          ? <Tag color="green">Да</Tag>
          : <Tag color="orange">Нет</Tag>,
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Title level={4}>Проверка знаний по охране труда</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => { form.resetFields(); setModalVisible(true); }}>
          Записать проверку
        </Button>
      </div>
      <Table columns={columns} dataSource={checks} rowKey="id" loading={loading} />
      <Modal
        title="Новая проверка знаний"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={() => form.submit()}
        width={500}
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
          <Form.Item name="check_date" label="Дата проверки" rules={[{ required: true }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="protocol_number" label="Номер протокола" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="result" label="Результат" rules={[{ required: true }]}>
            <Select options={[
              { value: 'satisfactory', label: 'Удовлетворительно' },
              { value: 'unsatisfactory', label: 'Неудовлетворительно' },
            ]} />
          </Form.Item>
          <Form.Item name="validity_period_days" label="Срок действия (дней)" initialValue={365}>
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default KnowledgeChecks;
