import { DeleteConfigurationFunction } from "../interfaces/deleteConfiguration.type";

export const deleteConfiguration = async (id: string, deleteConfigurationFunction: DeleteConfigurationFunction) => {
    const deletedId = await deleteConfigurationFunction(id);
    return deletedId;
};
