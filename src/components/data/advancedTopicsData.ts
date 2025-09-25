export const consensusComparison = [
  { algorithm: 'Raft', consistency: 9, availability: 7, partition_tolerance: 8, complexity: 6 },
  { algorithm: 'PBFT', consistency: 10, availability: 6, partition_tolerance: 9, complexity: 9 },
  { algorithm: 'Paxos', consistency: 10, availability: 7, partition_tolerance: 8, complexity: 10 },
  { algorithm: 'PBFT-SMaRt', consistency: 9, availability: 8, partition_tolerance: 9, complexity: 8 }
]

export const hashingPerformance = [
  { nodes: 3, rebalancing: 85, lookups: 95 },
  { nodes: 5, rebalancing: 75, lookups: 92 },
  { nodes: 10, rebalancing: 65, lookups: 88 },
  { nodes: 20, rebalancing: 55, lookups: 85 },
  { nodes: 50, rebalancing: 45, lookups: 82 },
  { nodes: 100, rebalancing: 35, lookups: 80 }
]

export const crdtTypes = [
  { type: 'G-Counter', convergence: 'Strong', operations: ['Increment'], use_case: 'Like counters' },
  { type: 'PN-Counter', convergence: 'Strong', operations: ['Inc', 'Dec'], use_case: 'Vote counting' },
  { type: 'G-Set', convergence: 'Strong', operations: ['Add'], use_case: 'Tag systems' },
  { type: 'OR-Set', convergence: 'Strong', operations: ['Add', 'Remove'], use_case: 'Shopping carts' },
  { type: 'LWW-Register', convergence: 'Eventual', operations: ['Set'], use_case: 'User profiles' },
  { type: 'Sequence CRDT', convergence: 'Strong', operations: ['Insert', 'Delete'], use_case: 'Collaborative editing' }
]

export const vectorClockExample = [
  { node: 'A', events: [{ event: 'Send msg to B', clock: '[1,0,0]' }, { event: 'Receive from C', clock: '[2,0,1]' }] },
  { node: 'B', events: [{ event: 'Receive from A', clock: '[1,1,0]' }, { event: 'Send msg to C', clock: '[1,2,0]' }] },
  { node: 'C', events: [{ event: 'Internal event', clock: '[0,0,1]' }, { event: 'Receive from B', clock: '[1,2,1]' }] }
]

export const distributedPatterns = [
  { pattern: 'Event Sourcing', complexity: 7, scalability: 9, consistency: 8, color: '#8884d8' },
  { pattern: 'CQRS', complexity: 6, scalability: 8, consistency: 7, color: '#82ca9d' },
  { pattern: 'Saga Pattern', complexity: 8, scalability: 7, consistency: 6, color: '#ffc658' },
  { pattern: 'Two-Phase Commit', complexity: 5, scalability: 4, consistency: 10, color: '#ff7300' },
  { pattern: 'Eventually Consistent', complexity: 4, scalability: 10, consistency: 5, color: '#8dd1e1' }
]

export const capTheoremExamples = [
  { system: 'RDBMS (MySQL)', consistency: 'Strong', availability: 'High', partition_tolerance: 'Low', trade_off: 'CA' },
  { system: 'MongoDB', consistency: 'Eventual', availability: 'High', partition_tolerance: 'High', trade_off: 'AP' },
  { system: 'HBase', consistency: 'Strong', availability: 'Medium', partition_tolerance: 'High', trade_off: 'CP' },
  { system: 'Cassandra', consistency: 'Tunable', availability: 'High', partition_tolerance: 'High', trade_off: 'AP' },
  { system: 'Redis', consistency: 'Strong', availability: 'High', partition_tolerance: 'Low', trade_off: 'CA' }
]