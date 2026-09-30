// Temporary mock data. Once Supabase is wired up, this will be replaced by a
// real fetch (e.g. a service function in src/services/students.ts).

// Test login credentials, for previewing the dashboard before Supabase is
// wired up. Remove this once real Supabase Auth is in place.
export const testCredentials = {
  email: "student@test.com",
  password: "test1234",
};
export const mockStudent = {
  firstName: "Chidinma",
  middleName: "Ada",
  lastName: "Okafor",
  studentId: "OEC/2026/001",
  admissionNumber: "ADM/2026/0102",
  status: "Active" as const,
  email: "chidinma.okafor@example.com",
};

export const mockDashboardStats = {
  exams: 2,
  results: 1,
  certificates: 2,
  feesStatus: "Unpaid" as const,
};
