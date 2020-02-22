import { AvailableBedStatuses, AvailableBasicStatuses } from "./api/types";

export const bedStatusToText = {
  [AvailableBedStatuses.NoNeed]: "אין צורך",
  [AvailableBedStatuses.Searching]: "מחפשים",
  [AvailableBedStatuses.Found]: "יש מיטה"
};

export const basicStatusToText = {
  [AvailableBasicStatuses.Done]: "יש",
  [AvailableBasicStatuses.Pending]: "טרם"
};
