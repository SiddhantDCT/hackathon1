// Check if the user is logged in (i.e., if the username is stored in localStorage)
window.onload = function() {
    const username = sessionStorage.getItem('username');
    
    if (username) {
        // If the user is logged in, hide the login button and show the username
        document.getElementById('loginButton').style.display = 'none';
        const usernameDisplay = document.getElementById('usernameDisplay');
        usernameDisplay.textContent = username;
        usernameDisplay.style.display = 'inline';
        usernameDisplay.style.color = 'white';
        usernameDisplay.innerText = Welcome, '${username}'; // Use backticks here

    }
};
