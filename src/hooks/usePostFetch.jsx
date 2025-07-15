import {
  ref,
  db,
  push,
  catchAsync,
  validateArguments,
} from "../config/fireBase";

export const usePostFetch = () => {
  // TO post data to the database return key
  const postData = catchAsync(async (data, path) => {
    // validate path & data
    validateArguments(path);

    // Create a new Ref
    const newRef = ref(db, path);
    // Push the new data to the database
    const newPost = await push(newRef, data);

    // Check if newPost was created successfully
    if (!newPost.key) {
      throw new Error("Failed to create new Post.");
    }
    // return the newpost key
    return { key: newPost.key };
  });

  const postMultipleData = catchAsync(async (data, path) => {
    validateArguments(path);

    if (!Array.isArray(data)) throw new Error("Data must be an array");

    // Remove the global isExecuted flag to allow multiple postings
    
    // Iterate over the unique data array and post each item
    const promises = data.map((item) => postData(item, path));
    const results = await Promise.all(promises);

    // Return arr of the keys of the newly created items
    return results.map((res) => res.key);
  });

  const postSpecificData = catchAsync(async (data, path, id) => {
    validateArguments(path);

    const result = await postData(data, `${id ? `${path}/${id}` : path}`);
    if (!result.key) throw new Error("Failed to create new Post.");
    return result.key;
  });

  return { postData, postMultipleData, postSpecificData, catchAsync };
};