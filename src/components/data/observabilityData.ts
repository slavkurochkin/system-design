export const metricsData = [
  { time: '00:00', responseTime: 120, errorRate: 0.5, throughput: 1000, cpuUsage: 45 },
  { time: '04:00', responseTime: 95, errorRate: 0.3, throughput: 800, cpuUsage: 35 },
  { time: '08:00', responseTime: 150, errorRate: 1.2, throughput: 1500, cpuUsage: 65 },
  { time: '12:00', responseTime: 180, errorRate: 2.1, throughput: 2000, cpuUsage: 80 },
  { time: '16:00', responseTime: 160, errorRate: 1.8, throughput: 1800, cpuUsage: 70 },
  { time: '20:00', responseTime: 130, errorRate: 0.8, throughput: 1200, cpuUsage: 50 }
]

export const logLevels = [
  { level: 'ERROR', count: 45, color: '#ef4444', severity: 'Critical' },
  { level: 'WARN', count: 120, color: '#f59e0b', severity: 'High' },
  { level: 'INFO', count: 850, color: '#3b82f6', severity: 'Normal' },
  { level: 'DEBUG', count: 320, color: '#6b7280', severity: 'Low' }
]

export const traceData = [
  { service: 'API Gateway', duration: 5, status: 'success' },
  { service: 'Auth Service', duration: 15, status: 'success' },
  { service: 'User Service', duration: 45, status: 'success' },
  { service: 'Database', duration: 120, status: 'success' },
  { service: 'Cache', duration: 8, status: 'success' },
  { service: 'External API', duration: 200, status: 'error' }
]

export const slaMetrics = [
  { metric: 'Availability', current: 99.95, target: 99.9, status: 'good' },
  { metric: 'Response Time (p95)', current: 245, target: 300, status: 'good' },
  { metric: 'Error Rate', current: 0.08, target: 0.1, status: 'good' },
  { metric: 'Throughput (RPS)', current: 1850, target: 1500, status: 'good' }
]

export const alertsData = [
  { id: 1, severity: 'Critical', service: 'Payment API', message: 'High error rate detected', time: '2m ago', status: 'firing' },
  { id: 2, severity: 'Warning', service: 'User Service', message: 'Response time above threshold', time: '15m ago', status: 'firing' },
  { id: 3, severity: 'Info', service: 'Cache', message: 'Memory usage elevated', time: '1h ago', status: 'resolved' },
  { id: 4, severity: 'Critical', service: 'Database', message: 'Connection pool exhausted', time: '2h ago', status: 'resolved' }
]

export const observabilityTools = [
  { category: 'Metrics', tools: ['Prometheus', 'Grafana', 'DataDog', 'New Relic'], usage: 85 },
  { category: 'Logging', tools: ['ELK Stack', 'Fluentd', 'Splunk', 'Loki'], usage: 78 },
  { category: 'Tracing', tools: ['Jaeger', 'Zipkin', 'AWS X-Ray', 'Honeycomb'], usage: 65 },
  { category: 'APM', tools: ['Dynatrace', 'AppDynamics', 'Elastic APM'], usage: 72 }
]

export const monitoringPatterns = [
  {
    pattern: 'Four Golden Signals',
    description: 'Google SRE approach to monitoring',
    signals: ['Latency', 'Traffic', 'Errors', 'Saturation'],
    useCase: 'General service monitoring',
    implementation: 'Monitor user-facing request latency, request rate, error rate, and system saturation'
  },
  {
    pattern: 'RED Method',
    description: 'Request-focused monitoring approach',
    signals: ['Rate', 'Errors', 'Duration'],
    useCase: 'Request-driven services',
    implementation: 'Track request rate, error percentage, and request duration distribution'
  },
  {
    pattern: 'USE Method',
    description: 'Resource-focused monitoring approach',
    signals: ['Utilization', 'Saturation', 'Errors'],
    useCase: 'Infrastructure and resource monitoring',
    implementation: 'Monitor resource utilization, saturation, and error counts'
  }
]

