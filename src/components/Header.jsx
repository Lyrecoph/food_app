import { useContext } from 'react'
import LogoFood from '../assets/logo.jpg'
import Button from './UI/Button'
import CartContext from './store/cartContext'
export default function Header(){
    const cartCtx = useContext(CartContext);
    
    const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
        return totalNumberOfItems + item.quantity;
    }, 0);
    
    return(
        <header id="main-header">
            <div id="title">
                <img src={LogoFood} alt="A restaurant" />
                <h1>Food App</h1>
            </div>
            <nav>
                <Button textOnly>Cart ({totalCartItems})</Button>
            </nav>
        </header>
    )
}