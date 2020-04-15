import axios from "axios";
import { DynamicSettings } from "../types/settings";

export const getSettings = () =>
  axios.get("/api/site/settings").then(response => response.data);

export const updateSettings = (newSettings: DynamicSettings) =>
  axios.put("/api/site/settings", newSettings);
