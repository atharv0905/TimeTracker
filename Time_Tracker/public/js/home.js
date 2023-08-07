let fetchedData;
fetch('/user/getUserById')
    .then(res => res.json())
    .then(data => {
        fetchedData = data;
        console.log(fetchedData);
});

setTimeout(() => {
    if(fetchedData){
        document.querySelector('#login-btn').textContent = 'My Account';
        document.querySelector('#login-btn').setAttribute('href', '/file/myAccount');
    }
}, 1000);
