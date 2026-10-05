import { AppSidebar } from "@/components/AppSidebar";
import { PageHeader } from "@/components/PageHeader";

import {
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

import {
  BookOpen,
  Clock,
  User,
} from "lucide-react";

function Courses() {
  const courses = [
    {
      name: "Operating Systems",
      faculty: "Dr. Sharma",
      progress: 88,
      credits: 4,
    },
    {
      name: "Data Mining",
      faculty: "Dr. Singh",
      progress: 84,
      credits: 3,
    },
    {
      name: "Cyber Security",
      faculty: "Dr. Verma",
      progress: 90,
      credits: 4,
    },
    {
      name: "Software Engineering",
      faculty: "Dr. Gupta",
      progress: 86,
      credits: 3,
    },
    {
      name: "Computer Graphics",
      faculty: "Dr. Kaur",
      progress: 92,
      credits: 4,
    },
    {
      name: "Artificial Intelligence",
      faculty: "Dr. Arora",
      progress: 80,
      credits: 4,
    },
  ];

  return (
    <SidebarProvider defaultOpen>
      <AppSidebar />

      <SidebarInset>
        <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 p-6">

          {/* Header */}
 <PageHeader
  title="Courses"
  subtitle="Courses you have Enrolled"
/>

          {/* Hero Card */}

          <Card className="rounded-3xl border-0 shadow-lg mb-8 bg-gradient-to-r from-blue-700 to-blue-500 text-white">
            <CardContent className="p-6">
              <h2 className="text-3xl font-bold">
                6 Active Courses
              </h2>

              <p className="mt-2 text-blue-100">
                Track progress, credits and faculty information.
              </p>
            </CardContent>
          </Card>

          {/* Courses Grid */}

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Card
                key={course.name}
                className="
                  rounded-3xl
                  border-0
                  shadow-md
                  hover:shadow-xl
                  transition-all
                "
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <BookOpen className="h-8 w-8 text-blue-600" />

                    <Badge>
                      {course.credits} Credits
                    </Badge>
                  </div>

                  <CardTitle className="text-lg mt-3">
                    {course.name}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">

                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <User className="h-4 w-4" />
                    {course.faculty}
                  </div>

                  <div>
                    <div className="flex justify-between mb-2 text-sm font-medium">
                      <span>Progress</span>

                      <span>
                        {course.progress}%
                      </span>
                    </div>

                    <Progress
                      value={course.progress}
                      className="h-3"
                    />
                  </div>

                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Clock className="h-4 w-4" />
                    Semester Ongoing
                  </div>

                </CardContent>
              </Card>
            ))}
          </div>

        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default Courses;