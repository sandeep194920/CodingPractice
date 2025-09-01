const compact = (array: any[]) => {
  return array.filter((val) => !!val);
};

export default compact;
