"use client";

import { useMemo, useState } from "react";
import {
  mockPayments,
  paymentStatusOptions,
  type MockPayment,
  type PaymentStatus,
} from "@/lib/mock-admin";

const inputClass =
  "w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2.5 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-text)]/40 outline-none focus:border-[var(--color-gold)]/50";

const labelClass = "mb-1.5 block text-xs font-medium text-[var(--color-text)]/70";

function formatNaira(amount: number) {
  return `₦${amount.toLocaleString("en-NG")}`;
}

function statusBadge(status: PaymentStatus) {
  const map: Record<PaymentStatus, string> = {
    Pending: "bg-amber-500/15 text-amber-300",
    Paid: "bg-emerald-500/15 text-emerald-300",
    Overdue: "bg-red-500/15 text-red-300",
    Waived: "bg-sky-500/15 text-sky-300",
  };
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${map[status]}`}
    >
      {status}
    </span>
  );
}

const emptyForm = {
  studentId: "",
  studentName: "",
  description: "",
  amount: "",
  dueDate: "",
  notes: "",
};

export default function PaymentsSection() {
  const [payments, setPayments] = useState<MockPayment[]>(mockPayments);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selected, setSelected] = useState<MockPayment | null>(null);

  const filtered = useMemo(() => {
    return payments.filter((p) => {
      const q = search.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.studentName.toLowerCase().includes(q) ||
        p.studentId.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q);
      const matchesStatus =
        filterStatus === "All" || p.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [payments, search, filterStatus]);

  const totals = useMemo(() => {
    const paid = payments
      .filter((p) => p.status === "Paid")
      .reduce((sum, p) => sum + p.amount, 0);
    const outstanding = payments
      .filter((p) => p.status === "Pending" || p.status === "Overdue")
      .reduce((sum, p) => sum + p.amount, 0);
    return { paid, outstanding };
  }, [payments]);

  function updateField<K extends keyof typeof emptyForm>(
    key: K,
    value: (typeof emptyForm)[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    const amountNum = Number(form.amount);
    if (
      !form.studentId.trim() ||
      !form.studentName.trim() ||
      !form.description.trim() ||
      !amountNum ||
      amountNum <= 0
    ) {
      setMessage("Please fill in Student ID, Name, Description, and a valid Amount.");
      return;
    }

    const nextId = `PAY-${String(payments.length + 1).padStart(3, "0")}`;
    const newPayment: MockPayment = {
      id: nextId,
      studentId: form.studentId.trim(),
      studentName: form.studentName.trim(),
      description: form.description.trim(),
      amount: amountNum,
      dueDate: form.dueDate || new Date().toISOString().slice(0, 10),
      paidAt: null,
      status: "Pending",
      proofLabel: "",
      notes: form.notes.trim(),
    };

    setPayments((prev) => [newPayment, ...prev]);
    setForm(emptyForm);
    setShowForm(false);
    setMessage(`Payment ${newPayment.id} recorded (local preview only).`);
  }

  function setStatus(id: string, status: PaymentStatus) {
    setPayments((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        return {
          ...p,
          status,
          paidAt:
            status === "Paid"
              ? p.paidAt || new Date().toISOString().slice(0, 10)
              : status === "Pending" || status === "Overdue"
                ? null
                : p.paidAt,
        };
      }),
    );
    if (selected?.id === id) {
      setSelected((prev) =>
        prev
          ? {
              ...prev,
              status,
              paidAt:
                status === "Paid"
                  ? prev.paidAt || new Date().toISOString().slice(0, 10)
                  : status === "Pending" || status === "Overdue"
                    ? null
                    : prev.paidAt,
            }
          : prev,
      );
    }
    setMessage(`Marked ${id} as ${status} (local only).`);
  }

  function handleDelete(id: string) {
    setPayments((prev) => prev.filter((p) => p.id !== id));
    if (selected?.id === id) setSelected(null);
    setMessage("Payment removed (local only — resets on refresh).");
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-serif-display text-2xl font-medium tracking-tight text-[var(--color-ink)] sm:text-3xl">
            Payments
          </h1>
          <p className="mt-1 text-sm text-[var(--color-text)]/60">
            Track fees, verify proof of payment, and update payment status.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setShowForm((v) => !v);
            setMessage(null);
          }}
          className="rounded-lg bg-[var(--color-gold)] px-4 py-2.5 text-sm font-semibold text-[var(--color-parchment)] transition hover:brightness-110"
        >
          {showForm ? "Cancel" : "+ Record Payment"}
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4">
          <p className="text-xs uppercase tracking-wide text-[var(--color-text)]/50">
            Collected
          </p>
          <p className="mt-1 font-serif-display text-2xl text-emerald-300">
            {formatNaira(totals.paid)}
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4">
          <p className="text-xs uppercase tracking-wide text-[var(--color-text)]/50">
            Outstanding
          </p>
          <p className="mt-1 font-serif-display text-2xl text-amber-300">
            {formatNaira(totals.outstanding)}
          </p>
        </div>
      </div>

      {message && (
        <p className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-[var(--color-text)]/80">
          {message}
        </p>
      )}

      {/* Create form */}
      {showForm && (
        <form
          onSubmit={handleCreate}
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6"
        >
          <h2 className="mb-5 text-base font-semibold text-[var(--color-ink)]">
            Record Payment / Fee
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="studentId">
                Student ID *
              </label>
              <input
                id="studentId"
                className={inputClass}
                placeholder="e.g. OEC/001"
                value={form.studentId}
                onChange={(e) => updateField("studentId", e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="studentName">
                Student Name *
              </label>
              <input
                id="studentName"
                className={inputClass}
                placeholder="Full name"
                value={form.studentName}
                onChange={(e) => updateField("studentName", e.target.value)}
              />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="description">
                Description *
              </label>
              <input
                id="description"
                className={inputClass}
                placeholder="e.g. WAEC Registration Fee 2026"
                value={form.description}
                onChange={(e) => updateField("description", e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="amount">
                Amount (₦) *
              </label>
              <input
                id="amount"
                type="number"
                min="1"
                className={inputClass}
                placeholder="25000"
                value={form.amount}
                onChange={(e) => updateField("amount", e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="dueDate">
                Due Date
              </label>
              <input
                id="dueDate"
                type="date"
                className={inputClass}
                value={form.dueDate}
                onChange={(e) => updateField("dueDate", e.target.value)}
              />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="notes">
                Notes
              </label>
              <textarea
                id="notes"
                rows={2}
                className={inputClass}
                placeholder="Optional notes"
                value={form.notes}
                onChange={(e) => updateField("notes", e.target.value)}
              />
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="submit"
              className="rounded-lg bg-[var(--color-gold)] px-5 py-2.5 text-sm font-semibold text-[var(--color-parchment)] transition hover:brightness-110"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setForm(emptyForm);
                setMessage(null);
              }}
              className="rounded-lg border border-white/15 px-5 py-2.5 text-sm text-[var(--color-ink)] transition hover:bg-white/5"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <input
          className={`${inputClass} max-w-xs`}
          placeholder="Search by student, description, or ID…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className={`${inputClass} max-w-[160px]`}
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All" className="bg-[#0a0a0a] text-white">
            All statuses
          </option>
          {paymentStatusOptions.map((s) => (
            <option key={s} value={s} className="bg-[#0a0a0a] text-white">
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full min-w-[860px] text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.03] text-xs uppercase tracking-wide text-[var(--color-text)]/50">
              <th className="px-4 py-3 font-medium">ID</th>
              <th className="px-4 py-3 font-medium">Student</th>
              <th className="px-4 py-3 font-medium">Description</th>
              <th className="px-4 py-3 font-medium">Amount</th>
              <th className="px-4 py-3 font-medium">Due</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-10 text-center text-[var(--color-text)]/50"
                >
                  No payments match your filters.
                </td>
              </tr>
            ) : (
              filtered.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-white/5 transition hover:bg-white/[0.02]"
                >
                  <td className="px-4 py-3 font-mono text-xs text-[var(--color-text)]/70">
                    {p.id}
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-[var(--color-ink)]">
                      {p.studentName}
                    </div>
                    <div className="mt-0.5 text-xs text-[var(--color-text)]/50">
                      {p.studentId}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[var(--color-text)]/80">
                    {p.description}
                    {p.proofLabel && (
                      <div className="mt-0.5 text-xs text-[var(--color-gold)]/70">
                        Proof: {p.proofLabel}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium text-[var(--color-ink)]">
                    {formatNaira(p.amount)}
                  </td>
                  <td className="px-4 py-3 text-[var(--color-text)]/80">
                    {p.dueDate}
                  </td>
                  <td className="px-4 py-3">{statusBadge(p.status)}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => setSelected(p)}
                        className="rounded-md border border-white/10 px-2.5 py-1 text-xs text-[var(--color-ink)] transition hover:border-[var(--color-gold)]/40 hover:text-[var(--color-gold)]"
                      >
                        View
                      </button>
                      {p.status !== "Paid" && (
                        <button
                          type="button"
                          onClick={() => setStatus(p.id, "Paid")}
                          className="rounded-md border border-emerald-500/20 px-2.5 py-1 text-xs text-emerald-300/90 transition hover:bg-emerald-500/10"
                        >
                          Mark Paid
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-[var(--color-text)]/40">
        Showing {filtered.length} of {payments.length} payments · Changes are
        local only until Supabase is connected
      </p>

      {/* Detail panel */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-4 sm:items-center"
          onClick={() => setSelected(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/10 bg-[#0c0c0c] p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-5 flex items-start justify-between gap-3">
              <div>
                <h2 className="font-serif-display text-xl text-[var(--color-ink)]">
                  Payment detail
                </h2>
                <p className="mt-1 font-mono text-xs text-[var(--color-text)]/50">
                  {selected.id}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded-lg border border-white/10 px-3 py-1.5 text-sm text-[var(--color-text)]/70 transition hover:bg-white/5"
              >
                Close
              </button>
            </div>

            <dl className="grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-xs text-[var(--color-text)]/50">Student</dt>
                <dd className="mt-0.5 text-[var(--color-ink)]">
                  {selected.studentName}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-[var(--color-text)]/50">
                  Student ID
                </dt>
                <dd className="mt-0.5 text-[var(--color-ink)]">
                  {selected.studentId}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs text-[var(--color-text)]/50">
                  Description
                </dt>
                <dd className="mt-0.5 text-[var(--color-ink)]">
                  {selected.description}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-[var(--color-text)]/50">Amount</dt>
                <dd className="mt-0.5 text-lg font-medium text-[var(--color-gold)]">
                  {formatNaira(selected.amount)}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-[var(--color-text)]/50">Status</dt>
                <dd className="mt-0.5">{statusBadge(selected.status)}</dd>
              </div>
              <div>
                <dt className="text-xs text-[var(--color-text)]/50">Due date</dt>
                <dd className="mt-0.5 text-[var(--color-ink)]">
                  {selected.dueDate}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-[var(--color-text)]/50">Paid at</dt>
                <dd className="mt-0.5 text-[var(--color-ink)]">
                  {selected.paidAt || "—"}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs text-[var(--color-text)]/50">
                  Proof of payment
                </dt>
                <dd className="mt-0.5 text-[var(--color-ink)]">
                  {selected.proofLabel || "No proof uploaded"}
                </dd>
              </div>
              {selected.notes && (
                <div className="sm:col-span-2">
                  <dt className="text-xs text-[var(--color-text)]/50">Notes</dt>
                  <dd className="mt-0.5 text-[var(--color-ink)]">
                    {selected.notes}
                  </dd>
                </div>
              )}
            </dl>

            {selected.proofLabel && (
              <div className="mt-5 flex aspect-[4/3] items-center justify-center rounded-xl border border-dashed border-white/15 bg-white/[0.03] text-center text-sm text-[var(--color-text)]/40">
                Proof image preview
                <br />
                <span className="text-xs">({selected.proofLabel})</span>
              </div>
            )}

            <div className="mt-5 flex flex-wrap gap-2">
              {selected.status !== "Paid" && (
                <button
                  type="button"
                  onClick={() => setStatus(selected.id, "Paid")}
                  className="rounded-lg bg-emerald-600/80 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-600"
                >
                  Mark Paid
                </button>
              )}
              {selected.status !== "Pending" && (
                <button
                  type="button"
                  onClick={() => setStatus(selected.id, "Pending")}
                  className="rounded-lg border border-white/15 px-4 py-2 text-sm text-[var(--color-ink)] transition hover:bg-white/5"
                >
                  Set Pending
                </button>
              )}
              {selected.status !== "Overdue" && selected.status !== "Paid" && (
                <button
                  type="button"
                  onClick={() => setStatus(selected.id, "Overdue")}
                  className="rounded-lg border border-red-500/30 px-4 py-2 text-sm text-red-300 transition hover:bg-red-500/10"
                >
                  Mark Overdue
                </button>
              )}
              {selected.status !== "Waived" && (
                <button
                  type="button"
                  onClick={() => setStatus(selected.id, "Waived")}
                  className="rounded-lg border border-sky-500/30 px-4 py-2 text-sm text-sky-300 transition hover:bg-sky-500/10"
                >
                  Waive
                </button>
              )}
              <button
                type="button"
                onClick={() => handleDelete(selected.id)}
                className="rounded-lg border border-red-500/20 px-4 py-2 text-sm text-red-300/80 transition hover:bg-red-500/10"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
