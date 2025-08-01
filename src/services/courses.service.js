import { get, post } from "@/utils/api";

const URL_BACKEND = process.env.NEXT_PUBLIC_URL_BACKEND;

export const getCourses = ({ contains }) => {
  return new Promise((resolve, reject) =>
    get(`${URL_BACKEND}/api/courses?contains=${contains}`)
      .then(({ data }) => {
        const courses = data.map((c) => {
          if (!c.courseDetails[0]) {
            return {
              id: c.id,
              title: "No Definido",
              description: "No Definido",
              tags: [],
            };
          }

          const tags = c.courseDetails[0].courseTags;
          return {
            id: c.id,
            title: c.courseDetails[0].title,
            description: c.courseDetails[0].description,
            imageUrl: c.courseDetails[0].imageUrl,
            tags,
          };
        });

        resolve({ courses });
      })
      .catch((err) => {
        reject(err);
      })
  );
};

export const getCoursesByUser = () => {
  return new Promise((resolve, reject) =>
    get(`${URL_BACKEND}/api/courses/user`)
      .then(({ data }) => {
        const courses = data.map((c) => {
          if (!c.courseDetails[0]) {
            return {
              id: c.id,
              title: "No Definido",
              description: "No Definido",
              tags: [],
            };
          }

          const tags = c.courseDetails[0].courseTags;
          return {
            id: c.id,
            title: c.courseDetails[0].title,
            description: c.courseDetails[0].description,
            tags,
            imageUrl: c.courseDetails[0].imageUrl,
          };
        });

        resolve({ courses });
      })
      .catch((err) => {
        reject(err);
      })
  );
};
