import React from 'react';
import { Card, Button, Typography, Space, Row, Col } from 'antd';
import { FileExcelOutlined, DownloadOutlined } from '@ant-design/icons';
import api from '../services/api';

const { Title, Text } = Typography;

const Reports: React.FC = () => {
  const downloadReport = async (url: string, filename: string) => {
    try {
      const res = await api.get(url, { responseType: 'blob' });
      const blob = new Blob([res.data]);
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
    } catch {
      // error handled by interceptor
    }
  };

  const reports = [
    {
      title: 'Отчет по инструктажам',
      description: 'Все инструктажи с информацией о работниках, датах и статусах',
      url: '/reports/briefings/excel',
      filename: 'briefings_report.xlsx',
    },
    {
      title: 'Отчет по проверкам знаний',
      description: 'Все проверки знаний с результатами и сроками',
      url: '/reports/knowledge-checks/excel',
      filename: 'knowledge_checks_report.xlsx',
    },
    {
      title: 'Просроченные мероприятия',
      description: 'Работники с просроченными инструктажами и проверками знаний',
      url: '/reports/overdue-workers/excel',
      filename: 'overdue_workers_report.xlsx',
    },
  ];

  return (
    <div>
      <Title level={4}>Отчетные формы</Title>
      <Text type="secondary" style={{ display: 'block', marginBottom: 24 }}>
        Выгрузка отчетов в формате Excel
      </Text>
      <Row gutter={[16, 16]}>
        {reports.map((report, index) => (
          <Col xs={24} md={8} key={index}>
            <Card>
              <Space direction="vertical" style={{ width: '100%' }}>
                <FileExcelOutlined style={{ fontSize: 32, color: '#52c41a' }} />
                <Title level={5}>{report.title}</Title>
                <Text type="secondary">{report.description}</Text>
                <Button
                  type="primary"
                  icon={<DownloadOutlined />}
                  onClick={() => downloadReport(report.url, report.filename)}
                  block
                >
                  Скачать
                </Button>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Reports;
