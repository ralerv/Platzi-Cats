//bring elements
const randomImgSection = document.getElementById("cat-images");
const FavSection = document.getElementById("cat-favorites__section");

//const
const API_KEY = 'live_r9g5A2cuXYhcPQOecpbPlRUwZ54UY6U3mt3M6A2QjVFwM7eHqzwptJNSOLF0Fvfv';
const limit = 4;

//put api urls
const apiImg = "https://api.thecatapi.com";
const apiHTTPCats = "https://http.cat";



const getIMGS = [`${apiImg}`,
    '/v1/images/search',
    `?limit=${limit}`,
    `&api_key=${API_KEY}`,
].join('');

const urlFavorites = [`${apiImg}`,`/v1/favourites`,`?order=DESC`].join('');

//async functions to bring data
async function fetchData(url){
    const response = await fetch(url);
    //check status
    if (response.status < 200 || response.status > 200){
        return response.status;
    }
    else{
        const data = await response.json();
        return data;}
}

async function getImages(){ //to repeat, await bc is using another async function?
    //use fetchdata func
    const imgData = await fetchData(getIMGS);
    if (imgData < 200 || imgData > 200){
        randomImgSection.classList.add("errorCat");
        randomImgSection.innerHTML = `<h2>Hubo un error</h2>
        <img src='${apiHTTPCats}/${imgData}'></img>`;
    }
        //put values of data

    else {
        if(randomImgSection.classList.contains("errorCat")){randomImgSection.classList.remove("errorCat");}

        randomImgSection.innerHTML = ""; //reset img section
        imgData.forEach(element => {
            let imgID = element.id;
            randomImgSection.innerHTML += `
            <div class="img-div">
                <button onclick="favorito('${imgID}')">
                    <svg width="800px" height="800px" viewBox="0 0 24 24" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg"><path d="M14.65 8.93274L12.4852 4.30901C12.2923 3.89699 11.7077 3.897 11.5148 4.30902L9.35002 8.93274L4.45559 9.68243C4.02435 9.74848 3.84827 10.2758 4.15292 10.5888L7.71225 14.2461L6.87774 19.3749C6.80571 19.8176 7.27445 20.1487 7.66601 19.9317L12 17.5299L16.334 19.9317C16.7256 20.1487 17.1943 19.8176 17.1223 19.3749L16.2878 14.2461L19.8471 10.5888C20.1517 10.2758 19.9756 9.74848 19.5444 9.68243L14.65 8.93274Z" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </button>
                <img src="${element.url}" alt="random cat - sorry no data">
            </div>
            `;
        });
    }
    
}

async function getFavorites(){
    let header = {
        headers:{
            "content-type":"application/json",
            'x-api-key': `${API_KEY}`
        }
    }
    let response = await fetch(`${urlFavorites}&sub_id=${user}`,header);
    console.log(response);
    if (response < 200 || response > 200){
        console.log(response.status);
    }
    //read favorites
    else {
        const data = await response.json();
        console.log(data)

    }
}

async function favorito(imgID){
    console.log(imgID)
    const rawBody = JSON.stringify({ 
        "image_id": imgID,
        "sub_id":user
    });
    const header = {
        method: 'POST',
        headers: {  "content-type":"application/json",'x-api-key': API_KEY} ,
        body: rawBody};

    let response = await fetch(`${urlFavorites}&sub_id=${user}`,header);
    if (response < 200 || response > 200){
        console.log(response.status);
    }
        //put values of data

    else {
        const data = await response.json();
        console.log(data);
        getFavorites();
    }
    
}

function repeat(){
    getImages();
    getFavorites();
}

//user function
function verifyUser(){
    let userID = localStorage.getItem('localUUID');
    if (userID==null){
        localID = uuid.v4();
        localStorage.setItem("localUUID", localID);
        return userID;
    }
    else {return userID}
}
const user = verifyUser();

repeat(); //first fetch



