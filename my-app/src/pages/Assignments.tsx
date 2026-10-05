import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { PageHeader } from "@/components/PageHeader";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  ClipboardList,
  CalendarDays,
  FileText,
  Pencil,
  Trash2,
  X,
  CheckCircle,
  Plus,
  Upload,
  Sparkles,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

interface Assignment {
  id: number;
  title: string;
  subject: string;
  dueDate: string;
  status: "Pending" | "Submitted";
  description?: string;
  priority?: "high" | "medium" | "low";
}

// ── Edit Modal ─────────────────────────────────────────────────────────────────
function EditModal({
  assignment,
  onSave,
  onClose,
}: {
  assignment: Assignment;
  onSave: (updated: Assignment) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<Assignment>({ ...assignment });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md" onClick={onClose}>
      <div
        className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-md relative animate-scale-in mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="grad-blue p-5 relative overflow-hidden">
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full" />
          <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors">
            <X className="h-3.5 w-3.5" />
          </button>
          <div className="flex items-center gap-3 relative">
            <div className="p-2.5 rounded-2xl bg-white/20 backdrop-blur">
              <Pencil className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white">Edit Assignment</h2>
              <p className="text-xs text-blue-200">Update assignment details</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {[
            { label: "Title", field: "title", placeholder: "Assignment title" },
            { label: "Subject", field: "subject", placeholder: "Subject name" },
            { label: "Due Date", field: "dueDate", placeholder: "e.g. 30 June 2026" },
          ].map((f) => (
            <div key={f.field} className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{f.label}</label>
              <Input
                value={form[f.field as keyof Assignment] as string}
                onChange={(e) => setForm((p) => ({ ...p, [f.field]: e.target.value }))}
                className="h-11 rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 transition"
                placeholder={f.placeholder}
              />
            </div>
          ))}

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Description</label>
            <textarea
              value={form.description || ""}
              onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 resize-none outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Brief description (optional)"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Status</label>
            <div className="flex gap-3">
              {(["Pending", "Submitted"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setForm((p) => ({ ...p, status: s }))}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-bold border-2 transition-all ${
                    form.status === s
                      ? s === "Submitted"
                        ? "border-green-500 bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "border-orange-400 bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                      : "border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-slate-300"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => { onSave(form); onClose(); }}
              className="flex-1 py-2.5 rounded-xl grad-blue text-white text-sm font-bold shadow-lg shadow-blue-500/30 hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle className="h-4 w-4" /> Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Add Modal ──────────────────────────────────────────────────────────────────
function AddModal({ onAdd, onClose }: { onAdd: (a: Assignment) => void; onClose: () => void }) {
  const [form, setForm] = useState({ title: "", subject: "", dueDate: "", description: "" });

  const handleAdd = () => {
    if (!form.title.trim() || !form.subject.trim()) return;
    onAdd({ ...form, id: Date.now(), status: "Pending" });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md" onClick={onClose}>
      <div
        className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-md relative animate-scale-in mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grad-purple p-5 relative overflow-hidden">
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full" />
          <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors">
            <X className="h-3.5 w-3.5" />
          </button>
          <div className="flex items-center gap-3 relative">
            <div className="p-2.5 rounded-2xl bg-white/20 backdrop-blur">
              <Plus className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white">New Assignment</h2>
              <p className="text-xs text-purple-200">Add a new assignment to track</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {[
            { label: "Title *", field: "title", placeholder: "Assignment title" },
            { label: "Subject *", field: "subject", placeholder: "Subject name" },
            { label: "Due Date", field: "dueDate", placeholder: "e.g. 10 July 2026" },
          ].map((f) => (
            <div key={f.field} className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{f.label}</label>
              <Input
                value={form[f.field as keyof typeof form]}
                onChange={(e) => setForm((p) => ({ ...p, [f.field]: e.target.value }))}
                className="h-11 rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-purple-500 transition"
                placeholder={f.placeholder}
              />
            </div>
          ))}

          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAdd}
              disabled={!form.title.trim() || !form.subject.trim()}
              className="flex-1 py-2.5 rounded-xl grad-purple text-white text-sm font-bold shadow-lg shadow-purple-500/30 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Plus className="h-4 w-4" /> Add Assignment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────
function Assignments() {
  const [assignments, setAssignments] = useState<Assignment[]>([
    { id: 1, title: "AI Project Report", subject: "Artificial Intelligence", dueDate: "28 June 2026", status: "Pending", description: "Write a detailed report on the AI project implementation.", priority: "high" },
    { id: 2, title: "Operating System Lab", subject: "Operating Systems", dueDate: "30 June 2026", status: "Submitted", description: "Complete the OS lab exercises and submit.", priority: "medium" },
    { id: 3, title: "Data Mining Assignment", subject: "Data Mining", dueDate: "2 July 2026", status: "Pending", description: "Analyze the provided dataset and present findings.", priority: "medium" },
    { id: 4, title: "Cyber Security Case Study", subject: "Cyber Security", dueDate: "5 July 2026", status: "Submitted", description: "Case study on recent cybersecurity breaches.", priority: "low" },
    { id: 5, title: "Software Engineering SRS", subject: "Software Engineering", dueDate: "8 July 2026", status: "Pending", description: "Prepare Software Requirements Specification document.", priority: "high" },
  ]);

  const [editingAssignment, setEditingAssignment] = useState<Assignment | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

  const handleSave      = (updated: Assignment) => setAssignments((p) => p.map((a) => (a.id === updated.id ? updated : a)));
  const handleDelete    = (id: number) => { setAssignments((p) => p.filter((a) => a.id !== id)); setDeleteConfirmId(null); };
  const handleSubmit    = (id: number) => setAssignments((p) => p.map((a) => (a.id === id ? { ...a, status: "Submitted" } : a)));
  const handleAdd       = (newA: Assignment) => setAssignments((p) => [...p, newA]);

  const pending   = assignments.filter((a) => a.status === "Pending").length;
  const submitted = assignments.filter((a) => a.status === "Submitted").length;

  return (
    <SidebarProvider defaultOpen>
      <AppSidebar />
      <SidebarInset>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/40 to-amber-100/60 dark:from-[#0a0f1e] dark:via-[#0f172a] dark:to-[#1a0f00] p-6 transition-colors duration-300">

          <div className="animate-fade-slide-up delay-0">
            <PageHeader title="Assignments" subtitle="Track and submit your assignments" />
          </div>

          {/* ── Hero Banner ── */}
          <div className="animate-fade-slide-up delay-100 mb-8">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-500" />
              <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full" />
              <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-white/5 rounded-full" />
              <div className="relative p-7 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-yellow-200" />
                    <span className="text-orange-100 text-sm font-medium">Stay on top of your work</span>
                  </div>
                  <h2 className="text-4xl font-extrabold text-white tracking-tight">
                    {assignments.length} Active Assignments
                  </h2>
                  <p className="mt-1 text-orange-100 text-base">Never miss a deadline. Stay organized.</p>
                  <div className="flex items-center gap-3 mt-4">
                    <span className="px-3 py-1.5 rounded-full bg-white/20 backdrop-blur text-white text-sm font-semibold border border-white/30">
                      🕐 {pending} Pending
                    </span>
                    <span className="px-3 py-1.5 rounded-full bg-white/20 backdrop-blur text-white text-sm font-semibold border border-white/30">
                      ✅ {submitted} Submitted
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white text-orange-700 font-bold text-sm shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
                >
                  <Plus className="h-4 w-4" /> Add New
                </button>
              </div>
            </div>
          </div>

          {/* ── Assignment Cards ── */}
          <div className="grid gap-4 mb-8">
            {assignments.map((a, i) => (
              <div key={a.id} className={`animate-fade-slide-up delay-${200 + i * 60}`}>
                <Card
                  className={`rounded-3xl border-0 shadow-lg hover:shadow-2xl transition-all duration-300 glass dark:bg-slate-800/70 overflow-hidden group hover:-translate-y-0.5 ${
                    a.status === "Pending" ? "accent-pending" : "accent-submitted"
                  }`}
                >
                  <CardContent className="p-5">
                    <div className="flex justify-between items-start gap-4">

                      {/* Left info */}
                      <div className="space-y-2 flex-1 min-w-0">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-xl flex-shrink-0 ${
                            a.status === "Submitted"
                              ? "bg-green-100 dark:bg-green-900/40"
                              : "bg-orange-100 dark:bg-orange-900/40"
                          }`}>
                            <FileText className={`h-4 w-4 ${
                              a.status === "Submitted"
                                ? "text-green-600 dark:text-green-400"
                                : "text-orange-600 dark:text-orange-400"
                            }`} />
                          </div>
                          <div className="min-w-0">
                            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 truncate">{a.title}</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{a.subject}</p>
                          </div>
                        </div>

                        {a.description && (
                          <p className="text-sm text-slate-400 dark:text-slate-500 line-clamp-1 pl-[3.25rem]">
                            {a.description}
                          </p>
                        )}

                        <div className="flex items-center gap-4 pl-[3.25rem]">
                          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
                            <CalendarDays className="h-3.5 w-3.5" />
                            Due: {a.dueDate}
                          </div>
                          {a.priority === "high" && (
                            <div className="flex items-center gap-1 text-xs text-red-500 font-semibold">
                              <AlertCircle className="h-3 w-3" /> Urgent
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right: status + actions */}
                      <div className="flex flex-col items-end gap-3 flex-shrink-0">
                        <Badge className={`font-bold text-xs border-0 ${
                          a.status === "Submitted"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
                            : "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400"
                        }`}>
                          {a.status === "Submitted" ? "✓ " : "⏳ "}{a.status}
                        </Badge>

                        <div className="flex items-center gap-1.5">
                          {a.status === "Pending" && (
                            <button
                              onClick={() => handleSubmit(a.id)}
                              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold hover:bg-green-100 dark:hover:bg-green-900/50 hover:scale-105 active:scale-95 transition-all"
                            >
                              <Upload className="h-3 w-3" /> Submit
                            </button>
                          )}
                          <button
                            onClick={() => setEditingAssignment(a)}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-bold hover:bg-blue-100 dark:hover:bg-blue-900/50 hover:scale-105 active:scale-95 transition-all"
                          >
                            <Pencil className="h-3 w-3" /> Edit
                          </button>
                          {deleteConfirmId === a.id ? (
                            <div className="flex items-center gap-1 bg-red-50 dark:bg-red-900/20 rounded-xl px-2.5 py-1.5">
                              <span className="text-xs text-red-600 dark:text-red-400 font-semibold">Sure?</span>
                              <button onClick={() => handleDelete(a.id)} className="text-xs font-black text-red-700 hover:underline px-1">Yes</button>
                              <button onClick={() => setDeleteConfirmId(null)} className="text-xs font-bold text-slate-500 hover:underline px-1">No</button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeleteConfirmId(a.id)}
                              className="p-1.5 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 hover:scale-105 active:scale-95 transition-all"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          )}
                        </div>
                      </div>

                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* ── Summary Cards ── */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="animate-fade-slide-up delay-500">
              <div
                className="grad-orange rounded-3xl p-5 shadow-xl"
                style={{ boxShadow: "0 12px 32px -8px rgba(249,115,22,0.35)" }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-2xl bg-white/20 backdrop-blur">
                    <ClipboardList className="h-6 w-6 text-white" />
                  </div>
                  <TrendingUp className="h-5 w-5 text-white/50" />
                </div>
                <p className="text-white/70 text-sm font-medium mb-1">Pending Assignments</p>
                <h2 className="text-5xl font-black text-white">{pending}</h2>
              </div>
            </div>
            <div className="animate-fade-slide-up delay-550">
              <div
                className="grad-green rounded-3xl p-5 shadow-xl"
                style={{ boxShadow: "0 12px 32px -8px rgba(16,185,129,0.35)" }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-2xl bg-white/20 backdrop-blur">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <TrendingUp className="h-5 w-5 text-white/50" />
                </div>
                <p className="text-white/70 text-sm font-medium mb-1">Submitted Assignments</p>
                <h2 className="text-5xl font-black text-white">{submitted}</h2>
              </div>
            </div>
          </div>

        </div>
      </SidebarInset>

      {editingAssignment && (
        <EditModal assignment={editingAssignment} onSave={handleSave} onClose={() => setEditingAssignment(null)} />
      )}
      {showAddModal && (
        <AddModal onAdd={handleAdd} onClose={() => setShowAddModal(false)} />
      )}
    </SidebarProvider>
  );
}

export default Assignments;
