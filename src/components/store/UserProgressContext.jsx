import { createContext, useContext, useState } from "react";

// Affichage du panier et la page de l'écran de paiement
const UserProgressContext = createContext({
    progress: '',
    showCart: () => {},
    hideCart: () => {},
    showCheckout: () => {},
    hideCheckout: () => {}
})

export function UserProgressContextProvider({children}) {
    // etant donnée que nous avons définit une chaine vide au départ
    // signifie que nous ne voulons pas afficher de modal ni pour 
    // la caisse ni pour le panier
    const [userProgress, setUserProgress] = useState('');

    function showCart(){
        setUserProgress('cart');
    }

    function hideCart(){
        setUserProgress('')
    }

    function showCheckout(){
        setUserProgress('checkout');
    }

    function hideCheckout(){
        setUserProgress('')
    }

    const userProgressCtx = {
        progress: userProgress,
        showCart,
        hideCart,
        showCheckout,
        hideCheckout
    }

    return (
        <UserProgressContext.Provider value={userProgressCtx}>
            {children}
        </UserProgressContext.Provider>
    )

}

export default UserProgressContext