import ProfileForm from "@/components/student/ProfileForm";

export default function StudentProfilePage() {
  return (
    <div>
      <h1 className="font-serif-display text-2xl font-light text-[var(--color-ink)]">
        Profile
      </h1>
      <p className="mt-1 text-sm text-[var(--color-text)]/70">
        Keep your information up to date.
      </p>

      <div className="mt-6">
        <ProfileForm />
      </div>
    </div>
  );
}
