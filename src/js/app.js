require('../css/style.css');

console.log(() => {
    var gg =4;
    console.log(gg);

});


fetch("style.css").then((responce) => {responce.text();});

console.log("hello");
