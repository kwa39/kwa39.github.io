const clientId = 'YOUR_CLIENT_ID';
const clientSecret = 'YOUR_CLIENT_SECRET';

// Fetch Access Token
async function getAccessToken() {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${btoa(clientId + ':' + clientSecret)}`,
        },
        body: 'grant_type=client_credentials',
    });

    const data = await response.json();
    return data.access_token;
}

async function fetchAlbums() {
    const token = await getAccessToken();
    const response = await fetch(
        'https://api.spotify.com/v1/browse/new-releases?limit=10',
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );

    const data = await response.json();
    return data.albums.items; // 앨범 데이터
}

async function displayAlbums() {
    const albums = await fetchAlbums();
    const albumsContainer = document.getElementById('albums');

    albums.forEach((album) => {
        const albumDiv = document.createElement('div');
        albumDiv.classList.add('album');
        albumDiv.innerHTML = `
            <img src="${album.images[0].url}" alt="${album.name}">
            <p><strong>${album.name}</strong></p>
            <p>By ${album.artists.map((artist) => artist.name).join(', ')}</p>
        `;
        albumsContainer.appendChild(albumDiv);
    });
}

// Display albums on page load
displayAlbums();
