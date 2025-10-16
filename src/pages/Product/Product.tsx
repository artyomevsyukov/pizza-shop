import { Await, useLoaderData } from "react-router-dom";
import type { Product } from "../../interfaces/product.interface";
import { Suspense } from "react";

export function Product() {
  const { data } = useLoaderData() as { data: Promise<Product> };

  return (
    <Suspense fallback={<>Загрузка продукта...</>}>
      <Await resolve={data}>
        {(product: Product) => <>Product - {product.ingredients.join(", ")}</>}
      </Await>
    </Suspense>
  );
}
