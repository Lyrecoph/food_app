import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "./store/cartContext";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "./store/UserProgressContext";
import useHttp from "./hooks/useHttp";

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
};

export default function Checkout(){
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);
    
    const {
        data, 
        isLoading: isSending, 
        error, 
        sendRequest,
        clearData
    } = useHttp('http://localhost:3000/orders', requestConfig);

    const cartTotal = cartCtx.items.reduce(
        (totalPrice, item) => totalPrice + item.quantity*item.price, 0);

    function handleCloseCheckout(){
        userProgressCtx.hideCheckout();
    }


    function handleFinish(){
        userProgressCtx.hideCheckout();
        cartCtx.clearCart();
        clearData();
    }

    function handleSubmit(event){
        event.preventDefault();

        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());

        sendRequest(
            JSON.stringify({
                order: {
                    items: cartCtx.items,
                    customer: customerData
                }
            }) 
        );
    }

    let actions = (
        <>
            <Button type="button" textOnly onClick={handleCloseCheckout}>
                Close
            </Button>
            <Button>Submit Order</Button> 
        </>
    );

    if(isSending){
        actions = <span>Sending order data...</span>;
    }

    // Affiche une modale qui montre la progression des données
    if(data && !error){
        return (
            <Modal 
                open={userProgressCtx.progress === 'checkout'} 
                onClose={handleFinish}
            >
                <h2>Succes!</h2>
                <h2>Your order was submitted successfully.</h2>
                <p>We will contact you by email in the next few minutes with more details</p>
                <p className="modal-actions">
                    <Button onClick={handleFinish}>Okay</Button>
                </p>
            </Modal>
        )
    }

    return(
        <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleCloseCheckout}>
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

                <Input label="Full Name" type="text" id="name" />
                <Input label="E-mail Address" type="email" id="email" />
                <Input label="Street" type="text" id="street" />
                <div className="control-row">
                    <Input label="Postal Code" type="text" id="postal-code" />
                    <Input label="City" type="text" id="city" />
                </div>

                {error && <Error title="Failed to submit order" message={error} />}

                <p className="modal-actions">{actions}</p>
            </form>

        </Modal>
    )
}