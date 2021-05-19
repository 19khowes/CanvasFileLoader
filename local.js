const fetch = require('node-fetch');

const token = "1009~xR2kix0bixBr0Wb5zfibZTr3MBezYel1urw8dOibwVD9FPqQiQ0FP0jHFm5BOEjl";
const per_page = 1000;

//let url = "https://usu.beta.instructure.com/api/v1/courses";
let url = "https://usu.beta.instructure.com/api/v1/courses/615872/files";
let query = "?access_token=" + token + "&per_page=" + per_page;

getData(url + query)
    .then((data) => {
        console.log(data);
        //console.log("-----------------------------");
        data.forEach(element => {
            //console.log(element.id, element.display_name);
            console.log(element.url);
            //console.log("-----------------------------");
        });
    })
    .catch((err) => {
        console.error(err);
    });



async function getData(givenUrl) {
    const response = await fetch(givenUrl);
    const json = await response.json();
    return json;
}