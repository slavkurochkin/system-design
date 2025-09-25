export const reliabilityMetrics = [
  { 
    name: 'Availability', 
    value: '99.95%', 
    target: '99.99%', 
    color: '#22c55e',
    description: 'Percentage of time the system is operational and accessible'
  },
  { 
    name: 'MTBF', 
    value: '8,200h', 
    target: '8,760h', 
    color: '#3b82f6',
    description: 'Mean Time Between Failures - average operational time between failures'
  },
  { 
    name: 'MTTR', 
    value: '18min', 
    target: '15min', 
    color: '#f59e0b',
    description: 'Mean Time To Recovery - average time to restore service after failure'
  },
  { 
    name: 'Error Rate', 
    value: '0.08%', 
    target: '0.1%', 
    color: '#ef4444',
    description: 'Percentage of requests that result in errors'
  }
]

export const failoverPatterns = [
  { name: 'Active-Passive', rto: '2-5 min', rpo: '0-1 min', complexity: 'Low', cost: 'Medium', description: 'Primary handles traffic, secondary on standby' },
  { name: 'Active-Active', rto: '< 1 min', rpo: '0', complexity: 'High', cost: 'High', description: 'Both systems handle traffic simultaneously' },
  { name: 'Pilot Light', rto: '10-30 min', rpo: '5-15 min', complexity: 'Medium', cost: 'Low', description: 'Minimal infrastructure always running' },
  { name: 'Warm Standby', rto: '5-10 min', rpo: '1-5 min', complexity: 'Medium', cost: 'Medium', description: 'Scaled-down version always running' },
  { name: 'Blue-Green', rto: '< 2 min', rpo: '0', complexity: 'Medium', cost: 'High', description: 'Two identical environments, switch traffic' },
  { name: 'Rolling Deployment', rto: '< 1 min', rpo: '0', complexity: 'Low', cost: 'Low', description: 'Gradually replace instances' },
  { name: 'Canary Deployment', rto: '< 1 min', rpo: '0', complexity: 'Medium', cost: 'Low', description: 'Route small traffic percentage to new version' },
  { name: 'Multi-Region', rto: '1-3 min', rpo: '0-30 sec', complexity: 'High', cost: 'Very High', description: 'Geographically distributed failover' }
]

export const chaosExperiments = [
  { 
    name: 'Instance Termination', 
    severity: 'High', 
    description: 'Randomly terminate application instances to test recovery mechanisms',
    expectedImpact: 'Service degradation or temporary unavailability',
    mitigation: 'Auto-scaling groups and health checks should restore service automatically'
  },
  { 
    name: 'Network Latency Injection', 
    severity: 'Medium', 
    description: 'Inject artificial network delays between services',
    expectedImpact: 'Increased response times and potential timeouts',
    mitigation: 'Circuit breakers and retry policies should handle degraded performance'
  },
  { 
    name: 'CPU Stress Test', 
    severity: 'Medium', 
    description: 'Create high CPU load on application servers',
    expectedImpact: 'Slower response times and potential request queuing',
    mitigation: 'Load balancing and auto-scaling should distribute load'
  },
  { 
    name: 'Memory Pressure', 
    severity: 'High', 
    description: 'Consume available memory to test memory leak handling',
    expectedImpact: 'Application crashes or out-of-memory errors',
    mitigation: 'Memory monitoring and container restart policies should recover service'
  },
  { 
    name: 'Database Connection Failure', 
    severity: 'High', 
    description: 'Simulate database connectivity issues',
    expectedImpact: 'Data access failures and application errors',
    mitigation: 'Database connection pooling and fallback mechanisms should activate'
  },
  { 
    name: 'Disk I/O Spike', 
    severity: 'Low', 
    description: 'Create high disk I/O load to test storage performance',
    expectedImpact: 'Slower file operations and potential disk bottlenecks',
    mitigation: 'I/O monitoring and disk performance optimization should maintain service'
  }
]

export const availabilityData = [
  { month: 'Jan', availability: 99.95 },
  { month: 'Feb', availability: 99.98 },
  { month: 'Mar', availability: 99.92 },
  { month: 'Apr', availability: 99.97 },
  { month: 'May', availability: 99.94 },
  { month: 'Jun', availability: 99.99 }
]

export const slaData = [
  { metric: 'Availability', actual: 99.95, target: 99.99 },
  { metric: 'Response Time', actual: 120, target: 100 },
  { metric: 'Throughput', actual: 850, target: 1000 },
  { metric: 'Error Rate', actual: 0.08, target: 0.1 }
]

