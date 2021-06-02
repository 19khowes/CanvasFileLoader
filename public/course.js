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

    response_json.images_array.forEach(item => {
        if (item != "not an image") {
            const root = document.createElement('div');
            let new_image;

            new_image = document.createElement('img');

            new_image.src = item;
            new_image.width = 500;
            new_image.classList.add('images');

            root.append(new_image);
            images_container.append(root);
        }

        console.log(item);
    })
});

clear_btn.addEventListener('click', () => {
    console.log("clear");
});