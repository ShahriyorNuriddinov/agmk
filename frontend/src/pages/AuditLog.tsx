import React, { useEffect, useState } from 'react';
import { Table, Typography, Tag } from 'antd';
import api from '../services/api';

const { Title } = Typography;

interface AuditEntry {
  id: number;
  user_id: number | null;
  action: string;
  entity_type: string;
  entity_id: number | null;
  description: string | null;
  created_at: string;
}

const actionColors: Record<string, string> = {
  create: 'green',
  update: 'blue',
  delete: 'red',
};

const AuditLog: React.FC = () => {
  const [logs, setLogs] = useState<AuditEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await api.get('/audit/');
      setLogs(res.data);
    } catch {} finally { setLoading(false); }
  };

  const columns = [
    {
      title: 'Дата',
      dataIndex: 'created_at',
      key: 'date',
      render: (d: string) => new Date(d).toLocaleString('ru'),
    },
    {
      title: 'Действие',
      dataIndex: 'action',
      key: 'action',
      render: (a: string) => <Tag color={actionColors[a] || 'default'}>{a}</Tag>,
    },
    { title: 'Тип объекта', dataIndex: 'entity_type', key: 'entity' },
    { title: 'ID объекта', dataIndex: 'entity_id', key: 'entity_id' },
    { title: 'Описание', dataIndex: 'description', key: 'desc' },
    { title: 'Пользователь', dataIndex: 'user_id', key: 'user' },
  ];

  return (
    <div>
      <Title level={4}>Журнал аудита</Title>
      <Table columns={columns} dataSource={logs} rowKey="id" loading={loading} />
    </div>
  );
};

export default AuditLog;
