function closeForm() {
    document.getElementById('courseEnroll').style.display = 'none';
}
function showEnrollmentForm() {
    document.getElementById('courseEnroll').style.display = 'flex';
}
// Fetching blog data
fetch("https://sciastraapi.onrender.com/api/blogs")
    .then((response) => response.json())
    .then((data) => {
        console.log(data);

        const blogPostsContainer = document.getElementById("blog-posts");

        data.forEach((post) => {
            const blogBox = document.createElement("div");
            blogBox.classList.add("box");

            const img = document.createElement("img");
            img.src = post.image;
            img.alt = post.title;

            const date = document.createElement("p");
            const postDate = new Date(post.created_at);
            date.textContent = postDate.toLocaleString();

            const title = document.createElement("h3");
            title.classList.add("text_rows_clamp");
            title.textContent = post.title;

            const button = document.createElement("button");
            const link = document.createElement("a");
            link.href = `./singleBlogPost.html?id=${post.id}`;
            link.textContent = "Read More";
            button.appendChild(link);

            blogBox.appendChild(img);
            blogBox.appendChild(date);
            blogBox.appendChild(title);
            blogBox.appendChild(button);

            blogPostsContainer.appendChild(blogBox);
        });
    })
    .catch((error) => {
        console.error("Error fetching data:", error);
    });

document.getElementById('detailsForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    // Get form data
    const full_name = document.getElementById('full_name').value;
    const phone_number = document.getElementById('phone_number').value;
    const email = document.getElementById('email').value;

    // Prepare data object
    const formData = { full_name, phone_number, email };

    // Send details to backend for OTP generation
    fetch('https://sciastraapi.onrender.com/api/users/submit-details', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data) {
                alert('OTP sent to your email!');
                document.getElementById('otpSection').style.display = 'block'; // Show OTP field
            } else {
                alert('Error: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Something went wrong!');
        });
});

// Initialize Stripe with your public key
