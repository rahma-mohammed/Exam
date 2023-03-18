import {Contact} from '../js/Contact.js'
export class SearchBox {
    constructor() {  
        let LeftBoxTopUl = document.getElementById("LeftBoxTopUl")
        this.searchByName("")
        this.addclass()
        this.SearchBoxclick()
        this.adsId()
        this.getClick()
    }
    addclass() {
        for (let index = 0; index < LeftBoxTopUl.children.length; index++) {
            LeftBoxTopUl.children[index].classList.add(`item${index + 1}`, "forItem");
        }
    }
    SearchBoxclick() {
        $("#Setting").click(function () {
            let leftBox = $(".SearchBox").css("left")
            if (leftBox == "0px") {
                let LeftBox = $(".LeftBox").outerWidth()
                $("#Setting").removeClass("fa-solid fa-xmark").addClass("fa fa-align-justify");
                $(".SearchBox").animate({ left: `-${LeftBox}px` }, 1000)
                $(".item1").animate({ opacity: "0", paddingTop: "500px" }, 1000)
                $(".item2").animate({ opacity: "0", paddingTop: "500px" }, 1000)
                $(".item3").animate({ opacity: "0", paddingTop: "500px" }, 1000)
                $(".item4").animate({ opacity: "0", paddingTop: "500px" }, 1000)
                $(".item5").animate({ opacity: "0", paddingTop: "500px" }, 1000)
            }
            else {
                $("#Setting").removeClass("fa fa-align-justify").addClass("fa-solid fa-xmark");
                $(".SearchBox").animate({ left: `0px` }, 1000)
                $(".item1").animate({ opacity: "1", paddingTop: "25px" }, 1000)
                $(".item2").animate({ opacity: "1", paddingTop: "25px" }, 1000)
                $(".item3").animate({ opacity: "1", paddingTop: "25px" }, 1000)
                $(".item4").animate({ opacity: "1", paddingTop: "25px" }, 1000)
                $(".item5").animate({ opacity: "1", paddingTop: "25px" }, 1000)
            }
        })
    }
    adsId() {
        var choices = $("#LeftBoxTopUl li").children()
        for (let index = 0; index < choices.length; index++) {
            var x = choices[index]
            choices[index].setAttribute("id", choices[index].text.replace(' ', ''));
        }

    }
    getClick() {
        $("#LeftBoxTopUl a").click((e) => {
            let listName = e.target.getAttribute("id")
            if (listName == "Search") {
                this.clearCategory()
                $(".SearchText").fadeIn(100)
                document.getElementById("SearchText").innerHTML = `
                <div class="input-group flex-nowrap mt-5">
                    <input type="text" id="searchByName" class="bg-transparent text-light  border-0 border-bottom text-center rounded form-control"
                        placeholder="Search By Name">
                    <input type="text" id="searchByletter" class="ms-2 text-center text-light border-0 border-bottom bg-transparent rounded form-control" placeholder="Search By First Letter" aria-label="Server">
             </div>`
                $("#searchByName").keyup((e) => {
                    this.searchByName(e.target.value)
                })
                $("#searchByletter").keyup((e) => {
                    this.searchByletter(e.target.value)
                })
            } else if (listName == "Categories") {
                this.clearCategory()
                $(".SearchText").fadeOut(100)
                this.getData("categories")

            } else if (listName == "Area") {
                this.clearCategory()
                $(".SearchText").fadeOut(100)
                this.getData("Area")

            } else if (listName == "Ingredients") {
                this.clearCategory()
                $(".SearchText").fadeOut(100)
                this.getData("Ingredients")
            }
            else{
               let v = new Contact()
               v.getsubmitBtn()
            }
            let LeftBox = $(".LeftBox").outerWidth()
                $("#Setting").removeClass("fa-solid fa-xmark").addClass("fa fa-align-justify");
                $(".SearchBox").animate({ left: `-${LeftBox}px` }, 1000)
        })
    }
    async searchByName(value) {
        $(".Category").fadeIn(100)
        let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`)
        meals = await meals.json()
        $(".ProductDetails").fadeOut(100)
        this.displayCategory(meals.meals)
    }
    async searchByletter(value) {
        if (value) {
            $(".Category").fadeIn(100)
            let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${value}`)
            meals = await meals.json()
            if (meals.meals) {
                $(".ProductDetails").fadeOut(100)
                this.displayCategory(meals.meals)
            }
        }
    }
    displayCategory(value) {
        let Category = ""
        for (let i = 0; i < value.length; i++) {
            Category += `
                <div class="col-md-4 col-lg-3 RowContenar">
                    <div class="RowContent" id="${value[i].idMeal}">
                        <img class="w-100" src="${value[i].strMealThumb}" alt="${value[i].strMeal}">
                        <div class="leayr" id="leayr">
                            <h2>${value[i].strMeal}</h2>
                        </div>
                    </div>
        </div>`
        }
        document.getElementById("CategoryRow").innerHTML = Category
        this.onMealClick()
    }
    onMealClick() {
        $(".RowContent").click((e) => {
            if (e.target.localName == "h2") {
                this.getMeal(e.target.parentElement.parentElement.id)
            }
            else {
                this.getMeal(e.target.parentElement.id)
            }
        })
    }
    async getMeal(mealID) {
        $(".ProductDetails").fadeIn(100)
        let meal = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
        meal = await meal.json()
        this.displayMeal(meal.meals[0])
        $(".Category").fadeOut(500)
    }
    displayMeal(value) {
        let recipes = ""
        for (let i = 1; i <= 20; i++) {
            if (value[`strIngredient${i}`]) {
                recipes += `
            <li class="my-3 mx-1 p-1 rounded alert-success"> ${value[`strMeasure${i}`]} ${value[`strIngredient${i}`]}</li>`
            }
        }
        let tags = value.strTags?.split(",")
        let tagsStr = ""
        for (let i = 0; i < tags?.length; i++) { tagsStr += `<li class="my-3 mx-1 p-1 alert-danger rounded">${tags[i]}</li>` }
        let Meal =
            ` <div class="col-md-12 col-lg-4 text-center DetailsContenar">
                <img src="${value.strMealThumb}" class="w-100" alt="">
                <h2>${value.strMeal}</h2>
              </div>
              <div class="col-md-12 col-lg-8 DetailsText">
              <h2>Instructions</h2>
              <p>${value.strInstructions}</p>
              <p><b class="fw-bolder">Area :</b> ${value.strArea}</p>
              <p><b class="fw-bolder">Category :</b>  ${value.strCategory}</p>
              <h3>Recipes :</h3>
              <ul class="d-flex flex-wrap" id="recipes">
                  <li class="my-3 mx-1 p-1 rounded alert-success">1 lb Salmon</li>
              </ul>
              <h3 class="my-2 mx-1 p-1">Tags :</h3>
              <ul class="d-flex " id="tags">
                  <li class="my-3 mx-1 p-1 alert-danger rounded">Streetfood</li>
              </ul>
              <a class="btn btn-success text-white" target="_blank" href="${value.strSource}">Source</a>
              <a class="btn btn-danger text-white" target="_blank" href="${value.strYoutube}">Youtub</a>
          </div>
            `
        document.getElementById("Meal").innerHTML = Meal
        document.getElementById("recipes").innerHTML = recipes
        document.getElementById("tags").innerHTML = tagsStr
    }
    async getData(value) {
        let type = ''
        let date = ''
        if (value == "categories") {
            type = "categories.php"
            date = await fetch(`https://www.themealdb.com/api/json/v1/1/${type}`);
            date = await date.json()
            $(".Category").fadeIn(100)
            this.displayCategories(date.categories)

        } else if (value == "Area") {
            type = "list.php?a=list"
            date = await fetch(`https://www.themealdb.com/api/json/v1/1/${type}`);
            date = await date.json()
            this.displayArea(date)
        }
        else {
            type = "list.php?i=list"
            date = await fetch(`https://www.themealdb.com/api/json/v1/1/${type}`);
            date = await date.json()
            this.displayIngredients(date)
        }
    }
    displayCategories(value) {
        let Category = ""
        for (let i = 0; i < value.length; i++) {
            Category += `
                <div class="col-md-4 col-lg-3 RowContenar">
                    <div class="RowContent" id="${value[i].strCategory}">
                        <img class="w-100" src="${value[i].strCategoryThumb}" alt="${value[i].strCategory}">
                        <div class="leayr" id="leayr">
                            <h2>${value[i].strCategory}</h2>
                            <p>${value[i].strCategoryDescription}</p>
                        </div>
                    </div>
        </div>`
        }
        document.getElementById("CategoryRow").innerHTML = Category
        this.onCategoriesClick()
    }
    clearCategory() {
        document.getElementById("CategoryRow").innerHTML = ''
        document.getElementById("Meal").innerHTML = ''
        document.getElementById("Area").innerHTML = ''
        $(".ProductDetails").fadeOut(100)
        $(".Area").fadeOut(500)
        $(".ContactUs").fadeOut(100)
    }
    onCategoriesClick() {
        $(".RowContent").click((e) => {
            if (e.target.localName == "h2") {
                this.filterByCategory(e.target.parentElement.parentElement.id)
            }
            else if (e.target.localName == "p") {
                this.filterByCategory(e.target.parentElement.parentElement.id)
            }
            else {
                this.filterByCategory(e.target.parentElement.id)
            }
        })
    }
    async filterByCategory(value) {
        this.clearCategory()
        let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${value}`)
        meals = await meals.json()
        console.log(meals.meals);
        this.displayCategory(meals.meals)
    }
    displayArea(value) {

        let areaData = ""
        for (var i = 0; i < value.meals.length; i++) {
            areaData += `
         <div class="col-md-4 col-lg-3 AreaContenar">
             <div class="AreaContent" id="${value.meals[i].strArea}">
               <i class="fa-solid fa-city fa-3x"></i>
                <h2>${value.meals[i].strArea}</h2>
             </div>
         </div>`
        }
        $(".Area").fadeIn(100)
        document.getElementById("Area").innerHTML = areaData
        this.onAreaClick()
    }
    onAreaClick() {
        $(".AreaContent").click((e) => {
                this.GetArea(e.target.parentElement.id)
        })
    }
    async GetArea(value) {      
        let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${value}`)
        meals = await meals.json()
        $(".Category").fadeIn(100)
        this.displayCategory(meals.meals)
        $(".Area").fadeOut(500)
    }
    displayIngredients(value) {
        let areaData = ""
        let spliceData = value.meals.splice(0,20)
        for (var i = 0; i < spliceData.length; i++) {
            areaData += `
            <div class="col-md-4 col-lg-3 AreaContenar">
            <div class="AreaContent"  id="${spliceData[i].strIngredient}">
                <i class="fa-solid fa-bowl-food fa-3x text-success"></i>
                <h2>${spliceData[i].strIngredient}</h2>
                <p>${spliceData[i].strDescription?.split(" ")?.splice(0,20)?.join(" ")}</p>
            </div>
        </div>`
        }
        $(".Area").fadeIn(100)
        document.getElementById("Area").innerHTML = areaData
       
        this.onIngredientClick()
    }
    onIngredientClick() {
        $(".AreaContent").click((e) => {
                this.getIngredient(e.target.parentElement.id)
        })
    }
    async getIngredient(value) {  
        let meal = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${value}`)
        meal = await meal.json()
        $(".Category").fadeIn(100)
        this.displayCategory(meal.meals)
        $(".Area").fadeOut(500)
    }
    
}

