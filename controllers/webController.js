const connection = require("../db/conn");

function index(req, res) {
  let sql = `SELECT id, title, director, genre, release_year, abstract, image
   FROM movies`;

  connection.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database query failed" });
    }

    const movies = results.map((movie) => ({
      ...movie,
      image: generateMovieImage(movie.image),
    }));

    res.json({
      status: "OK",
      movies,
    });
  });
}

function show(req, res) {}

generateMovieImage = (imageName) => {
  const { APP_HOST, APP_PORT } = process.env;
  return `${APP_HOST}:${APP_PORT}/public/img/movies/${imageName}`;
};

module.exports = { index, show };
