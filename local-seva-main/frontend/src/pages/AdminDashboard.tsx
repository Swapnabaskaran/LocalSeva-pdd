import React from 'react';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { Users, Briefcase, DollarSign, TrendingUp } from 'lucide-react';

const revenueData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4500 },
  { name: 'May', value: 6000 },
  { name: 'Jun', value: 7000 },
];

const bookingsData = [
  { name: 'Mon', completed: 120, cancelled: 10 },
  { name: 'Tue', completed: 132, cancelled: 12 },
  { name: 'Wed', completed: 101, cancelled: 5 },
  { name: 'Thu', completed: 140, cancelled: 8 },
  { name: 'Fri', completed: 190, cancelled: 15 },
  { name: 'Sat', completed: 250, cancelled: 20 },
  { name: 'Sun', completed: 210, cancelled: 18 },
];

export default function AdminDashboard() {
  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Admin Analytics Dashboard</h1>
          <p className="text-slate-500">Real-time overview of marketplace performance</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow-sm">
          Download Report
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { title: 'Total Revenue', value: '$124,500', icon: DollarSign, trend: '+14%' },
          { title: 'Active Bookings', value: '1,432', icon: Briefcase, trend: '+5%' },
          { title: 'Total Customers', value: '45.2k', icon: Users, trend: '+12%' },
          { title: 'Active Workers', value: '1.2k', icon: TrendingUp, trend: '+2%' },
        ].map((kpi, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-slate-500 font-medium mb-1">{kpi.title}</p>
              <h3 className="text-3xl font-bold text-slate-800">{kpi.value}</h3>
              <p className="text-green-500 text-sm font-semibold mt-2">{kpi.trend} from last month</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-xl">
              <kpi.icon className="text-blue-600 w-8 h-8" />
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Revenue Area Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-xl font-bold text-slate-800 mb-6">Revenue Growth</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={(val) => `$${val}`} />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#2563EB" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bookings Bar Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-xl font-bold text-slate-800 mb-6">Weekly Bookings</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bookingsData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="completed" stackId="a" fill="#10B981" radius={[0, 0, 4, 4]} />
                <Bar dataKey="cancelled" stackId="a" fill="#EF4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
