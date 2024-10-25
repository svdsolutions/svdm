// Hide preloader after page load Section
window.addEventListener('load', function() {
    document.getElementById('loading').style.display = 'none';
});

//nav&foot
$(function() {
    // Load the navbar and footer for the index.html
    $("#navbar-placeholder").load("files/navbar.html");
    $("#footer-placeholder").load("files/footer.html");
});

//player
document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const title = params.get('title');

    fetch('include/data.json')
        .then(response => response.json())
        .then(data => {
            const movie = data.find(movie => movie.title === title);

            if (movie) {
                // Update both cards with movie data
                const elements = {
                    'poster-md': movie.poster,
                    'title-md': movie.title,
                    'year-md': movie.year,
                    'cast-md': movie.cast,
                    'director-md': movie.director,
                    'poster-sm': movie.poster,
                    'title-sm': movie.title,
                    'year-sm': movie.year,
                    'cast-sm': movie.cast,
                    'director-sm': movie.director,
                    'video-frame': movie['player-url'],
                };

                for (const id in elements) {
                    if (document.getElementById(id).src) {
                        document.getElementById(id).src = elements[id];
                    } else {
                        document.getElementById(id).textContent = elements[id];
                    }
                }

                // Set download link separately
                document.getElementById('download-md').href = movie['download-url'];
                document.getElementById('download-sm').href = movie['download-url'];

                // Change the URL in the address bar
                history.pushState({}, '', 'player.html');
            } else {
                console.error('Movie not found');
            }
        })
        .catch(error => console.error('Error loading data:', error));

    // Prevent new tab openings and popups on the video player
    const videoFrame = document.getElementById('video-frame');
    videoFrame.addEventListener('click', (event) => {
        event.stopPropagation();
        event.preventDefault();
        alert('Popups and new tab openings are blocked for this video player.');
    });
});

//function
window.onload = function() {
    // Prevent right-click context menu
    document.addEventListener("contextmenu", function(e) {
        e.preventDefault();
    }, false);

    // Prevent various key combinations
    document.addEventListener("keydown", function(e) {
        // Ctrl+Shift+I (Inspect Element)
        if (e.ctrlKey && e.shiftKey && e.key === 'I') { disableEvent(e); } 
        // Ctrl+Shift+J (Console)
        if (e.ctrlKey && e.shiftKey && e.key === 'J') { disableEvent(e); } 
        // Ctrl+S / Cmd+S (Save)
        if (e.key === 'S' && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) { disableEvent(e); } 
        // Ctrl+O (Open)
        if (e.ctrlKey && e.key === 'O') { disableEvent(e); } 
        // Ctrl+P (Print)
        if (e.ctrlKey && e.key === 'P') { disableEvent(e); } 
        // Ctrl+A (Select All)
        if (e.ctrlKey && e.key === 'A') { disableEvent(e); } 
        // F12 (DevTools)
        if (e.key === 'F12') { disableEvent(e); } 
    }, false);

    function disableEvent(e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }
};
    

// Function to detect if developer tools are open
function detectDevTools() {
    const threshold = 160; // Adjust this value based on your needs
    const devToolsOpen = window.outerWidth - window.innerWidth > threshold || window.outerHeight - window.innerHeight > threshold;

    if (devToolsOpen) {
        // Redirect to nofound.html immediately
        window.location.href = "nofound.html";
    }
}

// Start checking for developer tools once the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    detectDevTools();
    
    // Optional: Continue checking periodically
    setInterval(detectDevTools, 50);
});