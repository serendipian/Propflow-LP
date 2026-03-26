import { Calendar, MessageSquare, DollarSign, LayoutDashboard, Briefcase, Eye, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface Module {
  id: string;
  label: string;
  icon: LucideIcon;
  color: string;
  desc: string;
}

export interface DashboardStat {
  label: string;
  val: string;
  trend: string;
  icon: LucideIcon;
}

export interface LatestRequest {
  name: string;
  req: string;
  budget: string;
  time: string;
}

export interface UpcomingViewing {
  time: string;
  title: string;
  loc: string;
}

export interface FollowUpItem {
  task: string;
  due: string;
}

export interface ActiveOffer {
  prop: string;
  offer: string;
  status: string;
  statusColor: string;
}

export const modules: Module[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, color: 'blue', desc: 'Real-time KPIs, upcoming meetings, and performance analytics.' },
  { id: 'inbox', label: 'Inbox', icon: MessageSquare, color: 'blue', desc: 'Centralized communication hub. Email, WhatsApp, and Call logs.' },
  { id: 'agenda', label: 'Agenda', icon: Calendar, color: 'blue', desc: 'Unified view of viewings, meetings, tasks, and deadlines.' },
  { id: 'accounting', label: 'Accounting', icon: DollarSign, color: 'emerald', desc: 'Track revenue, manage expenses, and generate commission invoices.' },
];

export const dashboardStats: DashboardStat[] = [
  { label: 'Revenue', val: '$124k', trend: '+12%', icon: DollarSign },
  { label: 'Deals', val: '42', trend: '+5', icon: Briefcase },
  { label: 'Viewings', val: '156', trend: '+28%', icon: Eye },
  { label: 'Leads', val: '89', trend: '+14%', icon: Users },
];

export const latestRequests: LatestRequest[] = [
  { name: "Sarah Connor", req: "3 Bed \u2022 Downtown", budget: "$4.2k", time: "2m ago" },
  { name: "John Wick", req: "Studio \u2022 Basement", budget: "$2.5k", time: "15m ago" },
  { name: "Bruce Wayne", req: "Penthouse \u2022 City View", budget: "$15k", time: "1h ago" },
  { name: "Clark Kent", req: "Farmhouse \u2022 Quiet", budget: "$800k", time: "3h ago" },
  { name: "Diana Prince", req: "Loft \u2022 Museum District", budget: "$1.2M", time: "5h ago" },
  { name: "Tony Stark", req: "Modern Mansion \u2022 Cliffside", budget: "$25M", time: "1d ago" },
];

export const upcomingViewings: UpcomingViewing[] = [
  { time: "10:00 AM", title: "Open House", loc: "Sunset Blvd" },
  { time: "01:30 PM", title: "Private Viewing", loc: "Park Ave" },
  { time: "04:00 PM", title: "Key Handover", loc: "Broadway" },
];

export const followUpItems: FollowUpItem[] = [
  { task: "Call Mike regarding contract", due: "Today" },
  { task: "Email Sarah photos", due: "Today" },
  { task: "Update listing price", due: "Tomorrow" },
  { task: "Schedule viewing for 124 Main", due: "Tomorrow" },
  { task: "Send invoice #402", due: "Wed" },
  { task: "Review feedback from open house", due: "Fri" },
];

export const activeOffers: ActiveOffer[] = [
  { prop: "128 Golden Oak", offer: "$4.4M", status: "Countered", statusColor: "text-blue-500 bg-blue-50 dark:bg-blue-900/20" },
  { prop: "55 Hudson Yards", offer: "$1.2M", status: "Pending", statusColor: "text-blue-500 bg-blue-50 dark:bg-blue-900/20" },
  { prop: "220 Central Park", offer: "$6.8M", status: "Reviewing", statusColor: "text-blue-500 bg-blue-50 dark:bg-blue-900/20" },
  { prop: "15 Westfield Blvd", offer: "$950k", status: "Accepted", statusColor: "text-cyan-600 bg-cyan-50 dark:bg-cyan-900/20" },
  { prop: "90210 Beverly Hills", offer: "$3.1M", status: "New", statusColor: "text-blue-500 bg-blue-50 dark:bg-blue-900/20" },
];

export const revenueBarHeights: number[] = [40, 70, 50, 90, 60, 80, 50, 75, 45, 65, 85, 55];
