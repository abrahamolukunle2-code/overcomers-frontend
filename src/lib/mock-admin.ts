// Temporary mock data for the admin portal. Once Supabase is wired up, this
// will be replaced by real queries.

export const adminTestCredentials = {
  email: "admin@test.com",
  password: "admin1234",
};

export const mockAdminStats = {
  totalStudents: 1250,
  activeStudents: 1100,
  inactiveStudents: 150,
};

export const mockClassDistribution = [
  { label: "Science", value: 450 },
  { label: "Art", value: 400 },
  { label: "Commercial", value: 400 },
];

export const mockUpcomingExam = {
  name: "WAEC 2026",
  closingDate: "10/10/2026",
};

export const mockStudentsList = [
  {
    id: "OEC/001",
    firstName: "John",
    middleName: "A.",
    lastName: "Doe",
    class: "Science",
    phone: "080XXXXXXXX",
    status: "Active" as const,
    dob: "2008-04-12",
    gender: "Male",
    admissionNumber: "ADM/2026/0101",
    email: "john.doe@example.com",
    address: "12 Allen Avenue, Ikeja",
    stateOfOrigin: "Lagos",
    lga: "Ikeja",
    parentName: "Mr. Adewale Doe",
    parentPhone: "080XXXXXXXX",
    emergencyContact: "Mrs. Bola Doe",
    emergencyPhone: "080XXXXXXXX",
  },
  {
    id: "OEC/002",
    firstName: "Jane",
    middleName: "B.",
    lastName: "Doe",
    class: "Art",
    phone: "080XXXXXXXX",
    status: "Active" as const,
    dob: "2007-11-03",
    gender: "Female",
    admissionNumber: "ADM/2026/0102",
    email: "jane.doe@example.com",
    address: "5 Marina Road, Lagos Island",
    stateOfOrigin: "Lagos",
    lga: "Lagos Island",
    parentName: "Mr. Emeka Doe",
    parentPhone: "080XXXXXXXX",
    emergencyContact: "Mrs. Chioma Doe",
    emergencyPhone: "080XXXXXXXX",
  },
  {
    id: "OEC/003",
    firstName: "Michael",
    middleName: "C.",
    lastName: "Okoye",
    class: "Commercial",
    phone: "080XXXXXXXX",
    status: "Inactive" as const,
    dob: "2008-01-20",
    gender: "Male",
    admissionNumber: "ADM/2026/0103",
    email: "michael.okoye@example.com",
    address: "23 Ogui Road, Enugu",
    stateOfOrigin: "Enugu",
    lga: "Enugu North",
    parentName: "Mr. Chukwudi Okoye",
    parentPhone: "080XXXXXXXX",
    emergencyContact: "Mrs. Ngozi Okoye",
    emergencyPhone: "080XXXXXXXX",
  },
];

export type MockStudent = (typeof mockStudentsList)[number];


export type ExamStatus =
  | "Draft"
  | "Open"
  | "Ongoing"
  | "Closed"
  | "Completed";

export type MockExam = {
  id: string;
  title: string;
  examType: string;
  examYear: string;
  examDate: string;
  registrationDeadline: string;
  classLevel: string;
  venue: string;
  status: ExamStatus;
  description: string;
  registeredCount: number;
};

export const examTypes = [
  "WAEC",
  "NECO",
  "JAMB",
  "GCE",
  "NABTEB",
  "CBT",
  "IELTS",
  "TOEFL",
  "GRE",
  "SAT",
] as const;

export const examStatusOptions: ExamStatus[] = [
  "Draft",
  "Open",
  "Ongoing",
  "Closed",
  "Completed",
];

