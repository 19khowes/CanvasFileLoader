const files_btn = document.getElementById('load-files-btn');
const clear_btn = document.getElementById('clear-btn');
const course_input = document.getElementById('course-input');
const images_container = document.getElementById('images-container');

files_btn.addEventListener('click', async () => {
    const course = (course_input.value).trim();

    // object to post to sever api endpoint  /course
    const data = {
        course
    }

    // options for fetch to /api
    const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        }
    }

    const post_reponse = await fetch('/course', options);
    const response_json = await post_reponse.json();

    console.log(response_json);
});

clear_btn.addEventListener('click', () => {
    console.log("clear");
});