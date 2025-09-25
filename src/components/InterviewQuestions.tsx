import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Badge } from './ui/badge'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'
import { CheckCircle, XCircle, MessageSquare, Clock, Users, Lightbulb, AlertTriangle, Target, Zap } from 'lucide-react'
import { GlobalWarning } from './GlobalWarning'

export function InterviewQuestions() {
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')

  const interviewQuestions = [
    {
      id: 1,
      question: "Design a URL shortener like bit.ly",
      difficulty: "beginner",
      category: "Web Services",
      estimatedTime: "45-60 minutes",
      keyTopics: ["Hashing", "Database Design", "Caching", "Load Balancing"],
      sampleAnswer: {
        requirements: [
          "Functional: Shorten URLs, redirect to original URL, custom aliases, expiration",
          "Non-functional: 100:1 read/write ratio, 500M URLs/month, 100ms latency, 99.9% availability"
        ],
        estimation: [
          "Storage: 500M URLs * 12 months * 500 bytes = ~3TB",
          "Read QPS: 100M/day * 100 = 10B/day = ~116K QPS",
          "Write QPS: 100M/day = ~1.2K QPS"
        ],
        highLevel: [
          "Load balancer → Web servers → Application servers → Database",
          "Add cache layer (Redis) for popular URLs",
          "Use CDN for static content"
        ],
        database: [
          "URLs table: id, shortUrl, longUrl, userId, createdAt, expiresAt",
          "Index on shortUrl for fast lookups",
          "Consider sharding by hash of shortUrl"
        ],
        algorithm: [
          "Base62 encoding using auto-increment ID",
          "Or hash function (MD5) + collision handling",
          "Counter-based approach for better distribution"
        ],
        scaling: [
          "Read replicas for database",
          "Cache popular URLs with LRU eviction",
          "Horizontal partitioning by URL hash",
          "Rate limiting per user/IP"
        ]
      },
      goodAnswerPoints: [
        "Start with requirements gathering and estimation",
        "Discuss URL encoding strategies (Base62, MD5, etc.)",
        "Address database schema and indexing",
        "Consider caching strategies for popular URLs",
        "Handle custom URLs and collision resolution",
        "Discuss analytics and rate limiting"
      ],
      badAnswerPoints: [
        "Jump straight into implementation without requirements",
        "Ignore scalability considerations",
        "Forget about URL collision handling",
        "Not discussing data consistency requirements",
        "Overlooking security aspects (spam, malicious links)",
        "No mention of monitoring and analytics"
      ],
      followUpQuestions: [
        "How would you handle 100 billion URLs?",
        "What if we need real-time analytics?",
        "How to prevent spam and malicious URLs?",
        "What's your database partitioning strategy?"
      ]
    },
    {
      id: 2,
      question: "Design a chat system like WhatsApp",
      difficulty: "intermediate",
      category: "Real-time Systems",
      estimatedTime: "60-75 minutes",
      keyTopics: ["WebSockets", "Message Queues", "Push Notifications", "Data Consistency"],
      sampleAnswer: {
        requirements: [
          "Functional: 1-on-1 chat, group chat, media sharing, read receipts, last seen",
          "Non-functional: 1B users, 50B messages/day, <100ms latency, 99.99% availability"
        ],
        estimation: [
          "Storage: 50B messages * 100 bytes = 5TB/day",
          "Bandwidth: Peak 1M concurrent users, 10 messages/minute/user",
          "Connection servers: 1M connections / 65K per server = ~15 servers"
        ],
        highLevel: [
          "Gateway service (WebSocket) → Message service → Database",
          "Push notification service for offline users",
          "Media service with CDN for file storage",
          "Presence service for online status"
        ],
        database: [
          "Messages: messageId, chatId, senderId, content, timestamp, type",
          "Chats: chatId, participants[], lastMessage, updatedAt",
          "Users: userId, username, lastSeen, publicKey",
          "Shard messages by chatId for locality"
        ],
        realTime: [
          "WebSocket connections with connection pooling",
          "Message queue (Kafka) for reliable delivery",
          "Fan-out service for group messages",
          "Acknowledgment system for delivery confirmation"
        ],
        scaling: [
          "Horizontal scaling of WebSocket servers",
          "Database partitioning by user/chat ID",
          "Redis for caching recent messages",
          "CDN for media files with geographic distribution"
        ]
      },
      goodAnswerPoints: [
        "Clarify requirements (1-on-1, group chat, media sharing)",
        "Discuss real-time communication protocols (WebSocket, Long Polling)",
        "Design message delivery guarantees and ordering",
        "Address offline message handling and synchronization",
        "Consider end-to-end encryption and privacy",
        "Plan for media storage and CDN usage",
        "Design presence and notification systems"
      ],
      badAnswerPoints: [
        "Assume all users are always online",
        "Not addressing message ordering and consistency",
        "Ignore security and encryption requirements",
        "Forget about different client types (mobile, web)",
        "No consideration for media files and storage",
        "Not discussing group chat complexities",
        "Overlooking push notifications for offline users"
      ],
      followUpQuestions: [
        "How to handle message ordering in group chats?",
        "What's your strategy for end-to-end encryption?",
        "How to implement read receipts and typing indicators?",
        "How to handle very large group chats (10k+ members)?"
      ]
    },
    {
      id: 3,
      question: "Design a distributed cache system like Redis",
      difficulty: "advanced",
      category: "Distributed Systems",
      estimatedTime: "75-90 minutes",
      keyTopics: ["Consistent Hashing", "Replication", "Fault Tolerance", "Memory Management"],
      sampleAnswer: {
        requirements: [
          "Functional: GET/SET operations, TTL, data types (string, list, set)",
          "Non-functional: <1ms latency, 99.99% availability, 1TB capacity, 1M QPS"
        ],
        estimation: [
          "Memory: 1TB distributed across nodes",
          "Nodes: 1TB / 64GB per node = ~16 nodes",
          "QPS per node: 1M / 16 = ~62K QPS per node"
        ],
        highLevel: [
          "Client → Load balancer → Cache cluster (consistent hashing)",
          "Master-slave replication for each shard",
          "Monitoring and management layer",
          "Optional persistence layer"
        ],
        partitioning: [
          "Consistent hashing with virtual nodes (256 per physical node)",
          "Hash function: SHA-1 or MD5 of key",
          "Replication factor: 3 (data stored on 3 nodes)",
          "Automatic resharding when nodes join/leave"
        ],
        replication: [
          "Master-slave replication within each shard",
          "Asynchronous replication for performance",
          "Consensus protocol (Raft) for master election",
          "Read preference: primary for consistency, secondary for performance"
        ],
        faultTolerance: [
          "Health checking and failure detection",
          "Automatic failover with leader election",
          "Circuit breaker for failing nodes",
          "Data migration during node failures"
        ],
        scaling: [
          "Add nodes: rehash and migrate data gradually",
          "Remove nodes: redistribute data to remaining nodes",
          "Hot partition handling with additional replicas",
          "Memory management with LRU/LFU eviction"
        ]
      },
      goodAnswerPoints: [
        "Define cache requirements (size, latency, consistency)",
        "Implement consistent hashing for data distribution",
        "Design replication strategy for fault tolerance",
        "Address cache eviction policies (LRU, LFU, TTL)",
        "Handle cache coherence and invalidation",
        "Plan for horizontal scaling and resharding",
        "Consider persistence and durability options"
      ],
      badAnswerPoints: [
        "Not discussing data partitioning strategy",
        "Ignore fault tolerance and recovery mechanisms",
        "Forget about cache warming and cold start problems",
        "Not addressing memory management and limits",
        "Overlook network partition handling",
        "No mention of monitoring and observability",
        "Ignore cache coherence in distributed setup"
      ],
      followUpQuestions: [
        "How to handle hotspots in data distribution?",
        "What's your approach to cache coherence?",
        "How to implement distributed locks?",
        "What are the trade-offs between consistency and availability?"
      ]
    },
    {
      id: 4,
      question: "Design a ride-sharing service like Uber",
      difficulty: "advanced",
      category: "Geospatial Systems",
      estimatedTime: "90+ minutes",
      keyTopics: ["Geospatial Indexing", "Real-time Matching", "Payment Systems", "Surge Pricing"],
      sampleAnswer: {
        requirements: [
          "Functional: Request ride, driver matching, real-time tracking, payments, ratings",
          "Non-functional: 100M users, 1M drivers, 10M rides/day, <5s matching time"
        ],
        estimation: [
          "Peak QPS: 10M rides/day = ~116 QPS (peak 5x = 580 QPS)",
          "Storage: Trip data 1KB * 10M = 10GB/day",
          "Location updates: 1M drivers * 30s = 33K updates/s"
        ],
        highLevel: [
          "User/Driver apps → API Gateway → Microservices",
          "Location service → Matching service → Trip service",
          "Payment service → Notification service",
          "Real-time tracking with WebSocket connections"
        ],
        geospatial: [
          "QuadTree for city-level partitioning",
          "Geohash for efficient location queries",
          "Redis with geo commands for fast lookups",
          "Update driver locations every 30 seconds"
        ],
        matching: [
          "Find drivers within radius (e.g., 5km)",
          "Score drivers by: distance, rating, car type",
          "Implement timeout (30s) and retry logic",
          "Batch processing for efficiency during peak hours"
        ],
        database: [
          "Users: userId, name, phone, rating",
          "Drivers: driverId, location, status, carInfo",
          "Trips: tripId, riderId, driverId, route, fare, status",
          "Shard by geographic region"
        ],
        realTime: [
          "WebSocket for real-time location updates",
          "Event-driven architecture with Kafka",
          "Push notifications for trip updates",
          "Circuit breaker for external service calls"
        ],
        scaling: [
          "Microservices with independent scaling",
          "Database partitioning by geography",
          "CDN for static content and maps",
          "Auto-scaling based on demand patterns"
        ]
      },
      goodAnswerPoints: [
        "Gather requirements for riders, drivers, and platform",
        "Design location tracking and geospatial indexing (QuadTree, Geohash)",
        "Implement real-time matching algorithm",
        "Address dynamic pricing and surge calculation",
        "Design trip management and state transitions",
        "Handle payment processing and settlements",
        "Plan for fraud detection and safety features"
      ],
      badAnswerPoints: [
        "Not considering different user types and workflows",
        "Ignore real-time location tracking challenges",
        "Forget about payment processing complexities",
        "Not discussing fraud and safety mechanisms",
        "Overlook regulatory and compliance requirements",
        "No mention of driver onboarding and verification",
        "Ignore surge pricing and dynamic algorithms"
      ],
      followUpQuestions: [
        "How to optimize driver-rider matching?",
        "What's your approach to handling payment failures?",
        "How to detect and prevent fraud?",
        "How to handle high-demand events (concerts, disasters)?"
      ]
    },
    {
      id: 5,
      question: "Design a search engine like Google",
      difficulty: "expert",
      category: "Search & Information Retrieval",
      estimatedTime: "90+ minutes",
      keyTopics: ["Web Crawling", "Indexing", "Ranking Algorithms", "Distributed Processing"],
      sampleAnswer: {
        requirements: [
          "Functional: Web crawling, indexing, search queries, ranking results",
          "Non-functional: 100B web pages, 100K QPS, <100ms response time"
        ],
        estimation: [
          "Storage: 100B pages * 10KB = 1PB for web content",
          "Index size: ~100TB for inverted index",
          "Crawl rate: 100B pages / 30 days = 38M pages/day"
        ],
        highLevel: [
          "Web crawler → Content processor → Indexer → Search service",
          "Link graph builder → PageRank calculator",
          "Query processor → Ranking service → Results aggregator",
          "Cache layer for popular queries"
        ],
        crawling: [
          "Distributed crawlers with politeness policies",
          "Priority queue based on PageRank/freshness",
          "Duplicate detection using URL canonicalization",
          "Robots.txt compliance and rate limiting"
        ],
        indexing: [
          "Inverted index: term → list of documents",
          "Forward index: document → terms and positions",
          "Shard index by term hash for distribution",
          "Incremental indexing for updates"
        ],
        ranking: [
          "PageRank for authority scoring",
          "TF-IDF for relevance scoring",
          "User signals: click-through rate, dwell time",
          "Machine learning models for ranking"
        ],
        database: [
          "Web graph: URLs, links, content",
          "Index shards distributed across clusters",
          "Metadata: crawl time, PageRank, quality score",
          "User data: queries, clicks, preferences"
        ],
        scaling: [
          "Horizontal partitioning of index",
          "MapReduce for batch processing",
          "Caching at multiple layers",
          "Geographically distributed data centers"
        ]
      },
      goodAnswerPoints: [
        "Design web crawler with politeness and efficiency",
        "Implement distributed indexing and storage",
        "Discuss ranking algorithms and relevance scoring",
        "Address real-time search and index updates",
        "Handle different content types (text, images, videos)",
        "Design for personalization and user context",
        "Consider spam detection and content quality"
      ],
      badAnswerPoints: [
        "Not addressing the scale of web crawling",
        "Ignore duplicate content and spam handling",
        "Forget about different search types and intents",
        "Not discussing index freshness and updates",
        "Overlook personalization and ranking factors",
        "No mention of search quality and relevance metrics",
        "Ignore legal and ethical considerations"
      ],
      followUpQuestions: [
        "How to handle real-time search requirements?",
        "What's your approach to fighting spam and SEO manipulation?",
        "How to personalize search results?",
        "How to handle different languages and localization?"
      ]
    },
    {
      id: 6,
      question: "Design a social media feed like Facebook/Instagram",
      difficulty: "intermediate",
      category: "Social Systems",
      estimatedTime: "60-75 minutes",
      keyTopics: ["Timeline Generation", "Content Ranking", "Fanout Strategies", "Caching"],
      sampleAnswer: {
        requirements: [
          "Functional: Post content, follow users, generate feed, like/comment",
          "Non-functional: 1B users, 1M posts/day, feed generation <500ms"
        ],
        estimation: [
          "Daily active users: 300M",
          "Average follows: 200 per user",
          "Posts per user: 1 per day",
          "Feed generation: 300M users * 10 views = 3B feed requests/day"
        ],
        highLevel: [
          "User service → Post service → Feed generation service",
          "Timeline service → Ranking service → Content delivery",
          "Media service with CDN for images/videos",
          "Notification service for interactions"
        ],
        feedGeneration: [
          "Pull model: Generate feed on request (heavy users)",
          "Push model: Pre-generate feed on post (normal users)",
          "Hybrid approach based on user activity",
          "Fanout service for distributing posts to followers"
        ],
        database: [
          "Users: userId, username, followers, following",
          "Posts: postId, userId, content, mediaUrls, timestamp",
          "Feeds: userId, postId, score, timestamp",
          "Graph database for social connections"
        ],
        ranking: [
          "Chronological ordering as baseline",
          "Engagement signals: likes, comments, shares",
          "User affinity score with content creator",
          "Content type preferences and recency"
        ],
        scaling: [
          "Celebrity user handling with separate pipeline",
          "Cache popular posts and user timelines",
          "Database sharding by user ID",
          "CDN for media content delivery"
        ]
      },
      goodAnswerPoints: [
        "Discuss pull vs push vs hybrid fanout strategies",
        "Address timeline generation and ranking algorithms",
        "Consider celebrity user problem and hot accounts",
        "Design for different content types (text, images, videos)",
        "Handle user privacy and content filtering",
        "Plan for engagement tracking and analytics"
      ],
      badAnswerPoints: [
        "Not considering the fanout problem for popular users",
        "Ignore content ranking and relevance",
        "Forget about media content delivery challenges",
        "Not discussing privacy and content moderation",
        "Overlook the scale difference between celebrities and regular users",
        "No mention of real-time features like live feeds"
      ],
      followUpQuestions: [
        "How to handle a celebrity posting to 100M followers?",
        "What's your strategy for content recommendation?",
        "How to implement real-time features like live streaming?",
        "How to handle content moderation and spam detection?"
      ]
    },
    {
      id: 7,
      question: "Design a notification system like push notifications",
      difficulty: "intermediate",
      category: "Messaging Systems",
      estimatedTime: "60-75 minutes",
      keyTopics: ["Message Queues", "Device Management", "Delivery Guarantees", "Rate Limiting"],
      sampleAnswer: {
        requirements: [
          "Functional: Send push notifications, email, SMS across platforms",
          "Non-functional: 1B devices, 100M notifications/day, <5s delivery"
        ],
        estimation: [
          "Peak load: 100M notifications/day = 1.2K/second (peak 10x = 12K/s)",
          "Device registration data: 1B devices * 1KB = 1TB",
          "Message retention: 7 days for delivery attempts"
        ],
        highLevel: [
          "Notification API → Message queue → Delivery workers",
          "Device registry → Template service → Analytics",
          "External gateways: APNS, FCM, SMS providers",
          "Rate limiting and retry mechanisms"
        ],
        deviceManagement: [
          "Device registration with platform-specific tokens",
          "User preference settings for notification types",
          "Device status tracking (active, inactive, invalid)",
          "Token refresh and cleanup processes"
        ],
        delivery: [
          "Message queue partitioned by delivery channel",
          "Worker pools for different notification types",
          "Retry logic with exponential backoff",
          "Dead letter queue for failed deliveries"
        ],
        database: [
          "Devices: deviceId, userId, platform, token, preferences",
          "Messages: messageId, userId, content, status, attempts",
          "Templates: templateId, platform, content, variables",
          "Analytics: delivery rates, open rates, failures"
        ],
        rateLimiting: [
          "Per-user rate limits to prevent spam",
          "Per-app rate limits for API usage",
          "Platform-specific rate limits (APNS, FCM)",
          "Priority queues for different message types"
        ],
        scaling: [
          "Horizontal scaling of worker processes",
          "Database sharding by user ID",
          "Caching device tokens and preferences",
          "Circuit breakers for external service calls"
        ]
      },
      goodAnswerPoints: [
        "Design for multiple delivery channels (push, email, SMS)",
        "Implement device token management and refresh",
        "Address delivery guarantees and retry mechanisms",
        "Plan for user preferences and opt-out handling",
        "Consider rate limiting and spam prevention",
        "Handle platform-specific requirements (iOS, Android)"
      ],
      badAnswerPoints: [
        "Not considering different notification platforms",
        "Ignore device token management complexity",
        "Forget about retry logic and failure handling",
        "Not discussing user preferences and privacy",
        "Overlook rate limiting and spam prevention",
        "No mention of delivery analytics and monitoring"
      ],
      followUpQuestions: [
        "How to handle iOS vs Android platform differences?",
        "What's your approach to preventing notification spam?",
        "How to implement smart retry logic for failed deliveries?",
        "How to handle user preference management across platforms?"
      ]
    }
  ]

  const generalTips = {
    preparation: [
      "Practice drawing system diagrams on whiteboards",
      "Study real-world system architectures and case studies",
      "Understand trade-offs between different design choices",
      "Practice estimating capacity and scaling requirements",
      "Learn about major cloud services and their use cases"
    ],
    during: [
      "Always start by clarifying requirements and constraints",
      "Think out loud and explain your reasoning",
      "Start with a simple design and iteratively add complexity",
      "Ask questions and engage with the interviewer",
      "Be prepared to defend your design choices"
    ],
    common_mistakes: [
      "Jumping into details without understanding requirements",
      "Not considering non-functional requirements (latency, consistency)",
      "Over-engineering the solution for the given scale",
      "Not discussing trade-offs and alternatives",
      "Forgetting about monitoring, logging, and observability"
    ]
  }

  const filteredQuestions = selectedDifficulty === 'all' 
    ? interviewQuestions 
    : interviewQuestions.filter(q => q.difficulty === selectedDifficulty)

  return (
    <div className="space-y-6">
      <GlobalWarning />
      <div className="mb-8">
        <h1 className="mb-4">System Design Interview Questions</h1>
        <p className="text-muted-foreground">
          Practice with real interview questions, learn what makes a good answer, and understand common pitfalls to avoid.
        </p>
      </div>

      <Tabs defaultValue="questions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="questions">Interview Questions</TabsTrigger>
          <TabsTrigger value="strategy">Interview Strategy</TabsTrigger>
          <TabsTrigger value="evaluation">Evaluation Criteria</TabsTrigger>
        </TabsList>

        <TabsContent value="questions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Filter by Difficulty</CardTitle>
              <CardDescription>
                Choose your experience level to see relevant questions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 flex-wrap">
                {['all', 'beginner', 'intermediate', 'advanced', 'expert'].map((level) => (
                  <Badge 
                    key={level}
                    variant={selectedDifficulty === level ? 'default' : 'outline'}
                    className="cursor-pointer capitalize"
                    onClick={() => setSelectedDifficulty(level)}
                  >
                    {level === 'all' ? 'All Levels' : level}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {filteredQuestions.map((question) => (
              <Card key={question.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="text-lg">{question.question}</CardTitle>
                      <div className="flex gap-2 flex-wrap">
                        <Badge variant={
                          question.difficulty === 'beginner' ? 'secondary' :
                          question.difficulty === 'intermediate' ? 'default' :
                          question.difficulty === 'advanced' ? 'destructive' : 'outline'
                        }>
                          {question.difficulty}
                        </Badge>
                        <Badge variant="outline">{question.category}</Badge>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {question.estimatedTime}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {question.keyTopics.map((topic, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible>
                    {question.sampleAnswer && (
                      <AccordionItem value="sample-answer">
                        <AccordionTrigger className="text-purple-600">
                          <div className="flex items-center gap-2">
                            <Lightbulb className="w-4 h-4" />
                            Sample Answer Structure
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4">
                            {Object.entries(question.sampleAnswer).map(([section, content]) => (
                              <div key={section} className="space-y-2">
                                <h6 className="font-medium capitalize text-sm text-blue-600">
                                  {section.replace(/([A-Z])/g, ' $1').trim()}:
                                </h6>
                                <ul className="space-y-1 ml-4">
                                  {content.map((item, index) => (
                                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                                      <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    )}

                    <AccordionItem value="good-answer">
                      <AccordionTrigger className="text-green-600">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4" />
                          What Makes a Good Answer
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2">
                          {question.goodAnswerPoints.map((point, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="bad-answer">
                      <AccordionTrigger className="text-red-600">
                        <div className="flex items-center gap-2">
                          <XCircle className="w-4 h-4" />
                          Common Mistakes to Avoid
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2">
                          {question.badAnswerPoints.map((point, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="follow-up">
                      <AccordionTrigger className="text-blue-600">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="w-4 h-4" />
                          Potential Follow-up Questions
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2">
                          {question.followUpQuestions.map((followUp, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                              <span>{followUp}</span>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="strategy" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-600" />
                  Preparation Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {generalTips.preparation.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  During Interview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {generalTips.during.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  Common Mistakes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {generalTips.common_mistakes.map((mistake, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <span>{mistake}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>The RADIO Method for System Design Interviews</CardTitle>
              <CardDescription>
                A structured approach to tackle any system design question
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {[
                  {
                    letter: 'R',
                    word: 'Requirements',
                    description: 'Clarify functional and non-functional requirements',
                    color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  },
                  {
                    letter: 'A',
                    word: 'Architecture',
                    description: 'Design high-level architecture and main components',
                    color: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200'
                  },
                  {
                    letter: 'D',
                    word: 'Data Model',
                    description: 'Define database schema and data flow',
                    color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  },
                  {
                    letter: 'I',
                    word: 'Interface',
                    description: 'Design APIs and user interfaces',
                    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  },
                  {
                    letter: 'O',
                    word: 'Optimize',
                    description: 'Scale the system and address bottlenecks',
                    color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                  }
                ].map((step) => (
                  <Card key={step.letter} className="text-center">
                    <CardContent className="p-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${step.color}`}>
                        <span className="font-bold text-lg">{step.letter}</span>
                      </div>
                      <h3 className="mb-2">{step.word}</h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="evaluation" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  What Interviewers Look For
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "Problem Understanding",
                      description: "Ability to ask clarifying questions and understand requirements"
                    },
                    {
                      title: "System Thinking",
                      description: "Breaking down complex problems into manageable components"
                    },
                    {
                      title: "Trade-off Analysis",
                      description: "Understanding and articulating different design choices"
                    },
                    {
                      title: "Scalability Awareness",
                      description: "Considering how the system grows with increasing load"
                    },
                    {
                      title: "Communication Skills",
                      description: "Explaining technical concepts clearly and engaging with feedback"
                    }
                  ].map((criteria, index) => (
                    <div key={index} className="space-y-1">
                      <h4 className="text-sm">{criteria.title}</h4>
                      <p className="text-sm text-muted-foreground">{criteria.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-600" />
                  Scoring Framework
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { level: "Strong Hire", color: "text-green-600", criteria: "Comprehensive solution with detailed trade-offs" },
                    { level: "Hire", color: "text-blue-600", criteria: "Good solution covering most aspects" },
                    { level: "Weak Hire", color: "text-yellow-600", criteria: "Basic solution with some gaps" },
                    { level: "No Hire", color: "text-red-600", criteria: "Incomplete or incorrect solution" }
                  ].map((score, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Badge variant="outline" className={score.color}>
                        {score.level}
                      </Badge>
                      <p className="text-sm text-muted-foreground">{score.criteria}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Time Management Guidelines</CardTitle>
              <CardDescription>
                Typical breakdown for a 45-60 minute system design interview
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  { phase: "Requirements", time: "10-15 min", description: "Clarify scope and constraints" },
                  { phase: "High-level Design", time: "15-20 min", description: "Main components and data flow" },
                  { phase: "Detailed Design", time: "15-20 min", description: "Deep dive into key components" },
                  { phase: "Scale & Optimize", time: "10-15 min", description: "Address bottlenecks and scaling" }
                ].map((phase, index) => (
                  <Card key={index}>
                    <CardContent className="p-4 text-center">
                      <h4 className="mb-1">{phase.phase}</h4>
                      <Badge variant="secondary" className="mb-2">{phase.time}</Badge>
                      <p className="text-sm text-muted-foreground">{phase.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}