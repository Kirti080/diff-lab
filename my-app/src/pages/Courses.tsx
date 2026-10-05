import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  BookOpen,
  Clock,
  User,
} from "lucide-react";

function Courses() {
  const [search, setSearch] = useState("");
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

  const query = search.trim().toLowerCase();
  const totalCredits = courses.reduce((total, course) => total + course.credits, 0);
  const filteredCourses = courses.filter((course) =>
    `${course.name} ${course.faculty}`.toLowerCase().includes(query)
  );

  return (
    <SidebarProvider defaultOpen>
      <AppSidebar />

      <SidebarInset>
        <div className="min-h-screen bg-gradient-to-br from-white via-indigo-50 to-blue-100 p-4 sm:p-6">

          {/* Header */}
          <PageHeader
            title="My Learning Hub"
            subtitle="Keep your courses and progress in one place"
          />

          {/* Hero Card */}

          <Card className="rounded-3xl border-0 shadow-lg mb-8 bg-gradient-to-r from-indigo-700 via-blue-600 to-cyan-500 text-white">
            <CardContent className="p-6">
              <h2 className="text-3xl font-bold">
                {courses.length} Active Courses
              </h2>

              <p className="mt-2 text-blue-100">
                A little progress every day adds up. Keep learning!
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-sm font-medium">
                <span className="rounded-full bg-white/20 px-3 py-1">
                  {totalCredits} total credits
                </span>
                <span className="rounded-full bg-white/20 px-3 py-1">
                  Semester in progress
                </span>
              </div>
            </CardContent>
          </Card>

          <div className="mb-6 space-y-2">
            <label htmlFor="course-search" className="text-sm font-medium">
              Search courses
            </label>
            <div className="flex flex-wrap gap-2">
              <Input
                id="course-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by course or faculty name"
                className="min-w-0 flex-1 basis-64 bg-white"
              />
              {search && (
                <Button variant="outline" onClick={() => setSearch("")}>
                  Clear search
                </Button>
              )}
            </div>
            <p role="status" className="text-sm text-slate-600">
              Showing {filteredCourses.length} of {courses.length} courses
            </p>
          </div>

          {filteredCourses.length === 0 && (
            <Card className="rounded-3xl border-0 text-center shadow-md">
              <CardContent className="p-8">
                <h2 className="text-lg font-semibold">No courses found</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Try a different course or faculty name, or clear your search to see all courses.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Courses Grid */}

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Card
                key={course.name}
                className="
                  rounded-3xl
                  border-0
                  shadow-md
                  hover:shadow-xl
                  hover:-translate-y-1
                  motion-reduce:transform-none
                  transition-all
                  duration-200
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
                    Keep up the momentum
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
