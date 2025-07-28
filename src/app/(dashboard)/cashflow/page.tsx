import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  CalendarDays,
  Filter,
  Plus,
  Search,
  Users,
  Clock,
  DollarSign,
} from "lucide-react";

const projects = [
  {
    id: "PRJ-001",
    title: "AI-Powered Campus Navigation System",
    description:
      "Developing an intelligent navigation system for campus visitors and students using machine learning.",
    status: "In Progress",
    priority: "High",
    department: "Computer Science",
    leader: "Dr. Sarah Chen",
    budget: 75000,
    spent: 35000,
    progress: 65,
    startDate: "2024-01-15",
    endDate: "2024-06-30",
    team: [
      { name: "Alex Johnson", role: "Lead Developer" },
      { name: "Maria Garcia", role: "UI/UX Designer" },
      { name: "James Wilson", role: "ML Engineer" },
    ],
  },
  {
    id: "PRJ-002",
    title: "Sustainable Energy Research Initiative",
    description:
      "Research project focusing on renewable energy solutions for campus facilities.",
    status: "Planning",
    priority: "Medium",
    department: "Engineering",
    leader: "Prof. Michael Davis",
    budget: 120000,
    spent: 12000,
    progress: 15,
    startDate: "2024-02-01",
    endDate: "2024-12-31",
    team: [
      { name: "Emily Brown", role: "Research Lead" },
      { name: "David Kim", role: "Environmental Engineer" },
      { name: "Lisa Wang", role: "Data Analyst" },
    ],
  },
  {
    id: "PRJ-003",
    title: "Digital Library Modernization",
    description:
      "Upgrading library systems with modern digital infrastructure and user interfaces.",
    status: "Completed",
    priority: "High",
    department: "Library Sciences",
    leader: "Dr. Jennifer Taylor",
    budget: 45000,
    spent: 43500,
    progress: 100,
    startDate: "2023-09-01",
    endDate: "2024-01-15",
    team: [
      { name: "Robert Chen", role: "Systems Architect" },
      { name: "Anna Lopez", role: "Digital Librarian" },
    ],
  },
  {
    id: "PRJ-004",
    title: "Student Mental Health Analytics",
    description:
      "Analyzing student wellness data to improve mental health support services.",
    status: "In Progress",
    priority: "High",
    department: "Psychology",
    leader: "Dr. Amanda Foster",
    budget: 60000,
    spent: 28000,
    progress: 45,
    startDate: "2023-11-01",
    endDate: "2024-05-31",
    team: [
      { name: "Kevin Park", role: "Data Scientist" },
      { name: "Rachel Green", role: "Clinical Psychologist" },
      { name: "Tom Anderson", role: "Research Assistant" },
    ],
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Completed":
      return (
        <Badge className="bg-success text-success-foreground">Completed</Badge>
      );
    case "In Progress":
      return (
        <Badge className="bg-primary text-primary-foreground">
          In Progress
        </Badge>
      );
    case "Planning":
      return (
        <Badge className="bg-warning text-warning-foreground">Planning</Badge>
      );
    case "On Hold":
      return <Badge variant="secondary">On Hold</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case "High":
      return <Badge variant="destructive">High</Badge>;
    case "Medium":
      return (
        <Badge className="bg-warning text-warning-foreground">Medium</Badge>
      );
    case "Low":
      return <Badge variant="secondary">Low</Badge>;
    default:
      return <Badge variant="secondary">{priority}</Badge>;
  }
};

export default function Projects() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">
            Manage and track research and development projects
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      {/* Project Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Projects
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">2 high priority</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦300K</div>
            <p className="text-xs text-muted-foreground">$118.5K utilized</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Completion Rate
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">25%</div>
            <p className="text-xs text-muted-foreground">
              1 of 4 projects completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Progress</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">56%</div>
            <p className="text-xs text-muted-foreground">On track overall</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Project Overview</CardTitle>
          <CardDescription>
            Monitor all university research and development projects
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search projects..." className="pl-10" />
            </div>
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="planning">Planning</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="on-hold">On Hold</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="cs">Computer Science</SelectItem>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="psychology">Psychology</SelectItem>
                <SelectItem value="library">Library Sciences</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              More Filters
            </Button>
          </div>

          <Tabs defaultValue="grid" className="space-y-4">
            <TabsList>
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>

            <TabsContent value="grid">
              <div className="grid gap-6 md:grid-cols-2">
                {projects.map((project) => (
                  <Card
                    key={project.id}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <CardTitle className="text-lg">
                            {project.title}
                          </CardTitle>
                          <CardDescription className="text-sm">
                            {project.description}
                          </CardDescription>
                        </div>
                        <div className="flex gap-2">
                          {getStatusBadge(project.status)}
                          {getPriorityBadge(project.priority)}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">
                            Department
                          </span>
                          <p className="font-medium">{project.department}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Project Leader
                          </span>
                          <p className="font-medium">{project.leader}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Budget</span>
                          <p className="font-medium">
                            ₦{project.budget.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Spent</span>
                          <p className="font-medium">
                            ₦{project.spent.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div>
                        <span className="text-sm text-muted-foreground">
                          Team Members
                        </span>
                        <div className="flex -space-x-2 mt-2">
                          {project.team.slice(0, 3).map((member, index) => (
                            <Avatar
                              key={index}
                              className="border-2 border-background w-8 h-8"
                            >
                              <AvatarFallback className="text-xs">
                                {member.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                          {project.team.length > 3 && (
                            <div className="w-8 h-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs font-medium">
                              +{project.team.length - 3}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex justify-between pt-4 border-t">
                        <div className="text-sm text-muted-foreground">
                          {project.startDate} → {project.endDate}
                        </div>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="list">
              <div className="space-y-4">
                {projects.map((project) => (
                  <Card key={project.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-4">
                            <h3 className="font-semibold text-lg">
                              {project.title}
                            </h3>
                            {getStatusBadge(project.status)}
                            {getPriorityBadge(project.priority)}
                          </div>
                          <p className="text-muted-foreground">
                            {project.description}
                          </p>
                          <div className="flex gap-6 text-sm text-muted-foreground">
                            <span>{project.department}</span>
                            <span>{project.leader}</span>
                            <span>
                              ₦{project.budget.toLocaleString()} budget
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-sm font-medium">
                              {project.progress}%
                            </div>
                            <Progress
                              value={project.progress}
                              className="w-24 h-2"
                            />
                          </div>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
