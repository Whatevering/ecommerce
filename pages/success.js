import Link from "next/link";

function Success() {
  return (
    <>
      <span className="font-extrabold text-4xl mt-20">
        <span className="text-red-500">Thanks</span> for Purchasing
      </span>
      <Link href="/">
        <button className="transition-all hover:scale-105 active:scale-100 bg-red-500 py-2 px-8 font-bold text-lg rounded-lg text-white">
          Continue to Shop
        </button>
      </Link>
    </>
  );
}

export default Success;
