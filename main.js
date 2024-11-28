document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Clear previous results or errors
    const result = document.getElementById('result');
    result.style.display = 'none';
    result.innerHTML = '';

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const coursesSelect = document.getElementById('courses');

    // Get form values
    const name = nameInput.value;
    const email = emailInput.value;
    const courses = Array.from(coursesSelect.selectedOptions).map(option => option.value);

    // Clear previous errors
    nameInput.classList.remove('error');
    emailInput.classList.remove('error');
    coursesSelect.classList.remove('error');
    document.querySelectorAll('.error-message').forEach(el => el.remove());

    // Validation: check if all fields are filled
    let isValid = true;

    if (!name) {
        isValid = false;
        nameInput.classList.add('error');
        const errorMessage = document.createElement('div');
        errorMessage.classList.add('error-message');
        errorMessage.textContent = 'Name is required.';
        nameInput.parentNode.appendChild(errorMessage);
    }

    if (!email || !validateEmail(email)) {
        isValid = false;
        emailInput.classList.add('error');
        const errorMessage = document.createElement('div');
        errorMessage.classList.add('error-message');
        errorMessage.textContent = 'Please enter a valid email.';
        emailInput.parentNode.appendChild(errorMessage);
    }

    if (courses.length === 0) {
        isValid = false;
        coursesSelect.classList.add('error');
        const errorMessage = document.createElement('div');
        errorMessage.classList.add('error-message');
        errorMessage.textContent = 'Please select at least one course.';
        coursesSelect.parentNode.appendChild(errorMessage);
    }

    if (!isValid) return;

    // Course links (mapping course names to URLs)
    const courseLinks = {
        "course1": "https://www.youtube.com/playlist?list=PLu0W_9lII9agq5TrH9XLIKQvv0iaF2X3w",
        "course2": "https://www.youtube.com/watch?v=-ETQ97mXXF0",
        "course3": "https://www.youtube.com/playlist?list=PLoAVEfDOSZBpkfTdRTAn9ivxOrmyO2liH",
        "course4": "https://www.youtube.com/playlist?list=PLjVLYmrlmjGcCeELcp2VU66XHlmyoPRpM",
        // Add more courses and their respective links here
    };

    // Display registration result with links
    result.style.display = 'block';
    result.innerHTML = `
        <h3>Registration Successful!</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Courses Registered:</strong></p>
        <ul>
            ${courses.map(course => {
                const courseLink = courseLinks[course]; // Get the URL for the course
                return `<li><a href="${courseLink}" target="_blank">${course}</a></li>`;
            }).join("")}
        </ul>
    `;

    // Optionally, reset the form after submission
    document.getElementById('registrationForm').reset();
});

// Simple email validation
function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
}

// Clear errors dynamically when user starts typing again
document.getElementById('name').addEventListener('input', function() {
    this.classList.remove('error');
    const errorMessage = this.parentNode.querySelector('.error-message');
    if (errorMessage) errorMessage.remove();
});

document.getElementById('email').addEventListener('input', function() {
    this.classList.remove('error');
    const errorMessage = this.parentNode.querySelector('.error-message');
    if (errorMessage) errorMessage.remove();
});

document.getElementById('courses').addEventListener('change', function() {
    this.classList.remove('error');
    const errorMessage = this.parentNode.querySelector('.error-message');
    if (errorMessage) errorMessage.remove();
});
