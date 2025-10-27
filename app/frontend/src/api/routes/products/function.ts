import { client } from '@/api/shared/apiClient';

const fetchProducts = async () => {
  const res = await client.products.$get();

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  return (await res.json()).products;
};

export { fetchProducts };
