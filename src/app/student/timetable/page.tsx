const inputClass =
  "mt-2 w-full rounded-lg border border-white/15 bg-black/30 px-4 py-2.5 text-[var(--color-ink)] placeholder:text-white/30 focus:border-[var(--color-gold)] focus:outline-none";
const labelClass = "block text-sm font-medium text-[var(--color-text)]";

export default function TimetablePage() {
  return (
    <div>
      <h1 className="font-serif-display text-2xl font-light text-[var(--color-ink)]">
        Timetable
      </h1>
      <p className="mt-1 text-sm text-[var(--color-text)]/70">
        Your exam schedule.
      </p>

      <div className="mt-6 rounded-2xl border border-white/10 bg-[var(--color-forest)] p-6 sm:p-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="exam" className={labelClass}>
              Exam
            </label>
            <select id="exam" name="exam" defaultValue="WAEC 2026" className={inputClass}>
              <option value="WAEC 2026" className="bg-[var(--color-forest)] text-[var(--color-ink)]">
                WAEC 2026
              </option>
            </select>
          </div>
          <div>
            <label htmlFor="examId" className={labelClass}>
              Exam ID
            </label>
            <input
              id="examId"
              name="examId"
              defaultValue="EXM001"
              readOnly
              className={`${inputClass} cursor-not-allowed opacity-70`}
            />
          </div>

          <div>
            <label htmlFor="start" className={labelClass}>
              Start
            </label>
            <input id="start" name="start" type="date" className={inputClass} />
          </div>
          <div>
            <label htmlFor="end" className={labelClass}>
              End
            </label>
            <input id="end" name="end" type="date" className={inputClass} />
          </div>
        </div>

        <p className="mt-5 text-sm text-[var(--color-text)]/70">
          Status:{" "}
          <span className="rounded-full bg-[var(--color-gold)]/15 px-3 py-1 text-xs font-medium text-[var(--color-gold)]">
            Upcoming
          </span>
        </p>

        <div className="mt-6 rounded-xl border border-dashed border-white/15 bg-black/20 p-8 text-center text-sm text-[var(--color-text)]/50">
          Timetable image will appear here once uploaded by the school.
        </div>

        <button
          type="button"
          disabled
          className="mt-6 cursor-not-allowed rounded-lg bg-[var(--color-gold)] px-6 py-2.5 text-sm font-medium text-black opacity-50"
        >
          Download Image
        </button>
      </div>
    </div>
  );
}
