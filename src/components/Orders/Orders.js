/*import React from 'react';
import { useStateContext } from '../../context/StateContextProvider';
import styles from './Orders.module.scss';
import EmptyState from './EmptyState';

export default function Orders() {
  const { cartItems, handleRemoveCart, handleCartClick, totalPrice, cartItemQty, totalQty, formatPrice } = useStateContext()

  const checkout = async () => {
    await fetch('https://cakeit-shop.vercel.app/checkout', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({items: cartItems})
    }).then((response) => {
        return response.json();
    }).then((response) => {
        if(response.url) {
            window.location.assign(response.url); // Forwarding user to Stripe
        }
    });
  }

  return (
    <section className={styles.orders}>
      <div className={styles.ordersContainer}>
        <div className={styles.ordersHeader}>
            <i className="fa-solid fa-chevron-left" onClick={handleCartClick}></i>
            <span>Orders ({totalQty})</span>
        </div>
        <div className={styles["orders-wrapper"]}>
        {
          totalQty !== 0 ? (
            cartItems?.map((cake, index) => (
              <div key={index} className={styles["order-content"]}>
                <i className="fa-solid fa-x" onClick={() => handleRemoveCart(cake)}></i>
                <div className={styles["order-img-wrapper"]}>
                  <img src={cake.images[0]} alt={`${cake.cakeName}`} />
                </div>
                <div className="order-details">
                  <div className={styles["cakeName-category"]}>
                    <h3>{cake.cakeName}</h3>
                    <p>{cake.category} Cake</p>
                  </div>
                  <div className={styles.quantity}>
                    <i className="fa-solid fa-minus fa-xs" onClick={() => cartItemQty("dec", cake.index)}></i>
                    <span>{cake.quantity}</span>
                    <i className="fa-solid fa-plus fa-xs" onClick={() => cartItemQty("inc", cake.index)}></i>
                  </div>
                </div>
                <p className={styles["order-price"]}>Ksh{formatPrice(cake.details.price)}</p>
              </div>
            ))
          )
          : <EmptyState />
        }
        </div>
        <div className={styles.totalSummary}>
            <span>Subtotal</span>
            <span>Ksh{formatPrice(totalPrice)}</span>
        </div>
        { totalQty !== 0 && <button className={styles["order__payment"]} onClick={checkout}>Make Your Order</button> }
      </div>
    </section>
  )
}
*/

import React from 'react';
import { useStateContext } from '../../context/StateContextProvider';
import styles from './Orders.module.scss';
import EmptyState from './EmptyState';

export default function Orders() {
  const { cartItems, handleRemoveCart, handleCartClick, totalPrice, cartItemQty, totalQty, formatPrice } = useStateContext()

  const checkout = () => {
    // Owner's WhatsApp number
    const ownerPhoneNumber = "+254113791813"; // Example: Add platform owner's phone number here

    // Format cart items into a message
    const orderDetails = cartItems
      .map((cake, index) => (
        `\n\nItem ${index + 1}:\n- Name: ${cake.cakeName}\n- Category: ${cake.category}\n- Quantity: ${cake.quantity}\n- Price: Ksh${formatPrice(cake.details.price)}`
      ))
      .join("");

    const message = `Hello Bake With Bartay! I would like to place an order for the following cakes: ${orderDetails}\n\nTotal: Ksh${formatPrice(totalPrice)}`;

    // WhatsApp URL to send the message
    const whatsappURL = `https://wa.me/${ownerPhoneNumber}?text=${encodeURIComponent(message)}`;

    // Open WhatsApp with the pre-filled order message
    window.open(whatsappURL, "_blank");
  }

  return (
    <section className={styles.orders}>
      <div className={styles.ordersContainer}>
        <div className={styles.ordersHeader}>
            <i className="fa-solid fa-chevron-left" onClick={handleCartClick}></i>
            <span>Orders ({totalQty})</span>
        </div>
        <div className={styles["orders-wrapper"]}>
        {
          totalQty !== 0 ? (
            cartItems?.map((cake, index) => (
              <div key={index} className={styles["order-content"]}>
                <i className="fa-solid fa-x" onClick={() => handleRemoveCart(cake)}></i>
                <div className={styles["order-img-wrapper"]}>
                  <img src={cake.images[0]} alt={`${cake.cakeName}`} />
                </div>
                <div className="order-details">
                  <div className={styles["cakeName-category"]}>
                    <h3>{cake.cakeName}</h3>
                    <p>{cake.category} Cake</p>
                  </div>
                  <div className={styles.quantity}>
                    <i className="fa-solid fa-minus fa-xs" onClick={() => cartItemQty("dec", cake.index)}></i>
                    <span>{cake.quantity}</span>
                    <i className="fa-solid fa-plus fa-xs" onClick={() => cartItemQty("inc", cake.index)}></i>
                  </div>
                </div>
                <p className={styles["order-price"]}>Ksh{formatPrice(cake.details.price)}</p>
              </div>
            ))
          )
          : <EmptyState />
        }
        </div>
        <div className={styles.totalSummary}>
            <span>Subtotal</span>
            <span>Ksh{formatPrice(totalPrice)}</span>
        </div>
        { totalQty !== 0 && <button className={styles["order__payment"]} onClick={checkout}>Place Your Order Now</button> }
      </div>
    </section>
  )
}
