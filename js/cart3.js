let tbody = document.getElementById("tbody");
let deleteAll = document.getElementById("deleteAll");

let product;
if(localStorage.getItem("ff") == null){
    product = [];
    checkBtn();
}else{
    product = JSON.parse(localStorage.getItem("ff"));
};

function displayThings(){
    let card = '';
    for(let i in product){
        card += `
        <tr>
        <td>${product[i].recipe_id}</td>
        <td>${product[i].title}</td>
        <td>${product[i].publisher}</td>
        <td>${product[i].social_rank}</td>
        <td><img src="${product[i].image_url}" alt="" class="img-fluid w-25"></td>
        <td>${product[i].count}</td>
        <td><button onclick="deleteElement(${i})" class="btn btn-danger">Remove</button></td>
        </tr>
        `
    };
    tbody.innerHTML = card;
};
displayThings();

function checkBtn(){
    if(product.length == 0){
        deleteAll.style.display = "none";
    }else{
        deleteAll.style.display = "inline-block";
    }
}

deleteAll.addEventListener("click", function(){
    product.splice(0);
    localStorage.clear();
    checkBtn();
    displayThings();
});

function deleteElement(index){
    product.splice(index, 1);
    localStorage.setItem("ff", JSON.stringify(product));
    checkBtn();
    displayThings();
}