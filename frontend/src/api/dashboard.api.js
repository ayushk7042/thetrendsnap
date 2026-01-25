// import { getCategories } from "./category.api";
// import { getNews } from "./news.api";
// import { getContacts } from "./contact.api";

// export const getDashboardData = async () => {
//   const [categories, news, contacts] = await Promise.all([
//     getCategories(),
//     getNews(),
//     getContacts()
//   ]);

//   const allNews = news.data;

//   return {
//     categories: categories.data.length,
//     totalNews: allNews.length,
//     publishedNews: allNews.filter(n => n.status === "published").length,
//     draftNews: allNews.filter(n => n.status === "draft").length,
//     aiNews: allNews.filter(n => n.aiGenerated).length,
//     autoUpdateNews: allNews.filter(n => n.autoUpdateEnabled).length,
//     avgSeoScore:
//       allNews.length
//         ? Math.round(
//             allNews.reduce((a, b) => a + (b.seoScore || 0), 0) / allNews.length
//           )
//         : 0,
//     newContacts: contacts.data.filter(c => c.status === "new").length
//   };
// };


import api from "./axios";

export const getDashboardData = () => {
  return api.get("/dashboard");
};
