let main = document.getElementById("main");
let search = document.getElementById("search")
let form = document.getElementById("form")

//<<---------using apis here to fetch movies data---------->>
let API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";
let IMG_PATH = "https://image.tmdb.org/t/p/w1280";
let SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';
//----------------------//

fetchingdata(API_URL);

//<<-----this is a asynchronous function with data fetching methods------->>
async function fetchingdata(URL) {
  let promise_response = await fetch(URL);
  console.log(promise_response);
  let exact_data = await promise_response.json();
  console.log(exact_data.results);
  showmovies(exact_data.results);
}
//<<--------------------------------->>

//<<-----------it is responsible to show movies----------->>
function showmovies(movies_data) {
  let movies_array = [];
  movies_data.forEach((movie) => {
    let { poster_path, title, vote_average,overview } = movie;
    movies_array += ` <div class="small-movies-box">
    <div class="image-box">
        <img class ="img-size" src="${IMG_PATH + poster_path}" alt="${title}">
    </div>
     <div class="text-container">
        <div class= "title-width">
           <h3>${title}</h3>
        </div>
        <div>
            <p class= "${getcolor(vote_average)}">${vote_average}</p>
        </div>
     </div>
     <div class= "description ">
     <h3 class = "overview-font ${getcolor(vote_average)}" >Overview</h3>
     <p class = "para-font" >${overview}</p>
     </div>
    </div>`;
  });
  main.innerHTML = movies_array;
}
//<<------------------------>>

function getcolor(color) {
  if (color >= 8) {
    return "yellow";
  } else if (color >= 5.5) {
    return "green";
  } else {
    return "red";
  }
}

//<<-----------this function is for searhing the movies which we want
form.addEventListener("submit", (e) =>{
  e.preventDefault()

  let search_value = search.value
  if(search_value != ""){
    fetchingdata(SEARCH_API + search_value)

    search.value = ""
  }
  else{
    window.location.reload()
  }
})
