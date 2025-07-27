import {
  Banknote,
  BarChart2,
  Building2,
  CreditCard,
  Folder,
  Home,
  MessagesSquare,
  Receipt,
  Settings,
  Shield,
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
    { label: "Organization", href: "/organization", icon: Building2 },
    { label: "Projects", href: "/projects", icon: Folder },
    { label: "Members", href: "/members", icon: Users2 },
    { label: "Permissions", href: "/permissions", icon: Shield },
  ],
  finance_officer: [
    { label: "Budgets", href: "/budget", icon: Banknote },
    { label: "Transactions", href: "/transactions", icon: Wallet },
    { label: "Invoices", href: "/invoices", icon: Receipt },
    { label: "Payments", href: "/payments", icon: CreditCard },
  ],
  department_head: [
    { label: "Expenses", href: "/expenses", icon: Receipt },
    { label: "Chat", href: "/chat", icon: MessagesSquare },
  ],
};
