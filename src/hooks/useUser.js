"use client";

import { useState, useEffect } from "react";

import { getUser } from "../services/user.service";

export const useUser = () => {
  const [user, setUser] = useState();

  const firstName = user ? user.fullName.split(" ")[0] : "";

  useEffect(() => {
    getUser().then(({ user }) => setUser(user));
  }, []);

  return { user, firstName };
};
