const movList = document.getElementById("movie-list");
const input = document.getElementById("search-input");
const submitInput = document.querySelector("form");
let filmsData = [];
let list = [];
let search;
let searchURL;

const fetchFilm = async () => {
  await fetch(searchURL)
    .then((res) => res.json())
    .then((data) => (filmsData = data.results));

  console.log(filmsData);
};

const fetchList = async () => {
  await fetch(
    "https://api.themoviedb.org/3/list/7094088?api_key=355800addba30cc2deee3801d5af8639&language=fr-FR"
  )
    .then((res) => res.json())
    .then((data) => (list = data.items));

  console.log(list);
};

input.addEventListener("input", (e) => {
  search = e.target.value;
  searchURL = `https://api.themoviedb.org/3/search/movie?api_key=355800addba30cc2deee3801d5af8639&language=fr-FR&query=${search}`;
  console.log(searchURL);
  fetchFilm();
});

const movieDisplay = (array) => {
  array.length = 12;

  movList.innerHTML = array
    .map((film) => {
      console.log(film.release_date.split("-"));

      return ` <li class="cards">
                      <h2>${film.title}</h2>
                      <div>Date de sortie : <span>${
                        film.release_date.split("-")[2]
                      } / ${film.release_date.split("-")[1]} / ${
        film.release_date.split("-")[0]
      }</span></div>
                      <img src="${
                        film.poster_path
                          ? "https://image.tmdb.org/t/p/w500" + film.poster_path
                          : "./img/poster.jpg"
                      }" alt="affiche de ${film.title}">
                      <div class="syn">Synopsis : ${film.overview} </div>
                      <div>Note : ${
                        film.vote_average
                      } / 10  <img class="logo-note" src="${
        film.vote_average >= 7 ? "./img/fire.svg" : "./img/snow.svg"
      }" alt="logo"></div>
                  </li>
              `;
    })
    .join("");
};

submitInput.addEventListener("submit", (e) => {
  e.preventDefault();
  if (search.length < 3) {
    alert("veuillez saisir le nom d'un film");
  } else {
    movieDisplay(filmsData);
  }
});

btnList.addEventListener("click", async (e) => {
  e.preventDefault();
  await fetchList();
  movieDisplay(list);
});
