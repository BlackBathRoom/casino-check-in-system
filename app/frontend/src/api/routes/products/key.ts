export const productsKey = {
  all: ['products'] as const,
  list: () => [...productsKey.all, 'list'],
};
