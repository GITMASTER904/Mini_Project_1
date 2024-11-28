// Retrieve existing users from local storage or initialize an empty array
const users = JSON.parse(localStorage.getItem('users')) || [];

// Handle login form submission
document.getElementById('authForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        window.location.href = 'MAIN PAGE/index.html'; // Change this to your actual page
    } else {
        document.getElementById('message').innerText = 'Invalid username or password.';
    }
});

// Handle sign-up form submission
document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const address = document.getElementById('address').value;

    // Check if the username is already taken
    if (users.some(u => u.username === newUsername)) {
        document.getElementById('message').innerText = 'Username already taken.';
        closeModal();
        return;
    }
    
    // Add new user to the array
    users.push({ username: newUsername, password: newPassword, phoneNumber: phoneNumber, address: address });
    localStorage.setItem('users', JSON.stringify(users));
    
    // Display success message and reset form
    document.getElementById('message').innerText = 'Sign up successful! You can now log in.';
    document.getElementById('signupForm').reset();
    
    // Close the modal after sign-up
    closeModal();
});

// Open the sign-up modal
document.getElementById('toggleToSignup').addEventListener('click', function() {
    document.getElementById('signupModal').style.display = 'block';
});

// Close the modal
document.getElementById('closeModal').addEventListener('click', function() {
    closeModal();
});

// Close modal when clicking outside of it
window.addEventListener('click', function(event) {
    const modal = document.getElementById('signupModal');
    if (event.target === modal) {
        closeModal();
    }
});

// Function to close the modal
function closeModal() {
    document.getElementById('signupModal').style.display = 'none';
}
