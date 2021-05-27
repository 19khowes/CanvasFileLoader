const submit = document.getElementById('btn');
const clear_btn = document.getElementById('clear-btn');
const folders_btn = document.getElementById('folders-btn');
const clear_folders_btn = document.getElementById('clear-folders-btn');
const folder_input = document.getElementById('folder-input');
const course_input = document.getElementById('course-input');
const images_container = document.getElementById('images-container');
const folders_container = document.getElementById('folders-container');

submit.addEventListener('click', async () => {
    const course = course_input.value;
    const folder = folder_input.value;
    const data = {
        course,
        folder
    };


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
        let new_image;

        if ((item.mime_class) == "pdf") {
            new_image = document.createElement('p');

            new_image.innerHTML = `${item.display_name}`;
        } else {
            new_image = document.createElement('img');

            new_image.src = item.url;
            new_image.width = 500;
            new_image.classList.add('images');
        }

        root.append(new_image);
        images_container.append(root);

        console.log(item.url)
    })
});

folders_btn.addEventListener('click', async () => {
    const course = course_input.value;
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

    const post_response = await fetch('/folders', options);
    const response_json = await post_response.json();
    response_json.forEach(item => {
        const root = document.createElement('div');
        const new_folder = document.createElement('p');

        new_folder.innerHTML = `<strong>id:</strong> ${item.id} <strong>path:</strong> ${item.full_name}`;

        root.append(new_folder);
        folders_container.append(root);

        console.log(item.url)
    })
});

clear_btn.addEventListener('click', () => {
    images_container.innerHTML = "";
});

clear_folders_btn.addEventListener('click', () => {
    folders_container.innerHTML = "";
});