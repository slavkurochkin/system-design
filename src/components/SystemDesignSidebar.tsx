import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "./ui/sidebar";
import {
  Home,
  Network,
  Database,
  TrendingUp,
  Shield,
  Layers,
  Activity,
  Lock,
  Cloud,
  Zap,
  MessageSquare,
  BookOpen,
} from "lucide-react";

interface SystemDesignSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function SystemDesignSidebar({
  activeSection,
  onSectionChange,
}: SystemDesignSidebarProps) {
  const mainTopics = [
    { id: "overview", title: "Overview", icon: Home },
    { id: "core-fundamentals", title: "Core Fundamentals", icon: Network },
    { id: "databases-storage", title: "Databases & Storage", icon: Database },
    {
      id: "scalability-performance",
      title: "Scalability & Performance",
      icon: TrendingUp,
    },
    {
      id: "reliability-fault-tolerance",
      title: "Reliability & Fault Tolerance",
      icon: Shield,
    },
    {
      id: "architecture-patterns",
      title: "Architecture Patterns",
      icon: Layers,
    },
    {
      id: "observability-operations",
      title: "Observability & Operations",
      icon: Activity,
    },
    { id: "security", title: "Security", icon: Lock },
    {
      id: "cloud-infrastructure",
      title: "Cloud & Infrastructure",
      icon: Cloud,
    },
    { id: "advanced-topics", title: "Advanced Topics", icon: Zap },
  ];

  const practiceItems = [
    {
      id: "interview-questions",
      title: "Interview Questions",
      icon: MessageSquare,
    },
    { id: "resources", title: "Resources", icon: BookOpen },
  ];

  return (
    <Sidebar className="w-64 sm:w-72 lg:w-80">
      <SidebarHeader className="p-3 sm:p-4">
        <h2 className="text-lg sm:text-xl font-bold">System Design</h2>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Interactive Learning Platform
        </p>
      </SidebarHeader>
      <SidebarContent className="px-2 sm:px-3">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs sm:text-sm font-medium px-2">
            Core Topics
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {mainTopics.map((item) => {
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => onSectionChange(item.id)}
                      isActive={activeSection === item.id}
                      className="w-full h-10 sm:h-11 px-2 sm:px-3 text-left"
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span className="text-xs sm:text-sm truncate">
                        {item.title}
                      </span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs sm:text-sm font-medium px-2">
            Practice & Resources
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {practiceItems.map((item) => {
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => onSectionChange(item.id)}
                      isActive={activeSection === item.id}
                      className="w-full h-10 sm:h-11 px-2 sm:px-3 text-left"
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span className="text-xs sm:text-sm truncate">
                        {item.title}
                      </span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
