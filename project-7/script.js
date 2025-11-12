let colorButtons = document.querySelectorAll('.color-btn');

colorButtons.forEach(btn => {
    if(localStorage.getItem("color")) 
        document.body.style.background = localStorage.getItem("color");
    console.log(btn.dataset);
    btn.addEventListener("click",function() {
        let selectedColor = this.dataset.color;
        console.log(selectedColor);
btn.style.background = selectedColor;
localStorage.setItem('color', selectedColor);

document.body.style.background = localStorage.getItem('color');
    } )



})