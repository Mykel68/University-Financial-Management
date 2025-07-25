"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, DollarSign, FileText, Settings } from "lucide-react";

export function SystemAdminDashboard() {
  const stats = [
    {
      title: "Total Users",
      value: "24",
      description: "Active system users",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "System Health",
      value: "99.9%",
      description: "Uptime this month",
      icon: Settings,
      color: "text-green-600",
    },
    {
      title: "Total Transactions",
      value: "₦2.4M",
      description: "This fiscal year",
      icon: DollarSign,
      color: "text-primary",
    },
    {
      title: "Reports Generated",
      value: "156",
      description: "This month",
      icon: FileText,
      color: "text-accent",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            System Administration
          </h2>
          <p className="text-muted-foreground">
            Manage users, system settings, and monitor overall performance
          </p>
        </div>
        <Badge variant="destructive">Admin Access</Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>
              Manage user accounts, roles, and permissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">System Administrators</span>
                <Badge>3</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Finance Officers</span>
                <Badge>8</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Department Heads</span>
                <Badge>13</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Monitoring</CardTitle>
            <CardDescription>
              Real-time system health and performance metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Database Status</span>
                <Badge className="bg-success text-success-foreground">
                  Online
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Backup Status</span>
                <Badge className="bg-success text-success-foreground">
                  Up to date
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Security Status</span>
                <Badge className="bg-success text-success-foreground">
                  Secure
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
