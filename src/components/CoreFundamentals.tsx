import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import {
  Server,
  Globe,
  Zap,
  ArrowRight,
  CheckCircle,
  XCircle,
  Network,
  Shield,
  Clock,
  Database,
  Code,
  Users,
  TrendingUp,
  Layers,
  MessageSquare,
  Lock,
} from "lucide-react";
import { Slider } from "./ui/slider";
import { Switch } from "./ui/switch";
import { motion } from "motion/react";
import { GlobalWarning } from "./GlobalWarning";

export function CoreFundamentals() {
  const [selectedProtocol, setSelectedProtocol] = useState("http");
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [latencyValue, setLatencyValue] = useState([100]);
  const [throughputValue, setThroughputValue] = useState([1000]);

  const protocolComparison = [
    {
      protocol: "HTTP/REST",
      type: "Request-Response",
      format: "JSON/XML",
      overhead: "Medium",
      caching: "Excellent",
      streaming: "Limited",
      useCase: "Web APIs, CRUD operations",
      pros: ["Stateless", "Cacheable", "Wide support", "Simple"],
      cons: [
        "Text-based overhead",
        "Multiple round trips",
        "Over/under-fetching",
      ],
    },
    {
      protocol: "GraphQL",
      type: "Query Language",
      format: "JSON",
      overhead: "Medium",
      caching: "Complex",
      streaming: "Subscriptions",
      useCase: "Flexible data fetching",
      pros: [
        "Single endpoint",
        "Precise data fetching",
        "Type safety",
        "Real-time",
      ],
      cons: ["Query complexity", "Caching challenges", "Learning curve"],
    },
    {
      protocol: "gRPC",
      type: "RPC",
      format: "Protocol Buffers",
      overhead: "Low",
      caching: "Limited",
      streaming: "Excellent",
      useCase: "Microservices, high performance",
      pros: [
        "Binary protocol",
        "Type safety",
        "Bidirectional streaming",
        "Code generation",
      ],
      cons: [
        "Limited browser support",
        "Debugging complexity",
        "Binary format",
      ],
    },
    {
      protocol: "WebSocket",
      type: "Bidirectional",
      format: "Binary/Text",
      overhead: "Low",
      caching: "Not applicable",
      streaming: "Excellent",
      useCase: "Real-time communication",
      pros: ["Full-duplex", "Low latency", "Persistent connection"],
      cons: ["Connection management", "Scaling challenges", "No HTTP benefits"],
    },
  ];

  const networkingConcepts = [
    {
      concept: "TCP vs UDP",
      description:
        "Transmission protocols with different reliability guarantees",
      details: {
        TCP: "Reliable, ordered, connection-oriented. Used for HTTP, email, file transfer.",
        UDP: "Fast, connectionless, no guarantees. Used for DNS, video streaming, gaming.",
      },
      useCase: "Choose TCP for reliability, UDP for speed",
      comparison: {
        tcp_reliability: 10,
        tcp_speed: 6,
        udp_reliability: 4,
        udp_speed: 10,
      },
    },
    {
      concept: "DNS Resolution",
      description: "Domain Name System converts hostnames to IP addresses",
      details: {
        Process:
          "1. Browser cache → 2. OS cache → 3. Router cache → 4. ISP DNS → 5. Root servers",
        Types:
          "A records (IPv4), AAAA (IPv6), CNAME (aliases), MX (mail), TXT (verification)",
      },
      useCase: "Critical for web performance and service discovery",
      comparison: { cache_hit: 85, dns_lookup: 15 },
    },
    {
      concept: "Load Balancing",
      description: "Distribute incoming requests across multiple servers",
      details: {
        "Layer 4":
          "Transport layer (TCP/UDP) - Fast but limited routing options",
        "Layer 7": "Application layer (HTTP) - Slower but intelligent routing",
      },
      useCase: "Scale applications horizontally and improve availability",
      comparison: {
        layer4_speed: 9,
        layer4_features: 4,
        layer7_speed: 6,
        layer7_features: 9,
      },
    },
    {
      concept: "CDN & Edge",
      description: "Content delivery networks cache content closer to users",
      details: {
        Benefits: "Reduced latency, improved performance, reduced origin load",
        "Edge Computing":
          "Process data close to source, reduce bandwidth, real-time responses",
      },
      useCase: "Global applications requiring low latency",
      comparison: {
        latency_improvement: 70,
        bandwidth_savings: 60,
        cost_reduction: 40,
      },
    },
  ];

  const clientServerModels = [
    {
      model: "Traditional Client-Server",
      description: "Centralized server handles all business logic",
      pros: [
        "Simple architecture",
        "Centralized control",
        "Easier maintenance",
        "Consistent data",
      ],
      cons: [
        "Single point of failure",
        "Limited scalability",
        "Network dependency",
        "Bottleneck risk",
      ],
      examples: [
        "Web applications",
        "Email systems",
        "File servers",
        "Database applications",
      ],
      complexity: 2,
      scalability: 4,
      reliability: 6,
    },
    {
      model: "Peer-to-Peer (P2P)",
      description: "Clients act as both consumers and providers",
      pros: [
        "No central server needed",
        "Highly scalable",
        "Fault tolerant",
        "Cost efficient",
      ],
      cons: [
        "Complex coordination",
        "Security challenges",
        "Inconsistent availability",
        "Data integrity",
      ],
      examples: [
        "BitTorrent",
        "Blockchain",
        "Skype",
        "Cryptocurrency networks",
      ],
      complexity: 8,
      scalability: 9,
      reliability: 7,
    },
    {
      model: "Three-Tier Architecture",
      description: "Presentation, business logic, and data tiers",
      pros: [
        "Clear separation of concerns",
        "Better scalability",
        "Maintainable",
        "Flexible deployment",
      ],
      cons: [
        "More complex",
        "Network latency",
        "Higher overhead",
        "Multiple failure points",
      ],
      examples: [
        "Enterprise applications",
        "E-commerce sites",
        "Banking systems",
        "ERP systems",
      ],
      complexity: 6,
      scalability: 7,
      reliability: 8,
    },
    {
      model: "Microservices",
      description: "Distributed services communicating over network",
      pros: [
        "Independent scaling",
        "Technology diversity",
        "Fault isolation",
        "Team autonomy",
      ],
      cons: [
        "Network complexity",
        "Data consistency",
        "Operational overhead",
        "Distributed debugging",
      ],
      examples: ["Netflix", "Amazon", "Uber", "Modern SaaS platforms"],
      complexity: 9,
      scalability: 10,
      reliability: 8,
    },
  ];

  const httpMethods = [
    {
      method: "GET",
      purpose: "Retrieve data",
      idempotent: true,
      safe: true,
      body: false,
      example: "GET /users/123",
      caching: "Yes",
    },
    {
      method: "POST",
      purpose: "Create resource",
      idempotent: false,
      safe: false,
      body: true,
      example: "POST /users",
      caching: "No",
    },
    {
      method: "PUT",
      purpose: "Update/replace",
      idempotent: true,
      safe: false,
      body: true,
      example: "PUT /users/123",
      caching: "No",
    },
    {
      method: "PATCH",
      purpose: "Partial update",
      idempotent: false,
      safe: false,
      body: true,
      example: "PATCH /users/123",
      caching: "No",
    },
    {
      method: "DELETE",
      purpose: "Remove resource",
      idempotent: true,
      safe: false,
      body: false,
      example: "DELETE /users/123",
      caching: "No",
    },
    {
      method: "HEAD",
      purpose: "Get headers only",
      idempotent: true,
      safe: true,
      body: false,
      example: "HEAD /users/123",
      caching: "Yes",
    },
    {
      method: "OPTIONS",
      purpose: "Check capabilities",
      idempotent: true,
      safe: true,
      body: false,
      example: "OPTIONS /users",
      caching: "Yes",
    },
  ];

  const statusCodes = [
    {
      code: "200",
      meaning: "OK",
      category: "Success",
      description: "Request successful",
      usage: "Standard success response",
    },
    {
      code: "201",
      meaning: "Created",
      category: "Success",
      description: "Resource created successfully",
      usage: "POST requests that create resources",
    },
    {
      code: "204",
      meaning: "No Content",
      category: "Success",
      description: "Success but no content to return",
      usage: "DELETE or PUT requests",
    },
    {
      code: "400",
      meaning: "Bad Request",
      category: "Client Error",
      description: "Invalid request syntax",
      usage: "Malformed requests",
    },
    {
      code: "401",
      meaning: "Unauthorized",
      category: "Client Error",
      description: "Authentication required",
      usage: "Missing or invalid credentials",
    },
    {
      code: "403",
      meaning: "Forbidden",
      category: "Client Error",
      description: "Access denied",
      usage: "Insufficient permissions",
    },
    {
      code: "404",
      meaning: "Not Found",
      category: "Client Error",
      description: "Resource not found",
      usage: "Non-existent endpoints",
    },
    {
      code: "429",
      meaning: "Too Many Requests",
      category: "Client Error",
      description: "Rate limit exceeded",
      usage: "API rate limiting",
    },
    {
      code: "500",
      meaning: "Internal Server Error",
      category: "Server Error",
      description: "Server encountered an error",
      usage: "Unhandled exceptions",
    },
    {
      code: "502",
      meaning: "Bad Gateway",
      category: "Server Error",
      description: "Invalid upstream response",
      usage: "Proxy/gateway errors",
    },
    {
      code: "503",
      meaning: "Service Unavailable",
      category: "Server Error",
      description: "Server temporarily unavailable",
      usage: "Maintenance or overload",
    },
  ];

  const apiDesignPrinciples = [
    {
      principle: "RESTful Design",
      description: "Follow REST architectural constraints",
      guidelines: [
        "Use HTTP methods correctly (GET, POST, PUT, DELETE)",
        "Design resource-oriented URLs (/users/123/posts)",
        "Return appropriate HTTP status codes",
        "Use consistent naming conventions",
        "Implement proper error handling",
      ],
      example: {
        good: "GET /api/v1/users/123/orders",
        bad: "GET /api/getUserOrders?userId=123",
      },
    },
    {
      principle: "Versioning Strategy",
      description: "Handle API evolution gracefully",
      guidelines: [
        "Use semantic versioning (v1, v2, v3)",
        "Support multiple versions simultaneously",
        "Provide clear deprecation notices",
        "Offer migration guides and tools",
        "Consider backward compatibility",
      ],
      example: {
        good: "/api/v2/users or Accept: application/vnd.api+json;version=2",
        bad: "/api/users?version=2 or breaking changes without versioning",
      },
    },
    {
      principle: "Security Best Practices",
      description: "Implement robust security measures",
      guidelines: [
        "Use HTTPS for all communications",
        "Implement proper authentication (OAuth, JWT)",
        "Validate and sanitize all inputs",
        "Apply rate limiting and request throttling",
        "Log security events and monitor for threats",
      ],
      example: {
        good: "Authorization: Bearer eyJhbGciOiJIUzI1NiIs...",
        bad: "Authorization: Basic dXNlcjpwYXNzd29yZA==",
      },
    },
    {
      principle: "Error Handling",
      description: "Provide meaningful error responses",
      guidelines: [
        "Use appropriate HTTP status codes",
        "Provide detailed error messages",
        "Include error codes for programmatic handling",
        "Suggest corrective actions",
        "Maintain consistent error format",
      ],
      example: {
        good: '{"error": {"code": "INVALID_EMAIL", "message": "Email format is invalid", "field": "email"}}',
        bad: '{"error": "Something went wrong"}',
      },
    },
  ];

  const performanceMetrics = [
    {
      metric: "Latency",
      value: latencyValue[0],
      target: "< 100ms",
      description: "Time to process request",
      unit: "ms",
    },
    {
      metric: "Throughput",
      value: throughputValue[0],
      target: "1000 RPS",
      description: "Requests per second",
      unit: "RPS",
    },
    {
      metric: "Availability",
      value: "99.9",
      target: "99.9%",
      description: "Service uptime percentage",
      unit: "%",
    },
    {
      metric: "Error Rate",
      value: "0.1",
      target: "< 0.1%",
      description: "Failed request percentage",
      unit: "%",
    },
  ];

  const InteractiveProtocolDemo = () => {
    const [requestCount, setRequestCount] = useState(0);
    const [responseTime, setResponseTime] = useState(0);
    const [messagesSent, setMessagesSent] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);

    const protocolSteps = {
      http: [
        {
          step: 1,
          action: "Client sends HTTP request",
          description: "GET /api/users HTTP/1.1",
        },
        {
          step: 2,
          action: "Server processes request",
          description: "Database query, business logic",
        },
        {
          step: 3,
          action: "Server sends HTTP response",
          description: "200 OK with JSON data",
        },
        {
          step: 4,
          action: "Connection closed",
          description: "Stateless - new connection for next request",
        },
      ],
      websocket: [
        {
          step: 1,
          action: "WebSocket handshake",
          description: "HTTP upgrade to WebSocket protocol",
        },
        {
          step: 2,
          action: "Connection established",
          description: "Persistent bidirectional connection",
        },
        {
          step: 3,
          action: "Real-time messaging",
          description: "Both client and server can send messages",
        },
        {
          step: 4,
          action: "Connection maintained",
          description: "Low latency communication until closed",
        },
      ],
      grpc: [
        {
          step: 1,
          action: "gRPC call initiated",
          description: "Protobuf serialized request over HTTP/2",
        },
        {
          step: 2,
          action: "Service method execution",
          description: "Strongly typed RPC call processing",
        },
        {
          step: 3,
          action: "Response streaming",
          description: "Binary response with multiplexing support",
        },
        {
          step: 4,
          action: "Call completion",
          description: "Status code and optional error details",
        },
      ],
      graphql: [
        {
          step: 1,
          action: "GraphQL query sent",
          description: "Single endpoint with specific query",
        },
        {
          step: 2,
          action: "Query parsing & validation",
          description: "Schema validation and field resolution",
        },
        {
          step: 3,
          action: "Data fetching",
          description: "Resolver functions gather exact data needed",
        },
        {
          step: 4,
          action: "Structured response",
          description: "JSON response matching query structure",
        },
      ],
    };

    useEffect(() => {
      if (simulationRunning) {
        const interval = setInterval(() => {
          setRequestCount((prev) => prev + 1);
          setResponseTime(latencyValue[0] + Math.random() * 50 - 25);

          // Add new message to the log
          const timestamp = new Date().toLocaleTimeString();
          const newMessage = {
            id: Date.now(),
            protocol: selectedProtocol,
            timestamp,
            latency: Math.round(latencyValue[0] + Math.random() * 50 - 25),
            status: "success",
          };

          setMessagesSent((prev) => [newMessage, ...prev.slice(0, 4)]); // Keep last 5 messages

          // Cycle through protocol steps
          setCurrentStep(
            (prev) => (prev + 1) % protocolSteps[selectedProtocol].length
          );
        }, 1000);
        return () => clearInterval(interval);
      }
    }, [simulationRunning, latencyValue, selectedProtocol]);

    const getProtocolColor = (protocol) => {
      const colors = {
        http: "bg-blue-500",
        websocket: "bg-green-500",
        grpc: "bg-purple-500",
        graphql: "bg-pink-500",
      };
      return colors[protocol] || "bg-gray-500";
    };

    const getProtocolDescription = (protocol) => {
      const descriptions = {
        http: "Traditional request-response model. Stateless, cacheable, simple to use.",
        websocket:
          "Full-duplex communication. Perfect for real-time applications like chat or gaming.",
        grpc: "High-performance RPC framework. Binary protocol with strong typing and streaming.",
        graphql:
          "Query language for APIs. Fetch exactly what you need in a single request.",
      };
      return (
        descriptions[protocol] ||
        "Select a protocol to see its characteristics."
      );
    };

    return (
      <div className="space-y-6">
        <div className="p-4 bg-amber-50 dark:bg-amber-950 rounded-lg">
          <h4 className="mb-2">🎯 What This Simulation Shows</h4>
          <p className="text-sm text-muted-foreground">
            This interactive demo lets you experience how different
            communication protocols work. Select a protocol, start the
            simulation, and observe the communication patterns, latency
            characteristics, and message flow. Adjust parameters to see how they
            affect performance.
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => {
                setSimulationRunning(!simulationRunning);
                if (!simulationRunning) {
                  setRequestCount(0);
                  setMessagesSent([]);
                  setCurrentStep(0);
                }
              }}
              variant={simulationRunning ? "destructive" : "default"}
            >
              {simulationRunning ? "Stop Simulation" : "Start Simulation"}
            </Button>
            <Badge variant="outline">{requestCount} requests sent</Badge>
          </div>

          <div className="flex gap-2">
            {["http", "websocket", "grpc", "graphql"].map((protocol) => (
              <Button
                key={protocol}
                variant={selectedProtocol === protocol ? "default" : "outline"}
                onClick={() => setSelectedProtocol(protocol)}
                size="sm"
                className="capitalize"
                disabled={simulationRunning}
              >
                {protocol === "grpc"
                  ? "gRPC"
                  : protocol === "graphql"
                  ? "GraphQL"
                  : protocol}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium">Protocol Configuration</h4>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Base Latency: {latencyValue[0]}ms
              </label>
              <Slider
                value={latencyValue}
                onValueChange={setLatencyValue}
                max={500}
                min={10}
                step={10}
                className="w-full"
                disabled={simulationRunning}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Target Throughput: {throughputValue[0]} RPS
              </label>
              <Slider
                value={throughputValue}
                onValueChange={setThroughputValue}
                max={5000}
                min={100}
                step={100}
                className="w-full"
                disabled={simulationRunning}
              />
            </div>

            <div className="p-3 bg-muted rounded-lg">
              <h5 className="text-sm font-medium mb-1">
                {selectedProtocol.toUpperCase()} Protocol
              </h5>
              <p className="text-xs text-muted-foreground">
                {getProtocolDescription(selectedProtocol)}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Communication Flow</h4>

            {protocolSteps[selectedProtocol] && (
              <div className="space-y-2">
                {protocolSteps[selectedProtocol].map((step, index) => (
                  <motion.div
                    key={index}
                    className={`p-3 rounded-lg border transition-all ${
                      simulationRunning && currentStep === index
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                        : "border-border bg-card"
                    }`}
                    animate={
                      simulationRunning && currentStep === index
                        ? { scale: 1.02 }
                        : { scale: 1 }
                    }
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                          simulationRunning && currentStep === index
                            ? getProtocolColor(selectedProtocol)
                            : "bg-muted"
                        }`}
                      >
                        {step.step}
                      </div>
                      <div className="flex-1">
                        <h6 className="text-sm font-medium">{step.action}</h6>
                        <p className="text-xs text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                      {simulationRunning && currentStep === index && (
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {simulationRunning && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4">
                <h5 className="text-sm font-medium text-muted-foreground">
                  Current Latency
                </h5>
                <div className="text-2xl font-medium">
                  {responseTime.toFixed(0)}ms
                </div>
              </Card>
              <Card className="p-4">
                <h5 className="text-sm font-medium text-muted-foreground">
                  Protocol
                </h5>
                <div className="text-2xl font-medium capitalize">
                  {selectedProtocol}
                </div>
              </Card>
              <Card className="p-4">
                <h5 className="text-sm font-medium text-muted-foreground">
                  Status
                </h5>
                <div className="text-2xl font-medium text-green-600">
                  ✓ Active
                </div>
              </Card>
            </div>

            {messagesSent.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Recent Messages</CardTitle>
                  <CardDescription>
                    Live message log showing protocol communication
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {messagesSent.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center justify-between p-2 bg-muted rounded text-sm"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-3 h-3 rounded-full ${getProtocolColor(
                              message.protocol
                            )}`}
                          ></div>
                          <span className="font-mono">{message.timestamp}</span>
                          <span className="capitalize">{message.protocol}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">
                            {message.latency}ms
                          </span>
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <GlobalWarning />
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
          Core Fundamentals
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
          Master the foundational concepts of distributed systems including
          client-server architecture, communication protocols, and networking
          basics through interactive learning.
        </p>
      </div>

      <Tabs defaultValue="client-server" className="space-y-4 sm:space-y-6">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto">
          <TabsTrigger
            value="client-server"
            className="text-xs sm:text-sm py-2"
          >
            Client-Server
          </TabsTrigger>
          <TabsTrigger value="protocols" className="text-xs sm:text-sm py-2">
            Protocols
          </TabsTrigger>
          <TabsTrigger value="networking" className="text-xs sm:text-sm py-2">
            Networking
          </TabsTrigger>
          <TabsTrigger value="api-design" className="text-xs sm:text-sm py-2">
            API Design
          </TabsTrigger>
        </TabsList>

        <TabsContent value="client-server" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Client-Server Model Fundamentals</CardTitle>
              <CardDescription>
                The core communication pattern where clients request services
                from servers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <h4 className="mb-3">Client-Server Architecture</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    A distributed computing model where clients request
                    resources or services from servers. This creates a clear
                    separation of responsibilities and enables scalable
                    distributed systems.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                      <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <Globe className="w-8 h-8 text-white" />
                      </div>
                      <h5 className="font-medium mb-2">Client</h5>
                      <p className="text-sm text-muted-foreground mb-2">
                        Requests services
                      </p>
                      <div className="text-xs text-left">
                        <div className="font-medium mb-1">
                          Responsibilities:
                        </div>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>• User interface</li>
                          <li>• Input validation</li>
                          <li>• Data presentation</li>
                        </ul>
                      </div>
                    </div>

                    <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                      <div className="w-16 h-16 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <Network className="w-8 h-8 text-white" />
                      </div>
                      <h5 className="font-medium mb-2">Network</h5>
                      <p className="text-sm text-muted-foreground mb-2">
                        Communication layer
                      </p>
                      <div className="text-xs text-left">
                        <div className="font-medium mb-1">Handles:</div>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>• Request routing</li>
                          <li>• Data serialization</li>
                          <li>• Connection management</li>
                        </ul>
                      </div>
                    </div>

                    <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                      <div className="w-16 h-16 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <Server className="w-8 h-8 text-white" />
                      </div>
                      <h5 className="font-medium mb-2">Server</h5>
                      <p className="text-sm text-muted-foreground mb-2">
                        Provides services
                      </p>
                      <div className="text-xs text-left">
                        <div className="font-medium mb-1">
                          Responsibilities:
                        </div>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>• Business logic</li>
                          <li>• Data storage</li>
                          <li>• Authentication</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      Request-Response Lifecycle
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {[
                          {
                            step: 1,
                            title: "Request",
                            description: "Client sends request with parameters",
                            icon: "📤",
                            color: "bg-blue-500",
                          },
                          {
                            step: 2,
                            title: "Process",
                            description: "Server validates and processes",
                            icon: "⚙️",
                            color: "bg-purple-500",
                          },
                          {
                            step: 3,
                            title: "Response",
                            description: "Server returns result or error",
                            icon: "📥",
                            color: "bg-green-500",
                          },
                          {
                            step: 4,
                            title: "Handle",
                            description: "Client processes response",
                            icon: "🔄",
                            color: "bg-orange-500",
                          },
                        ].map((step, index) => (
                          <div key={index} className="text-center">
                            <div
                              className={`w-12 h-12 ${step.color} rounded-full flex items-center justify-center mx-auto mb-2`}
                            >
                              <span className="text-xl">{step.icon}</span>
                            </div>
                            <h6 className="font-medium text-sm">
                              {step.step}. {step.title}
                            </h6>
                            <p className="text-xs text-muted-foreground mt-1">
                              {step.description}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                          <h6 className="font-medium text-green-700 dark:text-green-300 mb-1">
                            ✅ Key Benefits
                          </h6>
                          <ul className="text-sm space-y-1 text-muted-foreground">
                            <li>• Clear separation of concerns</li>
                            <li>• Centralized business logic</li>
                            <li>• Easy to secure and maintain</li>
                            <li>• Multiple clients can share services</li>
                          </ul>
                        </div>
                        <div className="p-3 bg-amber-50 dark:bg-amber-950 rounded-lg">
                          <h6 className="font-medium text-amber-700 dark:text-amber-300 mb-1">
                            ⚠️ Common Challenges
                          </h6>
                          <ul className="text-sm space-y-1 text-muted-foreground">
                            <li>• Network latency and failures</li>
                            <li>• Server becomes bottleneck</li>
                            <li>• Single point of failure</li>
                            <li>• Scaling complexity</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Distributed System Architecture Patterns</CardTitle>
              <CardDescription>
                Different approaches to organizing distributed applications
                beyond traditional client-server
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    While client-server is the foundation, modern systems often
                    use hybrid approaches or alternative patterns to address
                    specific requirements like scale, performance, or fault
                    tolerance.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {clientServerModels.map((model, index) => (
                    <Card key={index} className="p-4 h-full">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">{model.model}</h4>
                          <p className="text-sm text-muted-foreground">
                            {model.description}
                          </p>
                        </div>

                        <div className="grid grid-cols-3 gap-3 text-xs">
                          <div className="text-center">
                            <div className="text-sm font-medium mb-1">
                              Complexity
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div
                                className="bg-orange-500 h-2 rounded-full transition-all"
                                style={{ width: `${model.complexity * 10}%` }}
                              />
                            </div>
                            <div className="mt-1 text-muted-foreground">
                              {model.complexity}/10
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-medium mb-1">
                              Scalability
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div
                                className="bg-blue-500 h-2 rounded-full transition-all"
                                style={{ width: `${model.scalability * 10}%` }}
                              />
                            </div>
                            <div className="mt-1 text-muted-foreground">
                              {model.scalability}/10
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-medium mb-1">
                              Reliability
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div
                                className="bg-green-500 h-2 rounded-full transition-all"
                                style={{ width: `${model.reliability * 10}%` }}
                              />
                            </div>
                            <div className="mt-1 text-muted-foreground">
                              {model.reliability}/10
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <h5 className="text-sm font-medium text-green-600 mb-2">
                              ✅ Strengths
                            </h5>
                            <ul className="text-xs space-y-1">
                              {model.pros.slice(0, 3).map((pro, i) => (
                                <li key={i} className="flex items-start gap-1">
                                  <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0 mt-0.5" />
                                  <span>{pro}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h5 className="text-sm font-medium text-red-600 mb-2">
                              ⚠️ Trade-offs
                            </h5>
                            <ul className="text-xs space-y-1">
                              {model.cons.slice(0, 3).map((con, i) => (
                                <li key={i} className="flex items-start gap-1">
                                  <XCircle className="w-3 h-3 text-red-500 flex-shrink-0 mt-0.5" />
                                  <span>{con}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div>
                          <h5 className="text-sm font-medium text-blue-600 mb-2">
                            🏢 Used By
                          </h5>
                          <div className="flex flex-wrap gap-1">
                            {model.examples.map((example, i) => (
                              <Badge
                                key={i}
                                variant="outline"
                                className="text-xs"
                              >
                                {example}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                <Card className="p-4">
                  <h4 className="font-medium mb-3">
                    📊 Architecture Selection Guide
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="font-medium text-blue-600 mb-2">
                        Start with Traditional Client-Server for:
                      </h5>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Small to medium applications</li>
                        <li>• Clear data ownership patterns</li>
                        <li>• Strong consistency requirements</li>
                        <li>• Limited team size</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-purple-600 mb-2">
                        Evolve to Distributed Patterns for:
                      </h5>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• High-scale requirements</li>
                        <li>• Independent team development</li>
                        <li>• Fault tolerance needs</li>
                        <li>• Complex business domains</li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Architecture Evolution Timeline</CardTitle>
              <CardDescription>
                How web architecture has evolved from simple client-server to
                complex distributed systems
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {[
                    {
                      era: "1990s",
                      tech: "Static HTML",
                      desc: "Simple CGI scripts, Single server",
                      icon: "🌐",
                    },
                    {
                      era: "2000s",
                      tech: "Dynamic Web",
                      desc: "Database integration, Load balancers",
                      icon: "⚡",
                    },
                    {
                      era: "2010s",
                      tech: "API Economy",
                      desc: "REST APIs, Cloud computing, SPAs",
                      icon: "🔗",
                    },
                    {
                      era: "2020s",
                      tech: "Distributed",
                      desc: "Microservices, Serverless, Edge computing",
                      icon: "☁️",
                    },
                  ].map((period, index) => (
                    <Card key={index} className="p-4 text-center">
                      <div className="text-2xl mb-2">{period.icon}</div>
                      <h5 className="font-medium mb-1">{period.era}</h5>
                      <h6 className="text-sm font-medium text-blue-600 mb-2">
                        {period.tech}
                      </h6>
                      <p className="text-xs text-muted-foreground">
                        {period.desc}
                      </p>
                    </Card>
                  ))}
                </div>

                <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-lg">
                  <h4 className="mb-3">Modern Architecture Trends</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="font-medium mb-2 text-blue-600">
                        Current Focus
                      </h5>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Container orchestration (Kubernetes)</li>
                        <li>• Serverless computing (AWS Lambda)</li>
                        <li>• Edge computing and CDNs</li>
                        <li>• Event-driven architectures</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2 text-purple-600">
                        Emerging Trends
                      </h5>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• WebAssembly for performance</li>
                        <li>• JAMstack for static sites</li>
                        <li>• GraphQL for flexible APIs</li>
                        <li>• Micro-frontends architecture</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="protocols" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Live Protocol Communication Demo</CardTitle>
              <CardDescription>
                Watch how different protocols (HTTP, WebSocket, gRPC, GraphQL)
                handle communication between client and server. Adjust
                parameters and observe real-time message flow, latency patterns,
                and protocol-specific behaviors.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <InteractiveProtocolDemo />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Communication Protocols Detailed Comparison</CardTitle>
              <CardDescription>
                Deep dive into different protocols for service-to-service
                communication
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 sm:space-y-6">
                {/* Desktop Table View */}
                <div className="hidden lg:block">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Protocol</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Format</TableHead>
                        <TableHead>Overhead</TableHead>
                        <TableHead>Caching</TableHead>
                        <TableHead>Streaming</TableHead>
                        <TableHead>Best For</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {protocolComparison.map((protocol, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            {protocol.protocol}
                          </TableCell>
                          <TableCell>{protocol.type}</TableCell>
                          <TableCell>{protocol.format}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                protocol.overhead === "Low"
                                  ? "secondary"
                                  : "default"
                              }
                            >
                              {protocol.overhead}
                            </Badge>
                          </TableCell>
                          <TableCell>{protocol.caching}</TableCell>
                          <TableCell>{protocol.streaming}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {protocol.useCase}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Mobile Card View */}
                <div className="lg:hidden space-y-3">
                  {protocolComparison.map((protocol, index) => (
                    <Card key={index} className="p-3 sm:p-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-sm sm:text-base">
                            {protocol.protocol}
                          </h4>
                          <Badge
                            variant={
                              protocol.overhead === "Low"
                                ? "secondary"
                                : "default"
                            }
                            className="text-xs"
                          >
                            {protocol.overhead}
                          </Badge>
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          {protocol.useCase}
                        </p>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="font-medium">Type:</span>{" "}
                            {protocol.type}
                          </div>
                          <div>
                            <span className="font-medium">Format:</span>{" "}
                            {protocol.format}
                          </div>
                          <div>
                            <span className="font-medium">Caching:</span>{" "}
                            {protocol.caching}
                          </div>
                          <div>
                            <span className="font-medium">Streaming:</span>{" "}
                            {protocol.streaming}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  {protocolComparison.map((protocol, index) => (
                    <Card key={index} className="p-3 sm:p-4">
                      <h4 className="font-medium mb-2 text-sm sm:text-base">
                        {protocol.protocol}
                      </h4>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-3">
                        {protocol.useCase}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                        <div>
                          <h5 className="font-medium text-green-600 mb-1 text-xs sm:text-sm">
                            Pros:
                          </h5>
                          <ul className="space-y-1">
                            {protocol.pros.map((pro, i) => (
                              <li key={i} className="flex items-start gap-1">
                                <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0 mt-0.5" />
                                <span className="text-xs leading-relaxed">
                                  {pro}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-medium text-red-600 mb-1 text-xs sm:text-sm">
                            Cons:
                          </h5>
                          <ul className="space-y-1">
                            {protocol.cons.map((con, i) => (
                              <li key={i} className="flex items-start gap-1">
                                <XCircle className="w-3 h-3 text-red-500 flex-shrink-0 mt-0.5" />
                                <span className="text-xs leading-relaxed">
                                  {con}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>HTTP Methods & Properties</CardTitle>
                <CardDescription>
                  Essential HTTP methods and their characteristics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Method</TableHead>
                        <TableHead>Purpose</TableHead>
                        <TableHead>Safe</TableHead>
                        <TableHead>Idempotent</TableHead>
                        <TableHead>Cacheable</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {httpMethods.map((method, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Badge
                              variant={method.safe ? "secondary" : "default"}
                            >
                              {method.method}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm">
                            {method.purpose}
                          </TableCell>
                          <TableCell>{method.safe ? "✅" : "❌"}</TableCell>
                          <TableCell>
                            {method.idempotent ? "✅" : "❌"}
                          </TableCell>
                          <TableCell>
                            {method.caching === "Yes" ? "✅" : "❌"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>HTTP Status Codes</CardTitle>
                <CardDescription>
                  Common status codes and their proper usage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {statusCodes.map((status, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border rounded text-sm"
                    >
                      <div className="flex items-center gap-3">
                        <Badge
                          variant={
                            status.category === "Success"
                              ? "secondary"
                              : status.category === "Client Error"
                              ? "default"
                              : "destructive"
                          }
                        >
                          {status.code}
                        </Badge>
                        <div>
                          <div className="font-medium">{status.meaning}</div>
                          <div className="text-xs text-muted-foreground">
                            {status.description}
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground text-right">
                        {status.usage}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="networking" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Essential Networking Concepts</CardTitle>
              <CardDescription>
                Core networking knowledge for distributed systems with
                interactive comparisons
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {networkingConcepts.map((concept, index) => (
                  <Card key={index} className="p-4">
                    <h4 className="font-medium mb-2">{concept.concept}</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      {concept.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      {Object.entries(concept.details).map(([key, value]) => (
                        <div key={key}>
                          <h5 className="font-medium text-blue-600 mb-1">
                            {key}:
                          </h5>
                          <p className="text-muted-foreground">{value}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 pt-3 border-t">
                      <span className="text-xs font-medium">Use Case: </span>
                      <span className="text-xs text-muted-foreground">
                        {concept.useCase}
                      </span>
                    </div>

                    {concept.comparison && (
                      <div className="mt-4 p-3 bg-muted/30 rounded">
                        <h5 className="text-sm font-medium mb-2">
                          Performance Comparison
                        </h5>
                        <div className="space-y-2">
                          {Object.entries(concept.comparison).map(
                            ([key, value]) => (
                              <div
                                key={key}
                                className="flex items-center gap-2"
                              >
                                <span className="text-xs w-20 capitalize">
                                  {key.replace("_", " ")}
                                </span>
                                <div className="flex-1 bg-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-blue-500 h-2 rounded-full"
                                    style={{ width: `${value}%` }}
                                  />
                                </div>
                                <span className="text-xs w-8 text-right">
                                  {value}%
                                </span>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>OSI Model Layers</CardTitle>
                <CardDescription>
                  Understanding the 7-layer network model
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    {
                      layer: 7,
                      name: "Application",
                      examples: "HTTP, SMTP, FTP, DNS",
                      color:
                        "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
                      responsibility: "User interface and data presentation",
                    },
                    {
                      layer: 6,
                      name: "Presentation",
                      examples: "SSL/TLS, Encryption, JPEG",
                      color:
                        "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
                      responsibility: "Data encryption and formatting",
                    },
                    {
                      layer: 5,
                      name: "Session",
                      examples: "Sessions, Connections, NetBIOS",
                      color:
                        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
                      responsibility: "Session management and control",
                    },
                    {
                      layer: 4,
                      name: "Transport",
                      examples: "TCP, UDP, Port numbers",
                      color:
                        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
                      responsibility: "End-to-end communication",
                    },
                    {
                      layer: 3,
                      name: "Network",
                      examples: "IP, Routing, ICMP",
                      color:
                        "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
                      responsibility: "Routing and logical addressing",
                    },
                    {
                      layer: 2,
                      name: "Data Link",
                      examples: "Ethernet, WiFi, Switches",
                      color:
                        "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
                      responsibility: "Frame formatting and error detection",
                    },
                    {
                      layer: 1,
                      name: "Physical",
                      examples: "Cables, Radio, Hubs",
                      color:
                        "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
                      responsibility: "Physical transmission medium",
                    },
                  ].map((layer) => (
                    <div
                      key={layer.layer}
                      className="flex items-center gap-3 p-3 border rounded"
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${layer.color}`}
                      >
                        L{layer.layer}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{layer.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {layer.responsibility}
                        </div>
                        <div className="text-xs text-blue-600">
                          {layer.examples}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>
                  Key networking and application performance indicators
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {performanceMetrics.map((metric, index) => (
                    <div key={index} className="p-3 border rounded">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{metric.metric}</span>
                        <Badge variant="outline">{metric.target}</Badge>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-2xl font-bold text-blue-600">
                          {typeof metric.value === "number"
                            ? metric.value
                            : metric.value}
                          {metric.unit}
                        </span>
                        <div className="text-right">
                          <div className="text-xs text-muted-foreground">
                            {metric.description}
                          </div>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{
                            width:
                              metric.metric === "Latency"
                                ? `${100 - latencyValue[0] / 5}%`
                                : metric.metric === "Throughput"
                                ? `${throughputValue[0] / 50}%`
                                : "90%",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="api-design" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>API Design Principles</CardTitle>
              <CardDescription>
                Best practices for designing robust, scalable APIs with examples
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {apiDesignPrinciples.map((principle, index) => (
                  <Card key={index} className="p-4">
                    <h4 className="font-medium mb-2">{principle.principle}</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      {principle.description}
                    </p>

                    <div className="space-y-4">
                      <div>
                        <h5 className="text-sm font-medium mb-2">
                          Guidelines:
                        </h5>
                        <ul className="space-y-1">
                          {principle.guidelines.map((guideline, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-sm"
                            >
                              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-muted-foreground">
                                {guideline}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {principle.example && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                            <h5 className="font-medium text-green-800 dark:text-green-200 mb-2">
                              ✓ Good Example
                            </h5>
                            <code className="text-xs bg-green-100 dark:bg-green-900 p-2 rounded block overflow-x-auto">
                              {principle.example.good}
                            </code>
                          </div>
                          <div className="p-3 bg-red-50 dark:bg-red-950 rounded-lg">
                            <h5 className="font-medium text-red-800 dark:text-red-200 mb-2">
                              ✗ Bad Example
                            </h5>
                            <code className="text-xs bg-red-100 dark:bg-red-900 p-2 rounded block overflow-x-auto">
                              {principle.example.bad}
                            </code>
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>RESTful URL Design Patterns</CardTitle>
                <CardDescription>
                  Best practices for structuring API endpoints
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h5 className="font-medium text-green-600 mb-2">
                      ✅ Good Examples
                    </h5>
                    <div className="space-y-1 font-mono text-sm bg-green-50 dark:bg-green-950 p-3 rounded">
                      <div className="flex justify-between">
                        <span>GET /api/v1/users</span>
                        <Badge variant="outline" className="text-xs">
                          List users
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>GET /api/v1/users/123</span>
                        <Badge variant="outline" className="text-xs">
                          Get user
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>POST /api/v1/users</span>
                        <Badge variant="outline" className="text-xs">
                          Create user
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>PUT /api/v1/users/123</span>
                        <Badge variant="outline" className="text-xs">
                          Update user
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>GET /api/v1/users/123/posts</span>
                        <Badge variant="outline" className="text-xs">
                          User's posts
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>DELETE /api/v1/users/123/posts/456</span>
                        <Badge variant="outline" className="text-xs">
                          Delete post
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium text-red-600 mb-2">
                      ❌ Poor Examples
                    </h5>
                    <div className="space-y-1 font-mono text-sm bg-red-50 dark:bg-red-950 p-3 rounded">
                      <div>GET /getUsers</div>
                      <div>POST /createUser</div>
                      <div>GET /users/delete/123</div>
                      <div>POST /updateUser/123</div>
                      <div>GET /user-posts-list</div>
                      <div>GET /api/posts?userId=123&action=delete</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Error Response Structure</CardTitle>
                <CardDescription>
                  Consistent error handling patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h5 className="font-medium mb-2">
                      Standard Error Response
                    </h5>
                    <div className="font-mono text-sm bg-muted p-3 rounded overflow-x-auto">
                      <div>{"{"}</div>
                      <div className="ml-2">"error": {"{"}</div>
                      <div className="ml-4">"code": "VALIDATION_ERROR",</div>
                      <div className="ml-4">
                        "message": "Invalid input data",
                      </div>
                      <div className="ml-4">
                        "timestamp": "2024-01-15T10:30:00Z",
                      </div>
                      <div className="ml-4">"path": "/api/v1/users",</div>
                      <div className="ml-4">"details": [</div>
                      <div className="ml-6">{"{"}</div>
                      <div className="ml-8">"field": "email",</div>
                      <div className="ml-8">
                        "message": "Invalid email format",
                      </div>
                      <div className="ml-8">"value": "invalid-email"</div>
                      <div className="ml-6">{"}"}</div>
                      <div className="ml-4">]</div>
                      <div className="ml-2">{"}"}</div>
                      <div>{"}"}</div>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium mb-2">Error Categories</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center p-2 border rounded">
                        <span>4xx Client Errors</span>
                        <Badge variant="default">User fixable</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 border rounded">
                        <span>5xx Server Errors</span>
                        <Badge variant="destructive">System issue</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 border rounded">
                        <span>Business Logic Errors</span>
                        <Badge variant="outline">Domain specific</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>API Security Checklist</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="mb-3 text-green-600">
                    Authentication & Authorization
                  </h4>
                  <ul className="space-y-2 text-sm">
                    {[
                      "Use HTTPS for all API endpoints",
                      "Implement proper authentication (JWT, OAuth)",
                      "Apply principle of least privilege",
                      "Use API keys for service-to-service",
                      "Implement rate limiting per user/IP",
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="mb-3 text-blue-600">
                    Input Validation & Security
                  </h4>
                  <ul className="space-y-2 text-sm">
                    {[
                      "Validate all input parameters",
                      "Sanitize data to prevent injection",
                      "Use parameterized queries",
                      "Implement CORS properly",
                      "Log security events and anomalies",
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