export const mockExams: MockExam[] = [
  {
    id: "EXM-001",
    title: "WAEC May/June 2026",
    examType: "WAEC",
    examYear: "2026",
    examDate: "2026-05-12",
    registrationDeadline: "2026-04-15",
    classLevel: "WAEC",
    venue: "Main CBT Centre",
    status: "Open",
    description: "West African Senior School Certificate Examination — May/June diet.",
    registeredCount: 48,
  },
  {
    id: "EXM-002",
    title: "JAMB UTME 2026 Mock",
    examType: "JAMB",
    examYear: "2026",
    examDate: "2026-03-20",
    registrationDeadline: "2026-03-10",
    classLevel: "JAMB UTME",
    venue: "Hall A",
    status: "Ongoing",
    description: "Internal mock for JAMB UTME candidates.",
    registeredCount: 32,
  },
  {
    id: "EXM-003",
    title: "IELTS Preparation Test",
    examType: "IELTS",
    examYear: "2026",
    examDate: "2026-04-05",
    registrationDeadline: "2026-03-28",
    classLevel: "IELTS",
    venue: "Language Lab",
    status: "Draft",
    description: "Practice test for international exam candidates.",
    registeredCount: 0,
  },
  {
    id: "EXM-004",
    title: "NECO June/July 2025",
    examType: "NECO",
    examYear: "2025",
    examDate: "2025-06-18",
    registrationDeadline: "2025-05-20",
    classLevel: "NECO",
    venue: "Main CBT Centre",
    status: "Completed",
    description: "National Examinations Council — previous session.",
    registeredCount: 41,
  },
];
export type ResultStatus = "Pending" | "Verified" | "Rejected";

export type MockResult = {
  id: string;
  studentId: string;
  studentName: string;
  examType: string;
  examYear: string;
  subject: string;
  uploadedAt: string;
  status: ResultStatus;
  imageLabel: string;
  notes: string;
};

export const resultStatusOptions: ResultStatus[] = [
  "Pending",
  "Verified",
  "Rejected",
];

export const mockResults: MockResult[] = [
  {
    id: "RES-001",
    studentId: "OEC/001",
    studentName: "John A. Doe",
    examType: "WAEC",
    examYear: "2025",
    subject: "Mathematics",
    uploadedAt: "2026-09-12",
    status: "Pending",
    imageLabel: "waec-maths-john.jpg",
    notes: "",
  },
  {
    id: "RES-002",
    studentId: "OEC/002",
    studentName: "Jane B. Doe",
    examType: "NECO",
    examYear: "2025",
    subject: "English Language",
    uploadedAt: "2026-09-10",
    status: "Verified",
    imageLabel: "neco-english-jane.jpg",
    notes: "Clear scan, grades confirmed.",
  },
  {
    id: "RES-003",
    studentId: "OEC/001",
    studentName: "John A. Doe",
    examType: "JAMB",
    examYear: "2026",
    subject: "UTME Scorecard",
    uploadedAt: "2026-09-08",
    status: "Rejected",
    imageLabel: "jamb-john.jpg",
    notes: "Image too blurry — request re-upload.",
  },
  {
    id: "RES-004",
    studentId: "OEC/003",
    studentName: "Michael C. Okoye",
    examType: "WAEC",
    examYear: "2025",
    subject: "Physics",
    uploadedAt: "2026-09-14",
    status: "Pending",
    imageLabel: "waec-physics-michael.jpg",
    notes: "",
  },
];

export type CertificateStatus = "Pending" | "Verified" | "Rejected";

export type MockCertificate = {
  id: string;
  studentId: string;
  studentName: string;
  certificateType: string;
  issuer: string;
  issueYear: string;
  uploadedAt: string;
  status: CertificateStatus;
  imageLabel: string;
  notes: string;
};

export const certificateTypes = [
  "WAEC Certificate",
  "NECO Certificate",
  "JAMB Admission Letter",
  "NABTEB Certificate",
  "GCE Certificate",
  "NYSC Call-up Letter",
  "IELTS Score Report",
  "TOEFL Score Report",
  "Other",
] as const;

export const certificateStatusOptions: CertificateStatus[] = [
  "Pending",
  "Verified",
  "Rejected",
];

export const mockCertificates: MockCertificate[] = [
  {
    id: "CERT-001",
    studentId: "OEC/001",
    studentName: "John A. Doe",
    certificateType: "WAEC Certificate",
    issuer: "WAEC",
    issueYear: "2025",
    uploadedAt: "2026-09-11",
    status: "Pending",
    imageLabel: "waec-cert-john.jpg",
    notes: "",
  },
  {
    id: "CERT-002",
    studentId: "OEC/002",
    studentName: "Jane B. Doe",
    certificateType: "NECO Certificate",
    issuer: "NECO",
    issueYear: "2025",
    uploadedAt: "2026-09-09",
    status: "Verified",
    imageLabel: "neco-cert-jane.jpg",
    notes: "Original verified against registry.",
  },
  {
    id: "CERT-003",
    studentId: "OEC/003",
    studentName: "Michael C. Okoye",
    certificateType: "JAMB Admission Letter",
    issuer: "JAMB",
    issueYear: "2026",
    uploadedAt: "2026-09-13",
    status: "Rejected",
    imageLabel: "jamb-admission-michael.jpg",
    notes: "Incomplete document — missing stamp.",
  },
  {
    id: "CERT-004",
    studentId: "OEC/002",
    studentName: "Jane B. Doe",
    certificateType: "IELTS Score Report",
    issuer: "British Council",
    issueYear: "2026",
    uploadedAt: "2026-09-15",
    status: "Pending",
    imageLabel: "ielts-jane.jpg",
    notes: "",
  },
];

