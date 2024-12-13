
import React, { useContext, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { axiosInstance } from "../../Api/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/firbase";
import { DataContext } from "../../components/DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../components/Product/ProductCard";
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat";
import LayOut from "../../components/LayOut/LayOut";
import classes from "./Payment.module.css";

function Payment() {
    const [{ user, basket }, dispatch] = useContext(DataContext);
    const totalItem = basket?.reduce((amount, item) => item.amount + amount, 0);
    const total = basket.reduce((amount, item) => item.price * item.amount + amount, 0);

    const [cardError, setCardError] = useState(null);
    const [processing, setProcessing] = useState(false);

    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    const handleChange = (e) => {
        e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
    };

    const handlePayment = async (e) => {
        e.preventDefault();
        try {
            setProcessing(true);

            // Backend: Request client secret
            const response = await axiosInstance.post(`/payment/create?total=${total * 100}`);
            const clientSecret = response.data?.clientSecret;

            // Stripe: Confirm payment
            const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: { card: elements.getElement(CardElement) },
            });

            // Save order to Firestore
            await db
                .collection("users")
                .doc(user?.uid)
                .collection("orders")
                .doc(paymentIntent.id)
                .set({
                    basket: basket,
                    amount: paymentIntent.amount,
                    created: paymentIntent.created,
                });

            // Clear basket and redirect
            dispatch({
                type: Type.EMPTY_BASKET, // Clear the basket after payment
            });

            setProcessing(false);
            navigate("/orders", { state: { msg: "You have placed a new order" } });
        } catch (error) {
            console.error(error);
            setProcessing(false);
        }
    };

    return (
        <LayOut>
            <div className={classes.payment__header}>Checkout ({totalItem}) items</div>
            <section className={classes.payment}>
                {/* Address Section */}
                <div className={classes.flex}>
                    <h3>Delivery Address</h3>
                    <div>
                        <p>{user?.email}</p>
                        <p>123 React Lane</p>
                        <p>Chicago, IL</p>
                    </div>
                </div>
                <hr />

                {/* Product Section */}
                <div className={classes.flex}>
                    <h3>Review items and delivery</h3>
                    <div>
                        {basket?.map((item) => (
                            <ProductCard key={item.id} product={item} flex={true} />
                        ))}
                    </div>
                </div>
                <hr />

                {/* Payment Method Section */}
                <div className={classes.flex}>
                    <h3>Payment Methods</h3>
                    <div className={classes.payment__card__container}>
                        <div className={classes.payment__details}>
                            <form onSubmit={handlePayment}>
                                {cardError && <small style={{ color: "red" }}>{cardError}</small>}

                                <CardElement onChange={handleChange} />

                                <div className={classes.payment__price}>
                                    <div>
                                        <span style={{ display: "flex", gap: "10px" }}>
                                            <p>Total Order |</p> <CurrencyFormat amount={total} />
                                        </span>
                                    </div>
                                    <button type="submit">
                                        {processing ? (
                                            <div className={classes.loading}>
                                                <ClipLoader color="gray" size={12} />
                                                <p>Please Wait ...</p>
                                            </div>
                                        ) : (
                                            "Pay Now"
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </LayOut>
    );
}

export default Payment;
