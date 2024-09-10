import moment from "moment";

export const formatDateForPurchaseDate = (date) => {
  return moment(date).format("DD MMM YYYY HH:mm:ss");
};
