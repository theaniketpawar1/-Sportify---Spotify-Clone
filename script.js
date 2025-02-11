document.addEventListener('DOMContentLoaded', () => {
    // Create audio element
    const audioPlayer = new Audio();
    
    // Define the default song path - trying different path formats
    const defaultSongPath = '/audio/arjit%20singh/chaleya.mp3';  // Using relative path with ./

    // Play button toggle
    const playBtn = document.querySelector('.play-btn');
    let isPlaying = false;

    playBtn.addEventListener('click', () => {
        if (audioPlayer.src) {
            if (isPlaying) {
                audioPlayer.pause();
            } else {
                audioPlayer.play();
            }
            isPlaying = !isPlaying;
            playBtn.innerHTML = isPlaying 
                ? '<i class="fas fa-pause"></i>' 
                : '<i class="fas fa-play"></i>';
        }
    });

    // Volume control
    const volumeBtn = document.querySelector('.volume-controls button');
    const volumeSlider = document.querySelector('.volume-slider');
    let lastVolume = volumeSlider.value;
    let isMuted = false;

    volumeBtn.addEventListener('click', () => {
        isMuted = !isMuted;
        if (isMuted) {
            lastVolume = volumeSlider.value;
            volumeSlider.value = 0;
            audioPlayer.volume = 0;
            volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else {
            volumeSlider.value = lastVolume;
            audioPlayer.volume = lastVolume / 100;
            volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
    });

    volumeSlider.addEventListener('input', (e) => {
        audioPlayer.volume = e.target.value / 100;
        if (e.target.value > 0) {
            volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            isMuted = false;
        } else {
            volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            isMuted = true;
        }
    });

    // Add hover effect to sidebar items
    const sidebarItems = document.querySelectorAll('.sidebar nav ul li');
    sidebarItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.opacity = '1';
        });
        item.addEventListener('mouseleave', () => {
            item.style.opacity = '0.7';
        });
    });

    // Sample playlists with real trending and Indian songs
    const playlistsGrid = document.querySelector('.playlists-grid');
    const playlists = [
        {
            name: 'Trending Now',
            image: 'https://i.scdn.co/image/ab67706f00000002ca5a7517156021292e5663a6',
            songs: [
                { name: 'Vampire', artist: 'Olivia Rodrigo', audioSrc: null },
                { name: 'Last Night', artist: 'Morgan Wallen', audioSrc: null },
                { name: 'Cruel Summer', artist: 'Taylor Swift', audioSrc: null }
            ]
        },
        {
            name: 'Bollywood Hits',
            image: 'https://i.scdn.co/image/ab67706f000000025f0ff9251e3cfe641160dc31',
            songs: [
                { name: 'Tere Vaaste', artist: 'Varun Jain, Sachin-Jigar', audioSrc: null },
                { name: 'Kesariya', artist: 'Arijit Singh', audioSrc: null },
                { name: 'Jhoome Jo Pathaan', artist: 'Arijit Singh, Sukriti Kakar', audioSrc: null }
            ]
        },
        {
            name: 'Arijit Singh Mix',
            image: 'https://i.scdn.co/image/ab67616d0000b273df54b99bf55a0fec3c8bc6c0',
            songs: [
                { 
                    name: 'Chaleya', 
                    artist: 'Arijit Singh, Shilpa Rao',
                    audioSrc: '/audio/arjit%20singh/chaleya.mp3'
                },
                { name: 'Heeriye', artist: 'Arijit Singh, Jasleen Royal', audioSrc: null },
                { name: 'Phir Aur Kya Chahiye', artist: 'Arijit Singh', audioSrc: null }
            ]
        },
        {
            name: 'Punjabi Hits',
            image: 'https://i.scdn.co/image/ab67706f00000002141b4ed85534f173f5c64e51',
            songs: [
                { name: 'Softly', artist: 'Karan Aujla', audioSrc: null },
                { name: 'Cheques', artist: 'Shubh', audioSrc: null },
                { name: 'Levels', artist: 'Sidhu Moose Wala', audioSrc: null }
            ]
        },
        {
            name: 'A.R. Rahman Radio',
            image: 'https://i.scdn.co/image/ab67616d0000b273df9a35baaa98675256b35177',
            songs: [
                { name: 'Jai Ho', artist: 'A.R. Rahman', audioSrc: null },
                { name: 'Kun Faya Kun', artist: 'A.R. Rahman, Javed Ali', audioSrc: null },
                { name: 'Masakali', artist: 'A.R. Rahman, Mohit Chauhan', audioSrc: null }
            ]
        },
        {
            name: 'Global Top 50',
            image: 'https://charts-images.scdn.co/assets/locale_en/regional/daily/region_global_default.jpg',
            songs: [
                { name: 'Paint The Town Red', artist: 'Doja Cat', audioSrc: null },
                { name: 'Seven', artist: 'Jung Kook, Latto', audioSrc: null },
                { name: 'Barbie World', artist: 'Nicki Minaj & Ice Spice', audioSrc: null }
            ]
        }
    ];

    // Create playlist detail view
    const mainContent = document.querySelector('.main-content');
    const playlistDetail = document.createElement('div');
    playlistDetail.className = 'playlist-detail';
    mainContent.appendChild(playlistDetail);

    // Create close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'close-btn';
    closeBtn.innerHTML = '<i class="fas fa-times"></i>';
    closeBtn.addEventListener('click', () => {
        playlistDetail.classList.remove('active');
    });
    playlistDetail.appendChild(closeBtn);

    // Modify playlist creation to show songs
    playlists.forEach(playlist => {
        const playlistElement = document.createElement('div');
        playlistElement.className = 'playlist-item';
        playlistElement.innerHTML = `
            <img src="${playlist.image}" alt="${playlist.name}" onerror="handleImageError(this)">
            <h3>${playlist.name}</h3>
        `;
        
        // Add click handler to show playlist details
        playlistElement.addEventListener('click', () => {
            showPlaylistDetail(playlist);
        });
        
        playlistsGrid.appendChild(playlistElement);
    });

    function showPlaylistDetail(playlist) {
        playlistDetail.innerHTML = `
            <button class="close-btn"><i class="fas fa-times"></i></button>
            <div class="playlist-header">
                <img src="${playlist.image}" alt="${playlist.name}" onerror="handleImageError(this)">
                <div class="playlist-info">
                    <span>PLAYLIST</span>
                    <h1>${playlist.name}</h1>
                </div>
            </div>
            <table class="songs-list">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>TITLE</th>
                        <th>ARTIST</th>
                        <th><i class="far fa-clock"></i></th>
                    </tr>
                </thead>
                <tbody>
                    ${playlist.songs.map((song, index) => `
                        <tr>
                            <td class="song-number">${index + 1}</td>
                            <td>${song.name}</td>
                            <td>${song.artist}</td>
                            <td>3:24</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;

        // Add click handler for the close button
        playlistDetail.querySelector('.close-btn').addEventListener('click', () => {
            playlistDetail.classList.remove('active');
        });

        // Update click handler for songs
        playlistDetail.querySelectorAll('tbody tr').forEach((row, index) => {
            row.addEventListener('click', () => {
                const song = playlist.songs[index];
                updateNowPlaying(
                    song.name, 
                    song.artist, 
                    playlist.image,
                    song.audioSrc
                );
            });
        });

        playlistDetail.classList.add('active');
    }

    // Function to update now playing section
    function updateNowPlaying(trackName, artistName, imageUrl, audioSrc) {
        const nowPlayingImg = document.querySelector('.now-playing img');
        const trackNameElement = document.querySelector('.track-name');
        const artistElement = document.querySelector('.artist');

        nowPlayingImg.src = imageUrl;
        trackNameElement.textContent = trackName;
        artistElement.textContent = artistName;

        // Use provided audioSrc or fallback to default
        const songPath = audioSrc || defaultSongPath;
        audioPlayer.src = songPath;
        audioPlayer.play()
            .then(() => {
                playBtn.innerHTML = '<i class="fas fa-pause"></i>';
                isPlaying = true;
            })
            .catch(error => {
                console.error('Error playing audio:', error);
                alert('Error playing the song. Please check the file path.');
            });
    }

    // Add this function at the top of your script
    function handleImageError(img) {
        img.onerror = null; // Prevent infinite loop
        img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYwIiBoZWlnaHQ9IjE2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImEiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiM0NTBhZjUiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNjNGVmZDkiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cGF0aCBmaWxsPSJ1cmwoI2EpIiBkPSJNMCAwaDE2MHYxNjBIMHoiLz48L3N2Zz4=';
    }

    // Add audio ended event handler
    audioPlayer.addEventListener('ended', () => {
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
        isPlaying = false;
    });

    // Set initial volume
    audioPlayer.volume = volumeSlider.value / 100;

    // Add more detailed error handling for audio loading
    audioPlayer.addEventListener('error', (e) => {
        console.error('Audio error:', e);
        console.error('Current src:', audioPlayer.src);
        console.error('Error code:', e.target.error.code);
        console.error('Error message:', e.target.error.message);
    });
}); 