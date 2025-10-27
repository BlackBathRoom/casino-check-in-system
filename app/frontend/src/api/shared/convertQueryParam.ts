const convertBoolToStr = (
  queryParam: boolean | undefined
): 'true' | 'false' | undefined =>
  queryParam === undefined ? undefined : queryParam ? 'true' : 'false';

export { convertBoolToStr };
