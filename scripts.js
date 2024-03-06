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
    videoList.forEach(video => {
        const videoItem = document.createElement('div');
        videoItem.classList.add('video-item');
        
        // Creating title element
        const titleElement = document.createElement('h6');
        titleElement.innerText = video.title;
        titleElement.style.fontWeight = 'bold';
        titleElement.style.marginBottom = '5px';
        titleElement.style.backgroundColor = 'black';
        titleElement.style.color = 'orange';

        videoItem.appendChild(titleElement);
        
        // Creating iframe element
        const iframe = document.createElement('iframe');
        iframe.setAttribute('src', video.src);
        iframe.setAttribute('width', '100%');
        iframe.setAttribute('height', '100%');
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allow', 'autoplay; fullscreen');
        iframe.setAttribute('allowfullscreen', '');
        videoItem.appendChild(iframe);
        
        container.appendChild(videoItem);
    });
}



function searchVideos() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filteredVideos = videos.filter(video => video.title.toLowerCase().includes(searchTerm));
    displayVideos(filteredVideos);
}

function filterVideos(type) {
    const filteredVideos = videos.filter(video => video.type === type);
    displayVideos(filteredVideos);
}

// Display all videos initially
displayVideos(videos);
