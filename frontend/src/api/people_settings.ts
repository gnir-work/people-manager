import axios from "axios";

export const getSettings = () =>
  axios.get("/api/people/settings").then(response => response.data);
