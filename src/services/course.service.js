import { del, get, post, postImage } from "@/utils/api";

const URL_BACKEND = process.env.NEXT_PUBLIC_URL_BACKEND;

export const postCourse = () => {
  return new Promise((resolve, reject) =>
    post(`${URL_BACKEND}/api/course`, {})
      .then(({ data }) => {
        resolve({ id: data.id });
      })
      .catch((err) => {
        reject(err);
      })
  );
};

export const delCourse = ({ courseId }) => {
  return new Promise((resolve, reject) =>
    del(`${URL_BACKEND}/api/course/${courseId}`, {})
      .then(({ data }) => {
        resolve({ courseId: data.id });
      })
      .catch((err) => {
        reject(err);
      })
  );
};

export const getCourseDetails = ({ courseId }) => {
  return new Promise((resolve, reject) =>
    get(`${URL_BACKEND}/api/course/details/${courseId}`)
      .then(({ data }) => {
        resolve({
          id: data.id,
          title: data.courseDetails[0]?.title,
          description: data.courseDetails[0]?.description,
          tags: data.courseDetails[0]?.courseTags.map(
            ({ id, value, labels }) => ({ id, value, label: labels[0].label })
          ),
        });
      })
      .catch((err) => {
        reject(err);
      })
  );
};

export const postCourseDetails = ({
  courseId,
  title,
  description,
  tagsIds,
}) => {
  return new Promise((resolve, reject) =>
    post(`${URL_BACKEND}/api/course/details`, {
      courseId,
      title,
      description,
      tagsIds,
    })
      .then(({ data }) => {
        resolve({ id: data.id });
      })
      .catch((err) => {
        reject(err);
      })
  );
};

export const postCourseImage = ({ courseId, image }) => {
  return new Promise((resolve, reject) =>
    postImage(`${URL_BACKEND}/api/course/image`, { courseId, image })
      .then(({ data }) => {
        resolve({ imageUrl: data.imageUrl });
      })
      .catch((err) => {
        reject(err);
      })
  );
};

export const getCourseImage = ({ courseId }) => {
  return new Promise((resolve, reject) =>
    get(`${URL_BACKEND}/api/course/image/${courseId}`)
      .then(({ data }) => {
        resolve({
          imageUrl: data.imageUrl,
        });
      })
      .catch((err) => {
        reject(err);
      })
  );
};

export const getCourseSections = ({ courseId }) => {
  return new Promise((resolve, reject) =>
    get(`${URL_BACKEND}/api/course/${courseId}/sections`)
      .then(({ data }) => {
        resolve({ sections: data.sections });
      })
      .catch((err) => {
        reject(err);
      })
  );
};

export const postCourseContent = ({ courseId }) => {
  return new Promise((resolve, reject) =>
    post(`${URL_BACKEND}/api/course/${courseId}`, {})
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      })
  );
};

export const getCourseTags = ({ contains }) => {
  return new Promise((resolve, reject) =>
    get(`${URL_BACKEND}/api/course/tag?contains=${contains}`)
      .then(({ data }) => {
        const options = data.map(({ id, value, labels }) => ({
          id,
          value,
          label: labels[0].label,
        }));
        resolve({ options });
      })
      .catch((err) => {
        reject(err);
      })
  );
};

export const getCourseEnrollment = ({ courseId }) => {
  return new Promise((resolve, reject) => {
    get(`${URL_BACKEND}/api/course/${courseId}/enrollment`)
      .then(({ data }) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const postCourseEnrollment = ({ courseId }) => {
  return new Promise((resolve, reject) => {
    post(`${URL_BACKEND}/api/course/${courseId}/enrollment`, {})
      .then(({ data }) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getCourseContent = ({ courseId, sectionId }) => {
  return new Promise((resolve, reject) => {
    get(`${URL_BACKEND}/api/course/${courseId}/section/${sectionId}`)
      .then(({ data }) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const postAnswer = ({ courseId, sectionId, contentId, answerTry }) => {
  return new Promise((resolve, reject) => {
    post(
      `${URL_BACKEND}/api/course/${courseId}/section/${sectionId}/content/${contentId}`,
      { answerTry }
    )
      .then(({ data }) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
