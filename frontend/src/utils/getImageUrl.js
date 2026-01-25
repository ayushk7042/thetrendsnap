export const getImageUrl = (news) => {
  if (!news) return "/no-image.jpg";

  if (news.featuredImage?.url) {
    return `${import.meta.env.VITE_API_URL}${news.featuredImage.url}`;
  }

  return "/no-image.jpg";
};
