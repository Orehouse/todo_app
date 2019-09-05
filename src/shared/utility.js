export const addOrUpdateArrayElementWithKey = (
  originalArray,
  key,
  valueToUpdate
) => {
  const shallowCopyOfArray = [...originalArray];
  const indexOfElement = shallowCopyOfArray.findIndex(
    el => el[key] === valueToUpdate[key]
  );
  if (indexOfElement >= 0) {
    shallowCopyOfArray[indexOfElement] = valueToUpdate;
  } else {
    shallowCopyOfArray.push(valueToUpdate);
  }
  return shallowCopyOfArray;
};
