type PickLiteral<TBase, TPick> = TBase extends TPick ? TBase : never;

export type { PickLiteral };
