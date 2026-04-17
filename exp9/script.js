// Global state to store API data
let users = [];
const API_URL = 'https://jsonplaceholder.typicode.com/users';

// DOM Elements
const userGrid = document.getElementById('user-grid');
const searchInput = document.getElementById('search-input');
const loader = document.getElementById('loader');

/**
 * Fetches data from the public API
 */
async function fetchUsers() {
    try {
        showLoader(true);
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Network response was not ok');
        
        users = await response.json();
        displayUsers(users);
    } catch (error) {
        console.error('Fetch error:', error);
        userGrid.innerHTML = `<p class="no-results">Error fetching data. Please try again later.</p>`;
    } finally {
        showLoader(false);
    }
}

/**
 * Displays user cards in the grid
 * @param {Array} usersToDisplay 
 */
function displayUsers(usersToDisplay) {
    userGrid.innerHTML = '';

    if (usersToDisplay.length === 0) {
        userGrid.innerHTML = '<p class="no-results">No users match your search criteria.</p>';
        return;
    }

    usersToDisplay.forEach((user, index) => {
        const card = document.createElement('div');
        card.className = 'user-card';
        card.style.animationDelay = `${index * 0.05}s`;
        
        card.innerHTML = `
            <h3>${user.name}</h3>
            <p class="email">@${user.username}</p>
            <p>${user.email}</p>
            <p>${user.address.city}, ${user.address.suite}</p>
            <div class="company">
                <strong>Company:</strong> ${user.company.name}
            </div>
        `;
        userGrid.appendChild(card);
    });
}

/**
 * Filters the users array based on search input
 */
function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    
    const filteredUsers = users.filter(user => {
        return (
            user.name.toLowerCase().includes(searchTerm) ||
            user.email.toLowerCase().includes(searchTerm) ||
            user.username.toLowerCase().includes(searchTerm)
        );
    });

    displayUsers(filteredUsers);
}

/**
 * Controls visibility of the loader
 * @param {boolean} isLoading 
 */
function showLoader(isLoading) {
    loader.style.display = isLoading ? 'block' : 'none';
}

// Event Listeners
searchInput.addEventListener('input', handleSearch);

// Initialize application
document.addEventListener('DOMContentLoaded', fetchUsers);
