import { getCertificate } from "@/services/course.service";
import { useParams } from "next/navigation";
import { useViewCoursePath } from "./useViewCoursePath";
import { useToast } from "../stores/ToastContextProvider";

export const useCertificate = () => {
  const { courseId } = useParams();
  const { toast, remove } = useToast();

  const { visitSection } = useViewCoursePath();

  const checkCertificate = () => {
    getCertificate({ courseId }).then(
      (data) => {
        if (data.sectionId) {
          visitSection(data)
          toast({variant: "error", title: "No se pudo generar el certicado", message: "Se deben completar todos los ejercicios para que el certificado pueda ser emitido."})
        } else {
          toast({variant: "success", title: "Felicitaciones! Has completado el curso", message: "Puedes visualizar el certificado en tu panel de cursos completados.", actionLabel: "Visit"})
        }
      }
    )
  }

  return { checkCertificate };
};
