import { queryOptions } from '@tanstack/react-query';
import { productsKey } from '@/api/route/products/key';
import { fetchProducts } from '@/api/route/products/function';

const useFetchProductsOptions = () =>
  queryOptions({
    queryKey: productsKey.list(),
    queryFn: async () => await fetchProducts(),
  });

export { useFetchProductsOptions };
