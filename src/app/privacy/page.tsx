import PublicPageLayout from "@/components/PublicPageLayout";

type Section = { heading: string; intro?: string; items?: string[] };

const sections: Section[] = [
  {
    heading: "Information we collect",
    intro: "When you use this site, we may collect:",
    items: [
      "Account details, such as your full name, phone number, and email address.",
      "Profile details, such as your date of birth, gender, address, state of origin, LGA, and parent/guardian and emergency contact details.",
      "A passport photograph and any documents you submit to us, for example exam results and assignments.",
      "Basic technical information about how the site is used.",
    ],
  },
  {
    heading: "How we use your information",
    items: [
      "To create and manage your account.",
      "To process exam registrations and the other services you request.",
      "To review and verify the documents you upload.",
      "To contact you about your registration, results, and schedules.",
      "To maintain and improve our services.",
    ],
  },
  {
    heading: "Sharing your information",
    intro:
      "We do not sell your personal information. We may share it only where needed to deliver a service you asked for (for example, with an examination body when processing a registration), with service providers who help us run this site, or where the law requires it.",
  },
  {
    heading: "Storage and security",
    intro:
      "We take reasonable steps to protect your information from unauthorised access, loss, or misuse. No online system can be guaranteed completely secure, so please keep your password private.",
  },
  {
    heading: "Your choices",
    intro:
      "You can review and update your profile information from your student portal. To ask for a correction or the deletion of your information, contact us using the details below.",
  },
  {
    heading: "Students under 18",
    intro:
      "If you are under 18, please use this site with the knowledge of your parent or guardian.",
  },
  {
    heading: "Changes to this policy",
    intro:
      "We may update this policy from time to time. The latest version will always be available on this page.",
  },
  {
    heading: "Contact us",
    intro:
      "Questions about this policy? Email info@overcomerseducation.com.",
  },
];

export default function PrivacyPage() {
  return (
    <PublicPageLayout
      title="Privacy Policy"
      subtitle="How Overcomers Education Centre collects, uses, and protects your information."
    >
      <div className="space-y-10">
        {sections.map((section) => (
          <section key={section.heading}>
            <h2 className="font-serif-display text-2xl font-light text-[var(--color-ink)]">
              {section.heading}
            </h2>
            {section.intro && (
              <p className="mt-3 text-[var(--color-text)]/80">{section.intro}</p>
            )}
            {section.items && (
              <ul className="mt-4 space-y-2">
                {section.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      aria-hidden
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-gold)]"
                    />
                    <span className="text-[var(--color-text)]/80">{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </PublicPageLayout>
  );
}
