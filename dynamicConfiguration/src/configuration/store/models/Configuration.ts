import mongoose from "mongoose";
import { ConfigurationAttributes, NumberFilter, StringFilter } from "./type";

interface ConfigurationModel extends mongoose.Model<ConfigurationDocument> {
    build(attributes: ConfigurationAttributes): ConfigurationDocument;
}

export interface ConfigurationDocument extends ConfigurationAttributes, mongoose.Document {}

const configurationSchema = new mongoose.Schema({
    configurationName: { type: String, required: false },
    blockHash: {
        value: {
            type: String,
            required: false,
        },
        filterType: {
            type: String,
            enum: [StringFilter.EQUAL, StringFilter.CONTAINS],
            required: false,
        },
    },
    blockNumber: {
        value: {
            type: Number,
            required: false,
        },
        filterType: {
            type: String,
            enum: [NumberFilter.EQUAL, NumberFilter.LESS_THAN, NumberFilter.GREATER_THAN],
            required: false,
        },
    },
    chainId: {
        value: {
            type: String,
            required: false,
        },
        filterType: {
            type: String,
            enum: [NumberFilter.EQUAL, NumberFilter.LESS_THAN, NumberFilter.GREATER_THAN],
            required: false,
        },
    },
    from: {
        value: {
            type: String,
            required: false,
        },
        filterType: {
            type: String,
            enum: [StringFilter.EQUAL, StringFilter.CONTAINS],
            required: false,
        },
    },
    to: {
        value: {
            type: String,
            required: false,
        },
        filterType: {
            type: String,
            enum: [StringFilter.EQUAL, StringFilter.CONTAINS],
            required: false,
        },
    },
    gas: {
        value: {
            type: Number,
            required: false,
        },
        filterType: {
            type: String,
            enum: [NumberFilter.EQUAL, NumberFilter.LESS_THAN, NumberFilter.GREATER_THAN],
            required: false,
        },
    },
    gasPrice: {
        value: {
            type: String,
            required: false,
        },
        filterType: {
            type: String,
            enum: [NumberFilter.EQUAL, NumberFilter.LESS_THAN, NumberFilter.GREATER_THAN],
            required: false,
        },
    },
    hash: {
        value: {
            type: String,
            required: false,
        },
        filterType: {
            type: String,
            enum: [StringFilter.EQUAL, StringFilter.CONTAINS],
            required: false,
        },
    },
    input: {
        value: {
            type: String,
            required: false,
        },
        filterType: {
            type: String,
            enum: [StringFilter.EQUAL, StringFilter.CONTAINS],
            required: false,
        },
    },
    transactionIndex: {
        value: {
            type: Number,
            required: false,
        },
        filterType: {
            type: String,
            enum: [NumberFilter.EQUAL, NumberFilter.LESS_THAN, NumberFilter.GREATER_THAN],
            required: false,
        },
    },
    value: {
        value: {
            type: String,
            required: false,
        },
        filterType: {
            type: String,
            enum: [NumberFilter.EQUAL, NumberFilter.LESS_THAN, NumberFilter.GREATER_THAN],
            required: false,
        },
    },
});

configurationSchema.statics.build = (attributes: ConfigurationAttributes) => {
    return new Configuration(attributes);
};

configurationSchema.methods.toJSON = function () {
    const configurationObject = this.toObject();
    configurationObject.id = configurationObject._id.toString();
    delete configurationObject._id;
    delete configurationObject.__v;
    return configurationObject;
};

const Configuration = mongoose.model<ConfigurationDocument, ConfigurationModel>("Configuration", configurationSchema);
export { Configuration };
