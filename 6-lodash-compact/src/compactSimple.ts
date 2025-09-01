const compact = <T>(array: Array<T>) => {
  return array.filter(Boolean);
};

export default compact;
