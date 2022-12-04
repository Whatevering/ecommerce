import Head from "next/head";
import Link from "next/link";
import sanityClient from "../lib/sanity";
import { urlFor } from "../lib/sanity";

export default function Home({ product, banner }) {
  return (
    <>
      <Head>
        <title>Home | Shop</title>
      </Head>
      {/* banner */}
      <div className="w-full bg-neutral-300 px-8 py-12 rounded-xl flex flex-col relative">
        <span className="font-bold text-3xl indent-1">
          {banner[0].largeText1}
        </span>
        <span className="font-bold text-6xl text-white">
          {banner[0].largeText2}
        </span>
        <Link href={`/product/${banner[0].slug.current}`}>
          <button className="transition-all hover:scale-105 active:scale-100 bg-red-500 text-white font-bold py-2 px-4 w-fit rounded-xl mt-4">
            {banner[0].buttonText}
          </button>
        </Link>
        <img
          src={urlFor(banner[0].image)}
          alt=""
          className="w-64 absolute top-[-2rem] right-[-1rem]"
        />
      </div>
      {/* product */}
      <span className="font-extrabold text-red-500 text-4xl text-center mt-4">
        Best Seller
      </span>
      <div className="w-full grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-4 px-4">
        {product.map((item, i) => {
          return (
            <Link key={i} href={`/product/${item.slug.current}`}>
              <div className="flex flex-col transition-all hover:scale-105 active:scale-100">
                <img
                  src={urlFor(item.image[0])}
                  alt=""
                  className="bg-neutral-200 rounded-xl"
                />
                <span className="font-semibold mt-2 indent-1">{item.name}</span>
                <span className="font-medium text-red-500 text-sm leading-none indent-1">
                  HKD${item.price}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const product = await sanityClient.fetch(`*[_type == "product"]`);
  const banner = await sanityClient.fetch(`*[_type == "banner"]`);

  return {
    props: { product, banner }, // will be passed to the page component as props
  };
}
