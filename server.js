const express = require('express');
const app = express();
const fetch = require('node-fetch');
const url = "https://usu.beta.instructure.com/api/v1/courses/615872/files";
const token = "1009~vRn8YALIrhRGoaJ5SD9lytb3SbneKflS5WRivVbmsC9ZVHHCsrxzJPQjhCbgPk8i";
const per_page = 1000;
const port = 3000;

app.listen(port, () => {
    console.log(`Server now listening at port ${port}`)
});

app.use(express.static('public'));

app.use(express.json());

app.post('/api', async (request, response) => {
    const course_id = (request.body.value)
    console.log(course_id);

    let fetch_url = `https://usu.beta.instructure.com/api/v1/courses/${course_id}/files?access_token=${token}&per_page=${per_page}`; 
    const fetch_response = await fetch(fetch_url);
    //const fetch_response = await fetch(`https://usu.beta.instructure.com/api/v1/courses/${course_id}/files?access_token=1009~xR2kix0bixBr0Wb5zfibZTr3MBezYel1urw8dOibwVD9FPqQiQ0FP0jHFm5BOEjl&per_page=1000`)
    const json = await fetch_response.json();
    console.log(fetch_url);

    response.json(json);
});

app.get('/canvas', async (request, response) => {

});