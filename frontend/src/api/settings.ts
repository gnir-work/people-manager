export const getSettings = () =>
  fetch("/api/people/settings").then(data => data.json());
