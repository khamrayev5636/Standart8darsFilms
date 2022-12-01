AOS.init();
const elForm = document.querySelector(".form");
const elInput = elForm.querySelector(".input-search");
const elSelect = elForm.querySelector(".select-categories");
const elSort = elForm.querySelector(".select-sort");
const elList = document.querySelector(".list");

// Modal ========================

const elModalImg = document.querySelector(".films-img");
const elModalCat = document.querySelector(".films-cat");
const elModalOverview = document.querySelector(".films-overview");
const elModalLink = document.querySelector(".films-link");

// Domga chizish ==================

function renderFilms(film , regTitle = ""){
    
    elList.innerHTML = "";

    
    film.forEach(element => {
        
        const filmItem = document.createElement("li");
        filmItem.classList.add("item-js");
        filmItem.setAttribute("data-aos" , "fade-up");
        filmItem.setAttribute("data-aos-duration" , "1500");
        const filmImg = document.createElement("img");
        filmImg.classList.add("img-js");
        const filmTitle = document.createElement("h3");
        filmTitle.classList.add("title-js")
        const filmYear = document.createElement("span");
        
        const filmLink = document.createElement("button");
        filmLink.classList.add("button-js");
        filmLink.type = "button";
        filmLink.dataset.id = element.id;
        filmLink.setAttribute("data-bs-toggle" , "modal");
        filmLink.setAttribute("data-bs-target" , "#exampleModalToggle")
        filmLink.textContent = "Show more";
        filmImg.src = element.Poster;
        
        if(regTitle.source != "(?:)" && regTitle){
            
            filmTitle.innerHTML = element.Title.replace(regTitle , `<mark class="bg-danger">${regTitle.source.toLowerCase()}</mark>`);
        }else {
            filmTitle.textContent = element.Title;
        }
        const date = new Date(element.Year)
        filmYear.textContent = `${date.getDate()}.${String(date.getMonth() + 1).padStart(2, 0)}.${date.getFullYear()}`;
        
        filmItem.appendChild(filmImg)
        filmItem.appendChild(filmTitle)
        filmItem.appendChild(filmYear);
        filmItem.appendChild(filmLink);
        
        elList.appendChild(filmItem);
    });
    
}

// Topilgan kinolar =============

function renderFilmsInfo(topilganKino){
    
    elModalImg.src = topilganKino.Poster;
    elModalCat.textContent = topilganKino.genres.join(" , ");
    elModalOverview.textContent = topilganKino.overview;
    elModalLink.href = topilganKino.link;
}

// Event Delegation

elList.addEventListener("click" , function(evt){
    evt.preventDefault();
    
    if(evt.target.matches(".button-js")){
        const btnId = evt.target.dataset.id;
        const findFilms = films.find(findFilm => findFilm.id === btnId);
        
        renderFilmsInfo(findFilms);
    }
    
});

// =================== Categories Render qilish =======================


function renderSelect(categories){

    const categoriesArray = [];

    categories.forEach((item) => {
        item.genres.forEach((list) => {
            if(!categoriesArray.includes(list)){
                categoriesArray.push(list);
                console.log(categoriesArray);
            };
        });
    });



    const elOptionFragment = document.createDocumentFragment()

    categoriesArray.forEach((option) =>{

        const elOption = document.createElement("option");

        elOption.value = option;
        elOption.textContent = option;

        elOptionFragment.appendChild(elOption)

    });

    elSelect.appendChild(elOptionFragment);

};

// ====================== Selectr sort qilish (a-z ; z-a) ==================

function renderSelectSort(filmSort , value){

    if(value == "a-z"){
        filmSort.sort((a , b) => {
            if(a.Title > b.Title){
                return 1
            }else if (a.Title < b.Title){
                return -1;
            }else {
                return 0
            };
        });
    };

    if(value == "z-a"){
        filmSort.sort((a , b) => {
            if(a.Title > b.Title){
                return -1
            }else if (a.Title < b.Title){
                return 1;
            }else {
                return 0
            };
        });
    };

    if(value == "old-new"){
        filmSort.sort((a, b) => a.Year - b.Year);
    }

    if(value == "new-old"){
        filmSort.sort((a, b) => b.Year - a.Year);
    }

}



// =================== FORM FILTER QILISH ===============================

elForm.addEventListener("submit" , (evt)=>{
    evt.preventDefault();
    
    const elInputValue = elInput.value.trim();
    const elSelectValue = elSelect.value.trim();
    const elSortValue = elSort.value.trim();
    
    const elRegx = new RegExp(elInputValue , "gi");
    
    const searchFilms = films.filter((item) => (item.Title.match(elRegx)) && (item.genres.includes(elSelectValue) || elSelectValue === "all"));
    
    if(searchFilms.length > 0){
        renderSelectSort(searchFilms , elSortValue)
        renderFilms(searchFilms , elRegx)
    }else {
        alert("not found!!!")
    }
    
})




renderSelect(films)
renderFilms(films)