export type PaymentStatus = "Pending" | "Paid" | "Overdue" | "Waived";

export type MockPayment = {
  id: string;
  studentId: string;
  studentName: string;
  description: string;
  amount: number;
  dueDate: string;
  paidAt: string | null;
  status: PaymentStatus;
  proofLabel: string;
  notes: string;
};

export const paymentStatusOptions: PaymentStatus[] = [
  "Pending",
  "Paid",
  "Overdue",
  "Waived",
];

export const mockPayments: MockPayment[] = [
  {
    id: "PAY-001",
    studentId: "OEC/001",
    studentName: "John A. Doe",
    description: "WAEC Registration Fee 2026",
    amount: 25000,
    dueDate: "2026-04-15",
    paidAt: null,
    status: "Pending",
    proofLabel: "",
    notes: "",
  },
  {
    id: "PAY-002",
    studentId: "OEC/002",
    studentName: "Jane B. Doe",
    description: "CBT Training Package",
    amount: 15000,
    dueDate: "2026-03-01",
    paidAt: "2026-02-28",
    status: "Paid",
    proofLabel: "jane-cbt-receipt.jpg",
    notes: "Bank transfer confirmed.",
  },
  {
    id: "PAY-003",
    studentId: "OEC/003",
    studentName: "Michael C. Okoye",
    description: "JAMB Form & Tutorial",
    amount: 18000,
    dueDate: "2026-02-20",
    paidAt: null,
    status: "Overdue",
    proofLabel: "",
    notes: "Reminder sent 2026-03-01.",
  },
  {
    id: "PAY-004",
    studentId: "OEC/001",
    studentName: "John A. Doe",
    description: "IELTS Preparation Fee",
    amount: 30000,
    dueDate: "2026-05-01",
    paidAt: null,
    status: "Pending",
    proofLabel: "john-ielts-proof.jpg",
    notes: "Proof uploaded — awaiting verification.",
  },
];

export type AssignmentStatus = "Open" | "Closed" | "Graded";

export type MockAssignment = {
  id: string;
  title: string;
  subject: string;
  classLevel: string;
  dueDate: string;
  status: AssignmentStatus;
  description: string;
  submissionCount: number;
};

export const assignmentStatusOptions: AssignmentStatus[] = [
  "Open",
  "Closed",
  "Graded",
];

export const mockAssignments: MockAssignment[] = [
  {
    id: "ASN-001",
    title: "Quantitative Reasoning Practice Set",
    subject: "Mathematics",
    classLevel: "JAMB UTME",
    dueDate: "2026-10-15",
    status: "Open",
    description: "Complete 40 practice questions on algebra and word problems.",
    submissionCount: 12,
  },
  {
    id: "ASN-002",
    title: "Essay: My Future Career",
    subject: "English Language",
    classLevel: "WAEC",
    dueDate: "2026-10-10",
    status: "Closed",
    description: "Write a 500-word essay suitable for WAEC continuous writing.",
    submissionCount: 28,
  },
  {
    id: "ASN-003",
    title: "IELTS Writing Task 2 Draft",
    subject: "English Language",
    classLevel: "IELTS",
    dueDate: "2026-10-20",
    status: "Open",
    description: "Draft one Task 2 essay (minimum 250 words) on a given prompt.",
    submissionCount: 5,
  },
  {
    id: "ASN-004",
    title: "HTML Basics Project",
    subject: "Programming",
    classLevel: "CBT Training",
    dueDate: "2026-09-30",
    status: "Graded",
    description: "Build a simple personal homepage in HTML/CSS.",
    submissionCount: 19,
  },
];

