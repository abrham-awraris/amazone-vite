
import React, { useState, useEffect, useContext } from 'react';
import LayOut from '../../components/LayOut/LayOut';
import { DataContext } from '../../components/DataProvider/DataProvider';
import { db } from '../../Utility/firbase'; // Ensure you're importing Firebase correctly
import ProductCard from '../../components/Product/ProductCard'; // Make sure this path is correct
import classes from './Orders.module.css';

function Orders() {
  const [{ user }, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      // Fetch orders from Firestore for the logged-in user
      const unsubscribe = db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          console.log(snapshot); // You can check the output in the console
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });

      // Cleanup the listener when the component is unmounted or the user logs out
      return () => unsubscribe();
    } else {
      setOrders([]);
    }
  }, [user]); // Now, this will re-run if the user changes

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.Orders__container}>
          <h2>Your Orders</h2>
          {orders?.length === 0 && <div style={{ padding: "20px" }}>You don't have any orders yet.</div>}

          {/* Render the orders */}
          <div>
            {orders?.map((eachOrder, i) => {
              return (
                <div key={i}>
                  <hr />
                  <p>Order ID: {eachOrder?.id}</p>
                  {eachOrder?.data?.basket?.map((order) => {
                    return (
                      <ProductCard
                        flex={true}
                        product={order}
                        key={order.id}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Orders;
