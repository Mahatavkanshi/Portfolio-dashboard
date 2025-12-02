// Function to fetch data from the API
async function fetchData() {
    try {
        const response = await fetch('http://localhost:3000/api/users');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to render data in cards
async function renderData() {
    const container = document.querySelector('.container');
    const response = await fetchData();
    const data = response['users'];
    if (!data) {
        return;
    }

    data.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');

        const title = document.createElement('h2');
        title.textContent = item.username;

        const body = document.createElement('p');
        body.textContent = item.email;

        card.appendChild(title);
        card.appendChild(body);
        container.appendChild(card);
    });

    const queries = response['querys'];
    if (!queries) {
        return;
    }

    queries.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');

        const title = document.createElement('h2');
        title.textContent = item.username;

        const body = document.createElement('p');
        body.textContent = item.msg;

        card.appendChild(title);
        card.appendChild(body);
        container.appendChild(card);
    });
}

// Call the renderData function to display data
renderData();