// src/components/admin/stats/AdminSystemHealth.tsx

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, Div, Span } from '@/lib/dev-container';
import { BarChart3 } from 'lucide-react';

interface SystemHealthData {
  database: {
    status: string;
    responseTime: number;
    percentage: number;
  };
  api: {
    status: string;
    responseTime: number;
    percentage: number;
  };
  errorRate: {
    value: number;
    percentage: number;
  };
}

interface AdminSystemHealthProps {
  systemHealth: SystemHealthData;
}

export const AdminSystemHealth: React.FC<AdminSystemHealthProps> = ({ systemHealth }) => {
  const healthMetrics = [
    {
      label: 'Database Status',
      value: systemHealth.database.status,
      percentage: systemHealth.database.percentage,
      isStatus: true,
    },
    {
      label: 'API Response Time',
      value: `${systemHealth.api.responseTime}ms`,
      percentage: systemHealth.api.percentage,
      isStatus: false,
    },
    {
      label: 'Error Rate',
      value: `${systemHealth.errorRate.value}%`,
      percentage: systemHealth.errorRate.percentage,
      isStatus: false,
    },
  ];

  return (
    <Card 
      devId="admin-system-health-card"
      devName="Admin System Health Card"
      devDescription="Card displaying system health metrics"
    >
      <CardHeader 
        devId="admin-system-health-header"
        devName="Admin System Health Header"
        devDescription="Header for system health card"
      >
        <CardTitle 
          devId="admin-system-health-title"
          devName="Admin System Health Title"
          devDescription="Title for system health section"
          className="flex items-center gap-2"
        >
          <BarChart3 className="h-5 w-5" />
          System Health
        </CardTitle>
      </CardHeader>
      <CardContent 
        devId="admin-system-health-content"
        devName="Admin System Health Content"
        devDescription="Content area for system health metrics"
      >
        <Div 
          devId="admin-system-health-metrics"
          devName="Admin System Health Metrics"
          devDescription="Container for system health metric items"
          className="space-y-4"
        >
          {healthMetrics.map((metric, index) => (
            <Div 
              key={index}
              devId={`admin-health-metric-${index}`}
              devName={`Admin ${metric.label} Health Metric`}
              devDescription={`Health metric for ${metric.label}: ${metric.value}`}
            >
              <Div 
                devId={`admin-health-metric-header-${index}`}
                devName={`Admin ${metric.label} Metric Header`}
                devDescription={`Header for ${metric.label} health metric`}
                className="flex items-center justify-between mb-2"
              >
                <Span 
                  devId={`admin-health-metric-label-${index}`}
                  devName={`Admin ${metric.label} Metric Label`}
                  devDescription={`Label for ${metric.label} health metric`}
                  className="text-sm font-medium"
                >
                  {metric.label}
                </Span>
                <Span 
                  devId={`admin-health-metric-value-${index}`}
                  devName={`Admin ${metric.label} Metric Value`}
                  devDescription={`Value for ${metric.label} health metric`}
                  className={`text-sm text-green-600 ${metric.isStatus ? 'capitalize' : ''}`}
                >
                  {metric.value}
                </Span>
              </Div>
              <Div 
                devId={`admin-health-metric-progress-container-${index}`}
                devName={`Admin ${metric.label} Progress Container`}
                devDescription={`Progress bar container for ${metric.label} health metric`}
                className="w-full bg-gray-200 rounded-full h-2"
              >
                <Div 
                  devId={`admin-health-metric-progress-bar-${index}`}
                  devName={`Admin ${metric.label} Progress Bar`}
                  devDescription={`Progress bar for ${metric.label} health metric`}
                  className="bg-green-600 h-2 rounded-full" 
                  style={{ width: `${metric.percentage}%` }}
                />
              </Div>
            </Div>
          ))}
        </Div>
      </CardContent>
    </Card>
  );
};