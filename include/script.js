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

//data
document.addEventListener("DOMContentLoaded", () => {
    fetch('include/data.json')
        .then(response => response.json())
        .then(data => {
            const moviesContainer = document.getElementById('movies');
            data.forEach(movie => {
                const movieCard = `
                        
                    <div class="card col-5 col-sm-5 col-md-3 col-lg-2 col-xl-2" style="width: 11rem;">
                        <a href="player.html?title=${encodeURIComponent(movie.title)}" class="text-decoration-none text-reset">
                                <img src="${movie.poster}" class="card-img-top" alt="${movie.title}">
                            <div class="card-body">
                                <p class="card-text">${movie.title} <br> <span class="text-orange">${movie.year}</span></p>
                            </div>
                        </a>
                    </div>
                `;
                moviesContainer.innerHTML += movieCard;
            });
        })
        .catch(error => console.error('Error loading data:', error));
});

//prevent
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
