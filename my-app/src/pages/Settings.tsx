import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { PageHeader } from "@/components/PageHeader";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  User, Bell, Shield, Palette, Moon, Sun, Monitor,
  Save, CheckCircle, Mail, Phone, BookOpen, Eye, EyeOff, Sparkles,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import profileImage from "@/assets/kirti.jpg";
import { useTheme } from "@/context/ThemeContext";

const tabs = [
  { id: "profile",      label: "Profile",      icon: User,    color: "text-blue-500" },
  { id: "notifications", label: "Notifications", icon: Bell,   color: "text-purple-500" },
  { id: "security",    label: "Security",      icon: Shield,  color: "text-green-500" },
  { id: "appearance",  label: "Appearance",    icon: Palette, color: "text-orange-500" },
];

function Toggle({ enabled, onChange }: { enabled: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 focus:outline-none shadow-inner ${
        enabled ? "bg-gradient-to-r from-blue-500 to-indigo-600" : "bg-slate-200 dark:bg-slate-600"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [saved, setSaved] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const { theme, setTheme } = useTheme();
  const [density, setDensity] = useState("comfortable");

  const [profile, setProfile] = useState({
    name: "Kirti Verma",
    email: "kirti.verma@college.edu",
    phone: "+91 98765 43210",
    program: "B.Tech CSE",
    semester: "6th Semester",
    rollNo: "22CS001",
  });

  const [notifications, setNotifications] = useState({
    assignmentDue: true,
    resultPublished: true,
    attendanceAlert: true,
    examSchedule: false,
    newsletter: false,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const renderProfile = () => (
    <div className="space-y-6">
      {/* Avatar row */}
      <div className="flex items-center gap-5 p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-100 dark:border-blue-900/30">
        <div className="relative">
          <Avatar className="h-20 w-20 ring-4 ring-white dark:ring-slate-700 shadow-lg">
            <AvatarImage src={profileImage} />
            <AvatarFallback className="bg-blue-100 text-blue-700 text-xl font-black dark:bg-blue-900 dark:text-blue-300">KV</AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-green-400 border-2 border-white dark:border-slate-700 shadow" />
        </div>
        <div>
          <p className="text-lg font-black text-slate-900 dark:text-slate-100">{profile.name}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">{profile.program} · {profile.semester}</p>
          <div className="flex gap-2 mt-2">
            <Badge className="bg-blue-600 text-white border-0 text-xs">Roll No: {profile.rollNo}</Badge>
            <Badge className="bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 border-0 text-xs">● Online</Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { label: "Full Name", field: "name", icon: User, type: "text" },
          { label: "Email Address", field: "email", icon: Mail, type: "email" },
          { label: "Phone Number", field: "phone", icon: Phone, type: "tel" },
          { label: "Program", field: "program", icon: BookOpen, type: "text" },
        ].map((f) => (
          <div key={f.field} className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{f.label}</label>
            <div className="relative">
              <f.icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                type={f.type}
                value={profile[f.field as keyof typeof profile]}
                onChange={(e) => setProfile((p) => ({ ...p, [f.field]: e.target.value }))}
                className="pl-10 h-11 rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[{ label: "Semester", value: profile.semester }, { label: "Roll Number", value: profile.rollNo }].map((f) => (
          <div key={f.label} className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{f.label}</label>
            <div className="h-11 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex items-center text-sm text-slate-500 dark:text-slate-400 font-medium">
              {f.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-3">
      {[
        { key: "assignmentDue",    label: "Assignment Due Alerts",  desc: "Get reminded before assignment deadlines",   color: "bg-orange-500" },
        { key: "resultPublished",  label: "Result Published",       desc: "Notify when semester results are out",       color: "bg-blue-500" },
        { key: "attendanceAlert",  label: "Attendance Warning",     desc: "Alert when attendance drops below 75%",      color: "bg-red-500" },
        { key: "examSchedule",     label: "Exam Schedule",          desc: "Updates on upcoming exam timetables",        color: "bg-purple-500" },
        { key: "newsletter",       label: "College Newsletter",     desc: "Monthly college updates and events",         color: "bg-green-500" },
      ].map((item, i) => (
        <div
          key={item.key}
          className={`animate-fade-slide-up delay-${i * 60} flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 group`}
        >
          <div className="flex items-center gap-3">
            <div className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
            <div>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{item.label}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.desc}</p>
            </div>
          </div>
          <Toggle
            enabled={notifications[item.key as keyof typeof notifications]}
            onChange={(val) => setNotifications((n) => ({ ...n, [item.key]: val }))}
          />
        </div>
      ))}
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-5">
      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/50">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="h-4 w-4 text-green-500" />
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">Change Password</h3>
        </div>
        <div className="space-y-3">
          {["Current Password", "New Password", "Confirm New Password"].map((label, i) => (
            <div key={i} className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</label>
              <div className="relative">
                <Input
                  type={showPass ? "text" : "password"}
                  placeholder={`Enter ${label.toLowerCase()}`}
                  className="pr-10 h-11 rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                />
                {i === 0 && (
                  <button type="button" onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
                    {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                )}
              </div>
            </div>
          ))}
          <button className="mt-1 px-5 py-2.5 rounded-xl grad-blue text-white text-sm font-bold shadow-lg shadow-blue-500/30 hover:opacity-90 active:scale-95 transition-all">
            Update Password
          </button>
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/50">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">Two-Factor Authentication</h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Add extra security to your account</p>
          </div>
          <Badge className="bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 border-0 font-bold">Enabled</Badge>
        </div>
        <div className="flex gap-2 mt-4">
          <button className="px-4 py-2 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm font-semibold hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors">
            Disable 2FA
          </button>
          <button className="px-4 py-2 rounded-xl grad-blue text-white text-sm font-semibold shadow-md shadow-blue-500/20 hover:opacity-90 transition-all">
            Manage Devices
          </button>
        </div>
      </div>
    </div>
  );

  const themeOptions = [
    { value: "light",  label: "Light",  icon: Sun,     desc: "Clean & bright",   grad: "from-yellow-400 to-orange-400" },
    { value: "dark",   label: "Dark",   icon: Moon,    desc: "Easy on the eyes", grad: "from-slate-700 to-slate-900" },
    { value: "system", label: "System", icon: Monitor, desc: "Follows OS theme",  grad: "from-blue-500 to-indigo-600" },
  ];

  const renderAppearance = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-purple-500" /> Theme
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {themeOptions.map((t) => {
            const Icon = t.icon;
            const active = theme === t.value;
            return (
              <button
                key={t.value}
                onClick={() => setTheme(t.value as "light" | "dark" | "system")}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all duration-200 ${
                  active
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30 shadow-lg shadow-blue-500/20 scale-[1.02]"
                    : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:scale-[1.01]"
                }`}
              >
                <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${t.grad} flex items-center justify-center shadow-md`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <p className={`text-sm font-bold ${active ? "text-blue-700 dark:text-blue-300" : "text-slate-600 dark:text-slate-400"}`}>{t.label}</p>
                <p className="text-xs text-slate-400 dark:text-slate-500">{t.desc}</p>
                {active && <CheckCircle className="h-4 w-4 text-blue-500" />}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-3">Display Density</h3>
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: "compact",     label: "Compact",     desc: "More content" },
            { id: "comfortable", label: "Comfortable", desc: "Balanced" },
            { id: "spacious",    label: "Spacious",    desc: "Easier reading" },
          ].map((d) => (
            <button
              key={d.id}
              onClick={() => setDensity(d.id)}
              className={`py-3 px-2 rounded-2xl border-2 text-sm font-semibold transition-all duration-200 ${
                density === d.id
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 shadow-lg shadow-blue-500/20 scale-[1.02]"
                  : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600"
              }`}
            >
              <div className="font-bold capitalize">{d.label}</div>
              <div className="text-xs opacity-60 mt-0.5">{d.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Active theme preview */}
      <div className="p-4 rounded-2xl border-2 border-dashed border-blue-200 dark:border-blue-900/50 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 text-center">
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Currently Active</p>
        <p className="text-sm font-black shimmer-text capitalize">{theme} mode is active ✓</p>
      </div>
    </div>
  );

  const contentMap: Record<string, React.ReactNode> = {
    profile: renderProfile(),
    notifications: renderNotifications(),
    security: renderSecurity(),
    appearance: renderAppearance(),
  };

  return (
    <SidebarProvider defaultOpen>
      <AppSidebar />
      <SidebarInset>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/40 to-indigo-100/60 dark:from-[#0a0f1e] dark:via-[#0f172a] dark:to-[#1a0a2e] p-6 transition-colors duration-300">

          <div className="animate-fade-slide-up delay-0">
            <PageHeader title="Settings" subtitle="Manage your account preferences" />
          </div>

          {/* Hero */}
          <div className="animate-fade-slide-up delay-100 mb-8">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 via-purple-600 to-blue-600" />
              <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full" />
              <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-white/5 rounded-full" />
              <div className="relative p-7">
                 <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-4 w-4 text-purple-300" />
                  <span className="text-purple-200 text-sm font-medium">Personalize your experience</span>
                </div>
                <h2 className="text-4xl font-extrabold text-white tracking-tight">Account Settings</h2> 
               <p className="mt-1 text-purple-100 text-base">Update your profile, notifications and preferences.</p>
              </div>
            </div>
          </div>

          {/* Settings Layout */}
          <div className="animate-fade-slide-up delay-200 flex flex-col lg:flex-row gap-6">
            {/* Sidebar tabs */}
            <div className="lg:w-56 flex-shrink-0">
              <nav className="flex lg:flex-col gap-1.5">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                      activeTab === tab.id
                        ? "grad-blue text-white shadow-lg shadow-blue-500/30 scale-[1.02]"
                        : "text-slate-600 dark:text-slate-400 hover:bg-white/70 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 hover:shadow-md"
                    }`}
                  >
                    <tab.icon className={`h-4 w-4 flex-shrink-0 ${activeTab === tab.id ? "text-white" : tab.color}`} />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <Card className="rounded-3xl border-0 shadow-xl glass dark:bg-slate-800/60 overflow-hidden">
                <CardHeader className="pb-4 border-b border-slate-100/50 dark:border-white/5">
                  <CardTitle className="text-lg font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    {(() => {
                      const t = tabs.find((t) => t.id === activeTab)!;
                      const Icon = t.icon;
                      return <><Icon className={`h-5 w-5 ${t.color}`} />{t.label}</>;
                    })()}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-5">
                  {contentMap[activeTab]}

                  {activeTab === "profile" && (
                    <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-700 flex items-center gap-3">
                      <button
                        onClick={handleSave}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95 ${
                          saved
                            ? "bg-green-500 text-white shadow-lg shadow-green-500/30"
                            : "grad-blue text-white shadow-lg shadow-blue-500/30 hover:opacity-90"
                        }`}
                      >
                        {saved ? <><CheckCircle className="h-4 w-4" /> Saved!</> : <><Save className="h-4 w-4" /> Save Changes</>}
                      </button>
                      <span className="text-xs text-slate-400 dark:text-slate-500">Changes are saved locally</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default Settings;
