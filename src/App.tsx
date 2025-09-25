import React, { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "./components/ui/sidebar";
import { CoreFundamentals } from "./components/CoreFundamentals";
import { DatabasesStorage } from "./components/DatabasesStorage";
import { ScalabilityPerformance } from "./components/ScalabilityPerformance";
import { ReliabilityFaultTolerance } from "./components/ReliabilityFaultTolerance";
import { ArchitecturePatterns } from "./components/ArchitecturePatterns";
import { ObservabilityOperations } from "./components/ObservabilityOperations";
import { Security } from "./components/Security";
import { CloudInfrastructure } from "./components/CloudInfrastructure";
import { AdvancedTopics } from "./components/AdvancedTopics";
import { InterviewQuestions } from "./components/InterviewQuestions";
import { Resources } from "./components/Resources";
import { SystemDesignSidebar } from "./components/SystemDesignSidebar";
import { GlobalWarning } from "./components/GlobalWarning";
import { Card } from "./components/ui/card";
import { Badge } from "./components/ui/badge";

export default function App() {
  const [activeSection, setActiveSection] = useState("overview");

  const renderContent = () => {
    switch (activeSection) {
      case "core-fundamentals":
        return <CoreFundamentals />;
      case "databases-storage":
        return <DatabasesStorage />;
      case "scalability-performance":
        return <ScalabilityPerformance />;
      case "reliability-fault-tolerance":
        return <ReliabilityFaultTolerance />;
      case "architecture-patterns":
        return <ArchitecturePatterns />;
      case "observability-operations":
        return <ObservabilityOperations />;
      case "security":
        return <Security />;
      case "cloud-infrastructure":
        return <CloudInfrastructure />;
      case "advanced-topics":
        return <AdvancedTopics />;
      case "interview-questions":
        return <InterviewQuestions />;
      case "resources":
        return <Resources />;
      default:
        return <Overview />;
    }
  };

  const Overview = () => (
    <div className="space-y-4 sm:space-y-6">
      <GlobalWarning />
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
          System Design Learning Platform
        </h1>
        <p className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
          Master system design concepts through interactive learning,
          visualizations, and hands-on examples.
        </p>
        <div className="flex gap-1 sm:gap-2 flex-wrap">
          <Badge variant="secondary" className="text-xs sm:text-sm">
            Interactive Diagrams
          </Badge>
          <Badge variant="secondary" className="text-xs sm:text-sm">
            Real Examples
          </Badge>
          <Badge variant="secondary" className="text-xs sm:text-sm">
            Best Practices
          </Badge>
          <Badge variant="secondary" className="text-xs sm:text-sm">
            Industry Standards
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {[
          {
            id: "core-fundamentals",
            title: "Core Fundamentals",
            description: "Client-server model, REST vs gRPC, networking basics",
            topics: 6,
          },
          {
            id: "databases-storage",
            title: "Databases & Storage",
            description: "SQL vs NoSQL, sharding, replication, CAP theorem",
            topics: 8,
          },
          {
            id: "scalability-performance",
            title: "Scalability & Performance",
            description:
              "Load balancing, CDNs, message queues, scaling strategies",
            topics: 7,
          },
          {
            id: "reliability-fault-tolerance",
            title: "Reliability & Fault Tolerance",
            description:
              "Failover, redundancy, circuit breakers, chaos engineering",
            topics: 5,
          },
          {
            id: "architecture-patterns",
            title: "Architecture Patterns",
            description: "Microservices, event-driven, CQRS, service mesh",
            topics: 6,
          },
          {
            id: "observability-operations",
            title: "Observability & Operations",
            description: "Logging, monitoring, tracing, SLAs and SLOs",
            topics: 4,
          },
          {
            id: "security",
            title: "Security",
            description:
              "Authentication, authorization, encryption, zero trust",
            topics: 5,
          },
          {
            id: "cloud-infrastructure",
            title: "Cloud & Infrastructure",
            description: "Containers, orchestration, IaC, edge computing",
            topics: 5,
          },
          {
            id: "advanced-topics",
            title: "Advanced Topics",
            description: "Distributed consensus, consistent hashing, CRDTs",
            topics: 6,
          },
          {
            id: "interview-questions",
            title: "Interview Questions",
            description:
              "Practice questions with examples and evaluation criteria",
            topics: 5,
          },
          {
            id: "resources",
            title: "Learning Resources",
            description:
              "Books, courses, tools, and communities for deep learning",
            topics: 6,
          },
        ].map((section) => (
          <Card
            key={section.id}
            className="p-3 sm:p-4 lg:p-6 cursor-pointer hover:shadow-lg transition-all duration-200 active:scale-95 touch-manipulation"
            onClick={() => setActiveSection(section.id)}
          >
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-sm sm:text-base leading-tight">
                  {section.title}
                </h3>
                <Badge variant="outline" className="text-xs shrink-0">
                  {section.topics} topics
                </Badge>
              </div>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                {section.description}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <SidebarProvider>
      <SystemDesignSidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      <SidebarInset>
        <div className="mb-4 sm:mb-6 lg:hidden p-3 sm:p-4 lg:p-6">
          <SidebarTrigger className="w-full justify-start" />
        </div>
        <main className="p-3 sm:p-4 lg:p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">{renderContent()}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
