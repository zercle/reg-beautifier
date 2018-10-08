/* FIXED TWITTER SHARE BUTTON */
let twitter_share_button = document.querySelectorAll('.twitter-share-button');

for (let i = 0; i < twitter_share_button.length; i++) {

    // cannot directly access .src due to iframe security issue
    twitter_share_button[i].parentElement.innerHTML = twitter_share_button[i].parentElement.innerHTML.replace(/platform0/g, 'platform');
}