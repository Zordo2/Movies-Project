let divWidth = $('#sideContent').innerWidth();
$('#side').animate({left:`-${divWidth}`},1000);
searchBar = document.getElementById("searchBar");
getMovie = document.getElementById("getMovie");
nowPlaying = document.getElementById("nowPlaying");
contactName = document.getElementById('contactName');
let trendingMovies = [];
let movieItem =[];
currentMovie='all';
searchItem='all';
let apiResponse;
let responseData;
currentSearch='all/day';
item='all/day';
//key/eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR2-IQE4fw2D7eaZ_AMkbDkXUo5HhKei4BgwINEItOdV0wzZfsPCG0hKQPA
function getApiData(item)
{
    var myHttp = new XMLHttpRequest();
myHttp.open('get', `https://api.themoviedb.org/3/${item}?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR2-IQE4fw2D7eaZ_AMkbDkXUo5HhKei4BgwINEItOdV0wzZfsPCG0hKQPA`);
myHttp.send();
myHttp.addEventListener('readystatechange', function () {
    if (myHttp.readyState == 4 && myHttp.status == 200) {
        trendingMovies = JSON.parse(myHttp.response).results;
        displayItems(trendingMovies) 
        console.log(trendingMovies)
    }
})
}
getApiData('trending/all/day');

function displayItems(movieItem) {
    var cartona = ``;
    for (i = 0; i < movieItem.length; i++) {
        cartona += `
        <div class="col-lg-4 col-md-6 my-2">
          <div class="movie">
                <img src="https://image.tmdb.org/t/p/w500${movieItem[i].poster_path}" class="w-100"/>
                <div class="movieCaption">
                <h2>${movieItem[i].title}</h2>
                <p>
                ${movieItem[i].overview}
                </p>
                <p>
                ${movieItem[i].vote_average}
                </p>
                <p>
                ${movieItem[i].release_date}
                </p>
                </div>         
            </div>
        </div>
        `
    }
    document.getElementById('rowData').innerHTML=cartona;
}
    $('#toggle').click(function(){
        if($('#side').css('left')=='0px')
        {
            $('#side').animate({left:`-${divWidth}`},1000);
            $('#icon').attr('class',"fa fa-align-justify")

        }
        else
        {
            $('#side').animate({left:`0px`},1000)
            $('#icon').attr('class',"fa fa-align-justify fa-times")

        }

    })
    // getMovie.addEventListener("keyup",function(){
    //     currentMovie= getMovie.value;
    //    console.log( currentMovie);
    //    getApiData(currentMovie);

    //   }) 
    //   searchBar.addEventListener("keyup",function(){
    //     searchItem= searchBar.value;
    //     searchItem=trendingMovies.title;
    //    console.log(searchItem);
    //    getApiData(trendingMovies.title);

    //   });
    $('#Upcoming').click(function(){
        getApiData('movie/upcoming');

    }) ; 
    $('#Trending').click(function(){
        getApiData('trending/all/day');

    }) ;
    $('#topRated').click(function(){
        getApiData('movie/top_rated');

    }) ;
    $('#Popular').click(function(){
        getApiData('movie/popular');

    }) ;
     $('#nowPlaying').click(function(){
        getApiData('movie/now_playing');

    }) ;
    function searchMovies(searchTerm)
    {
        var searchResult =[];
        for(i=0;i<trendingMovies.length;i++)
        {
            if(trendingMovies[i].title.toLowerCase().includes(searchTerm.toLowerCase())==true)
            {
                searchResult.push(trendingMovies[i]);
            }
        }
        displayItems(searchResult);
    }
    searchMovies("op");
    function validateContactName()
{
    var regex =/^[A-Z][a-z]{3,8}$/;
    if(regex.test(contactName.value)==true)
    {
        contactName.classList.replace('is-invalid','valid');
        return true;
    }
    else
    {
        contactName.classList.add('is-invalid');
        return false;
    }
}
