import {
  Building, Users, Search,
  CheckSquare, UserCircle, Handshake,
  Eye, FileSignature, Receipt, History,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface Module {
  id: string;
  label: string;
  icon: LucideIcon;
  color: string;
  desc: string;
}

export const modules: Module[] = [
  { id: 'properties', label: 'Properties', icon: Building, color: 'blue', desc: 'Manage Sales & Rentals. Auto-match listings with active Requests instantly.' },
  { id: 'requests', label: 'Requests', icon: Search, color: 'blue', desc: 'Track buyer & tenant criteria. Receive AI-driven match alerts.' },
  { id: 'owners', label: 'Owners', icon: UserCircle, color: 'blue', desc: 'Link properties to owners. Manage mandates and communication history.' },
  { id: 'applicants', label: 'Applicants', icon: Users, color: 'blue', desc: 'Qualify buyers & tenants. Smart scoring and requirement tracking.' },
  { id: 'partners', label: 'Partners', icon: Handshake, color: 'blue', desc: 'Collaborate with external agents, track referrals, and split commissions.' },
  { id: 'expenses', label: 'Expenses', icon: Receipt, color: 'blue', desc: 'Log property-specific costs, maintenance fees, and marketing spend.' },
  { id: 'followups', label: 'Follow Ups', icon: History, color: 'blue', desc: 'Never lose a lead. Automated reminders for calls, emails, and check-ins.' },
  { id: 'viewings', label: 'Viewings', icon: Eye, color: 'blue', desc: 'Schedule visits, sync with calendars, and collect feedback automatically.' },
  { id: 'offers', label: 'Offers', icon: FileSignature, color: 'blue', desc: 'Digital offer management workflow. From initial bid to closed deal.' },
  { id: 'tasks', label: 'Tasks', icon: CheckSquare, color: 'blue', desc: 'Smart checklists and team assignments. Never drop the ball on a lead.' },
];
