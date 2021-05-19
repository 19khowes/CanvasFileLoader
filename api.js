//const fetch = require('node-fetch');

const token = "1009~CxQzHVjWBwZY9JVSPTMwacWEs8P8D8cz8rcfGcXcOl1fhWESN12U0EuG2MvRNXgt";
const per_page = 1000;
let data;

//let url = "https://usu.beta.instructure.com/api/v1/courses";
let url = "https://usu.beta.instructure.com/api/v1/courses/583321/files";
let query = "?access_token=" + token + "&per_page=" + per_page;

// DOM selection
let image = document.getElementById("image");
console.log(image);
image.src = "https://usu.beta.instructure.com/files/78513110/download?download_frd=1&verifier=WVkxx9afyXIIJLvxH73M2IZ82oCo9PBiVAGNDdPb";
//image.src = "https://usu.beta.instructure.com/files/78513107/download?download_frd=1&verifier=lWiFIE0y2GMjVG7UNkCdCg5VE1alLhemLrvURVq4"



getData(url + query)
    .then(() => {
        console.log("-----------------------------");
        data.forEach(element => {
            console.log(element.id, element.display_name);
            console.log(element.url);
            console.log("-----------------------------");
        });
    })
    .catch((err) => {
        console.error(err);
    });



async function getData(givenUrl) {
    const response = await fetch(givenUrl, { mode: 'cors' });
    const json = await response.json();
    data = json;
}
