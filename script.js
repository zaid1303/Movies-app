const apiurl = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const imgPath = "https://image.tmdb.org/t/p/w1280/";
const main = document.querySelector("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const searchapi='https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=';

getMovies(apiurl);

async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();

    showMovies(respData.results);
}

function showMovies(movies){
    main.innerHTML='';
    movies.forEach(movie => {
        const {poster_path,title,vote_average,overview}=movie;
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");
        movieEl.innerHTML = `
            <img src="${imgPath + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview" >
            <h4>Overview</h4>
            ${overview}</div>` 
        main.appendChild(movieEl);
    });
}

function getClassByRate(vote){
    if(vote>=7){
        return 'green';
    }
    else if(vote>4){
        return 'orange';
    }
    else return 'red';
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const searchTerm=search.value;

    if(searchTerm){
        search.value=''; 
        getMovies(searchapi+searchTerm)
    }
});

