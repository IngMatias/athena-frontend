import { getCourseEnrollment, postCourseEnrollment } from "@/services/course.service";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useViewCoursePath } from "./useViewCoursePath";
import { useToast } from "../stores/ToastContextProvider";

export const useEnrollment = () => {
    const params = useParams();
    const { courseId, sectionId } = params;
    const { toast, remove } = useToast();

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
        }).catch(err => {
            toast(err, { variant: "error", title: "Ocurrió un error al intentar inscribirse al curso" });
        })
    }

    return { enrolled, handleEnroll };
};
