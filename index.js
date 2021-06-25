let image_url;
const getData = () => {
  let titleOfMovie = document.querySelector(".titleOfMovie").value;
  let card = document.getElementById("flexbox");
  let cardbox = `<div class="flexitem">
                  <div class="cardBanner"></div>
                  <div class="cardbody">
                      <div class="Title"></div>
                      <div class="Cast"></div>
                      <div class="YearOfRelease"></div>
                      <div class="rating"></div>
                  </div>
                  </div>`;

  fetch(
    "https://www.omdbapi.com/?i=tt3896198&apikey=9584d820&t=" + titleOfMovie
  )
    .then((res) => {
      let data = res.json();
      return data;
    })
    .then((data) => {
      if (document.querySelector(".NoContent")) {
        document.querySelector(".NoContent").innerHTML = ``;
      }
      if (data.Error == undefined) {
        let banner = document.createElement("img");
        banner.src = data.Poster;
        let bg = document.querySelector(".bg");
        bg.style.cssText = `  background-image: url(${data.Poster});
            filter: blur(8px);
            -webkit-filter: blur(15px);
            height: 900px;
            width:auto; 
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;`;
        card.innerHTML = cardbox;
        let mainBox = document.querySelector(".main");
        mainBox.style.cssText = `background-color: rgb(0,0,0); 
        background-color: rgb(0 0 0 / 60%);
         @media (max-width: 500px) {.main{
        top:70%;
        width: auto;
       }
      }`;
        let innerbox = document.querySelector(".innerBox");
        console.log(innerbox);
        innerbox.style.cssText = ` background-color: unset; color:white;`;
        document.querySelector(".cardBanner").appendChild(banner);
        document.querySelector(".Title").innerHTML =
          `<strong>Title </strong>: ` + data.Title;
        document.querySelector(".Cast").innerHTML =
          `<strong>Cast </strong>: ` + data.Actors;
        document.querySelector(".YearOfRelease").innerHTML =
          `<strong>Year </strong>: ` + data.Released;
        document.querySelector(".rating").innerHTML =
          `<strong>Rating </strong>: ` + data.Ratings[1].Value;
      } else {
        throw new Error("Movie Not found");
      }
    })
    .catch((error) => {
      console.log(error);
      let noContent = document.querySelector(".NoContent");
      noContent.innerHTML = `<h1> Sorry the content is unavailable. </h1>`;
      noContent.style.cssText = `display:block; padding: 3px`;
      let bg = document.querySelector(".bg");
      bg.style.cssText = ``;
      card.innerHTML = ``;
    });
};
