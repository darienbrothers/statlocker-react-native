export type MilestoneStatus = 'todo' | 'done' | 'snooze';

export type Milestone = {
  id: string;
  title: string;
  status: MilestoneStatus;
  dueAt?: string;
  completedAt?: string;
};

export type SchoolBoard = 'reach' | 'realistic' | 'safe';

export type SchoolStatus =
  | 'not_contacted'
  | 'emailed'
  | 'conversation'
  | 'visit'
  | 'offer';

export type School = {
  id: string;
  name: string;
  division: 'DI' | 'DII' | 'DIII' | 'Club';
  board: SchoolBoard;
  status: SchoolStatus;
  location?: string;
  tuition?: number;
  majors?: string[];
  coach?: { name?: string; email?: string };
  notes: string[];
  fitScore?: number;
  createdAt: string;
  updatedAt: string;
};

export type OutreachTone = 'professional' | 'warm' | 'direct';

export type EmailDraft = {
  id: string;
  schoolId?: string;
  subject: string;
  body: string;
  tone: OutreachTone;
  createdAt: string;
};

// Seed data
export const seedMilestones: Milestone[] = [
  { id: 'ms_eligibility', title: 'NCAA/NAIA Eligibility', status: 'todo' },
  { id: 'ms_player_card', title: 'Build Player Card', status: 'todo' },
  { id: 'ms_shortlist', title: 'Shortlist Schools', status: 'todo' },
  { id: 'ms_email', title: 'Email Coaches', status: 'todo' },
  { id: 'ms_visit', title: 'Plan Unofficial Visit', status: 'snooze' },
];

export const seedSchools: School[] = [
  {
    id: 'sch_001',
    name: 'Northshore University',
    division: 'DI',
    board: 'reach',
    status: 'not_contacted',
    location: 'MA',
    notes: [],
    fitScore: 72,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'sch_002',
    name: 'Riverview College',
    division: 'DIII',
    board: 'realistic',
    status: 'emailed',
    location: 'CT',
    notes: ['Coach replied: wants transcript'],
    fitScore: 81,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'sch_003',
    name: 'Hillcrest University',
    division: 'DII',
    board: 'safe',
    status: 'conversation',
    location: 'NH',
    notes: [],
    fitScore: 76,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const seedDrafts: EmailDraft[] = [];

// Helpers
export function calculateProgressPercent(milestones: Milestone[]): number {
  if (milestones.length === 0) return 0;
  const done = milestones.filter(m => m.status === 'done').length;
  return (done / milestones.length) * 100;
}

export function getNextAction(milestones: Milestone[]): string | undefined {
  return milestones.find(m => m.status === 'todo')?.title;
}

export function moveSchool(
  schools: School[],
  schoolId: string,
  toBoard: SchoolBoard
): School[] {
  return schools.map(s =>
    s.id === schoolId ? { ...s, board: toBoard, updatedAt: new Date().toISOString() } : s
  );
}

export function updateSchoolStatus(
  schools: School[],
  schoolId: string,
  status: SchoolStatus
): School[] {
  return schools.map(s =>
    s.id === schoolId ? { ...s, status, updatedAt: new Date().toISOString() } : s
  );
}

export function addSchool(
  schools: School[],
  input: Pick<School, 'name' | 'division'> & Partial<School>
): School[] {
  const now = new Date().toISOString();
  const newSchool: School = {
    id: `sch_${Math.random().toString(36).slice(2, 8)}`,
    name: input.name,
    division: input.division as School['division'],
    board: input.board ?? 'realistic',
    status: input.status ?? 'not_contacted',
    location: input.location,
    tuition: input.tuition,
    majors: input.majors,
    coach: input.coach,
    notes: [],
    fitScore: input.fitScore,
    createdAt: now,
    updatedAt: now,
  };
  return [newSchool, ...schools];
}

export function appendNote(
  schools: School[],
  schoolId: string,
  note: string
): School[] {
  const now = new Date().toISOString();
  return schools.map(s =>
    s.id === schoolId ? { ...s, notes: [note, ...s.notes], updatedAt: now } : s
  );
}

export function saveDraft(
  drafts: EmailDraft[],
  draft: Omit<EmailDraft, 'id' | 'createdAt'>
): EmailDraft[] {
  const newDraft: EmailDraft = {
    id: `em_${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
    ...draft,
  };
  return [newDraft, ...drafts];
}

// Analytics stubs (no-op)
export const analytics = {
  recruiting_opened: () => {},
  school_added: (source: 'manual' | 'lookup' | 'csv') => {},
  school_moved_board: (from: SchoolBoard, to: SchoolBoard) => {},
  email_generated: (templateId: string, schoolId?: string) => {},
  roadmap_milestone_completed: (id: string) => {},
};


