import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  AreaChart,
  Area,
} from "recharts";
import {
  TrendingUp,
  Users,
  DollarSign,
  BookOpen,
  Calendar,
} from "lucide-react";

const enrollmentData = [
  { month: "Jan", students: 1200, revenue: 125000 },
  { month: "Feb", students: 1350, revenue: 140000 },
  { month: "Mar", students: 1420, revenue: 158000 },
  { month: "Apr", students: 1380, revenue: 152000 },
  { month: "May", students: 1500, revenue: 175000 },
  { month: "Jun", students: 1620, revenue: 195000 },
];

const departmentData = [
  { name: "Computer Science", students: 450, color: "#3b82f6" },
  { name: "Engineering", students: 380, color: "#8b5cf6" },
  { name: "Business", students: 320, color: "#10b981" },
  { name: "Arts", students: 280, color: "#f59e0b" },
  { name: "Sciences", students: 190, color: "#ef4444" },
];

const performanceData = [
  { semester: "Fall 2023", gpa: 3.2, graduation: 85, retention: 92 },
  { semester: "Spring 2024", gpa: 3.4, graduation: 88, retention: 94 },
  { semester: "Summer 2024", gpa: 3.3, graduation: 82, retention: 90 },
  { semester: "Fall 2024", gpa: 3.5, graduation: 90, retention: 95 },
];

const StatCard = ({ title, value, change, icon: Icon, trend }: any) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p
        className={`text-xs flex items-center gap-1 ${
          trend === "up" ? "text-success" : "text-destructive"
        }`}
      >
        <TrendingUp className="h-3 w-3" />
        {change}
      </p>
    </CardContent>
  </Card>
);

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Analytics Dashboard
          </h1>
          <p className="text-muted-foreground">
            Comprehensive insights into university performance
          </p>
        </div>
        <Select defaultValue="current-semester">
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="current-semester">Current Semester</SelectItem>
            <SelectItem value="last-semester">Last Semester</SelectItem>
            <SelectItem value="academic-year">Academic Year</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Students"
          value="1,620"
          change="+8% from last semester"
          icon={Users}
          trend="up"
        />
        <StatCard
          title="Total Revenue"
          value="₦195,000"
          change="+12% from last month"
          icon={DollarSign}
          trend="up"
        />
        <StatCard
          title="Active Courses"
          value="48"
          change="+3 new courses"
          icon={BookOpen}
          trend="up"
        />
        <StatCard
          title="Avg. GPA"
          value="3.5"
          change="+0.1 improvement"
          icon={Calendar}
          trend="up"
        />
      </div>
      <Tabs defaultValue="enrollment" className="space-y-4">
        <TabsList>
          <TabsTrigger value="enrollment">Enrollment & Revenue</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="performance">Academic Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="enrollment" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Student Enrollment Trends</CardTitle>
                <CardDescription>Monthly enrollment growth</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={enrollmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="students"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Growth</CardTitle>
                <CardDescription>
                  Monthly revenue from tuition and fees
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={enrollmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => [
                        `$${value.toLocaleString()}`,
                        "Revenue",
                      ]}
                    />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="hsl(var(--primary))"
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--primary))" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="departments" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Students by Department</CardTitle>
                <CardDescription>
                  Distribution across academic departments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={departmentData}
                      dataKey="students"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {departmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Department Enrollment</CardTitle>
                <CardDescription>Student count by department</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={departmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="students" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Academic Performance Metrics</CardTitle>
              <CardDescription>
                GPA, graduation rates, and student retention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="semester" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="gpa"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    name="Average GPA"
                  />
                  <Line
                    type="monotone"
                    dataKey="graduation"
                    stroke="hsl(var(--success))"
                    strokeWidth={2}
                    name="Graduation Rate %"
                  />
                  <Line
                    type="monotone"
                    dataKey="retention"
                    stroke="hsl(var(--warning))"
                    strokeWidth={2}
                    name="Retention Rate %"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
