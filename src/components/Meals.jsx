import { useEffect } from "react";
import { useState } from "react";

// Composant permettant de charger les données relatives aux repas à partir du backend
export default function Meals(){
    // Etat a été crée au premier à bord vu qu'au départ les données ne seront pas 
    // encore disponible et qu'il faut mettre l'interface utilisateur à jour
    const [loadedMeals, setLoadedMeals] = useState([]);

    useEffect(() => {
        async function fetchMeals(){
            //recupère les données relatives aux repas
            const response = await fetch('http://localhost:3000/meals');
    
            if(!response.ok){
    
            }
            // extraction des données 
            const meals = await response.json();
            setLoadedMeals(meals);
        };

        fetchMeals();
        
    }, [])
    return(
        <ul id="meals">
            {loadedMeals.map((meal) => (
                <li key={meal.id}>{meal.name}</li>
            ))}
        </ul>
    )
}