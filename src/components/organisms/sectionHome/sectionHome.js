import { getCourses } from "@/services/courses.service";
import React, { useEffect, useState } from "react";

import styles from "./sectionHome.module.css";
import { useViewCoursePath } from "@/features/view-course/hooks/useViewCoursePath";
import SelectorCourseCard from "@/features/view-course/components/organisms/selectorCourseCard/selectorCourseCard";

export default function SectionHome() {
  const [courses, setCourses] = useState([]);
  const [contains, setContains] = useState("");

  const { start } = useViewCoursePath();

  useEffect(() => {
    getCourses({ contains }).then(({ courses }) => {
      setCourses(courses);
    });
  }, [contains]);

  const navigateToCourse = (course) => {
    start(course.id);
  };

  return (
    <div className={styles.sectionHome}>
      <SelectorCourseCard
        label="Find your course"
        options={courses}
        placeholder="Find your course"
        onClick={navigateToCourse}
        onFilter={setContains}
        onMoreOption={() => {}}
        createLabel="Add new course"
        moreLabel="More Courses"
      />
    </div>
  );
}
