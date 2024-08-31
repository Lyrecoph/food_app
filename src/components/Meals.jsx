import { useEffect } from "react";
import { useState } from "react";
import MealItem from "./MealItem";
import useHttp from "./hooks/useHttp";

const requestConfig = {};

// Composant permettant de charger les données relatives aux repas à partir du backend
export default function Meals(){
    // hook personnalisé permettant de gérer l'état des erreurs,
    // l'état de chargement de donnée, et les données
    const {
        data: loadedMeals, 
        isLoading, 
        error,
    } = useHttp('http://localhost:3000/meals', requestConfig, []);

    if(isLoading){
        return <p>Fetching meals...</p>
    }
    
    return(
        <ul id="meals">
            {loadedMeals.map((meal) => (
                <MealItem key={meal.id} meal={meal} />
            ))}
        </ul>
    )
}