export const redundancyLevels = [
  {
    type: 'Single Instance',
    availability: 95,
    description: 'No redundancy, single point of failure',
    costFactor: 1,
    benefits: ['Simple setup', 'Low cost', 'Easy maintenance'],
    tradeoffs: ['Single point of failure', 'No fault tolerance', 'Extended downtime']
  },
  {
    type: 'Active-Passive',
    availability: 99.5,
    description: 'Standby instance for failover',
    costFactor: 1.5,
    benefits: ['Automatic failover', 'Data preservation', 'Quick recovery'],
    tradeoffs: ['Unused resources', 'Complexity increase', 'Manual intervention may be needed']
  },
  {
    type: 'Active-Active',
    availability: 99.9,
    description: 'Load distributed across instances',
    costFactor: 2,
    benefits: ['Zero downtime', 'Full resource utilization', 'Horizontal scaling'],
    tradeoffs: ['Data synchronization complexity', 'Higher costs', 'Conflict resolution needed']
  },
  {
    type: 'Multi-Zone',
    availability: 99.99,
    description: 'Distributed across availability zones',
    costFactor: 3,
    benefits: ['Geographic redundancy', 'Disaster recovery', 'Maximum availability'],
    tradeoffs: ['Network latency', 'Complex configuration', 'Very high costs']
  },
  {
    type: 'Multi-Region',
    availability: 99.999,
    description: 'Distributed across multiple regions globally',
    costFactor: 5,
    benefits: ['Global availability', 'Disaster resilience', 'User proximity'],
    tradeoffs: ['Data consistency challenges', 'Extreme complexity', 'Regulatory compliance']
  }
]

export const circuitBreakerBenefits = [
  {
    benefit: 'Fail Fast',
    description: 'Stop calling failed services immediately',
    impact: 'Reduces latency for failing requests',
    implementation: 'Return cached data or error response'
  },
  {
    benefit: 'Prevent Cascade',
    description: 'Stop failures from propagating upstream',
    impact: 'Maintains overall system stability',
    implementation: 'Isolate failing services from healthy ones'
  },
  {
    benefit: 'Allow Recovery',
    description: 'Give failing services time to recover',
    impact: 'Automatic service restoration',
    implementation: 'Periodic health checks and gradual recovery'
  },
  {
    benefit: 'Resource Protection',
    description: 'Prevent resource exhaustion',
    impact: 'Maintain system performance',
    implementation: 'Stop resource-intensive failed calls'
  }
]

export const circuitBreakerImplementation = [
  {
    step: '1. Define Thresholds',
    description: 'Set failure rate and timeout thresholds',
    example: 'Failure rate > 50% in 10 requests'
  },
  {
    step: '2. Monitor Metrics',
    description: 'Track request success/failure rates',
    example: 'Count successful vs failed requests'
  },
  {
    step: '3. State Transitions',
    description: 'Move between Closed → Open → Half-Open',
    example: 'Open circuit after threshold breach'
  },
  {
    step: '4. Recovery Testing',
    description: 'Periodically test service health',
    example: 'Allow limited requests in Half-Open state'
  }
]

export const failoverStrategies = [
  {
    strategy: 'DNS Failover',
    description: 'Switch DNS records to backup servers',
    rto: '5-15 minutes',
    pros: ['Simple implementation', 'Works globally'],
    cons: ['DNS caching delays', 'No session persistence'],
    useCase: 'Global service failover'
  },
  {
    strategy: 'Load Balancer Failover',
    description: 'LB automatically routes to healthy servers',
    rto: '< 30 seconds',
    pros: ['Fast detection', 'Transparent to clients'],
    cons: ['Single point of failure', 'Limited to single region'],
    useCase: 'Server-level failover'
  },
  {
    strategy: 'Application-Level Failover', 
    description: 'Application logic handles service failures',
    rto: '< 5 seconds',
    pros: ['Fine-grained control', 'Business logic aware'],
    cons: ['Complex implementation', 'Tight coupling'],
    useCase: 'Service-to-service communication'
  },
  {
    strategy: 'Database Failover',
    description: 'Switch to replica database on primary failure',
    rto: '1-10 minutes',
    pros: ['Data preservation', 'Automatic switchback'],
    cons: ['Potential data loss', 'Complex configuration'],
    useCase: 'Database high availability'
  }
]