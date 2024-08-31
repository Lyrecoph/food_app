// Vu que nous avons deux composants Checkout et Meals qui doivent 
// tous envoyer des requêtes mêmes si ces requêtes sont envoyées 
// à des moments différents en outre ils doivent tous les deux 
// géres différents états des demandes: ceux qui echouent, 
// en cours de changement et qui reusissent
// Vu qu'il s'agit d'une logique avec état qui devrait avoir un impact  
// sur l'interface utilisateur et ou les changements devraient avoir
// d'impact sur l'interface utilisateur nous avons besoin d'un hooks personnalisée

import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";


async function sendHttpRequest(url, config){
    const response = await fetch(url, config);

    // recuperer le messsage d'erreur definit au niveau du backend
    const resData = await response.json();

    // afficher une erreur si tout ne se passe pas bien
    if(!response.ok){
        throw new Error( resData.message || 'Something went wrong, failed to send request.')
    }

    return resData;
}


export default function useHttp(url, config, initialData){
    // gérer l'état de reussite recuperation des données depuis le backend
    // Etat a été crée au premier à bord vu qu'au départ les données ne seront pas 
    // encore disponible et qu'il faut mettre l'interface utilisateur à jour
    const [data, setData] = useState(initialData);
    // gérer létat de chargement des données
    const [isLoading, setIsLoading] = useState(false);
    // gérer l'état d'erreur
    const [error, setError] = useState();

    // fonction permettant de MAJ un état base sur le statut de la requête
    const sendRequest = useCallback(
        async function sendRequest() {
            setIsLoading(true);
            try {
                const resData = await sendHttpRequest(url, config);
                setData(resData);
            } catch (error) {
                setError(error.message)
            }
            setIsLoading(false);
        }, [url, config])

    useEffect(() => {
        if ((config && (config.method === 'GET' || !config.method)) || !config){
            sendRequest();
        }

    }, [sendRequest])

    return {
        data,
        isLoading,
        error,
        sendRequest 
    }
}