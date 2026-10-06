"use client";

import { useState } from "react";
import { mockAdminSettings, type MockAdminSettings } from "@/lib/mock-admin";

const inputClass =
  "w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2.5 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-text)]/40 outline-none focus:border-[var(--color-gold)]/50";

const labelClass = "mb-1.5 block text-xs font-medium text-[var(--color-text)]/70";

export default function SettingsSection() {
  const [settings, setSettings] =
    useState<MockAdminSettings>(mockAdminSettings);
  const [message, setMessage] = useState<string | null>(null);
  const [passwordForm, setPasswordForm] = useState({
    current: "",
    next: "",
    confirm: "",
  });

  function updateField<K extends keyof MockAdminSettings>(
    key: K,
    value: MockAdminSettings[K],
  ) {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }

  function handleSaveSchool(e: React.FormEvent) {
    e.preventDefault();
    setMessage("School settings saved (local preview only — resets on refresh).");
  }

  function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    setMessage("Profile settings saved (local preview only — resets on refresh).");
  }

  function handleSaveNotifications(e: React.FormEvent) {
    e.preventDefault();
    setMessage(
      "Notification preferences saved (local preview only — resets on refresh).",
    );
  }

  function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    if (!passwordForm.current || !passwordForm.next) {
      setMessage("Please fill in current and new password.");
      return;
    }
    if (passwordForm.next !== passwordForm.confirm) {
      setMessage("New password and confirmation do not match.");
      return;
    }
    if (passwordForm.next.length < 8) {
      setMessage("New password must be at least 8 characters.");
      return;
    }
    setPasswordForm({ current: "", next: "", confirm: "" });
    setMessage(
      "Password change recorded (local preview only — not connected to auth yet).",
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif-display text-2xl font-medium tracking-tight text-[var(--color-ink)] sm:text-3xl">
          Settings
        </h1>
        <p className="mt-1 text-sm text-[var(--color-text)]/60">
          Manage school information, admin profile, and preferences.
        </p>
      </div>

      {message && (
        <p className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-[var(--color-text)]/80">
          {message}
        </p>
      )}

      {/* School information */}
      <form
        onSubmit={handleSaveSchool}
        className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6"
      >
        <h2 className="mb-5 text-base font-semibold text-[var(--color-ink)]">
          School information
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="schoolName">
              School name
            </label>
            <input
              id="schoolName"
              className={inputClass}
              value={settings.schoolName}
              onChange={(e) => updateField("schoolName", e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="schoolEmail">
              Email
            </label>
            <input
              id="schoolEmail"
              type="email"
              className={inputClass}
              value={settings.schoolEmail}
              onChange={(e) => updateField("schoolEmail", e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="schoolPhone">
              Phone
            </label>
            <input
              id="schoolPhone"
              className={inputClass}
              value={settings.schoolPhone}
              onChange={(e) => updateField("schoolPhone", e.target.value)}
            />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="schoolAddress">
              Address
            </label>
            <input
              id="schoolAddress"
              className={inputClass}
              value={settings.schoolAddress}
              onChange={(e) => updateField("schoolAddress", e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="session">
              Current session
            </label>
            <input
              id="session"
              className={inputClass}
              value={settings.session}
              onChange={(e) => updateField("session", e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="term">
              Current term
            </label>
            <select
              id="term"
              className={inputClass}
              value={settings.term}
              onChange={(e) => updateField("term", e.target.value)}
            >
              {["First Term", "Second Term", "Third Term"].map((t) => (
                <option key={t} value={t} className="bg-[#0a0a0a] text-white">
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="mt-5 rounded-lg bg-[var(--color-gold)] px-5 py-2.5 text-sm font-semibold text-[var(--color-parchment)] transition hover:brightness-110"
        >
          Save school settings
        </button>
      </form>

      {/* Admin profile */}
      <form
        onSubmit={handleSaveProfile}
        className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6"
      >
        <h2 className="mb-5 text-base font-semibold text-[var(--color-ink)]">
          Admin profile
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="adminName">
              Display name
            </label>
            <input
              id="adminName"
              className={inputClass}
              value={settings.adminName}
              onChange={(e) => updateField("adminName", e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="adminEmail">
              Login email
            </label>
            <input
              id="adminEmail"
              type="email"
              className={inputClass}
              value={settings.adminEmail}
              onChange={(e) => updateField("adminEmail", e.target.value)}
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-5 rounded-lg bg-[var(--color-gold)] px-5 py-2.5 text-sm font-semibold text-[var(--color-parchment)] transition hover:brightness-110"
        >
          Save profile
        </button>
      </form>

      {/* Change password */}
      <form
        onSubmit={handleChangePassword}
        className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6"
      >
        <h2 className="mb-5 text-base font-semibold text-[var(--color-ink)]">
          Change password
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="currentPassword">
              Current password
            </label>
            <input
              id="currentPassword"
              type="password"
              className={inputClass}
              value={passwordForm.current}
              onChange={(e) =>
                setPasswordForm((p) => ({ ...p, current: e.target.value }))
              }
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="newPassword">
              New password
            </label>
            <input
              id="newPassword"
              type="password"
              className={inputClass}
              value={passwordForm.next}
              onChange={(e) =>
                setPasswordForm((p) => ({ ...p, next: e.target.value }))
              }
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="confirmPassword">
              Confirm new password
            </label>
            <input
              id="confirmPassword"
              type="password"
              className={inputClass}
              value={passwordForm.confirm}
              onChange={(e) =>
                setPasswordForm((p) => ({ ...p, confirm: e.target.value }))
              }
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-5 rounded-lg border border-white/15 px-5 py-2.5 text-sm font-medium text-[var(--color-ink)] transition hover:bg-white/5"
        >
          Update password
        </button>
      </form>

      {/* Notifications */}
      <form
        onSubmit={handleSaveNotifications}
        className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6"
      >
        <h2 className="mb-5 text-base font-semibold text-[var(--color-ink)]">
          Notifications
        </h2>
        <div className="space-y-4">
          {(
            [
              ["notifyNewRegistrations", "New student registrations"],
              ["notifyPayments", "Payment updates"],
              ["notifyResultUploads", "Result uploads"],
            ] as const
          ).map(([key, label]) => (
            <label
              key={key}
              className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-white/5 px-4 py-3 transition hover:bg-white/[0.02]"
            >
              <span className="text-sm text-[var(--color-ink)]">{label}</span>
              <input
                type="checkbox"
                checked={settings[key]}
                onChange={(e) => updateField(key, e.target.checked)}
                className="h-4 w-4 accent-[var(--color-gold)]"
              />
            </label>
          ))}
        </div>
        <button
          type="submit"
          className="mt-5 rounded-lg bg-[var(--color-gold)] px-5 py-2.5 text-sm font-semibold text-[var(--color-parchment)] transition hover:brightness-110"
        >
          Save notification preferences
        </button>
      </form>

      <p className="text-xs text-[var(--color-text)]/40">
        All settings are local-only until Supabase is connected.
      </p>
    </div>
  );
}
