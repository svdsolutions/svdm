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
    const loadingIndicator = document.getElementById('loading');

    fetch('include/data.json')
        .then(response => response.json())
        .then(data => {
            const movie = data.find(movie => movie.title === title);

            if (movie) {
                // Update both cards with movie data
                document.getElementById('poster').src = movie.poster;
                document.getElementById('title').textContent = movie.title;
                document.getElementById('year').textContent = movie.year;
                document.getElementById('cast').textContent = movie.cast;
                document.getElementById('director').textContent = movie.director;
                document.getElementById('download').href = movie['download-url'];
                document.getElementById('video-frame').src = movie['player-url'];

                // Hide loading indicator
                loadingIndicator.style.display = 'none';

                // Change the URL in the address bar
                history.replaceState({}, '', 'player.html');
            } else {
                loadingIndicator.innerHTML = '<p class="text-danger">Movie not found. Please try again.</p>';
            }
        })
        .catch(error => {
            loadingIndicator.innerHTML = '<p class="text-danger">Error loading data. Please try again later.</p>';
            console.error('Error loading data:', error);
        });
});

const iframe = document.getElementById('video-frame');

// This part won't work if the iframe is cross-origin
iframe.onload = function() {
    try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

        // Prevent popups for links with target="_blank"
        iframeDoc.addEventListener('click', function(event) {
            const target = event.target;

            if (target.tagName === 'A' && target.getAttribute('target') === '_blank') {
                event.preventDefault();
                console.log('Popup prevented for:', target.href);
                // Optionally, handle the link here (e.g., show a message)
            }
        });
    } catch (e) {
        console.warn('Cross-origin policy restricts access to iframe content.');
    }
};

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
