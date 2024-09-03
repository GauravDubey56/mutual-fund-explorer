export const apiReponse = (success, message, data, code) => {
  return {
    success,
    data,
    message,
    code,
  };
};
