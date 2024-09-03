export const setKeyInLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.error("error in setKeyInLocalStorage: ", error);
  }
};

export const getKeyFromLocalStorage = (key) => {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.error("error in getKeyFromLocalStorage: ", error);
  }
};

export const removeKeyFromLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("error in removeKeyFromLocalStorage: ", error);
  }
}
