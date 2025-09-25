export const architectureComparison = [
  { aspect: 'Complexity', monolith: 2, microservices: 8, serverless: 6 },
  { aspect: 'Scalability', monolith: 4, microservices: 9, serverless: 10 },
  { aspect: 'Deployment', monolith: 8, microservices: 4, serverless: 9 },
  { aspect: 'Monitoring', monolith: 8, microservices: 3, serverless: 6 },
  { aspect: 'Cost (Start)', monolith: 9, microservices: 3, serverless: 10 },
  { aspect: 'Team Size', monolith: 9, microservices: 2, serverless: 7 }
]

export const cqrsMetrics = [
  { operation: 'Read Queries', performance: 95, consistency: 80 },
  { operation: 'Write Commands', performance: 70, consistency: 95 },
  { operation: 'Complex Analytics', performance: 90, consistency: 60 },
  { operation: 'Real-time Updates', performance: 85, consistency: 70 }
]

export const eventPatterns = [
  { pattern: 'Event Sourcing', usage: 25, color: '#8884d8' },
  { pattern: 'Event Streaming', usage: 30, color: '#82ca9d' },
  { pattern: 'CQRS', usage: 20, color: '#ffc658' },
  { pattern: 'Saga Pattern', usage: 25, color: '#ff7300' }
]

export const monolithicPatterns = [
  {
    pattern: 'Layered Architecture',
    description: 'Traditional N-tier architecture with presentation, business, and data layers',
    pros: ['Clear separation of concerns', 'Easy to understand', 'Simple deployment'],
    cons: ['Tight coupling between layers', 'Difficult to scale individual components'],
    useCase: 'Traditional enterprise applications'
  },
  {
    pattern: 'Modular Monolith',
    description: 'Well-structured monolith with clearly defined modules and boundaries',
    pros: ['Single deployment unit', 'Clear module boundaries', 'Easier refactoring'],
    cons: ['Still shared database', 'Module coupling risk'],
    useCase: 'Teams wanting microservices benefits with monolith simplicity'
  },
  {
    pattern: 'Plugin Architecture',
    description: 'Core system with pluggable modules for extensibility',
    pros: ['High flexibility', 'Easy to extend', 'Clear plugin boundaries'],
    cons: ['Plugin dependency management', 'Version compatibility'],
    useCase: 'Applications requiring third-party extensions'
  }
]

export const serviceMeshFeatures = [
  { feature: 'Traffic Management', description: 'Load balancing, routing, traffic splitting' },
  { feature: 'Security', description: 'mTLS, authentication, authorization' },
  { feature: 'Observability', description: 'Metrics, logging, tracing' },
  { feature: 'Policy Enforcement', description: 'Rate limiting, circuit breaking' }
]

export const architecturalDecisions = [
  {
    factor: 'Team Size',
    monolith: 'Small teams (2-8 developers)',
    microservices: 'Large teams (50+ developers)',
    recommendation: 'Start monolith, evolve to microservices'
  },
  {
    factor: 'Domain Complexity',
    monolith: 'Simple, well-understood domain',
    microservices: 'Complex domain with clear boundaries',
    recommendation: 'Domain-driven design helps both'
  },
  {
    factor: 'Scalability Requirements',
    monolith: 'Predictable, uniform load',
    microservices: 'Different scaling needs per service',
    recommendation: 'Measure first, then scale'
  },
  {
    factor: 'Operational Maturity',
    monolith: 'Simple deployment and monitoring',
    microservices: 'Advanced DevOps capabilities required',
    recommendation: 'Build operational capabilities first'
  }
]

export const eventDrivenPatterns = [
  {
    pattern: 'Event Notification',
    description: 'Simple notification that something happened',
    complexity: 'Low',
    coupling: 'Loose',
    useCase: 'Simple notifications, audit logs'
  },
  {
    pattern: 'Event-Carried State Transfer',
    description: 'Events carry all necessary data for processing',
    complexity: 'Medium',
    coupling: 'Very Loose',
    useCase: 'Data replication, materialized views'
  },
  {
    pattern: 'Event Sourcing',
    description: 'Store events as the primary source of truth',
    complexity: 'High',
    coupling: 'Loose',
    useCase: 'Audit requirements, temporal queries'
  },
  {
    pattern: 'CQRS',
    description: 'Separate read and write models',
    complexity: 'High',
    coupling: 'Medium',
    useCase: 'Different read/write performance needs'
  }
]

export const serviceMeshComparison = [
  {
    mesh: 'Istio',
    complexity: 'High',
    features: 'Comprehensive',
    performance: 'Good',
    adoption: 'High',
    description: 'Full-featured service mesh with extensive capabilities'
  },
  {
    mesh: 'Linkerd',
    complexity: 'Low',
    features: 'Essential',
    performance: 'Excellent',
    adoption: 'Medium',
    description: 'Lightweight, easy to adopt service mesh'
  },
  {
    mesh: 'Consul Connect',
    complexity: 'Medium',
    features: 'Good',
    performance: 'Good',
    adoption: 'Medium',
    description: 'Service mesh built on HashiCorp Consul'
  },
  {
    mesh: 'AWS App Mesh',
    complexity: 'Medium',
    features: 'AWS Integrated',
    performance: 'Good',
    adoption: 'Medium',
    description: 'AWS-native service mesh solution'
  }
]

export const migrationStrategies = [
  {
    strategy: 'Strangler Fig Pattern',
    description: 'Gradually replace monolith by intercepting calls',
    timeframe: '6-24 months',
    risk: 'Low',
    effort: 'High'
  },
  {
    strategy: 'Database Decomposition',
    description: 'Split shared database into service-specific databases',
    timeframe: '3-12 months',
    risk: 'High',
    effort: 'Very High'
  },
  {
    strategy: 'Branch by Abstraction',
    description: 'Create abstraction layer, implement new service behind it',
    timeframe: '2-6 months',
    risk: 'Medium',
    effort: 'Medium'
  },
  {
    strategy: 'Extract Service',
    description: 'Pull out existing functionality into new service',
    timeframe: '1-3 months',
    risk: 'Medium',
    effort: 'Medium'
  }
]

export const designPatterns = [
  {
    pattern: 'API Gateway',
    purpose: 'Single entry point for all client requests',
    benefits: ['Request routing', 'Authentication', 'Rate limiting', 'Request/response transformation'],
    challenges: ['Single point of failure', 'Performance bottleneck', 'Complex configuration']
  },
  {
    pattern: 'Service Discovery',
    purpose: 'Automatically locate services in dynamic environments',
    benefits: ['Dynamic service location', 'Health checking', 'Load balancing'],
    challenges: ['Eventual consistency', 'Split-brain scenarios', 'Configuration complexity']
  },
  {
    pattern: 'Circuit Breaker',
    purpose: 'Prevent cascading failures in distributed systems',
    benefits: ['Fail fast', 'System protection', 'Graceful degradation'],
    challenges: ['Configuration tuning', 'False positives', 'Fallback complexity']
  },
  {
    pattern: 'Bulkhead',
    purpose: 'Isolate critical resources to prevent total system failure',
    benefits: ['Fault isolation', 'Resource protection', 'Performance isolation'],
    challenges: ['Resource waste', 'Complex partitioning', 'Monitoring overhead']
  }
]