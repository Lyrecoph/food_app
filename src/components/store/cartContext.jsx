import { createContext, useContext, useReducer } from "react";
// Diffusion des données aux composants

// 
const CartContext = createContext({
    items: [],
    addItem: (item) => {},
    removeitem: (id) => {}
})

// cette fonction a pour objectif de renvoyer un état MAJ
function cartReducer(state, action){
    // du coup si l'action est ajouter un élément
    if(action.type === 'ADD_ITEM'){
        // nous voulons mettre à jour l'état en ajoutant un 
        // repas recupérer l'index d'un élément existant
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id);
        
        // créer une copie de l'ancien tableau
        const updatedItems = [...state.items];
        // vérifier si l'index de l'article se trouvant dans
        // le panier existe dans le tableau
        if(existingCartItemIndex > -1){
            // recupérer tout les propriétes de l'article existant
            // dans le tableau des éléments de l'état
            const existingItem = state.items[existingCartItemIndex]
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1
            } 
            // ajout de l'élément dans le tableau
            updatedItems[existingCartItemIndex] = updatedItem;
        }else{
            updatedItems.push({...action.item, quantity: 1});
        }
        // retourne les anciennes éléments du tableau ajouter
        // au nouveau
        return {...state, items: updatedItems}
    }
    // s'il s'agit de supprimer un élément
    if(action.type === 'REMOVE_ITEM'){
        // nous voulons retirer un élément de l'état 
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.id);
        // recupérer un article existant dans le panier
        const existingCartItem = state.items[existingCartItemIndex];
        
        // faire copie du tableau
        const updatedItems = [...state.items];
        // si la quantité de l'article est égale à 1
        if(existingCartItem.quantity === 1){
            // supprimer un élément
            updatedItems.splice(existingCartItemIndex, 1);

        }else{
            // recuperer tout les éléments d'un repas
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity-1
            }
            updatedItems[existingCartItemIndex] = updatedItem;
        }

        // retourne les anciennes éléments du tableau ajouter
        // au nouveau
        return {...state, items: updatedItems}
    }

    // sinon du coup retournons tout simplement l'état
    return state
}

// S'occupe de la gestion des données et de l'état en les mettant  
// à la disposition des composants qui souhaitent utilisés
export function CartContextProvider({ children }){
    // contient la fonction reducer et l'etat initial
    // avec cart: etat du panier
    const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

    
    function addItem(item){
        dispatchCartAction({type: 'ADD_ITEM', item})
    }

    function removeItem(id){
        dispatchCartAction({ type: 'REMOVE_ITEM', id})
    }

    const cartContext = {
        items: cart.items,
        addItem,
        removeItem
    }

    return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
}

export default CartContext;