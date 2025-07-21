/**
 * Replace Mongo’s `_id` with a string `id` on each item in an array.
 * - If input isn’t an array, returns empty array (fail fast).
 * - If item has no `_id`, `id` becomes `undefined`.
 */
export const replaceMongoIdInArray = (input = []) => {
  if (!Array.isArray(input)) {
    console.warn('replaceMongoIdInArray expected Array, got:', input);
    return [];
  }

  return input.map(item => {
    // Non-object items pass through
    if (!item || typeof item !== 'object') return item;

    const { _id, ...rest } = item;
    return {
      id: _id != null ? String(_id) : undefined,
      ...rest,
    };
  });
};


/**
 * Replace Mongo’s `_id` with a string `id` on a single object.
 * - If input isn’t an object (or is null/array), returns it as-is.
 * - If `_id` is missing, `id` becomes `undefined`.
 */
export const replaceMongoIdInObject = (input = {}) => {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    console.warn('replaceMongoIdInObject expected Object, got:', input);
    return input;
  }

  const { _id, ...rest } = input;
  return {
    ...rest,
    id: _id != null ? String(_id) : undefined,
  };
};