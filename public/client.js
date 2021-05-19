console.log("working")
const submit = document.getElementById('btn');
const clear_btn = document.getElementById('clear-btn');
const course_input = document.getElementById('course-input');
const images_container = document.getElementById('images-container');

submit.addEventListener('click', async () => {
    const value = course_input.value;
    const data = { value }


    // options for fetch to /api
    const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        }
    }

    const post_response = await fetch('/api', options);
    const response_json = await post_response.json();
    response_json.forEach(item => {
        const root = document.createElement('div');
        const new_image = document.createElement('img');

        new_image.src = item.url;
        new_image.width = 500;
        new_image.classList.add('images');

        root.append(new_image);
        images_container.append(root);

        console.log(item.url)
    })
});

clear_btn.addEventListener('click', () => {
    images_container.innerHTML = "";
})

