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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CalendarDays, Download, Filter, Search } from "lucide-react";

const transactions = [
  {
    id: "TXN-001",
    student: "Alice Johnson",
    studentId: "STU-2024001",
    type: "Tuition Fee",
    amount: 5000,
    status: "Completed",
    date: "2024-01-15",
    method: "Bank Transfer",
  },
  {
    id: "TXN-002",
    student: "Bob Smith",
    studentId: "STU-2024002",
    type: "Lab Fee",
    amount: 250,
    status: "Pending",
    date: "2024-01-14",
    method: "Credit Card",
  },
  {
    id: "TXN-003",
    student: "Carol Davis",
    studentId: "STU-2024003",
    type: "Library Fee",
    amount: 50,
    status: "Failed",
    date: "2024-01-13",
    method: "Debit Card",
  },
  {
    id: "TXN-004",
    student: "David Wilson",
    studentId: "STU-2024004",
    type: "Tuition Fee",
    amount: 5000,
    status: "Completed",
    date: "2024-01-12",
    method: "Bank Transfer",
  },
  {
    id: "TXN-005",
    student: "Eva Brown",
    studentId: "STU-2024005",
    type: "Hostel Fee",
    amount: 1200,
    status: "Completed",
    date: "2024-01-11",
    method: "Online Payment",
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Completed":
      return <Badge className="bg-green-500 text-green-100">Completed</Badge>;
    case "Pending":
      return (
        <Badge className="bg-destructive text-destructive-foreground">
          Pending
        </Badge>
      );
    case "Failed":
      return <Badge variant="destructive">Failed</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

export default function Transactions() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
          <p className="text-muted-foreground">
            Manage and monitor all financial transactions
          </p>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold"> ₦11,500,000</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">75% success rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Awaiting processing</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>
            View and filter all university financial transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search transactions..." className="pl-10" />
            </div>
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Transaction Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="tuition">Tuition Fee</SelectItem>
                <SelectItem value="lab">Lab Fee</SelectItem>
                <SelectItem value="library">Library Fee</SelectItem>
                <SelectItem value="hostel">Hostel Fee</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              More Filters
            </Button>
          </div>

          {/* Transactions Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Method</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">
                      {transaction.id}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{transaction.student}</div>
                        <div className="text-sm text-muted-foreground">
                          {transaction.studentId}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{transaction.type}</TableCell>
                    <TableCell className="font-medium">
                      ₦{(transaction.amount * 1000).toLocaleString()}
                    </TableCell>
                    <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.method}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
