let players = [];
const videoInputs = [
    "video-url-1",
    "video-url-2",
    "video-url-3",
    "video-url-4"
];

function onYouTubeIframeAPIReady() {
    console.log('YouTube API ready.');
}

document.getElementById('url-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const playerContainer = document.getElementById('player-container');
    playerContainer.innerHTML = ''; // Reset the players
    players = []; // Reset the players array

    videoInputs.forEach((inputId, index) => {
        const url = document.getElementById(inputId).value;
        const videoId = extractVideoId(url);
        if (videoId) {
            addPlayer(videoId, index);
        }
    });
});

function extractVideoId(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)|youtu\.be\/([^&]+)/;
    const match = url.match(regex);
    return match ? match[1] || match[2] : null;
}

function addPlayer(videoId, index) {
    const playerDiv = document.createElement('div');
    playerDiv.id = `player-${index}`;
    document.getElementById('player-container').appendChild(playerDiv);

    const player = new YT.Player(playerDiv.id, {
        videoId: videoId,
        events: {
            'onReady': onPlayerReady,
        }
    });

    players.push(player);
}

function onPlayerReady(event) {
    const startTime = calculateStartTime();
    event.target.seekTo(startTime, true);
    event.target.playVideo();
}

function calculateStartTime() {
    const currentTime = Math.floor(Date.now() / 1000); // 現在のUNIXタイムスタンプ
    const liveStartTime = 1234567890; // 配信開始時刻（UNIXタイムスタンプ）をAPIで取得
    return currentTime - liveStartTime;
}
