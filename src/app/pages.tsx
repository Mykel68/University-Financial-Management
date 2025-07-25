"use client";

import React, { useState, useEffect } from "react";
import {
  DollarSign,
  Users,
  BookOpen,
  TrendingUp,
  CreditCard,
  PieChart,
  FileText,
  Settings,
  ChevronRight,
  Bell,
  Search,
  Menu,
  X,
  GraduationCap,
  Calendar,
  AlertCircle,
} from "lucide-react";

const SchoolFinanceHomepage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const quickStats = [
    {
      label: "Total Revenue",
      value: "$2,450,000",
      change: "+12.5%",
      icon: DollarSign,
      color: "bg-emerald-500",
    },
    {
      label: "Active Students",
      value: "1,847",
      change: "+3.2%",
      icon: Users,
      color: "bg-blue-500",
    },
    {
      label: "Outstanding Fees",
      value: "$156,340",
      change: "-8.1%",
      icon: AlertCircle,
      color: "bg-orange-500",
    },
    {
      label: "Monthly Budget",
      value: "$420,000",
      change: "+5.7%",
      icon: TrendingUp,
      color: "bg-purple-500",
    },
  ];

  const recentActivities = [
    {
      type: "payment",
      student: "John Smith",
      amount: "$1,200",
      time: "2 hours ago",
      status: "completed",
    },
    {
      type: "expense",
      description: "Laboratory Equipment",
      amount: "$8,500",
      time: "4 hours ago",
      status: "approved",
    },
    {
      type: "payment",
      student: "Sarah Johnson",
      amount: "$950",
      time: "6 hours ago",
      status: "pending",
    },
    {
      type: "budget",
      description: "Q2 Budget Review",
      amount: "$125,000",
      time: "1 day ago",
      status: "reviewed",
    },
  ];

  const financialModules = [
    {
      title: "Student Billing",
      description: "Manage tuition, fees, and payment plans",
      icon: CreditCard,
      color: "from-blue-500 to-blue-600",
      features: [
        "Automated billing",
        "Payment tracking",
        "Late fee management",
      ],
    },
    {
      title: "Budget Management",
      description: "Plan and track departmental budgets",
      icon: PieChart,
      color: "from-emerald-500 to-emerald-600",
      features: ["Budget allocation", "Expense tracking", "Variance analysis"],
    },
    {
      title: "Financial Reports",
      description: "Generate comprehensive financial reports",
      icon: FileText,
      color: "from-purple-500 to-purple-600",
      features: ["Custom reports", "Data visualization", "Export options"],
    },
    {
      title: "Expense Tracking",
      description: "Monitor and categorize all school expenses",
      icon: TrendingUp,
      color: "from-orange-500 to-orange-600",
      features: [
        "Real-time tracking",
        "Approval workflows",
        "Vendor management",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation Header */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-800">
                    EduFinance
                  </h1>
                  <p className="text-xs text-slate-500">
                    Financial Management System
                  </p>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  className="pl-10 pr-4 py-2 bg-slate-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                />
              </div>
              <button className="relative p-2 text-slate-600 hover:text-slate-800 transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                <span className="text-sm font-medium text-slate-700">
                  Admin User
                </span>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-600"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200 p-4">
            <div className="space-y-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                  <span className="text-sm font-medium text-slate-700">
                    Admin User
                  </span>
                </div>
                <Bell className="w-5 h-5 text-slate-600" />
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-2">
                Welcome back, Admin
              </h2>
              <p className="text-slate-600">
                {currentTime.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                •{" "}
                {currentTime.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex space-x-3">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                Generate Report
              </button>
              <button className="bg-white text-slate-700 px-6 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                Settings
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-slate-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span
                  className={`text-sm font-medium px-2 py-1 rounded-full ${
                    stat.change.startsWith("+")
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-1">
                {stat.value}
              </h3>
              <p className="text-slate-600 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Financial Modules */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-slate-800">
                  Financial Modules
                </h3>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center">
                  View All <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {financialModules.map((module, index) => (
                  <div key={index} className="group cursor-pointer">
                    <div
                      className={`bg-gradient-to-r ${module.color} p-6 rounded-lg text-white mb-3 group-hover:scale-105 transition-transform duration-200`}
                    >
                      <module.icon className="w-8 h-8 mb-3" />
                      <h4 className="font-semibold text-lg mb-2">
                        {module.title}
                      </h4>
                      <p className="text-white/90 text-sm">
                        {module.description}
                      </p>
                    </div>
                    <div className="px-2">
                      <ul className="space-y-1">
                        {module.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="text-xs text-slate-600 flex items-center"
                          >
                            <div className="w-1 h-1 bg-slate-400 rounded-full mr-2"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-slate-800">
                Recent Activities
              </h3>
              <Calendar className="w-5 h-5 text-slate-400" />
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      activity.status === "completed"
                        ? "bg-emerald-500"
                        : activity.status === "pending"
                        ? "bg-orange-500"
                        : activity.status === "approved"
                        ? "bg-blue-500"
                        : "bg-purple-500"
                    }`}
                  ></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800">
                      {activity.student || activity.description}
                    </p>
                    <p className="text-sm text-slate-600">{activity.amount}</p>
                    <p className="text-xs text-slate-400">{activity.time}</p>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      activity.status === "completed"
                        ? "bg-emerald-100 text-emerald-700"
                        : activity.status === "pending"
                        ? "bg-orange-100 text-orange-700"
                        : activity.status === "approved"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-purple-100 text-purple-700"
                    }`}
                  >
                    {activity.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <h3 className="text-xl font-semibold text-slate-800 mb-6">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { label: "Add Student", icon: Users, color: "bg-blue-500" },
              {
                label: "Process Payment",
                icon: CreditCard,
                color: "bg-emerald-500",
              },
              { label: "View Reports", icon: FileText, color: "bg-purple-500" },
              {
                label: "Manage Budget",
                icon: PieChart,
                color: "bg-orange-500",
              },
              { label: "Settings", icon: Settings, color: "bg-slate-500" },
              {
                label: "Academic Year",
                icon: BookOpen,
                color: "bg-indigo-500",
              },
            ].map((action, index) => (
              <button
                key={index}
                className="flex flex-col items-center p-4 rounded-lg hover:bg-slate-50 transition-colors group"
              >
                <div
                  className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}
                >
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium text-slate-700 text-center">
                  {action.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SchoolFinanceHomepage;
