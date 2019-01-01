var quote = document.querySelector(".js-quote");

quote.innerHTML = "loaded";

console.log(quote);
quote.addEventListener('click',function(e){
    quote.innerHTML = "clicked";
});