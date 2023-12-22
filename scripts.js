
//Constructeur pour les cartes
//J'ai appeler tous les cinqs ingrédients et quantités parce que je n'avais pas assez de temps pour figurer un loop.
function creerCarte(recette) {
    $("#divrecettes").append(`
    <div class="card">
        <div class="card-body">
            <h4 class="card-title">${recette.nom}</h4>
            <div class="card-text">
                <p>Ingrédients</p>
                <ul>
                    <li>${recette.ingredients[0]}  (${recette.quantites[0]})</li>
                    <li>${recette.ingredients[1]}  (${recette.quantites[1]})</li>
                    <li>${recette.ingredients[2]}  (${recette.quantites[2]})</li>
                    <li>${recette.ingredients[3]}  (${recette.quantites[3]})</li>
                    <li>${recette.ingredients[4]}  (${recette.quantites[4]})</li>
                </ul>
                <p>Instructions: ${recette.instructions}</p>
            </div>
            <input type="button" onclick="supprimer(${recette.id})" class="delete btn btn-danger" style="float: right;" value="Supprimer">
        </div>
    </div>`);
}
//Va servir a compter les recettes pour facilité le travail de trouver le id lors d'un ajout.
//Par contre j'ai réaliser par après que si je suprimme une recette les ids vont pas automatiquement se régler donc ça se peux que je rentre un mauvais ID dans le localstorage.
//Donc je vais laisser faire.
let qterecettes = 0
function affichertout() {
    qterecettes = 0
    $("#divrecettes").text("")
    fetch('https://658588ee022766bcb8c8d70b.mockapi.io/recettes/')
        .then(function (reponse) {
            //Un problème s'est produit
            if(!reponse.ok){
                //lancer une expedition (pas de distinction de syntaxe entre exception et erreur)
                throw new Error ("Erreur "+reponse.status);
            }
            return reponse.json();
        })
        .then(function (recettes) {
            recettes.forEach(function (recette) {
                creerCarte(recette)
                qterecettes++;
            });
            cachesup()
        })
        //attraper et gerer
        .catch(function (erreur) {
            $('.alert').text(erreur.message).removeClass('d-none');
        });
}

affichertout()

//caché les boutons suprimmer
function cachesup() {

}

//Constructeur de recette
function Recette(nom = "", ingredients = [], quantites = [], instructions = "") {
    this.nom = nom
    this.ingredients = ingredients
    this.quantites = quantites
    this.instructions = instructions
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
    creerlistingredient()
    creerlistquantites()
    const recette = new Recette($("#nom").val(), listingredients, listquantites, $("#instructions").val())

    fetch('https://658588ee022766bcb8c8d70b.mockapi.io/recettes/', {
        method: 'POST',
        headers: {'content-type':'application/json'},
        // Envoyer les donnees JSON
        body: JSON.stringify(recette)
    }).then(res => {
        if (res.ok) {
            // Create a success message element
            const successMessage = document.createElement('div');
            successMessage.className = 'alert alert-success mt-3';
            successMessage.innerHTML = 'La recette à été ajoutée!';

            // Append the success message to the main container
            $('#message').append(successMessage);

            // Remove the success message after a delay (e.g., 3 seconds)
            setTimeout(() => {
                $(successMessage).remove();
            }, 3000);

            localStorage.key(qterecettes++)
            affichertout();

            return res.json();

        }
        throw new Error("Erreur " + res.status);
    }).then(task => {
        $("#nom").val("")
        $("#ing-1").val("")
        $("#ing-2").val("")
        $("#ing-3").val("")
        $("#ing-4").val("")
        $("#ing-5").val("")
        $("#qte-1").val("")
        $("#qte-2").val("")
        $("#qte-3").val("")
        $("#qte-4").val("")
        $("#qte-5").val("")
        $("#instructions").val("")
    }).catch(error => {
        $('.alert').text(error.message).removeClass('d-none');
    })
}

//Fonction pour suprimmer
function supprimer(id) {
    fetch('https://658588ee022766bcb8c8d70b.mockapi.io/recettes/'+id, {
        method: 'DELETE',
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        throw new Error ("Erreur "+res.status);
    }).then(manga => {
        affichertout()
    }).catch(error => {
        $('.alert').text(error.message).removeClass('d-none');
    })
}














