const navbar = document.querySelector(".navbar.fixed-top");
console.log(navbar);

window.onscroll = () => {
    if (window.scrollY >= 50){
        navbar.classList.add("bg-light");
        navbar.classList.remove("bg-transparent");
    }
    else{
        navbar.classList.add("bg-transparent");
        navbar.classList.remove("bg-light");
    }
};