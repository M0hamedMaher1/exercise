window.addEventListener("scroll", function () {
    const nav = document.querySelector(".nav");
    let x = scrollY;
    if (x > 200) {
        nav.style.transform = "translateY(0)";
    } else {
        nav.style.transform = "translateY(calc(-100% + -2px))";
    };
});

let bars = document.getElementById("bars");
let close1 = document.querySelector(".close1");
let aside = document.querySelector(".aside1");

bars.addEventListener("click", function () {
    aside.style.transform = "translateX(0)";
});

close1.addEventListener("click", function () {
    aside.style.transform = "translateX(calc(100% + 2px))"
});

let bars2 = document.querySelector(".bars2");
let bars3 = document.querySelector(".bars3");
let dropDown = document.querySelector(".dropDown2");

let button = "change";

bars2.addEventListener("click", function () {
    if (button === "change") {
        bars3.style.transform = "rotate(720deg)";
        setTimeout(() => {
            bars3.innerHTML = `<i class="fa-solid fa-xmark"></i>`
        }, 300);
        button = "stay";
    } else if (button === "stay") {
        bars3.style.transform = "rotate(0)";
        setTimeout(() => {
            bars3.innerHTML = `<i class="fa-solid fa-bars"></i>`
        }, 300);
        button = "change";
    };
    if (dropDown.style.height == 0) {
        dropDown.style.height = dropDown.scrollHeight + "px";
    } else {
        dropDown.style.height = null;
    };
});

let row = document.getElementById("row");
let spanCount = document.querySelector("#basket span");
let navLinks = document.querySelectorAll(".nav-links");

let list = [];

let cart;
if (localStorage.getItem("ff") == null) {
    cart = [];
} else {
    cart = JSON.parse(localStorage.getItem("ff"));
    spanCount.innerHTML = cart.length;
}

const getData = async function (swap) {
    let api = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${swap}`);
    let response = await api.json();
    let recipes = response.recipes;
    list = recipes;
    displayProducts(recipes);
};
getData("Pizza");

function displayProducts(take) {
    let card = "";
    for (let i in take) {
        card += `
        <div class="card5">
        <div class="image2">
            <span>Sale</span>
            <img src="${take[i].image_url}" alt="">
            <div class="icons">
                <div class="iconn"><i class="scale fa-regular fa-heart"></i></div>
                <div class="iconn"><i class="scale fa-regular fa-eye"></i></div>
                <div class="iconn"><i class="rotate fa-solid fa-rotate"></i></div>
            </div>
            <button class="buy" onclick="addToCart(${i})">
                Add To Cart
            </button>
        </div>
        <div class="card-body2">
            <h4>${take[i].title}</h4>
            <h5>${take[i].publisher}</h5>
            <h5>$${take[i].social_rank}</h5>
            <button class="quick" onclick="openInfo(${i})">
                Quick View
            </button>
        </div>
        </div>
        `
    };
    row.innerHTML = card;
};

navLinks.forEach((element) => {
    element.addEventListener("click", function (e) {
        getData(e.target.textContent);
    });
});

function addToCart(index) {
    let choosenProduct = list[index];
    let final = cart.find((element) => element.recipe_id == choosenProduct.recipe_id);
    if (final) {
        final.count++;
    } else {
        cart.push({
            ...choosenProduct,
            count: 1
        });
    };
    spanCount.innerHTML = cart.length;
    localStorage.setItem("ff", JSON.stringify(cart));
}

function searchProduct(searching) {
    let card = '';
    for (let i in list) {
        if (list[i].title.includes(searching.trim())) {
            card += `
            <div class="card5">
            <div class="image2">
                <span>Sale</span>
                <img src="${list[i].image_url}" alt="">
                <div class="icons">
                    <div class="iconn"><i class="scale fa-regular fa-heart"></i></div>
                    <div class="iconn"><i class="scale fa-regular fa-eye"></i></div>
                    <div class="iconn"><i class="rotate fa-solid fa-rotate"></i></div>
                </div>
                <button class="buy" onclick="addToCart(${i})">
                    Add To Cart
                </button>
            </div>
            <div class="card-body2">
                <h4>${list[i].title}</h4>
                <h5>${list[i].publisher}</h5>
                <h5>$${list[i].social_rank}</h5>
                <button class="quick" onclick="openInfo(${i})">
                    Quick View
                </button>
            </div>
            </div>
            `
        };
    };
    row.innerHTML = card;
};

let overlay = document.querySelector(".overlay");
let leftImage = document.querySelector(".left-image2");
let close2 = document.querySelector(".close2");
let h2 = document.querySelector(".right-info h2");


function openInfo(index) {
    overlay.style.display = "flex";
    let src = list[index].image_url;
    leftImage.style.backgroundImage = `url(${src})`;
    h2.innerText = list[index].title;
};

close2.addEventListener("click", function () {
    overlay.style.display = "none";
});

let overlay2 = document.querySelector(".overlay2");
let boxPhoto = document.querySelector(".boxPhoto");
let buttons = document.querySelectorAll(".boxPhoto i");
let imgs = Array.from(document.querySelectorAll(".image3 img"));

let counter;

imgs.forEach((img, index) => {
    img.addEventListener("click", function () {
        counter = imgs.indexOf(imgs[index]);
        overlay2.style.display = "flex";
        let src = imgs[index].src;
        boxPhoto.style.backgroundImage = `url(${src})`;
    });
});

function prevSlide(){
    counter--;
    if(counter < 0){
        counter = imgs.length - 1;
    };
    let src = imgs[counter].src;
    boxPhoto.style.backgroundImage = `url(${src})`;
};
buttons[0].addEventListener("click", prevSlide);

function nextSlide(){
    counter++;
    if(counter > imgs.length - 1){
        counter = 0;
    };
    let src = imgs[counter].src;
    boxPhoto.style.backgroundImage = `url(${src})`;
};
buttons[1].addEventListener("click", nextSlide)

function closeOverLay(){
    overlay2.style.display = "none"
};
buttons[2].addEventListener("click", closeOverLay);

function autoPlay(){
    setInterval(() => {
        nextSlide();
    }, 3000);
};
buttons[3].addEventListener("click", autoPlay);

document.addEventListener("keyup", function(e){
    if(e.keyCode == 80){
        autoPlay();
    }else if(e.keyCode == 39){
        nextSlide();
    }else if(e.keyCode == 37){
        prevSlide();
    }else if(e.keyCode == 27){
        closeOverLay();
    };
});