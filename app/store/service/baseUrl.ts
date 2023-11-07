const baseURLs = {
  baseurl: "https://reqres.in/api/",
};

export const getBaseUrl = (type: keyof typeof baseURLs) => baseURLs[type];
