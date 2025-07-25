"use client";

import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  Menu,
  X,
  CheckCircle,
  ArrowRight,
  Play,
  Award,
  Globe,
  Phone,
  Mail,
} from "lucide-react";
import { testimonials } from "@/constants/testimonials";
import { stats } from "@/constants/stats";
import { features } from "@/constants/features";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SchoolFinanceLandingPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                {/* <GraduationCap className="w-6 h-6 text-white" />
                 */}
                <Image
                  src="/images/logo-.png"
                  alt="UFMS Logo"
                  width={200}
                  height={200}
                  priority
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800">
                  Anchor University
                </h1>
                <p className="text-xs text-slate-500 hidden sm:block">
                  School Financial Management
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-slate-600 hover:text-slate-800 transition-colors"
              >
                Features
              </a>
              {/* <a
                href="#pricing"
                className="text-slate-600 hover:text-slate-800 transition-colors"
              >
                Pricing
              </a>
              <a
                href="#testimonials"
                className="text-slate-600 hover:text-slate-800 transition-colors"
              >
                Reviews
              </a>
              <a
                href="#contact"
                className="text-slate-600 hover:text-slate-800 transition-colors"
              >
                Contact
              </a> */}
              <button
                onClick={() => router.push("/sign-in")}
                className="text-slate-600 hover:text-slate-800 cursor-pointer transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => router.push("/sign-up")}
                className="bg-gradient-to-r cursor-pointer from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Sign Up
              </button>
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
              <a
                href="#features"
                className="block text-slate-600 hover:text-slate-800"
              >
                Features
              </a>
              {/* <a
                href="#pricing"
                className="block text-slate-600 hover:text-slate-800"
              >
                Pricing
              </a>
              <a
                href="#testimonials"
                className="block text-slate-600 hover:text-slate-800"
              >
                Reviews
              </a>
              <a
                href="#contact"
                className="block text-slate-600 hover:text-slate-800"
              >
                Contact
              </a> */}
              <div className="pt-4 border-t border-slate-200 space-y-2">
                <button className="w-full text-left text-slate-600 hover:text-slate-800">
                  Sign In
                </button>
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
                <Award className="w-4 h-4 mr-2" />
                FINANCIAL MANAGEMENT SYSTEM
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
                Anchor's
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {" "}
                  Financial Operations
                </span>
              </h1>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Everything your school needs to manage finances smoothly—from
                billing to budgeting—with powerful insights to help you make the
                right decisions every time.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold flex items-center justify-center"
                  onClick={() => router.push("/sign-in")}
                >
                  Login
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
                <button className="bg-white text-slate-700 px-8 py-4 rounded-lg border-2 border-slate-200 hover:border-slate-300 transition-colors font-semibold flex items-center justify-center">
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
                </button>
              </div>
              <div className="flex items-center space-x-6 text-sm text-slate-600">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                  Fully customized
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                  Secure and school-owned data
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                  Built to grow
                </div>
              </div>
            </div>

            {/* Dashboard Preview */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-6 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-lg mb-4">
                  <div className="flex items-center justify-between text-white">
                    <h3 className="font-semibold">Financial Overview</h3>
                    <TrendingUp className="w-5 h-5" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-emerald-50 p-3 rounded-lg">
                    <p className="text-emerald-600 text-sm font-medium">
                      Total Revenue
                    </p>
                    <p className="text-2xl font-bold text-emerald-700">$2.4M</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-blue-600 text-sm font-medium">
                      Active Students
                    </p>
                    <p className="text-2xl font-bold text-blue-700">1,847</p>
                  </div>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-600">
                      Budget Utilization
                    </span>
                    <span className="text-sm font-semibold text-slate-700">
                      72%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full w-3/4"></div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full opacity-20 animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-slate-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Everything You Need to Manage School Finances
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From student billing to budget management, our comprehensive
              platform handles all your financial operations in one place.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-slate-100 group"
              >
                <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {/* <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Loved by Schools Everywhere
            </h2>
            <p className="text-xl text-slate-600">
              See what educators are saying about EduFinance
            </p>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 md:p-12 text-center">
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-6 h-6 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <blockquote className="text-xl md:text-2xl text-slate-700 mb-8 leading-relaxed">
                "{testimonials[currentTestimonial].content}"
              </blockquote>
              <div className="flex items-center justify-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {testimonials[currentTestimonial].name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="text-left">
                  <div className="font-semibold text-slate-900">
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div className="text-slate-600">
                    {testimonials[currentTestimonial].role}
                  </div>
                  <div className="text-sm text-slate-500">
                    {testimonials[currentTestimonial].school}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial
                      ? "bg-blue-600"
                      : "bg-slate-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      {/* <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Transform Your School's Finances?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join hundreds of schools already using EduFinance to streamline
            their financial operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-slate-50 transition-colors font-semibold shadow-lg">
              Start 30-Day Free Trial
            </button>
            <button className="bg-transparent text-white px-8 py-4 rounded-lg border-2 border-white hover:bg-white hover:text-blue-600 transition-colors font-semibold">
              Schedule Demo
            </button>
          </div>
          <p className="text-blue-200 text-sm mt-6">
            No credit card required • Setup in under 10 minutes
          </p>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  {/* <GraduationCap className="w-5 h-5 text-white" />
                   */}
                  <Image
                    src="/images/logo-.png"
                    alt="UFMS Logo"
                    width={200}
                    height={200}
                    priority
                  />
                </div>
                <span className="text-xl font-bold text-white">
                  Anchor University
                </span>
              </div>
              <p className="text-slate-400 mb-4">
                Empowering schools with intelligent financial management
                solutions.
              </p>
              <div className="flex space-x-4">
                <Phone className="w-5 h-5" />
                <Mail className="w-5 h-5" />
                <Globe className="w-5 h-5" />
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Security
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Training
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Status
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-slate-400">
              © 2025 EduFinance. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Terms
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SchoolFinanceLandingPage;
