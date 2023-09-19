// JavaScript (app.js)
const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
let currentPage = 1;

function fetchData(page) {
    fetch(`${apiUrl}?_page=${page}&_limit=10`)
        .then(response => response.json())
        .then(data => {
            if (page === 1) {
                // Initial data load
                renderData(data);
            } else {
                // Subsequent data loads
                appendData(data);
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

function renderData(data) {
    const resultsList = document.getElementById('results');
    resultsList.innerHTML = ''; // Clear existing content when rendering initial data

    data.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `Title: ${item.title}`;
        resultsList.appendChild(listItem);
    });
}

function appendData(data) {
    const resultsList = document.getElementById('results');

    data.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `Title: ${item.title}`;
        resultsList.appendChild(listItem);
    });
}

function loadMoreData() {
    currentPage++;
    fetchData(currentPage);
}

function isNearBottomOfPage() {
    const pageHeight = window.innerHeight;
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;

    return pageHeight + scrollTop >= scrollHeight - 100;
}

window.addEventListener('scroll', () => {
    if (isNearBottomOfPage()) {
        loadMoreData();
    }
});

// Initial data load
fetchData(currentPage);
