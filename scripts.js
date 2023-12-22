







//Constructeur de recette
function Recette(nom = "", ingredients = [], quantites = [], userid = 0) {
    this.nom = nom
    this.ingredients = ingredients
    this.quantites = quantites
    this.userid = userid
}

//Creer la liste d'ingrédients
let listingredients = []
function creerlistingredient() {
    listingredients.push($("#ing-1").val(), $("#ing-2").val())
    if( $("#ing-3").val())  {
        listingredients.push($("#ing-3").val())
    }
    if( $("#ing-4").val())  {
        listingredients.push($("#ing-4").val())
    }
    if( $("#ing-5").val())  {
        listingredients.push($("#ing-5").val())
    }
    console.log(listingredients)
}

//Creer la liste des quantités
let listquantites = []
function creerlistquantites() {
    listquantites.push($("#qte-1").val(), $("#qte-2").val())
    if( $("#qte-3").val())  {
        listquantites.push($("#qte-3").val())
    }
    if( $("#qte-4").val())  {
        listquantites.push($("#qte-4").val())
    }
    if( $("#qte-5").val())  {
        listquantites.push($("#qte-5").val())
    }
    console.log(listquantites)
}



function ajouter() {
    event.preventDefault();
    //valider with a if {}
    creerlistingredient()
    creerlistquantites()
}