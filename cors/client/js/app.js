const requestButton = document.querySelector('#httpRequestButton');
requestButton.addEventListener('click', (event) => {
    fetch("http://localhost:6069/ingredients", {
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin':'*'
        }
    } )
    .then((req) => {
      return req.text();
    })
    .then((result) => {
      console.log(result);
    });
});

