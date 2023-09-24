"use strict";


// Initialisation des variables caractéristiques, prénoms, stats et de Jason.
let caractéristiques = ["nerd", "sportif", "blonde", "froussard", "traître"];                       // Tableau des caractéristiques
let prenoms = ["Camille", "Lucas", "Greg", "Maxime", "Jane"];                                       // Tableau des prénoms
let stats = [[0.2, 0.8, 0.2], [0.6, 0.6, 0.9], [0.1, 0.4, 0.4], [0.4, 0.5, 0.5], [0.2, 0.5, 0.3]];  // Tableau de tableau des stats de probabilité.
let joueurs = [];                                                                                   // Tableau où sera ajouté les objets Personnage.
let survivantsMorts = [];                                                                           // Tableau des personnes mortes. (Hors Jason)
let tueur = ["Jason", 50];                                                                          // Variable qu définit Jason


class Personnage {

    constructor(nom, caractéristique, probaDead, probaDmg, probaDmgDead) {                          //Constructeur de survivant(stat,nom,etc...)
        this.nom = nom;
        this.caractéristique = caractéristique;
        this.probaDead = probaDead;
        this.probaDmg = probaDmg;
        this.probaDmgDead = probaDmgDead;

    }
}

function combat() {
    let affichageMort = "";

    if (joueurs.length >= 1 && tueur[1] > 0) {                                               //Tant qu'il y a des survivants le tueur attaque aléatoiremment un survivant
        let chiffreSurvivantAleatoire = Math.floor(Math.random() * joueurs.length);
        let survivantCible = joueurs[chiffreSurvivantAleatoire]
        attaqueTueur(survivantCible, chiffreSurvivantAleatoire)
        

    } else if (joueurs.length >= 1 && tueur[1] <= 0) {                                              //Si Jason est mort affichage des survivants morts

        for (let i = 0; i < survivantsMorts.length; i++) {
            let test = survivantsMorts[i]; 

            if (survivantsMorts.length > 1) {
                if (test == survivantsMorts[survivantsMorts.length - 1]) {
                    affichageMort += `et ${test}.`;                                                 

                } else if (test == survivantsMorts[survivantsMorts.length - 2]) {
                    affichageMort += `${test} `                                                     
                } else {
                    affichageMort += `${test}, `;
                }
            } 
            else {
                affichageMort += `${test}`
            }
        }

        if (!affichageMort) {
        console.log("Jason est mort ! Aucun survivant n'est mort ඞඞඞඞඞ !")         //Message si Jason meurt et que aucun survivant n'est mort
        } else {
            console.log("Jason est mort ! Mais RIP à", affichageMort + " ✞ ඞ")                        //Message si Jason meurt et qu'il y a des morts chez les survivants
        }

    } else if (joueurs.length == 0 && tueur[1] > 0) {                                                 //Message si tout le monde meurt avant Jason
        console.log("Jason a gagné ඞ🔪, il ne reste plus aucun survivant.");                              

    } else if (joueurs.length == 0 && tueur[1] <= 0) {                                                //Message si tout le monde meurt (survivant + Jason)
        console.log("Tous le monde est mort...", affichageMort + " 💀");
    }

}

function attaqueTueur(survivantCible, chiffreSurvivantAleatoire) {                                    //Système d'attaque du tueur
    let valeurAleatoire = Math.random();

    if (valeurAleatoire < survivantCible["probaDead"]) {                                              //Compare une valeur aléatoire à probaDmg d'un survivant ciblé
        console.log("Jason a tué", survivantCible["nom"]);                                            //Si valeur aléatoire < probaDead Jason tue le survivant
        survivantsMorts.push(survivantCible["nom"]);
        joueurs.splice(chiffreSurvivantAleatoire, 1);

      } else if (valeurAleatoire < survivantCible["probaDead"] + survivantCible["probaDmg"]) {        //Compare une valeur aléatoire à probaDead + probaDmg d'un survivant ciblé
        console.log(survivantCible["nom"],"esquive et met 10 dégâts à Jason !");                      //Si valeur aléatoire < (probaDead + probaDmg) le survivant esquive et -10 à la vie du tueur
        tueur[1] -= 10;

      } else  { 
        console.log(survivantCible["nom"] ,"se sacrifie et met 15 dégâts à Jason !");                 //Sinon le survivant meurt et -15 à la vie du tueur + retire le survivant de la liste des survivants restants
        tueur[1] -= 15;
        survivantsMorts.push(survivantCible["nom"]);
        joueurs.splice(chiffreSurvivantAleatoire, 1);
      }


    console.log("Survivants morts :", survivantsMorts);

    combat()

};


// Pour chaque nom dans le tableau prenoms, une caractéristique et des stats vont être mis chacune dans une variable.
prenoms.forEach(nom => { 
    let i = Math.floor(Math.random() * caractéristiques.length); // Nombre aléatoire entre 0 et 4   
    let caractéristique = caractéristiques.splice(i, 1);         // Prend un élément du tableau caractéristiques a partir de l'index i en le retirant du tableau.

    let j = Math.floor(Math.random() * stats.length);            // Nombre aléatoire entre 0 et 4    
    let statPerso = stats.splice(j, 1);                          // Prend un élément du tableau stats a partir de l'index j en le retirant du tableau.

    let joueur = new Personnage(nom, caractéristique, statPerso[0][0], statPerso[0][1], statPerso[0][2]);
    joueurs.push(joueur)
});

combat()


//Code réalisé à l'aide de Mattéo qui m'a expliqué son code et que j'ai refait avec son aide afin de tout comprendre 
