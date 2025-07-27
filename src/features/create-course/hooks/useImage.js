import { getCourseImage, postCourseImage } from "@/services/course.service";
import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

export const useImage = () => {
  const params = useParams();
  const { courseId } = params;

  const [image, setImage] = useState(undefined);
  const [imagePreview, setImagePreview] = useState(undefined);

  useEffect(() => {
    getCourseImage({ courseId }).then(({ imageUrl }) => {
      if (imageUrl) setImagePreview(imageUrl);
    });
  }, [courseId]);

  useEffect(() => {
    if (!image) {
      setImagePreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(image);
    setImagePreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  const saveImage = () => {
    if (!image)
      return new Promise((resolve, reject) => {
        resolve();
      });
    return postCourseImage({
      courseId,
      image,
    });
  };

  return { image, imagePreview, setImage, saveImage };
};
