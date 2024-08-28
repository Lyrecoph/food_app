import LogoFood from '../assets/logo.jpg'
import Button from './UI/Button'
export default function Header(){
    return(
        <header id="main-header">
            <div id="title">
                <img src={LogoFood} alt="A restaurant" />
                <h1>Food App</h1>
            </div>
            <nav>
                <Button textOnly>Cart (0)</Button>
            </nav>
        </header>
    )
}