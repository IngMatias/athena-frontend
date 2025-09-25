"use client";

import styles from "./styles.css";
import { useContext, useEffect } from "react";
import { useViewCoursePath } from "@/features/view-course/hooks/useViewCoursePath";
import { ViewCourseContext } from "@/features/view-course/stores/ViewCourseContextProvider";
import { useParams, useRouter } from "next/navigation";
import { formatDateToDDMMAAAAA } from "@/utils/date";
import ButtonPrimary from "@/components/atoms/buttonPrimary/buttonPrimary";

export default function Page() {
  const router = useRouter();


  const { courseId } = useParams();

  const { title, enrolled } =
    useContext(ViewCourseContext);

  const handleGoToHome = () => {
    router.push('/')
  }

  return (
    <div className="section">
      <div>
        <div className="certificate">
          <div className="pm-certificate-container">
            <div className="outer-border"></div>
            <div className="inner-border"></div>

            <div className="pm-certificate-border">
              <div className="pm-certificate-header">
                <div className="pm-certificate-title cursive text-center">
                  <span className="pm-empty-space block"></span>
                  <h2>Atenea Certificado de Finalización</h2>
                </div>
              </div>

              <div className="pm-certificate-body">

                <div className="pm-certificate-block">
                  <div className="pm-certificate-name underline margin-0 text-center">
                    <span className="pm-name-text bold">{enrolled?.user?.fullName}</span>
                  </div>

                  <div className="pm-course-title text-center">
                  </div>

                  <div className="pm-earned text-center">
                    <span className="pm-earned-text padding-0 block cursive">hse le otorga el presente certificado</span>
                  </div>

                  <div className="pm-course-title text-center">
                    <span className="pm-earned-text block cursive ">por la finalización exitosa del curso</span>
                  </div>

                  <div className="pm-course-title underline text-center">
                    <span className="pm-credits-text block bold sans"> {title}</span>
                  </div>
                </div>

                <div className="pm-certificate-footer">
                  <div className="pm-certified text-center">
                    <span className="pm-credits-text block sans"></span>
                    <span className="pm-empty-space block"></span>
                    <span className="bold block"></span>
                  </div>

                  <div className="pm-certified text-center">
                    <span className="pm-credits-text block sans">Fecha de Finalización</span>
                    <span className="pm-empty-space block underline pm-credits-text block bold sans">{formatDateToDDMMAAAAA(enrolled?.completedAt)}</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
        <div className="section-actions">
          <div>
            <div></div>
            <ButtonPrimary label="Volver al inicio" onClick={handleGoToHome} />
          </div>
        </div>
      </div>
    </div>
  );
}
