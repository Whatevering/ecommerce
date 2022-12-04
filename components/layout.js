import Link from "next/link";
import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import Cart from "./cart";

function Layout({ children }) {
  const { qty } = useSelector((state) => state.cart);

  const [isCartActive, setIsCartActive] = useState(false);
  const activeCartHandler = useCallback(() => {
    setIsCartActive(true);
  }, [setIsCartActive]);
  const unactiveCartHandler = useCallback(() => {
    setIsCartActive(false);
  }, [setIsCartActive]);

  return (
    <div className="flex w-screen h-screen flex-col items-center z-10">
      {/* nav bar */}
      <nav className="flex-none p-4 w-full flex justify-between shadow-sm">
        <Link
          href={"/"}
          className="transition-all hover:scale-105 active:scale-100"
        >
          <span className="text-2xl font-bold text-red-500">Shop</span>
        </Link>
        <button
          className="transition-all hover:scale-105 active:scale-100 relative"
          onClick={activeCartHandler}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-shopping-cart text-black w-7"
          >
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <span className="absolute top-[-2px] right-[-0.5rem] bg-red-500 rounded-full text-white text-xs w-4 h-4 text-center">
            {qty}
          </span>
        </button>
      </nav>

      {/* page component */}
      <div className="flex-auto w-full max-w-5xl overflow-y-auto p-4 flex flex-col gap-4 items-center">
        {children}
      </div>

      {/* cart component (layout, main) */}
      <div
        className={`pointer-events-none z-20 transition-all fixed top-0 left-0 w-full h-full bg-black opacity-0 ${
          isCartActive ? "opacity-50 pointer-events-auto" : ""
        }`}
        onClick={unactiveCartHandler}
      />
      <div
        className={`pointer-events-none z-30 transition-all fixed top-0 right-0 w-[min(100%,_500px)] h-screen p-8 bg-white opacity-0 ${
          isCartActive ? "opacity-100 pointer-events-auto" : ""
        } grid grid-rows-[min-content_1fr_min-content] gap-8`}
      >
        <Cart unactiveCartHandler={unactiveCartHandler} />
      </div>
    </div>
  );
}

export default Layout;
