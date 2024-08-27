import LogoFood from '../assets/logo.jpg'
export default function Header(){
    return(
        <header id="main-header">
            <div id="title">
                <img src={LogoFood} alt="A restaurant" />
                <h1>Food App</h1>
            </div>
            <nav>
                <button>Cart (0)</button>
            </nav>
        </header>
    )
}