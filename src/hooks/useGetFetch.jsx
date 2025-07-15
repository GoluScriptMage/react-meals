import {
  catchAsync,
  validateArguments,
  db,
  get,
  ref,
} from "../config/fireBase";

export const useGetFetch = () => {
  // TO get the data from db
  const getData = catchAsync(async (path) => {
    // Validate the Path
    validateArguments(path);
    // Get the snapshot
    const snapshot = await get(ref(db, path));
    if (!snapshot.exists())
      return new Error("No data found at the specified path");

    // Send the snapshot if it exists
    return snapshot.val();
  });

  // to get all data from the path and make it an object array
  const getMultipleData = catchAsync(async (path) => {
    // Validate the Path
    validateArguments(path);

    const result = await getData(path);

    if (!result) {
      throw new Error("No items Found.");
    }

    // Convert firesBase object to array if needed
    const itemsArray = result
      ? Object.entries(result).map(([key, value]) => {
          return {
            id: key,
            ...value,
          };
        })
      : [];
    return itemsArray;
  });

  // To get a specified key data
  const getSpecificData = catchAsync(async (id, path) => {
    validateArguments(path, id);

    const result = await getData(`${path}/${id}`);
    if (!result) {
      throw new Error("No items Found.");
    }
    return result;
  });

  return { getData, getMultipleData, getSpecificData };
};
