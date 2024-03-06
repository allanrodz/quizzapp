const videos = [
    { title: 'Mark Bergin - St Canice’s Credit Union Senior League Draw', type: 'Interviews', src: 'https://player.vimeo.com/video/917408726?h=00cc57ed9a' },
    { title: 'Evan Shefflin - St Canice’s Credit Union Senior League Draw', type: 'Interviews', src: 'https://player.vimeo.com/video/917408285?h=ee8f0d8075' },
    { title: 'Tom Aylward - St Canice’s Credit Union Senior League Draw', type: 'Interviews', src: 'https://player.vimeo.com/video/917407783?h=63f1456ccd' },
    { title: 'Padraig Walsh - St Canice’s Credit Union Senior League Draw', type: 'Interviews', src: 'https://player.vimeo.com/video/917406969?h=f56d078354' },

    // Add more video objects here
];


function displayVideos(videoList) {
    const container = document.getElementById('videoContainer');
    container.innerHTML = '';

    videoList.forEach((video, index) => {
        const videoItem = document.createElement('div');
        videoItem.classList.add('video-item');

        // Add line between videos (except for the last one)
        if (index !== videoList.length) {
            const line = document.createElement('hr');
            videoItem.appendChild(line);
        }

        // Creating title element
        const titleElement = document.createElement('h6');
        titleElement.innerText = video.title;
        titleElement.classList.add('animated-title'); // Add class for animated title
        titleElement.style.fontWeight = 'bold';
        titleElement.style.marginBottom = '5px';
        titleElement.style.color = 'orange';
        videoItem.appendChild(titleElement);
        
        // Always add line after the title
        const line = document.createElement('hr');
        videoItem.appendChild(line);

        // Creating iframe element
        const iframe = document.createElement('iframe');
        iframe.setAttribute('src', video.src);
        iframe.setAttribute('width', '100%');
        iframe.setAttribute('height', '100%'); // Set height to 100vh
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allow', 'autoplay; fullscreen');
        iframe.setAttribute('allowfullscreen', '');
        videoItem.appendChild(iframe);

        container.appendChild(videoItem);
    });

    // Add class to the first video item to make it visible by default
    const firstVideoItem = container.querySelector('.video-item');
    if (firstVideoItem) {
        firstVideoItem.classList.add('fade-in');
    }
}


function fadeInVideosOnScroll() {
    const videoItems = document.querySelectorAll('.video-item');
    
    videoItems.forEach(videoItem => {
        const top = videoItem.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (top < windowHeight * 0.75) {
            videoItem.classList.add('fade-in');
        }
    });
}

window.addEventListener('scroll', fadeInVideosOnScroll);




function filterVideos(type) {
    const filteredVideos = videos.filter(video => video.type === type);
    displayVideos(filteredVideos);
}

function filterByKeyword(keyword) {
    const filteredVideos = videos.filter(video => video.title.toLowerCase().includes(keyword.toLowerCase()));
    displayVideos(filteredVideos);
}

document.getElementById('searchInput').addEventListener('input', function(event) {
    filterByKeyword(event.target.value);
});

// Display all videos initially
displayVideos(videos);

// Function to scroll to the top of the page
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Function to toggle visibility of back-to-top button based on scroll position
window.addEventListener('scroll', function() {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    if (window.scrollY > 200) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});
