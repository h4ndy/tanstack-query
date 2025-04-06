import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Product{
  id: string,
  title: string,
  price: number,
  image: string
}

export default function Home() {
  const [showToast, setShowToast] = useState(false);
  const [fetchedProducts, setFetchedProducts] = useState(false);
  const {data,isError, isLoading, isSuccess} = useQuery({
    queryKey: ['products'],
    queryFn: async () => {  
      const res = await fetch('https://fakestoreapi.com/products');
      return res.json();
    },
    enabled: fetchedProducts 
  });

  useEffect(() => {
    if(isSuccess){
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  },)
 
   if (isError) {
    return (
      <div>
        <h1>Failed to load products</h1>
      </div>
    );
   }

  

  
 
  return (
    <div className="container mx-auto p-8">
    { !fetchedProducts && (
       <button onClick={() => setFetchedProducts(true)}>Show All Product</button>
     )}     

     
      {showToast && (
        <div className="fixed top-4 right-4 z-50 bg-green-400 text-white px-4 py-2 shadow-sm">
         Get All Product
        </div>
      )}
     {isLoading ? (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border
        border-green-400"></div>
      </div>
     ) : (
       <div>
        {isError ? (
           <div className="flex items-center justify-center h-screen">
            <h1 className="text-center">Failed to load products</h1>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
      {data?.map((product: Product) => (
          <div key={`product-${product.id}`} className="shadow p-4 flex flex-col items-center">
          <Image
          width={100}
          height={100}
          src={product.image}
          alt={product.title}
          className="scale-50 h-40 w-fit"/>
          <h4 className="text-center font-bold line-clamp-1">{product.title}</h4>
          <p>${product.price}</p>
          </div>
      ))}
    </div>
        )}
      </div>
     )}
    </div>
  );
}
