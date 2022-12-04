import ErrorPage from "next/error";
import Head from "next/head";
import { useCallback, useState } from "react";
import sanityClient, { urlFor } from "../../lib/sanity";
import BlockContent from "@sanity/block-content-to-react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { actions } from "../../redux/";

function Product({ product = {} }) {
  const [mainImageUrl, setMainImageUrl] = useState(
    product.image ? urlFor(product.image[0]) : ""
  );
  const selectImageHandler = useCallback(
    (url) => {
      setMainImageUrl(url);
    },
    [setMainImageUrl]
  );

  const [qty, setQty] = useState(1);
  const incQtyHandler = useCallback(() => {
    setQty((prev) => prev + 1);
  }, [setQty]);
  const decQtyHandler = useCallback(() => {
    setQty((prev) => prev - 1);
  }, [setQty]);

  const dispatch = useDispatch();

  const addToCartHandler = useCallback(() => {
    dispatch(
      actions.cart.add({
        ...product,
        qty,
      })
    );
    toast.success("Items are added to your cart");

    // clear to 1
    setQty(1);
  }, [qty]);

  if (!product) return <ErrorPage statusCode={404} />;

  return (
    <>
      <Head>
        <title>{product.name} | Shop</title>
      </Head>
      <div className="mt-4 w-full flex gap-8">
        {/* image selector */}
        <div className="flex flex-col items-center gap-4">
          <img
            src={mainImageUrl}
            alt=""
            className="transition-all w-72 bg-slate-50 rounded-xl hover:bg-red-500"
          />
          <div className="w-72 grid grid-cols-4 gap-2">
            {product.image.map((item, i) => {
              const imageUrl = urlFor(item);
              return (
                <button
                  key={i}
                  className="rounded-lg shadow-sm transition-all bg-slate-50 hover:bg-red-500"
                  onClick={() => selectImageHandler(imageUrl)}
                >
                  <img src={imageUrl} alt="" />
                </button>
              );
            })}
          </div>
        </div>
        {/* product content and cart tool */}
        <div className="flex flex-col py-4 text-zinc-800 gap-4">
          <span className="font-bold text-4xl">{product.name}</span>
          <div>
            <span className="font-medium text-lg">Details:</span>
            <div className="ml-2">
              <BlockContent blocks={product.details} />
            </div>
          </div>

          <div className="w-28 grid grid-cols-3 border border-black items-center rounded-lg">
            <button
              className="p-2 font-bold text-lg"
              disabled={qty === 1}
              onClick={decQtyHandler}
            >
              -
            </button>
            <span className="text-center font-medium text-lg">{qty}</span>
            <button className="p-2 font-bold text-lg" onClick={incQtyHandler}>
              +
            </button>
          </div>

          <span className="text-lg font-bold text-red-500">
            HKD${product.price * qty}
          </span>

          <button
            className="py-2 px-6 bg-red-500 text-white font-semibold rounded-xl w-fit hover:scale-105 active:scale-100 transition-all"
            onClick={addToCartHandler}
          >
            Add to Cart
          </button>
        </div>

        <Toaster />
      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const product = await sanityClient.fetch(
    `*[_type == "product" && slug.current == '${params.slug}'][0]`
  );

  return {
    props: { product }, // will be passed to the page component as props
  };
}

export default Product;
