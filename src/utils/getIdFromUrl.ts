export const getIdFromUrl = (url: string) => {
  return url
    .split("/")
    .filter(el => !!el)
    .pop();
};
