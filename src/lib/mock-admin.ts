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
    fullName: "John A. Doe",
    class: "Science",
    phone: "080XXXXXXXX",
    status: "Active" as const,
  },
  {
    id: "OEC/002",
    fullName: "Jane B. Doe",
    class: "Art",
    phone: "080XXXXXXXX",
    status: "Active" as const,
  },
  {
    id: "OEC/003",
    fullName: "Michael C. Okoye",
    class: "Commercial",
    phone: "080XXXXXXXX",
    status: "Inactive" as const,
  },
];
