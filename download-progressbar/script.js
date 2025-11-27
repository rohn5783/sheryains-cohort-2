let progressBar = document.querySelector(".progress-bar");
let para = document.querySelector("p");
let progress = 0;
let button = document.querySelector("#myBtn");

button.addEventListener("click", function() {

    // Disable button as soon as clicked
    button.disabled = true;
    button.style.cursor = "not-allowed";
    

    let download = setInterval(() => {
        progress += 1;
        progressBar.style.width = progress + "%";
        para.innerHTML = progress + "% completed";

        if (progress >= 100) {
            clearInterval(download);
        }
    }, 100);

});


