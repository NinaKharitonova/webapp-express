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

function show(req, res) {
  const movieId = req.params.id;
  const sqlMovie = `
  SELECT id, title, director, genre, release_year, abstract, image
  FROM movies
  WHERE id = ? 
  `;

  connection.query(sqlMovie, [movieId], (err, results) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        status: "KO",
        message: "Database query failed",
      });
    }

    const [movie] = results;

    if (!movie) {
      return res.status(404).json({
        status: "KO",
        message: "Movie not found",
      });
    }

    movie.image = generateMovieImage(movie.image);

    const sqlReviews = `
    SELECT id, name, vote, text
    FROM reviews
    WHERE movie_id = ? 
    `;

    connection.query(sqlReviews, [movieId], (err, results) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          status: "KO",
          message: "Database query failed",
        });
      }

      movie.reviews = results;

      res.json({
        status: "KO",
        movie,
      });
    });
  });
}

generateMovieImage = (imageName) => {
  const { APP_HOST, APP_PORT } = process.env;
  return `${APP_HOST}:${APP_PORT}/img/movies/${imageName}`;
};

module.exports = { index, show };
