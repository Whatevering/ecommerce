import axios from "axios";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { urlFor } from "../lib/sanity";
import getStripe from "../lib/stripe";
import { actions } from "../redux";

function Cart({ unactiveCartHandler }) {
  const dispatch = useDispatch();
  const { itemList, qty, subtotal } = useSelector((state) => state.cart);

  const incQtyHandler = useCallback((product) => {
    dispatch(
      actions.cart.add({
        ...product,
        qty: 1,
      })
    );
  }, []);
  const decQtyHandler = useCallback((product) => {
    dispatch(
      actions.cart.reduce({
        ...product,
        qty: 1,
      })
    );
  }, []);
  const removeItemHandler = useCallback((product) => {
    dispatch(actions.cart.remove(product));
  }, []);

  const checkOutHandler = useCallback(async () => {
    toast.loading("Redirecting...");

    try {
      const stripe = await getStripe();

      const session = await axios({
        url: "/api/stripe",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: itemList,
      }).then((res) => res.data);

      stripe.redirectToCheckout({ sessionId: session.id });
    } catch (e) {
      return toast.error("server error");
    }
  }, [itemList]);

  return (
    <>
      <div className="flex items-center gap-2">
        <button onClick={unactiveCartHandler}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-chevron-left"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        <span className="font-semibold text-lg">
          Your Items <span className="text-red-500">({qty})</span>
        </span>
      </div>
      <div className="flex flex-col gap-4">
        {itemList.map((item, i) => {
          return (
            <div key={i} className="grid grid-cols-[120px_1fr_1fr] gap-6">
              <img
                src={urlFor(item.image[0])}
                className="bg-neutral-300 rounded-xl"
                alt=""
              />
              <div className="flex flex-col justify-between">
                <span className="text-lg font-semibold">{item.name}</span>
                {/* qty edit */}
                <div className="w-24 grid grid-cols-3 border border-black items-center rounded-lg">
                  <button
                    className="p-1 font-bold"
                    disabled={item.qty === 1}
                    onClick={() => decQtyHandler(item)}
                  >
                    -
                  </button>
                  <span className="text-center font-medium">{item.qty}</span>
                  <button
                    className="p-2 font-bold"
                    onClick={() => incQtyHandler(item)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex flex-col justify-between items-end">
                <span className="font-bold text-red-500">
                  HKD${item.price * item.qty}
                </span>
                {/* item remove */}
                <button
                  className="text-red-500 py-2 px-1"
                  onClick={() => removeItemHandler(item)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-x-circle"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="15" y1="9" x2="9" y2="15"></line>
                    <line x1="9" y1="9" x2="15" y2="15"></line>
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between font-semibold text-lg px-2">
          <span className="font-semibold text-lg">Subtotal:</span>
          <span className="font-semibold text-lg">HKD${subtotal}</span>
        </div>
        <button
          className="py-2 w-full bg-red-500 rounded-lg font-bold text-white text-lg hover:scale-105 active:scale-100 transition-all"
          disabled={qty === 0}
          onClick={checkOutHandler}
        >
          Check Out
        </button>
      </div>
    </>
  );
}

export default Cart;
