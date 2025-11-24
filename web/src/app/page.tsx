"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  Building2,
  CheckCircle2,
  Clock,
  Languages,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import type { Job } from "@/data/jobs";
import { jobs } from "@/data/jobs";
import { quickStats, relocationTips } from "@/data/resources";

const regions = ["All regions", ...new Set(jobs.map((job) => job.region))];
const shifts = ["Any shift", ...new Set(jobs.map((job) => job.shift))];
const contracts = ["All contracts", ...new Set(jobs.map((job) => job.contract))];
const allTags = [
  "Any specialty",
  ...Array.from(new Set(jobs.flatMap((job) => job.tags))).sort(),
];

const formatHourly = (range: Job["hourlyRate"]) =>
  `${range[0]}–${range[1]} NOK/hr`;

export default function Home() {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState(regions[0]);
  const [shift, setShift] = useState(shifts[0]);
  const [contract, setContract] = useState(contracts[0]);
  const [tag, setTag] = useState(allTags[0]);

  const filteredJobs = useMemo(() => {
    const query = search.trim().toLowerCase();

    return jobs.filter((job) => {
      const matchesRegion = region === regions[0] || job.region === region;
      const matchesShift = shift === shifts[0] || job.shift === shift;
      const matchesContract =
        contract === contracts[0] || job.contract === contract;
      const matchesTag = tag === allTags[0] || job.tags.includes(tag);
      const matchesQuery =
        query.length === 0 ||
        [job.title, job.company, job.city, job.description, job.tags.join(" ")]
          .join(" ")
          .toLowerCase()
          .includes(query);

      return (
        matchesRegion && matchesShift && matchesContract && matchesTag && matchesQuery
      );
    });
  }, [contract, region, search, shift, tag]);

  const averageHourly = useMemo(() => {
    if (filteredJobs.length === 0) {
      return "—";
    }

    const [min, max] = filteredJobs.reduce<[number, number]>(
      (acc, job) => [acc[0] + job.hourlyRate[0], acc[1] + job.hourlyRate[1]],
      [0, 0],
    );

    const avgMin = Math.round(min / filteredJobs.length);
    const avgMax = Math.round(max / filteredJobs.length);

    return `${avgMin}–${avgMax} NOK/hr`;
  }, [filteredJobs]);

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100">
      <header className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-sky-900 to-blue-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_55%)]" />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pb-32 pt-24 sm:px-10">
          <div className="max-w-3xl space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-blue-100 backdrop-blur">
              <CheckCircle2 size={14} strokeWidth={2} />
              Ready-to-apply listings
            </span>
            <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl">
              Find verified stocker jobs across Norway&apos;s logistics and retail hubs
            </h1>
            <p className="text-lg text-blue-100 sm:text-xl">
              Explore curated warehouse, retail and automation roles with relocation
              guidance, salary insights, and shift transparency tailored to
              international candidates.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {quickStats.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-white/10 bg-white/5 p-4 shadow-[0_20px_45px_-30px_rgba(15,118,230,0.6)]"
              >
                <p className="text-sm text-blue-100">{item.label}</p>
                <p className="mt-2 text-2xl font-semibold text-white">
                  {item.value}
                </p>
                <p className="mt-2 text-xs text-blue-200/80">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto w-full max-w-6xl flex-1 px-6 pb-24 sm:px-10">
        <section className="-mt-20 rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-[0_40px_60px_-35px_rgba(15,118,230,0.65)] backdrop-blur sm:-mt-24 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm font-medium text-slate-200">
                  Search keywords
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Try “automation” or “night shift”"
                    className="h-11 rounded-xl border border-white/10 bg-slate-950/60 px-4 text-sm text-white outline-none transition hover:border-blue-400/60 focus:border-blue-400 focus:ring focus:ring-blue-400/30"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm font-medium text-slate-200">
                  Region
                  <select
                    value={region}
                    onChange={(event) => setRegion(event.target.value)}
                    className="h-11 rounded-xl border border-white/10 bg-slate-950/60 px-4 text-sm text-white outline-none transition hover:border-blue-400/60 focus:border-blue-400 focus:ring focus:ring-blue-400/30"
                  >
                    {regions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex flex-col gap-2 text-sm font-medium text-slate-200">
                  Shift pattern
                  <select
                    value={shift}
                    onChange={(event) => setShift(event.target.value)}
                    className="h-11 rounded-xl border border-white/10 bg-slate-950/60 px-4 text-sm text-white outline-none transition hover:border-blue-400/60 focus:border-blue-400 focus:ring focus:ring-blue-400/30"
                  >
                    {shifts.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex flex-col gap-2 text-sm font-medium text-slate-200">
                  Contract
                  <select
                    value={contract}
                    onChange={(event) => setContract(event.target.value)}
                    className="h-11 rounded-xl border border-white/10 bg-slate-950/60 px-4 text-sm text-white outline-none transition hover:border-blue-400/60 focus:border-blue-400 focus:ring focus:ring-blue-400/30"
                  >
                    {contracts.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="md:col-span-2 flex flex-col gap-2 text-sm font-medium text-slate-200">
                  Specialty tags
                  <div className="flex flex-wrap gap-2">
                    {allTags.map((option) => (
                      <button
                        key={option}
                        onClick={() => setTag(option)}
                        className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                          option === tag
                            ? "border-blue-400/80 bg-blue-500/20 text-blue-100"
                            : "border-white/10 bg-slate-950/50 text-slate-200 hover:border-blue-400/50 hover:text-white"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </label>
              </div>
            </div>
            <aside className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-slate-950/60 p-5 shadow-inner">
              <h2 className="text-lg font-semibold text-white">Market snapshot</h2>
              <div className="space-y-4 text-sm">
                <div className="flex items-start justify-between gap-3 rounded-xl bg-slate-900/80 p-4">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-blue-200">
                      Matching roles
                    </p>
                    <p className="text-2xl font-semibold text-white">
                      {filteredJobs.length}
                    </p>
                  </div>
                  <ShieldCheck className="text-blue-300" size={24} />
                </div>
                <div className="flex items-start justify-between gap-3 rounded-xl bg-slate-900/80 p-4">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-blue-200">
                      Avg hourly range
                    </p>
                    <p className="text-xl font-semibold text-white">
                      {averageHourly}
                    </p>
                  </div>
                  <Clock className="text-blue-300" size={24} />
                </div>
                <div className="rounded-xl bg-slate-900/80 p-4 text-blue-100">
                  <p className="text-xs uppercase tracking-wide text-blue-200">
                    Language readiness
                  </p>
                  <p className="mt-2 flex items-center gap-2 text-sm">
                    <Languages size={16} />
                    {`${Math.round(
                      (filteredJobs.filter((job) =>
                        job.language.toLowerCase().includes("english"),
                      ).length /
                        Math.max(filteredJobs.length, 1)) *
                        100,
                    )}% accept English speakers`}
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="mt-16 space-y-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white">Latest roles</h2>
              <p className="text-sm text-slate-300">
                Curated inventory of logistics, retail, and automation stocker openings
                sourced from Norwegian employers.
              </p>
            </div>
            <Link
              href="#relocation"
              className="inline-flex items-center gap-2 rounded-full border border-blue-400/60 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-100 transition hover:bg-blue-500/20"
            >
              Relocation checklist
              <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="grid gap-6">
            {filteredJobs.map((job) => (
              <article
                key={job.id}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 p-6 transition hover:border-blue-300/70 hover:bg-slate-900/90"
              >
                <div className="absolute inset-y-0 right-0 w-1 bg-gradient-to-b from-blue-400/60 via-sky-400/40 to-transparent opacity-0 transition group-hover:opacity-100" />
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                  <div className="space-y-3">
                    <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/40 bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-blue-100">
                      {job.posted}
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        {job.title}
                      </h3>
                      <p className="mt-1 flex items-center gap-2 text-sm text-slate-300">
                        <Building2 size={16} />
                        {job.company}
                      </p>
                      <p className="mt-1 flex items-center gap-2 text-sm text-slate-300">
                        <MapPin size={16} />
                        {job.city}, {job.region}
                      </p>
                    </div>
                    <p className="text-sm text-slate-200">{job.description}</p>
                    <div className="flex flex-wrap gap-2 text-xs font-semibold text-blue-100">
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                        {job.contract}
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                        {job.shift} shift
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                        {job.salary}
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                        {job.language}
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                        {formatHourly(job.hourlyRate)}
                      </span>
                    </div>
                  </div>
                  <Link
                    href={job.applyUrl}
                    target="_blank"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-blue-400/60 bg-blue-500/20 px-5 py-2 text-sm font-semibold text-blue-100 transition hover:bg-blue-500/30"
                  >
                    Apply now
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                    <h4 className="text-xs uppercase tracking-wide text-blue-200">
                      Daily responsibilities
                    </h4>
                    <ul className="mt-3 space-y-2 text-sm text-slate-300">
                      {job.responsibilities.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-300" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                    <h4 className="text-xs uppercase tracking-wide text-blue-200">
                      Benefits & perks
                    </h4>
                    <ul className="mt-3 space-y-2 text-sm text-slate-300">
                      {job.benefits.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-300" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2 text-xs text-blue-200">
                  {job.tags.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-1"
                    >
                      #{item.toLowerCase().replace(/\s+/g, "-")}
                    </span>
                  ))}
                </div>
              </article>
            ))}
            {filteredJobs.length === 0 && (
              <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-10 text-center text-sm text-slate-300">
                No matches found. Adjust filters to explore more regions, shifts, or
                keywords.
              </div>
            )}
          </div>
        </section>

        <section
          id="relocation"
          className="mt-20 grid gap-8 lg:grid-cols-[1.4fr_1fr]"
        >
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 p-8">
            <h2 className="text-2xl font-semibold text-white">
              Move to Norway with confidence
            </h2>
            <p className="mt-2 text-sm text-slate-300">
              Practical steps pulled from NAV, UDI, and worker unions to help you sort
              relocation essentials before you start.
            </p>
            <div className="mt-6 grid gap-4">
              {relocationTips.map((tip) => (
                <Link
                  key={tip.title}
                  href={tip.url}
                  target="_blank"
                  className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-slate-950/60 p-5 transition hover:border-blue-300/60 hover:bg-slate-950/80"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg font-semibold text-white">{tip.title}</h3>
                    <ArrowUpRight size={18} className="text-blue-200" />
                  </div>
                  <p className="text-sm text-slate-300">{tip.summary}</p>
                </Link>
              ))}
            </div>
          </div>
          <aside className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-slate-900/70 p-8">
            <h3 className="text-lg font-semibold text-white">
              Interview-readiness checklist
            </h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 text-emerald-300" size={18} />
                Prepare examples demonstrating safe forklift and pallet-jack handling.
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 text-emerald-300" size={18} />
                Highlight experience working with WMS tools (SAP EWM, AutoStore,
                Manhattan, etc.).
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 text-emerald-300" size={18} />
                Emphasise flexibility for night or weekend shifts and ability to work in
                cold environments.
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 text-emerald-300" size={18} />
                Collect references that can confirm punctuality and teamwork on the
                warehouse floor.
              </li>
            </ul>
            <div className="mt-4 rounded-2xl border border-blue-400/30 bg-blue-500/10 p-5 text-sm text-blue-100">
              <p className="font-semibold text-white">
                Tip for international applicants
              </p>
              <p className="mt-2">
                Many employers sponsor introductory Norwegian lessons after probation.
                Mention your willingness to enroll—it signals long-term commitment.
              </p>
            </div>
          </aside>
        </section>
      </main>

      <footer className="bg-slate-950/80 border-t border-white/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-10 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <p>
            Built to spotlight warehouse and retail stocker opportunities across
            Norway&apos;s cities and logistics corridors.
          </p>
          <p>
            Data refreshed weekly • Sources: NAV, Finn.no, regional employer portals.
          </p>
        </div>
      </footer>
    </div>
  );
}
