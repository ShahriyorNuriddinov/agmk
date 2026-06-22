import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Descriptions, Table, Tag, Typography, Spin, Row, Col } from 'antd';
import api from '../services/api';
import type { WorkerCard as WorkerCardType } from '../types';

const { Title } = Typography;

const WorkerCardPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<WorkerCardType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchCard();
  }, [id]);

  const fetchCard = async () => {
    try {
      const res = await api.get(`/analytics/workers/${id}/card`);
      setData(res.data);
    } catch {} finally { setLoading(false); }
  };

  if (loading) return <Spin size="large" />;
  if (!data) return <div>Работник не найден</div>;

  const statusColors: Record<string, string> = { valid: 'green', approaching: 'orange', overdue: 'red' };
  const typeLabels: Record<string, string> = { primary: 'Первичный', repeat: 'Повторный', unplanned: 'Внеплановый', targeted: 'Целевой' };
  const resultLabels: Record<string, string> = { satisfactory: 'Удовлетворительно', unsatisfactory: 'Неудовлетворительно' };

  return (
    <div>
      <Title level={4}>Карточка работника</Title>
      <Card style={{ marginBottom: 16 }}>
        <Descriptions bordered column={2}>
          <Descriptions.Item label="Табельный номер">{data.personnel_number}</Descriptions.Item>
          <Descriptions.Item label="ФИО">{data.full_name}</Descriptions.Item>
          <Descriptions.Item label="Подразделение">{data.department_name}</Descriptions.Item>
          <Descriptions.Item label="Участок">{data.section_name || '-'}</Descriptions.Item>
          <Descriptions.Item label="Профессия">{data.profession_name}</Descriptions.Item>
        </Descriptions>
      </Card>

      <Row gutter={16}>
        <Col span={12}>
          <Card title="История инструктажей" style={{ marginBottom: 16 }}>
            <Table
              dataSource={data.briefing_history}
              rowKey="id"
              size="small"
              pagination={{ pageSize: 5 }}
              columns={[
                { title: 'Тип', dataIndex: 'type', render: (t: string) => typeLabels[t] || t },
                { title: 'Дата', dataIndex: 'date', render: (d: string) => new Date(d).toLocaleDateString('ru') },
                { title: 'Инструктор', dataIndex: 'instructor' },
                { title: 'Статус', dataIndex: 'status', render: (s: string) => <Tag color={statusColors[s]}>{s}</Tag> },
                { title: 'Подтвержден', dataIndex: 'confirmed', render: (c: boolean) => c ? <Tag color="green">Да</Tag> : <Tag color="red">Нет</Tag> },
              ]}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="История проверок знаний" style={{ marginBottom: 16 }}>
            <Table
              dataSource={data.knowledge_check_history}
              rowKey="id"
              size="small"
              pagination={{ pageSize: 5 }}
              columns={[
                { title: 'Дата', dataIndex: 'date', render: (d: string) => new Date(d).toLocaleDateString('ru') },
                { title: 'Протокол', dataIndex: 'protocol' },
                { title: 'Результат', dataIndex: 'result', render: (r: string) => <Tag color={r === 'satisfactory' ? 'green' : 'red'}>{resultLabels[r]}</Tag> },
                { title: 'Статус', dataIndex: 'status', render: (s: string) => <Tag color={statusColors[s]}>{s}</Tag> },
              ]}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Card title="Ближайшие инструктажи">
            <Table
              dataSource={data.upcoming_briefings}
              rowKey="id"
              size="small"
              columns={[
                { title: 'Тип', dataIndex: 'type', render: (t: string) => typeLabels[t] || t },
                { title: 'Дата', dataIndex: 'next_date' },
              ]}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Ближайшие проверки знаний">
            <Table
              dataSource={data.upcoming_checks}
              rowKey="id"
              size="small"
              columns={[
                { title: 'Следующая дата', dataIndex: 'next_date' },
              ]}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default WorkerCardPage;
