console.log("working")
const submit = document.getElementById('btn');
const course_input = document.getElementById('course-input');

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
    console.log(response_json);
});