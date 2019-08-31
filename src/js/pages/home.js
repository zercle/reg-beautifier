/* Edit page title */
let noticeTitle = document.querySelectorAll('#page > table:nth-child(5) > tbody > tr > td:nth-child(3) > div:nth-child(2) > div:nth-child(1)');
// let noticeTitle = document.querySelectorAll('td.Mainheadermsg');

if (noticeTitle) {
    if (getCurrentLanguage() === 'th') {
        noticeTitle[0].innerHTML = 'ประกาศ';
    } else {
        noticeTitle[0].innerHTML = 'News';
    }
}


// /* FIXED TWITTER SHARE BUTTON */
// let twitter_share_button = document.querySelectorAll('.twitter-share-button');

// if (twitter_share_button.length !== 0) {
//     for (let i = 0; i < twitter_share_button.length; i++) {
//         // cannot directly access .src due to iframe security issue
//         twitter_share_button[i].parentElement.innerHTML = twitter_share_button[i].parentElement.innerHTML.replace(/platform0/g, 'platform');
//     }
// }
