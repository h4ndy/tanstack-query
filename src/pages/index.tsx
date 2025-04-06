import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

interface Product{
  id: string,
  title: string,
  price: number,
  image: string
}

export default function Home() {
  const {data,isError, isLoading} = useQuery({
    queryKey: ['products'],
    queryFn: async () => {  
      const res = await fetch('https://fakestoreapi.com/products');
      return res.json();
    },
  });

   if (isError) {
    return (
      <div>
        <h1>Failed to load products</h1>
      </div>
    )
   }

  
 
  return (
    <div className="container mx-auto p-8">
     {isLoading ? (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border
        border-green-400"></div>
      </div>
     ) : (
       <div>
        {isError ? (
          <div>
            <h1>Failed to load products</h1>
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
