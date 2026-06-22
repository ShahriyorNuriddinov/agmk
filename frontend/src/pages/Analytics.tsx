import React, { useEffect, useState } from 'react';
import { Card, Table, Tag, Typography, Progress, Row, Col, Statistic } from 'antd';
import api from '../services/api';
import type { DepartmentAnalytics } from '../types';

const { Title } = Typography;

const Analytics: React.FC = () => {
  const [deptAnalytics, setDeptAnalytics] = useState<DepartmentAnalytics[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const res = await api.get('/analytics/departments');
      setDeptAnalytics(res.data);
    } catch {} finally { setLoading(false); }
  };

  const totalWorkers = deptAnalytics.reduce((sum, d) => sum + d.worker_count, 0);
  const totalOverdueBriefings = deptAnalytics.reduce((sum, d) => sum + d.overdue_briefings, 0);
  const totalOverdueChecks = deptAnalytics.reduce((sum, d) => sum + d.overdue_knowledge_checks, 0);

  const columns = [
    { title: 'Подразделение', dataIndex: 'department_name', key: 'name' },
    { title: 'Работников', dataIndex: 'worker_count', key: 'workers' },
    { title: 'Всего инструктажей', dataIndex: 'total_briefings', key: 'briefings' },
    {
      title: 'Просрочено инстр.',
      dataIndex: 'overdue_briefings',
      key: 'ob',
      render: (v: number) => v > 0 ? <Tag color="red">{v}</Tag> : <Tag color="green">0</Tag>,
    },
    { title: 'Всего проверок', dataIndex: 'total_knowledge_checks', key: 'checks' },
    {
      title: 'Просрочено пров.',
      dataIndex: 'overdue_knowledge_checks',
      key: 'oc',
      render: (v: number) => v > 0 ? <Tag color="red">{v}</Tag> : <Tag color="green">0</Tag>,
    },
    {
      title: 'Соответствие',
      dataIndex: 'compliance_percentage',
      key: 'compliance',
      render: (v: number) => <Progress percent={v} size="small" status={v < 80 ? 'exception' : 'normal'} />,
    },
  ];

  // Sort by compliance (worst first)
  const sorted = [...deptAnalytics].sort((a, b) => a.compliance_percentage - b.compliance_percentage);

  return (
    <div>
      <Title level={4}>Аналитика по подразделениям</Title>
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={8}>
          <Card>
            <Statistic title="Всего работников" value={totalWorkers} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Просроченные инструктажи" value={totalOverdueBriefings} valueStyle={{ color: totalOverdueBriefings > 0 ? '#ff4d4f' : '#52c41a' }} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Просроченные проверки" value={totalOverdueChecks} valueStyle={{ color: totalOverdueChecks > 0 ? '#ff4d4f' : '#52c41a' }} />
          </Card>
        </Col>
      </Row>
      <Card title="Рейтинг подразделений (по уровню соответствия)">
        <Table columns={columns} dataSource={sorted} rowKey="department_id" loading={loading} pagination={false} />
      </Card>
    </div>
  );
};

export default Analytics;
