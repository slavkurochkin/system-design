import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Badge } from './ui/badge'
import { ExternalLink, BookOpen, Video, Code, Users, Star, Clock, Globe, Zap, Target } from 'lucide-react'
import { GlobalWarning } from './GlobalWarning'

export function Resources() {
  const books = [
    {
      title: "Designing Data-Intensive Applications",
      author: "Martin Kleppmann",
      description: "The definitive guide to building reliable, scalable, and maintainable systems",
      level: "Intermediate to Advanced",
      rating: 4.9,
      topics: ["Distributed Systems", "Data Models", "Replication", "Partitioning"],
      link: "#"
    },
    {
      title: "System Design Interview",
      author: "Alex Xu",
      description: "An insider's guide to system design interviews with real examples",
      level: "Beginner to Intermediate",
      rating: 4.7,
      topics: ["Interview Prep", "Scalability", "System Architecture", "Case Studies"],
      link: "#"
    },
    {
      title: "Building Microservices",
      author: "Sam Newman",
      description: "Designing fine-grained systems and service-oriented architecture",
      level: "Intermediate",
      rating: 4.6,
      topics: ["Microservices", "Service Design", "Deployment", "Monitoring"],
      link: "#"
    },
    {
      title: "High Performance Browser Networking",
      author: "Ilya Grigorik",
      description: "Essential knowledge for building fast and resilient web applications",
      level: "Intermediate",
      rating: 4.5,
      topics: ["Networking", "Performance", "HTTP", "WebRTC"],
      link: "#"
    },
    {
      title: "Release It!",
      author: "Michael Nygard",
      description: "Design and deploy production-ready software",
      level: "Intermediate to Advanced",
      rating: 4.4,
      topics: ["Production Systems", "Stability", "Capacity Planning", "Operations"],
      link: "#"
    }
  ]

  const courses = [
    {
      title: "Grokking System Design Fundamentals",
      platform: "Educative",
      duration: "15-20 hours",
      level: "Beginner",
      description: "Interactive course covering system design basics with hands-on examples",
      topics: ["Load Balancing", "Databases", "Caching", "System Design Basics"],
      price: "Subscription",
      rating: 4.6
    },
    {
      title: "System Design Interview Course",
      platform: "Exponent",
      duration: "10-15 hours", 
      level: "Intermediate",
      description: "Practice with real interview questions and get feedback",
      topics: ["Interview Practice", "Case Studies", "Mock Interviews", "System Architecture"],
      price: "Paid",
      rating: 4.7
    },
    {
      title: "Scalability & System Design for Developers",
      platform: "Udemy",
      duration: "20-25 hours",
      level: "Intermediate",
      description: "Deep dive into building scalable systems from scratch",
      topics: ["Scalability", "Performance", "Distributed Systems", "Cloud Architecture"],
      price: "One-time",
      rating: 4.5
    },
    {
      title: "MIT 6.824: Distributed Systems",
      platform: "MIT OpenCourseWare",
      duration: "Self-paced",
      level: "Advanced",
      description: "Graduate-level course on distributed systems theory and practice",
      topics: ["Consensus", "Fault Tolerance", "Consistency", "Distributed Algorithms"],
      price: "Free",
      rating: 4.9
    }
  ]

  const blogs = [
    {
      title: "High Scalability",
      description: "Building bigger, faster, more reliable websites",
      url: "http://highscalability.com/",
      category: "Architecture",
      frequency: "Weekly"
    },
    {
      title: "AWS Architecture Center",
      description: "Reference architectures, best practices, and patterns",
      url: "https://aws.amazon.com/architecture/",
      category: "Cloud",
      frequency: "Monthly"
    },
    {
      title: "Engineering Blogs by Companies",
      description: "Netflix, Uber, Airbnb, and other tech company engineering blogs",
      url: "#",
      category: "Case Studies",
      frequency: "Varies"
    },
    {
      title: "Papers We Love",
      description: "Academic papers that have influenced system design",
      url: "https://paperswelove.org/",
      category: "Research",
      frequency: "Monthly"
    },
    {
      title: "The Morning Paper",
      description: "An interesting/influential/important paper from the world of CS every weekday morning",
      url: "https://blog.acolyer.org/",
      category: "Research",
      frequency: "Daily"
    }
  ]

  const tools = [
    {
      name: "Lucidchart",
      description: "Web-based diagramming application for system architecture",
      category: "Diagramming",
      pricing: "Freemium",
      features: ["System Diagrams", "Collaboration", "Templates", "Integration"]
    },
    {
      name: "Draw.io (now Diagrams.net)",
      description: "Free online diagram software for making system diagrams",
      category: "Diagramming", 
      pricing: "Free",
      features: ["System Diagrams", "Open Source", "No Registration", "Export Options"]
    },
    {
      name: "Miro",
      description: "Online collaborative whiteboard platform for system design",
      category: "Collaboration",
      pricing: "Freemium",
      features: ["Whiteboarding", "Real-time Collaboration", "Templates", "Integration"]
    },
    {
      name: "AWS Well-Architected Tool",
      description: "Review your architectures against AWS best practices",
      category: "Assessment",
      pricing: "Free",
      features: ["Architecture Review", "Best Practices", "Cost Optimization", "Security"]
    },
    {
      name: "Kubernetes",
      description: "Container orchestration platform for distributed systems",
      category: "Infrastructure",
      pricing: "Open Source",
      features: ["Container Orchestration", "Service Discovery", "Load Balancing", "Auto-scaling"]
    },
    {
      name: "Docker",
      description: "Platform for developing, shipping, and running applications in containers",
      category: "Containerization",
      pricing: "Freemium",
      features: ["Containerization", "Image Management", "Multi-platform", "Registry"]
    }
  ]

  const youtubeChannels = [
    {
      name: "Gaurav Sen",
      description: "System design concepts explained simply",
      subscribers: "500K+",
      topics: ["System Design", "Interviews", "Distributed Systems"]
    },
    {
      name: "Tech Dummies",
      description: "System design case studies and tutorials",
      subscribers: "200K+",
      topics: ["Case Studies", "Architecture", "Scalability"]
    },
    {
      name: "Success in Tech",
      description: "System design interviews and career advice",
      subscribers: "150K+",
      topics: ["Interviews", "Career", "System Design"]
    },
    {
      name: "Exponent",
      description: "Tech interview preparation including system design",
      subscribers: "300K+",
      topics: ["Interview Prep", "Mock Interviews", "System Design"]
    }
  ]

  const papers = [
    {
      title: "MapReduce: Simplified Data Processing on Large Clusters",
      authors: "Jeffrey Dean and Sanjay Ghemawat",
      year: 2004,
      impact: "Introduced the MapReduce programming model",
      topics: ["Distributed Computing", "Big Data", "Parallel Processing"]
    },
    {
      title: "The Google File System",
      authors: "Sanjay Ghemawat, Howard Gobioff, and Shun-Tak Leung",
      year: 2003,
      impact: "Influenced design of distributed file systems",
      topics: ["Distributed Storage", "Fault Tolerance", "Scalability"]
    },
    {
      title: "Dynamo: Amazon's Highly Available Key-value Store",
      authors: "Giuseppe DeCandia et al.",
      year: 2007,
      impact: "Introduced eventual consistency and influenced NoSQL databases",
      topics: ["NoSQL", "Consistency", "Distributed Systems"]
    },
    {
      title: "CAP Twelve Years Later: How the 'Rules' Have Changed",
      authors: "Eric Brewer",
      year: 2012,
      impact: "Clarified the CAP theorem and its practical implications",
      topics: ["CAP Theorem", "Distributed Systems", "Consistency"]
    }
  ]

  const communities = [
    {
      name: "System Design Interview Questions",
      platform: "GitHub",
      members: "50K+ stars",
      description: "Curated collection of system design interview questions and solutions"
    },
    {
      name: "r/SystemDesign",
      platform: "Reddit",
      members: "100K+ members", 
      description: "Community for discussing system design concepts and sharing resources"
    },
    {
      name: "System Design Community",
      platform: "Discord",
      members: "20K+ members",
      description: "Real-time discussions about system design and architecture"
    },
    {
      name: "Distributed Systems Reading Group",
      platform: "Meetup",
      members: "Various locations",
      description: "Local meetups for discussing distributed systems papers and concepts"
    }
  ]

  return (
    <div className="space-y-6">
      <GlobalWarning />
      <div className="mb-8">
        <h1 className="mb-4">Learning Resources</h1>
        <p className="text-muted-foreground">
          Curated collection of books, courses, tools, and communities to deepen your system design knowledge.
        </p>
      </div>

      <Tabs defaultValue="books" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="books">Books</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="tools">Tools</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="research">Research</TabsTrigger>
          <TabsTrigger value="community">Community</TabsTrigger>
        </TabsList>

        <TabsContent value="books" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Essential Books
              </CardTitle>
              <CardDescription>
                Must-read books for mastering system design concepts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {books.map((book, index) => (
                  <Card key={index} className="p-4">
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium">{book.title}</h4>
                        <p className="text-sm text-muted-foreground">by {book.author}</p>
                      </div>
                      <p className="text-sm">{book.description}</p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">{book.level}</Badge>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{book.rating}</span>
                        </div>
                      </div>
                      <div className="flex gap-1 flex-wrap">
                        {book.topics.map((topic, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="w-5 h-5" />
                Online Courses
              </CardTitle>
              <CardDescription>
                Structured learning paths for system design mastery
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {courses.map((course, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium">{course.title}</h4>
                        <p className="text-sm text-muted-foreground">{course.platform}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{course.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm mb-3">{course.description}</p>
                    <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                      <Badge variant="outline">{course.level}</Badge>
                      <Badge variant="secondary">{course.price}</Badge>
                    </div>
                    <div className="flex gap-1 flex-wrap">
                      {course.topics.map((topic, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tools" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5" />
                Design & Development Tools
              </CardTitle>
              <CardDescription>
                Essential tools for designing, building, and managing distributed systems
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tools.map((tool, index) => (
                  <Card key={index} className="p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">{tool.name}</h4>
                        <Badge variant="outline">{tool.pricing}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{tool.description}</p>
                      <Badge variant="secondary" className="text-xs">
                        {tool.category}
                      </Badge>
                      <div className="space-y-1">
                        <h6 className="text-xs font-medium">Key Features:</h6>
                        <div className="flex gap-1 flex-wrap">
                          {tool.features.map((feature, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Blogs & Websites
                </CardTitle>
                <CardDescription>
                  Stay updated with the latest in system design
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {blogs.map((blog, index) => (
                    <div key={index} className="p-3 border rounded">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-medium">{blog.title}</h5>
                        <ExternalLink className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{blog.description}</p>
                      <div className="flex gap-2">
                        <Badge variant="outline" className="text-xs">{blog.category}</Badge>
                        <Badge variant="secondary" className="text-xs">{blog.frequency}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="w-5 h-5" />
                  YouTube Channels
                </CardTitle>
                <CardDescription>
                  Video content for visual learners
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {youtubeChannels.map((channel, index) => (
                    <div key={index} className="p-3 border rounded">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-medium">{channel.name}</h5>
                        <Badge variant="outline" className="text-xs">{channel.subscribers}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{channel.description}</p>
                      <div className="flex gap-1 flex-wrap">
                        {channel.topics.map((topic, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="research" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Influential Research Papers
              </CardTitle>
              <CardDescription>
                Academic papers that shaped modern system design
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {papers.map((paper, index) => (
                  <Card key={index} className="p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{paper.title}</h4>
                          <p className="text-sm text-muted-foreground">{paper.authors} ({paper.year})</p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <p className="text-sm">{paper.impact}</p>
                      <div className="flex gap-1 flex-wrap">
                        {paper.topics.map((topic, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How to Read Research Papers</CardTitle>
              <CardDescription>
                A guide to effectively reading and understanding academic papers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded">
                  <h5 className="font-medium mb-2">First Pass (5-10 min)</h5>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Read title, abstract, and introduction</li>
                    <li>• Scan section and sub-section headings</li>
                    <li>• Read the conclusion</li>
                    <li>• Glance at references</li>
                  </ul>
                </div>
                <div className="p-4 border rounded">
                  <h5 className="font-medium mb-2">Second Pass (1 hour)</h5>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Read with greater care</li>
                    <li>• Look at figures and diagrams</li>
                    <li>• Mark relevant unread references</li>
                    <li>• Make notes on key points</li>
                  </ul>
                </div>
                <div className="p-4 border rounded">
                  <h5 className="font-medium mb-2">Third Pass (4-5 hours)</h5>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Virtually re-implement the paper</li>
                    <li>• Identify and challenge assumptions</li>
                    <li>• Think about how you'd present ideas</li>
                    <li>• Note down questions and critiques</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="community" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Communities & Forums
              </CardTitle>
              <CardDescription>
                Connect with other system design enthusiasts and experts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {communities.map((community, index) => (
                  <Card key={index} className="p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">{community.name}</h4>
                        <Badge variant="outline">{community.platform}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{community.description}</p>
                      <div className="flex items-center gap-1 text-sm">
                        <Users className="w-4 h-4" />
                        <span>{community.members}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How to Get the Most from Communities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="mb-3 text-green-600">Best Practices</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Ask specific, well-researched questions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Share your own experiences and learnings</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Provide context and background for your questions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Follow up with results of suggested solutions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Help others by answering questions you know</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="mb-3 text-red-600">Things to Avoid</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Asking very broad questions without context</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Posting homework or interview questions verbatim</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Not searching for existing discussions first</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Being argumentative or dismissive of feedback</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Promoting your own content excessively</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}