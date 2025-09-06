export default async function handler(req, res) {
  const { query, category, page } = req.query;

  try {
    // بناء الرابط حسب باراميترات البحث
    const url = `https://newsapi.org/v2/top-headlines?` +
      new URLSearchParams({
        q: query || "",
        category: category || "general",
        page: page || "1",
        pageSize: "10",
        country: "us", // تقدر تغيرها حسب ما تريد
        apiKey: process.env.NEWS_API_KEY
      });

    // الطلب من NewsAPI
    const response = await fetch(url);
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
}