export const sloDefinitions = [
  {
    service: 'Web Frontend',
    sli: 'Page Load Time',
    slo: '95% of page loads complete within 2 seconds',
    errorBudget: '5% (36 minutes/month)',
    measurement: 'Real User Monitoring (RUM)'
  },
  {
    service: 'API Gateway',
    sli: 'Request Success Rate',
    slo: '99.9% of requests return non-5xx status',
    errorBudget: '0.1% (43 minutes/month)',
    measurement: 'Server-side metrics'
  },
  {
    service: 'Database',
    sli: 'Query Response Time',
    slo: '99% of queries complete within 100ms',
    errorBudget: '1% (7.2 hours/month)',
    measurement: 'Database metrics'
  },
  {
    service: 'Payment Service',
    sli: 'Transaction Processing',
    slo: '99.99% availability during business hours',
    errorBudget: '0.01% (4.3 minutes/month)',
    measurement: 'Synthetic monitoring'
  }
]

export const alertingSeverities = [
  {
    severity: 'P0 - Critical',
    description: 'Complete service outage or data loss',
    responseTime: '< 5 minutes',
    escalation: 'Immediate on-call',
    examples: ['Service completely down', 'Data corruption', 'Security breach']
  },
  {
    severity: 'P1 - High',
    description: 'Significant service degradation',
    responseTime: '< 15 minutes',
    escalation: 'On-call engineer',
    examples: ['High error rates', 'Performance degradation', 'Feature unavailable']
  },
  {
    severity: 'P2 - Medium',
    description: 'Minor service issues',
    responseTime: '< 1 hour',
    escalation: 'During business hours',
    examples: ['Elevated latency', 'Non-critical errors', 'Capacity warnings']
  },
  {
    severity: 'P3 - Low',
    description: 'Informational alerts',
    responseTime: 'Next business day',
    escalation: 'Engineering team',
    examples: ['Deployment notifications', 'Trend alerts', 'Maintenance reminders']
  }
]

export const observabilityPillars = [
  {
    pillar: 'Metrics',
    description: 'Numerical measurements over time',
    characteristics: ['Time-series data', 'Aggregatable', 'Low storage cost', 'Good for alerting'],
    examples: ['CPU usage', 'Request rate', 'Error count', 'Response time'],
    tools: ['Prometheus', 'StatsD', 'CloudWatch', 'DataDog'],
    challenges: ['Cardinality explosion', 'Sampling complexity', 'Storage costs']
  },
  {
    pillar: 'Logs',
    description: 'Discrete events with contextual information',
    characteristics: ['Event-based', 'Searchable', 'High storage cost', 'Rich context'],
    examples: ['Application logs', 'Access logs', 'Error messages', 'Audit trails'],
    tools: ['ELK Stack', 'Splunk', 'Fluentd', 'Loki'],
    challenges: ['Volume management', 'Structured logging', 'Retention policies']
  },
  {
    pillar: 'Traces',
    description: 'Request flows across distributed systems',
    characteristics: ['Request-scoped', 'Causal relationships', 'Performance insights', 'Complex data'],
    examples: ['HTTP requests', 'Database calls', 'Service calls', 'Message processing'],
    tools: ['Jaeger', 'Zipkin', 'AWS X-Ray', 'Honeycomb'],
    challenges: ['Sampling strategies', 'Performance overhead', 'Data correlation']
  }
]

export const incidentResponse = [
  {
    phase: 'Detection',
    duration: 2,
    activities: ['Monitor alerts', 'Automated detection', 'User reports', 'Health checks'],
    tools: ['Monitoring systems', 'Alerting tools', 'Status pages'],
    success: 'Incident detected quickly with minimal manual intervention'
  },
  {
    phase: 'Response',
    duration: 5,
    activities: ['Acknowledge alert', 'Assess severity', 'Mobilize team', 'Initial triage'],
    tools: ['PagerDuty', 'Slack', 'Incident management', 'Runbooks'],
    success: 'Right people notified and responding within SLA'
  },
  {
    phase: 'Mitigation',
    duration: 30,
    activities: ['Implement workarounds', 'Rollback changes', 'Scale resources', 'Traffic routing'],
    tools: ['Deployment tools', 'Feature flags', 'Load balancers', 'Cloud consoles'],
    success: 'Service restored to acceptable level'
  },
  {
    phase: 'Resolution',
    duration: 120,
    activities: ['Root cause analysis', 'Permanent fix', 'Testing', 'Deployment'],
    tools: ['Code repositories', 'CI/CD pipelines', 'Testing frameworks'],
    success: 'Underlying issue completely resolved'
  },
  {
    phase: 'Post-mortem',
    duration: 60,
    activities: ['Document findings', 'Action items', 'Process improvements', 'Knowledge sharing'],
    tools: ['Documentation tools', 'Project management', 'Presentation tools'],
    success: 'Learning captured and preventive measures implemented'
  }
]