export type MockMaterial = {
  id: string;
  title: string;
  subject: string;
  classLevel: string;
  type: string;
  uploadedAt: string;
  description: string;
};

export const materialTypes = ["PDF", "Video", "Link", "Notes"] as const;

export const materialSubjects = [
  "Mathematics",
  "English Language",
  "Chemistry",
  "Physics",
  "Biology",
  "Programming",
  "General",
] as const;

export const mockMaterials: MockMaterial[] = [
  {
    id: "MAT-001",
    title: "JAMB Quantitative Reasoning Workbook",
    subject: "Mathematics",
    classLevel: "JAMB UTME",
    type: "PDF",
    uploadedAt: "2026-09-01",
    description: "Practice problems covering algebra, geometry, and word problems.",
  },
  {
    id: "MAT-002",
    title: "WAEC Essay Writing Tips",
    subject: "English Language",
    classLevel: "WAEC",
    type: "Notes",
    uploadedAt: "2026-09-05",
    description: "Structure, vocabulary, and common mistakes in formal essays.",
  },
  {
    id: "MAT-003",
    title: "IELTS Listening Practice Sets",
    subject: "English Language",
    classLevel: "IELTS",
    type: "Link",
    uploadedAt: "2026-09-08",
    description: "Online practice tests for Listening sections 1–4.",
  },
  {
    id: "MAT-004",
    title: "CBT Navigation Tutorial",
    subject: "Programming",
    classLevel: "CBT Training",
    type: "Video",
    uploadedAt: "2026-09-12",
    description: "How to use the computer-based testing interface effectively.",
  },
  {
    id: "MAT-005",
    title: "Past Questions: WAEC Physics 2020–2024",
    subject: "Physics",
    classLevel: "WAEC",
    type: "PDF",
    uploadedAt: "2026-09-15",
    description: "Compiled past paper questions with marking schemes.",
  },
];

export type MockTimetable = {
  id: string;
  title: string;
  /** Exam programme / batch (e.g. JAMB UTME, IELTS) */
  classLevel: string;
  term: string;
  session: string;
  uploadedAt: string;
  imageLabel: string;
  notes: string;
};

export const mockTimetables: MockTimetable[] = [
  {
    id: "TT-001",
    title: "JAMB UTME Weekly Schedule",
    classLevel: "JAMB UTME",
    term: "First Batch",
    session: "2026",
    uploadedAt: "2026-09-01",
    imageLabel: "jamb-utme-timetable.jpg",
    notes: "Morning and evening CBT practice slots included.",
  },
  {
    id: "TT-002",
    title: "WAEC May/June Coaching Timetable",
    classLevel: "WAEC",
    term: "May/June Diet",
    session: "2026",
    uploadedAt: "2026-09-01",
    imageLabel: "waec-timetable.jpg",
    notes: "Core subjects + practical sessions.",
  },
  {
    id: "TT-003",
    title: "IELTS Preparation Schedule",
    classLevel: "IELTS",
    term: "Weekend Batch",
    session: "2026",
    uploadedAt: "2026-09-02",
    imageLabel: "ielts-timetable.jpg",
    notes: "Listening, Reading, Writing, and Speaking modules.",
  },
  {
    id: "TT-004",
    title: "NECO / GCE Coaching Timetable",
    classLevel: "NECO / GCE",
    term: "June/July Diet",
    session: "2026",
    uploadedAt: "2026-09-03",
    imageLabel: "neco-gce-timetable.jpg",
    notes: "",
  },
];

export type MockAdminSettings = {
  schoolName: string;
  schoolEmail: string;
  schoolPhone: string;
  schoolAddress: string;
  session: string;
  term: string;
  adminName: string;
  adminEmail: string;
  notifyNewRegistrations: boolean;
  notifyPayments: boolean;
  notifyResultUploads: boolean;
};

export const mockAdminSettings: MockAdminSettings = {
  schoolName: "Overcomers Education Centre",
  schoolEmail: "info@overcomerseducation.com",
  schoolPhone: "+234-XXX-XXX-XXXX",
  schoolAddress: "Lagos, Nigeria",
  session: "2025/2026",
  term: "First Term",
  adminName: "Admin User",
  adminEmail: "admin@test.com",
  notifyNewRegistrations: true,
  notifyPayments: true,
  notifyResultUploads: false,
};