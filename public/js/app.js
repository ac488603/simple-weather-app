const weatherform = document.querySelector('form');
const search =  document.querySelector('input');
const messageone =  document.getElementById('mess-1');
const messagetwo = document.getElementById('mess-2');


// The code below adds an eventlistener on the form tag. The code extracts the value from the input tag. The value is then 
//passed as a query parameter to the '/weather' end point.  
weatherform.addEventListener('submit', (e) => {
    e.preventDefault(); // prevents page refresh when form is submitted
    messageone.textContent = 'fetching data...';
    messagetwo.textContent = '';
    const searchterm = search.value; 

    fetch(`/weather?address=${searchterm}`).then((response) => {
    response.json().then(data => {
        if(data.error){
            messageone.textContent = data.error; 
        }
        else {
            messageone.textContent = '';
            messagetwo.textContent = data.forecast;
        }
    })
});
}); 