import { useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, X, CheckCircle, AlertCircle, Info } from "lucide-react";

interface PageHeaderProps {
  title: string;
  subtitle: string;
}

const notifications = [
  { id: 1, type: "warning",  icon: AlertCircle, title: "AI Project due tomorrow!", desc: "Don't forget to submit by 11:59 PM", time: "2h ago",  color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-900/20" },
  { id: 2, type: "success",  icon: CheckCircle, title: "OS Lab Submitted",         desc: "Your assignment was submitted successfully", time: "5h ago",  color: "text-green-500",  bg: "bg-green-50 dark:bg-green-900/20" },
  { id: 3, type: "info",     icon: Info,        title: "Result Published",         desc: "Semester 5 results are now available",     time: "1d ago",  color: "text-blue-500",   bg: "bg-blue-50 dark:bg-blue-900/20" },
];

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  const [showNotifs, setShowNotifs] = useState(false);
  const [dismissed, setDismissed] = useState<number[]>([]);

  const visible = notifications.filter((n) => !dismissed.includes(n.id));
  const hasUnread = visible.length > 0;

  return (
    <div className="flex items-center justify-between mb-8 relative">
      {/* Left */}
      <div className="flex items-center gap-4">
        <SidebarTrigger className="hover:bg-white/80 dark:hover:bg-slate-700 rounded-xl transition-colors p-2 text-slate-600 dark:text-slate-300" />
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">{title}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>
        </div>
      </div>

      {/* Right — Bell */}
      <div className="relative">
        <button
          onClick={() => setShowNotifs(!showNotifs)}
          className="relative p-2.5 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur border border-slate-200/60 dark:border-slate-700/60 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
        >
          <Bell className={`h-5 w-5 transition-colors ${showNotifs ? "text-blue-600" : "text-slate-600 dark:text-slate-300"}`} />
          {hasUnread && (
            <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-blue-500 ring-2 ring-white dark:ring-slate-800 shadow animate-pulse" />
          )}
        </button>

        {/* Notification Panel — fixed positioning escapes overflow:hidden parents */}
        {showNotifs && (
          <>
            {/* Transparent backdrop for click-outside-to-close */}
            <div
              className="fixed inset-0 z-[9998]"
              onClick={() => setShowNotifs(false)}
            />

            {/* Panel */}
            <div className="fixed top-16 right-6 w-80 bg-white dark:bg-slate-900 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 z-[9999] overflow-hidden">
              {/* Header */}
              <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <p className="font-black text-slate-900 dark:text-slate-100 text-sm">Notifications</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{visible.length} unread</p>
                </div>
                <button
                  onClick={() => setShowNotifs(false)}
                  className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Items */}
              <div className="divide-y divide-slate-50 dark:divide-slate-800">
                {visible.length === 0 ? (
                  <div className="px-5 py-8 text-center">
                    <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
                    <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">All caught up!</p>
                  </div>
                ) : (
                  visible.map((n) => {
                    const Icon = n.icon;
                    return (
                      <div key={n.id} className="px-5 py-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex gap-3 items-start">
                        <div className={`mt-0.5 p-1.5 rounded-xl ${n.bg} flex-shrink-0`}>
                          <Icon className={`h-4 w-4 ${n.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-slate-800 dark:text-slate-200 leading-tight">{n.title}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">{n.desc}</p>
                          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{n.time}</p>
                        </div>
                        <button
                          onClick={() => setDismissed((d) => [...d, n.id])}
                          className="text-slate-300 hover:text-slate-500 dark:hover:text-slate-300 transition-colors flex-shrink-0 p-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    );
                  })
                )}
              </div>

              {visible.length > 0 && (
                <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => setDismissed(notifications.map((n) => n.id))}
                    className="text-xs text-blue-500 hover:text-blue-700 font-semibold hover:underline"
                  >
                    Mark all as read
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}