import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHead, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { useState } from "react";
import { Menu } from "lucide-react";

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const stats = [
    { title: "Applied", count: 120, color: "bg-blue-500" },
    { title: "Rejected", count: 45, color: "bg-red-500" },
    { title: "Accepted", count: 75, color: "bg-green-500" },
  ];

  const applications = [
    { id: 1, name: "John Doe", status: "Accepted" },
    { id: 2, name: "Jane Smith", status: "Rejected" },
    { id: 3, name: "Alice Johnson", status: "Applied" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-gray-900 text-white w-64 p-5 fixed inset-y-0 left-0 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform md:relative md:translate-x-0`}
      >
        <h2 className="text-xl font-bold">Admin Panel</h2>
        <nav className="mt-5">
          <ul>
            <li className="py-2 hover:bg-gray-700 p-2 rounded cursor-pointer">Dashboard</li>
            <li className="py-2 hover:bg-gray-700 p-2 rounded cursor-pointer">Users</li>
            <li className="py-2 hover:bg-gray-700 p-2 rounded cursor-pointer">Settings</li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:ml-64">
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-900 mb-4"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu size={24} />
        </button>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {stats.map((stat) => (
            <Card key={stat.title} className={`${stat.color} text-white`}>
              <CardHeader>
                <CardTitle>{stat.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{stat.count}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Table */}
        <Table className="bg-white rounded shadow">
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((app) => (
              <TableRow key={app.id}>
                <TableCell>{app.id}</TableCell>
                <TableCell>{app.name}</TableCell>
                <TableCell>{app.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
    </div>
  );
}
