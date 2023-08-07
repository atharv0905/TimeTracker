let fetchedData;
fetch('/user/getUserById')
    .then(res => res.json())
    .then(data => {
        fetchedData = data;
        console.log(fetchedData);
});

setTimeout(() => {
    if(fetchedData){
        document.querySelector('#loginBtn').textContent = 'My Account';
        document.querySelector('#loginBtn').setAttribute('href', '/file/myAccount');
    }
}, 100);

trackNowBtn = document.querySelector('#trackNowBtn');

const checkIfLoggedIn = () => {
    if(fetchedData){
        return true;
    }
};
trackNowBtn.addEventListener('mouseover', (e) => {
    if(!checkIfLoggedIn()){
        console.log('Login in to track now');
    }
});
trackNowBtn.addEventListener('click', (e) => {
    if(checkIfLoggedIn()){
        trackNowBtn.setAttribute('href', '/tracker');
    }
    else{
        trackNowBtn.setAttribute('href', '/login');
    }
});