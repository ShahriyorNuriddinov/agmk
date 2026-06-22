export interface User {
  id: number;
  username: string;
  email: string | null;
  full_name: string;
  role: UserRole;
  department_id: number | null;
  section_id: number | null;
  is_active: boolean;
  card_uid: string | null;
  created_at: string;
  updated_at: string;
}

export type UserRole =
  | 'admin'
  | 'manager'
  | 'department_head'
  | 'section_head'
  | 'instructor'
  | 'safety_engineer'
  | 'viewer';

export interface Department {
  id: number;
  code: string;
  name: string;
  head_name: string | null;
  personnel_count: number;
  created_at: string;
  updated_at: string;
}

export interface Section {
  id: number;
  code: string;
  name: string;
  department_id: number;
  head_name: string | null;
  personnel_count: number;
  created_at: string;
  updated_at: string;
}

export interface Profession {
  id: number;
  code: string;
  name: string;
  created_at: string;
}

export interface Worker {
  id: number;
  personnel_number: string;
  last_name: string;
  first_name: string;
  middle_name: string | null;
  department_id: number;
  section_id: number | null;
  profession_id: number;
  hire_date: string;
  total_experience_years: number;
  profession_experience_years: number;
  status: 'active' | 'on_leave' | 'dismissed';
  card_uid: string | null;
  created_at: string;
  updated_at: string;
}

export type BriefingType = 'primary' | 'repeat' | 'unplanned' | 'targeted';
export type BriefingStatus = 'valid' | 'approaching' | 'overdue';

export interface Briefing {
  id: number;
  worker_id: number;
  briefing_type: BriefingType;
  conducted_at: string;
  department_id: number;
  section_id: number | null;
  reason: string | null;
  instructor_name: string;
  instructor_id: number | null;
  next_briefing_date: string | null;
  status: BriefingStatus;
  repeat_period_days: number | null;
  worker_confirmed: boolean;
  worker_confirmed_at: string | null;
  instructor_confirmed: boolean;
  instructor_confirmed_at: string | null;
  created_at: string;
  updated_at: string;
}

export type CheckResult = 'satisfactory' | 'unsatisfactory';
export type CheckStatus = 'valid' | 'approaching' | 'overdue';

export interface KnowledgeCheck {
  id: number;
  worker_id: number;
  check_date: string;
  protocol_number: string;
  result: CheckResult;
  validity_period_days: number;
  next_check_date: string;
  status: CheckStatus;
  worker_confirmed: boolean;
  worker_confirmed_at: string | null;
  chairman_confirmed: boolean;
  chairman_confirmed_at: string | null;
  chairman_id: number | null;
  created_at: string;
  updated_at: string;
}

export interface Notification {
  id: number;
  user_id: number;
  notification_type: string;
  title: string;
  message: string;
  is_read: boolean;
  related_worker_id: number | null;
  related_briefing_id: number | null;
  related_check_id: number | null;
  created_at: string;
}

export interface DashboardData {
  total_workers: number;
  active_briefings: number;
  overdue_briefings: number;
  active_knowledge_checks: number;
  overdue_knowledge_checks: number;
  compliance_percentage: number;
}

export interface DepartmentAnalytics {
  department_id: number;
  department_name: string;
  worker_count: number;
  total_briefings: number;
  overdue_briefings: number;
  total_knowledge_checks: number;
  overdue_knowledge_checks: number;
  compliance_percentage: number;
}

export interface WorkerCard {
  worker_id: number;
  personnel_number: string;
  full_name: string;
  department_name: string;
  section_name: string | null;
  profession_name: string;
  briefing_history: Array<{
    id: number;
    type: string;
    date: string;
    instructor: string;
    status: string;
    confirmed: boolean;
  }>;
  knowledge_check_history: Array<{
    id: number;
    date: string;
    protocol: string;
    result: string;
    status: string;
    confirmed: boolean;
  }>;
  upcoming_briefings: Array<{ id: number; type: string; next_date: string }>;
  upcoming_checks: Array<{ id: number; next_date: string }>;
}
