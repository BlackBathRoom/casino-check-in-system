import { queryOptions } from '@tanstack/react-query';
import { productsKey } from '@/api/routes/products/key';
import { fetchProducts } from '@/api/routes/products/function';

const useFetchProductsOptions = () =>
  queryOptions({
    queryKey: productsKey.list(),
    queryFn: async () => await fetchProducts(),
  });

export { useFetchProductsOptions };
