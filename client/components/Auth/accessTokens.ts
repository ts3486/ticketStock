let accessToken = "null";

export const setAccessToken = (s: string) => {
  accessToken = s;
};

export const getAccessToken = () => {
  return accessToken;
};
