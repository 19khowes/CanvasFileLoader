const express = require('express');
require('dotenv').config();
const app = express();
const fetch = require('node-fetch');
const token = process.env.API_TOKEN;
const per_page = 1000;
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server now listening at port ${port}`)
});

app.use(express.static('public'));

app.use(express.json());

app.post('/folders', async (request, response) => {
    const course_id = (request.body.course)
    console.log(course_id);

    let fetch_url = `https://usu.instructure.com/api/v1/courses/${course_id}/folders/?access_token=${token}&per_page=${per_page}`;
    const fetch_response = await fetch(fetch_url);
    //const fetch_response = await fetch(`https://usu.beta.instructure.com/api/v1/courses/${course_id}/files?access_token=1009~xR2kix0bixBr0Wb5zfibZTr3MBezYel1urw8dOibwVD9FPqQiQ0FP0jHFm5BOEjl&per_page=1000`)
    const json = await fetch_response.json();
    console.log(fetch_url);

    response.json(json);
});

app.post('/api', async (request, response) => {
    const course_id = (request.body.course);
    const folder = (request.body.folder);
    console.log(folder);

    let fetch_url = `https://usu.instructure.com/api/v1/folders/${folder}/files?access_token=${token}&per_page=${per_page}`;
    const fetch_response = await fetch(fetch_url);
    //const fetch_response = await fetch(`https://usu.beta.instructure.com/api/v1/courses/${course_id}/files?access_token=1009~xR2kix0bixBr0Wb5zfibZTr3MBezYel1urw8dOibwVD9FPqQiQ0FP0jHFm5BOEjl&per_page=1000`)
    const json = await fetch_response.json();
    console.log(fetch_url);

    response.json(json);
});

app.post('/course', async (request, response) => {
    const course_id = (request.body.course);
    console.log(course_id);

    let course_url = `https://usu.instructure.com/api/v1/courses/${course_id}/folders/?access_token=${token}&per_page=${per_page}`;
    // let folder_url = "https://usu.instructure.com/api/v1/folders/${folder}/files?access_token=${token}&per_page=${per_page}";
    let folder_url;

    const course_response = await fetch(course_url);
    const course_json = await course_response.json();

    // count will be the number of folders in a course
    let count = 0;
    course_json.forEach((item) => {
        count++;
    });
    let folder;
    let images = [];
    let folder_response;
    let folder_json;
    let i = 0;
    let p = new Promise((resolve, reject) => {
        course_json.forEach(async (item) => {
            folder = item.id;
            folder_url = "https://usu.instructure.com/api/v1/folders/" + folder + `/files?access_token=${token}&per_page=${per_page}`;
            console.log(folder_url);
    
            folder_response = await fetch(folder_url);
            folder_json = await folder_response.json();
            
            const addToImages = async () => {
                await folder_json.forEach((file) => {
                    if (file.mime_class == "image") {
                        images.push(file.url);
                    }
                    else {
                        images.push('not an image');
                    }
                });
            };

            addToImages();
            

            
            // clear folder_url for next loop and increment i
            folder_url = "";
            i++;

            // check if done, to resolve promise p
            if (i == count) {
                resolve();
            }
        });
    });

    p.then(() => {
        console.log(images);
        response.json({
            images_array: images
        });
    });
});
