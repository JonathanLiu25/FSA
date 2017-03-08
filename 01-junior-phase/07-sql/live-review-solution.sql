-- BIRTH YEAR
# Find all movies made in the year you were born

SELECT name
FROM movies
WHERE year = 1990;

-- 1982
# How many movies does our dataset have for the year 1982?

SELECT COUNT(*)
FROM movies
WHERE year = 1982;

-- Stacktors
# Find actors who have "stack" in their last name

SELECT first_name, last_name
FROM actors
WHERE last_name LIKE "%stack%";

-- POPULAR NAMES
# What are the 10 most popular first names and last names in the business? And how many actors have each given first or last name? This can be multiple queries.

SELECT first_name, COUNT(*) popularity
FROM actors
GROUP BY first_name
ORDER BY popularity DESC
LIMIT 10;

SELECT last_name, COUNT(*) popularity
FROM actors
GROUP BY last_name
ORDER BY popularity DESC
LIMIT 10;

SELECT first_name || ' ' || last_name full_name, COUNT(*) popularity
FROM actors
GROUP BY full_name
ORDER BY popularity DESC
LIMIT 10;

SELECT first_name, last_name, COUNT(*) popularity
FROM actors
GROUP BY first_name, last_name
ORDER BY popularity DESC
LIMIT 10;

-- PROLIFIC
# List the top 100 most active actors and the number of ROLES they have starred in

SELECT first_name, last_name, COUNT(*) AS prolificness
FROM roles
INNER JOIN actors ON actors.id = roles.actor_id
GROUP BY actors.id
ORDER BY prolificness DESC
LIMIT 100;

SELECT first_name, last_name, COUNT(*) AS prolificness
FROM roles, actors
WHERE id = actor_id
GROUP BY id
ORDER BY prolificness DESC
LIMIT 100;


-- EXAMPLE OF THE ABOVE
actors
id name
1  Channing Tatum
2  Rodney Dangerfield

roles
role        actor_id
Magic Mike  1
Funny Guy   2

-- CROSS PRODUCT
SELECT *
FROM roles, actors;

1  Channing Tatum     Magic Mike  1
1  Channing Tatum     Funny Guy   2
2  Rodney Dangerfield Magic Mike  1
2  Rodney Dangerfield Funny Guy   2

-- DE FACTO JOIN
SELECT *
FROM roles, actors
WHERE actors.id = roles.actor_id;

1  Channing Tatum     Magic Mike  1
2  Rodney Dangerfield Funny Guy   2

-- BOTTOM OF THE BARREL
# How many movies does IMDB have of each genre, ordered by least popular genre?

SELECT genre, COUNT(*) AS amount
FROM movies_genres
INNER JOIN movies ON movie_id = movies.id
GROUP BY genre
ORDER BY amount ASC;

-- BRAVEHEART
# List the first and last names of all the actors who played in the 1995 movie 'Braveheart', arranged alphabetically by last name

SELECT first_name, last_name
FROM actors
INNER JOIN roles ON actors.id = actor_id
INNER JOIN movies ON movies.id = movie_id
WHERE movies.name = 'Braveheart' AND movies.year = 1995
ORDER BY last_name ASC;

SELECT first_name, last_name
FROM actors, roles, movies
WHERE actors.id = actor_id AND movies.id = movie_id
AND movies.name = 'Braveheart' AND movies.year = 1995
ORDER BY last_name ASC;

-- LEAP NOIR
# List all the directors who directed a 'Film-Noir' movie in a leap year (you need to check that the genre is 'Film-Noir' and may, for the sake of this challenge, pretend that all years divisible by 4 are leap years). Your query should return director name, the movie name, and the year, sorted by movie name.

SELECT first_name, last_name, movies.name, year
FROM directors, movies_directors, movies, movies_genres
WHERE directors.id = movies_directors.director_id
AND movies.id = movies_directors.movie_id
AND movies.id = movies_genres.movie_id
AND genre = 'Film-Noir' AND year % 4 = 0;

-- ° BACON
# List all the actors that have worked with Kevin Bacon in Drama movies (include the movie name)

SELECT movies.name, first_name, last_name, role
FROM actors, roles, movies, (
  -- FIND ALL KEVIN BACON DRAMA MOVIES, ALIAS IT
  SELECT roles.movie_id
  FROM actors, roles, movies_genres
  WHERE actors.id = actor_id
  AND roles.movie_id = movies_genres.movie_id
  AND first_name = 'Kevin' AND last_name = 'Bacon'
  AND genre = 'Drama'
) AS kevin_bacon_movies
WHERE roles.movie_id = kevin_bacon_movies.movie_id
AND actors.id = roles.actor_id
AND movies.id = roles.movie_id
-- FILTER OUT KEVIN BACON
AND NOT(first_name = 'Kevin' AND last_name = 'Bacon')
LIMIT 100;

SELECT movies.name, costars.first_name, costars.last_name, costar_roles.role
-- join all of these things
FROM actors AS costars, roles AS costar_roles, movies, actors AS kevin_bacon, roles AS kb_roles, movies_genres
-- limit the kevin_bacon actors table to just kevin bacon himself
WHERE kevin_bacon.first_name = 'Kevin' AND kevin_bacon.last_name = 'Bacon'
-- match the kb_roles to kevin bacon himself
AND kevin_bacon.id = kb_roles.actor_id
-- match movie_genres for kb_roles
AND movies_genres.movie_id = kb_roles.movie_id
-- that are drama movies
AND genre = 'Drama'
-- also pull in all the other movie information
AND movies.id = kb_roles.movie_id
-- limit the costar_roles table to just those that coincide with kevin bacon movies
AND costar_roles.movie_id = kb_roles.movie_id
-- join the costar actor information with their corresponding role
AND costars.id = costar_roles.actor_id
-- exclude kevin bacon from his costars
AND costars.id != kevin_bacon.id
LIMIT 100;

-- MUCH SLOWER, ~16 sec (as opposed to < 1 sec for above)
SELECT movies.name, first_name, last_name, role
FROM actors
INNER JOIN roles ON roles.actor_id = actors.id
INNER JOIN movies ON movies.id = roles.movie_id
WHERE movies.id IN (
  -- FIND ALL KEVIN BACON DRAMA MOVIES' IDs
  SELECT roles.movie_id
  FROM actors, roles, movies_genres
  WHERE actors.id = actor_id
  AND roles.movie_id = movies_genres.movie_id
  AND first_name = 'Kevin' AND last_name = 'Bacon'
  AND genre = 'Drama'
)
-- FILTER OUT KEVIN BACON
AND NOT(first_name = 'Kevin' AND last_name = 'Bacon')
LIMIT 100;

-- IMMORTALS
# Which actors have acted in a film before 1900 and also in a film after 2000?

-- BUSY FILMING
# Find actors that played five or more roles in the same movie after the year 1990. Notice that ROLES may have occasional duplicates, but we are not interested in these: we want actors that had five or more distinct roles in the same movie. Write a query that returns the actors' names, the movie name, and the number of distinct roles that they played in that movie (which will be ≥ 5).

-- FEMALE ACTORS ONLY
# For each year, count the number of movies in that year that had only female actors.
# For movies where no one was casted, you can decide whether to consider them female-only.
