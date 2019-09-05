export const updateObject = (object, updatedFields) => {
  return { ...object, ...updatedFields };
};
