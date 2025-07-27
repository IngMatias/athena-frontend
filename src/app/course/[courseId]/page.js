"use client";

import ButtonPrimary from "@/components/atoms/buttonPrimary/buttonPrimary";
import TreeSections from "@/features/view-course/components/organisms/treeSections/treeSections";
import { useViewCoursePath } from "@/features/view-course/hooks/useViewCoursePath";
import { ViewCourseContext } from "@/features/view-course/stores/ViewCourseContextProvider";
import { getCourseEnrollment, postCourseEnrollment } from "@/services/course.service";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function Home() {
  const params = useParams();
  const { courseId } = params;

  const {
    title,
    description,
    imagePreview,
    tags,
    sections,
    firstLeaf,
    openedSections,
    toggleSectionOpen,
  } = useContext(ViewCourseContext);

  const { visitSection } = useViewCoursePath();

  const [enrolled, setEnrolled] = useState(null);

  useEffect(() => {
    getCourseEnrollment({ courseId }).then((data) => {
      setEnrolled(data);
    });
  }, []);

  const handleEnroll = () => {
    postCourseEnrollment({ courseId }).then(() => {
      visitSection({ sectionId: firstLeaf.id });
    });
  };

  const handleContinue = () => {
    visitSection({ sectionId: firstLeaf.id });
  };

  return (
    <div>
      <div
        style={{ position: "relative", width: "20rem", aspectRatio: "16/9" }}
      >
        {imagePreview && (
          <Image
            src={imagePreview}
            alt="Imagen"
            fill
            style={{ objectFit: "cover" }}
            sizes="100vw"
          />
        )}
      </div>

      <h1>{title}</h1>

      <div style={{ display: "grid", gridTemplateColumns: "60% 40%" }}>
        <div>
          <TreeSections
            sections={sections}
            openedSections={openedSections}
            onToggleCollapse={toggleSectionOpen}
          />
        </div>

        <div>
          <div></div>

          <div>{description}</div>

          <div>
            {!enrolled && (
              <ButtonPrimary label="Enroll Course" onClick={handleEnroll} />
            )}
            {enrolled && (
              <ButtonPrimary label="Continue Course" onClick={handleContinue} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
