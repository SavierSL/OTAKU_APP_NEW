const unirest = require("unirest");

const searchAnime = async (animeTitle) => {
  const req = unirest("GET", "https://jikan1.p.rapidapi.com/search/anime");
  let data = null;

  req.headers({
    "x-rapidapi-key": "0a1e2916a5msh44da6893e3cecdbp108d8bjsne9ac3d4c9fd4",
    "x-rapidapi-host": "jikan1.p.rapidapi.com",
  });
  try {
    await req.query({
      q: `${animeTitle}`,
    });
    await req.end((res) => {
      if (res.error) throw new Error(res.error);

      data = res.body;
    });
    return data;
  } catch (error) {
    return error;
  }
};
const data = searchAnime("charlotte");
console.log(data);
module.exports = router;
