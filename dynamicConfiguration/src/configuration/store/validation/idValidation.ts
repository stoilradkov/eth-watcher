import mongoose from "mongoose";

/**
 * Checks if the provided id is a valid mongo id
 * @param id - id to bechecked
 * @returns true if the id is valid, false otherwise
 */
export const isValidId = (id: string) => mongoose.isValidObjectId(id);
