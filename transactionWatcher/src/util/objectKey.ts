/**
 * Asserts a key is in an object
 * @param key - the key to be checked
 * @param object - the object to be checked
 * @returns true if the key is in the object, false otherwise
 */
export function isKeyInObject<T>(key: PropertyKey, object: T): key is keyof T {
    return key in object;
}
