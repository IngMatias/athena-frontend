"use client";

import ViewCourseContextProvider from "@/features/view-course/stores/ViewCourseContextProvider";

export default function RootLayout({ children }) {
  return <ViewCourseContextProvider>{children}</ViewCourseContextProvider>;
}
