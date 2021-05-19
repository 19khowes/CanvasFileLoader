const express = require('express');
const app = express();

app.listen(3000, () => {
    console.log("listening")
});

app.use(express.static('public'));

app.use(express.json());

app.post('/api', (request, response) => {
    const course_id = (request.body.value)
    console.log(request.body)
    console.log(course_id);

    response.json(request.body);
});