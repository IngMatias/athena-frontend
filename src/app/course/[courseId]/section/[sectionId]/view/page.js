"use client";

import DocumentChat from "@/features/create-course/components/organisms/documentChat/documentChat";
import SimpleChat from "@/features/create-course/components/organisms/simpleChat/simpleChat";
import TabPanel from "@/features/create-course/components/organisms/tabPanel/tabPanel";
import ContentView from "@/features/view-course/components/organisms/contentView/contentView";
import styles from "../styles.module.css";
import Breadcrumb from "@/features/create-course/components/molecules/breadcrumb/breadcrumb";
import { useContext } from "react";
import { useViewCoursePath } from "@/features/view-course/hooks/useViewCoursePath";
import { ViewCourseContext } from "@/features/view-course/stores/ViewCourseContextProvider";
import NavigatorSections from "@/features/view-course/components/organisms/navigatorSections/navigatorSections";
import { useParams, useRouter } from "next/navigation";
import { formatDateToDDMMAAAAA } from "@/utils/date";
import ButtonPrimary from "@/components/atoms/buttonPrimary/buttonPrimary";
import ButtonLink from "@/components/atoms/buttonLink/buttonLink";

export default function Page() {
  const { visitSection } = useViewCoursePath();
  const router = useRouter();

  const { courseId, sectionId } = useParams();

  const { checkCertificate, completed, enrolled, sections, path, openedSections, toggleSectionOpen } =
    useContext(ViewCourseContext);

  const handleSelectSection = (sectionId) => {
    visitSection({ sectionId });
  };

  const handleGoToHome =() => {
    router.push(`/`);
  }

  const handleGetCertificate = () => {
    checkCertificate();
    handleGoToCertificate();
  }

  const handleGoToCertificate = () => {
    router.push(`/course/${courseId}/certificate`);
  }

  return (
    <div className="section">
      <div>
        <div className={styles.content}>
          <div className={`${styles.panel} ${styles.leftPanel}`}>
            <TabPanel>
              <div>
                <div>Contenido</div>
                <div className={styles.sections}>
                  <NavigatorSections
                    sections={sections}
                    path={[]}
                    isRoot={true}
                    openedSections={openedSections}
                    onToggleCollapse={toggleSectionOpen}
                    onSelectSection={handleSelectSection}
                  />
                </div>
              </div>
            </TabPanel>
          </div>
          
          { enrolled?.completedAt && (<div className={styles.completedContainer}>
            Ya completaste este curso! <button className={styles.completedButton} onClick={handleGoToHome}>Volver al inicio.</button>
            </div>) }

          <div className={styles.header}>
            <div className={styles.titleContainer}>
              <h1>{path[path.length - 1]}</h1>
            </div>

            <div className={styles.breadcrumbContainer}>
              <Breadcrumb path={path} />
            </div>
          </div>
          <ContentView />

          <div className={`${styles.panel} ${styles.rightPanel}`}>
            <TabPanel>
              <div>
                <div>Asistente Virtual con Documentos</div>
                <DocumentChat allowLoading={false}></DocumentChat>
              </div>
              <div>
                <div>Asistente Virtual</div>
                <SimpleChat></SimpleChat>
              </div>
            </TabPanel>
          </div>
        </div>
        { (enrolled?.completedAt || completed) && 
          <div className="section-actions">
            <div>
              <div></div>
              { enrolled?.completedAt && (
                <ButtonPrimary label="Ver Certificado" onClick={handleGoToCertificate} />
              )}
              { !enrolled?.completedAt && (
                <ButtonPrimary label="Obtener Certificado" onClick={handleGetCertificate} />
              )}
            </div>
          </div>
        }
      </div>
    </div>
  );
}
