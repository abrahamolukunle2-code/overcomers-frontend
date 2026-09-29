// Temporary mock data for pages that show a list. Once Supabase is wired up,
// these will be replaced by real queries (e.g. src/services/results.ts etc).

export const mockResults = [
  { id: "1", examBody: "WAEC", examYear: "2025", label: "WAEC 2025" },
];

export const mockCertificates = [
  { id: "1", name: "Birth Certificate" },
];

export const mockAssignments = [
  { id: "1", title: "Maths Assignment", subject: "Mathematics", status: "Submitted" as const },
  { id: "2", title: "English Essay", subject: "English", status: "Pending" as const },
];

export const mockMaterials = [
  { id: "1", title: "Maths WAEC Notes", subject: "Mathematics", examBody: "WAEC", type: "Note" },
  { id: "2", title: "English Past Questions", subject: "English", examBody: "WAEC", type: "Past Question" },
  { id: "3", title: "Physics Video", subject: "Physics", examBody: "JAMB", type: "Video" },
];
