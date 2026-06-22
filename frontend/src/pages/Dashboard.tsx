import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Statistic, Typography, Progress, Table, Tag } from 'antd';
import {
  TeamOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import api from '../services/api';
import type { DashboardData, DepartmentAnalytics } from '../types';

const { Title } = Typography;

const Dashboard: React.FC = () => {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [deptAnalytics, setDeptAnalytics] = useState<DepartmentAnalytics[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [dashRes, deptRes] = await Promise.all([
        api.get('/analytics/dashboard'),
        api.get('/analytics/departments'),
      ]);
      setDashboard(dashRes.data);
      setDeptAnalytics(deptRes.data);
    } catch {} finally {
      setLoading(false);
    }
  };

  const columns = [
    { title: 'Подразделение', dataIndex: 'department_name', key: 'name' },
    { title: 'Работников', dataIndex: 'worker_count', key: 'workers' },
    { title: 'Инструктажи', dataIndex: 'total_briefings', key: 'briefings' },
    {
      title: 'Просрочено (инстр.)',
      dataIndex: 'overdue_briefings',
      key: 'overdue_b',
      render: (v: number) => v > 0 ? <Tag color="red">{v}</Tag> : <Tag color="green">0</Tag>,
    },
    { title: 'Проверки знаний', dataIndex: 'total_knowledge_checks', key: 'checks' },
    {
      title: 'Просрочено (пров.)',
      dataIndex: 'overdue_knowledge_checks',
      key: 'overdue_c',
      render: (v: number) => v > 0 ? <Tag color="red">{v}</Tag> : <Tag color="green">0</Tag>,
    },
    {
      title: 'Соответствие',
      dataIndex: 'compliance_percentage',
      key: 'compliance',
      render: (v: number) => <Progress percent={v} size="small" status={v < 80 ? 'exception' : 'normal'} />,
    },
  ];

  return (
    <div>
      <Title level={4}>Панель руководителя предприятия</Title>
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Всего работников"
              value={dashboard?.total_workers || 0}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Действующие инструктажи"
              value={dashboard?.active_briefings || 0}
              prefix={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Просроченные инструктажи"
              value={dashboard?.overdue_briefings || 0}
              prefix={<CloseCircleOutlined style={{ color: '#ff4d4f' }} />}
              valueStyle={{ color: (dashboard?.overdue_briefings || 0) > 0 ? '#ff4d4f' : undefined }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Просроченные проверки"
              value={dashboard?.overdue_knowledge_checks || 0}
              prefix={<WarningOutlined style={{ color: '#faad14' }} />}
              valueStyle={{ color: (dashboard?.overdue_knowledge_checks || 0) > 0 ? '#faad14' : undefined }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={8}>
          <Card>
            <Title level={5}>Общее соответствие</Title>
            <Progress
              type="circle"
              percent={dashboard?.compliance_percentage || 0}
              status={(dashboard?.compliance_percentage || 0) < 80 ? 'exception' : 'normal'}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Действующие проверки знаний"
              value={dashboard?.active_knowledge_checks || 0}
              prefix={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Процент выполнения"
              value={dashboard?.compliance_percentage || 0}
              suffix="%"
              precision={1}
            />
          </Card>
        </Col>
      </Row>

      <Title level={5}>Анализ по подразделениям</Title>
      <Table
        columns={columns}
        dataSource={deptAnalytics}
        rowKey="department_id"
        loading={loading}
        pagination={false}
      />
    </div>
  );
};

export default Dashboard;
