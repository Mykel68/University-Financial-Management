import {
  Banknote,
  BarChart2,
  Building2,
  CreditCard,
  FileText,
  Folder,
  Home,
  MessagesSquare,
  Receipt,
  Settings,
  Shield,
  TrendingUp,
  Users2,
  Video,
  Wallet,
} from "lucide-react";

type NavItem = {
  label: string;
  href: string;
  icon: any;
};

type RoleNavConfig = {
  [key: string]: NavItem[];
};

export const baseNav: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: Home },
  //   { label: "Settings", href: "/settings", icon: Settings },
];

export const roleBasedNav: RoleNavConfig = {
  system_admin: [
    { label: "Analytics", href: "/analytics", icon: BarChart2 },
    { label: "Cash Flow", href: "/cashflow", icon: TrendingUp },
    { label: "Expenditure", href: "/expenditure", icon: Receipt },
    { label: "Overhead", href: "/overhead", icon: Building2 },
    { label: "Reports", href: "/report", icon: FileText },
  ],
  finance_officer: [
    { label: "Budgets", href: "/budget", icon: Banknote },
    { label: "Transactions", href: "/transaction", icon: Wallet },
    // { label: "Invoices", href: "/invoices", icon: Receipt },
    // { label: "Payments", href: "/payments", icon: CreditCard },
  ],
  department_head: [
    { label: "Expenses", href: "/expenses", icon: Receipt },
    { label: "Chat", href: "/chat", icon: MessagesSquare },
  ],
};
