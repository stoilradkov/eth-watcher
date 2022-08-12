import mongoose from "mongoose";
import { Configuration } from "../../domain/Configuration.type";

interface ConfigurationModel extends mongoose.Model<ConfigurationDocument> {
    build(attributes: Configuration): ConfigurationDocument;
}

export interface ConfigurationDocument extends Configuration, mongoose.Document {}

const configurationSchema = new mongoose.Schema({
    configurationName: { type: String, required: false },
    blockHash: {
        value: {
            type: String,
            required: false,
        },
    },
    blockNumber: {
        value: {
            type: Number,
            required: false,
        },
    },
    chainId: {
        value: {
            type: Number,
            required: false,
        },
    },
    from: {
        value: {
            type: String,
            required: false,
        },
    },
    to: {
        value: {
            type: String,
            required: false,
        },
    },
    gas: {
        value: {
            type: Number,
            required: false,
        },
    },
    gasPrice: {
        value: {
            type: Number,
            required: false,
        },
    },
    hash: {
        value: {
            type: String,
            required: false,
        },
    },
    input: {
        value: {
            type: String,
            required: false,
        },
    },
    transactionIndex: {
        value: {
            type: Number,
            required: false,
        },
    },
    value: {
        value: {
            type: Number,
            required: false,
        },
    },
});

configurationSchema.statics.build = (attributes: Configuration) => {
    return new Configuration(attributes);
};

configurationSchema.methods.toJSON = function () {
    const configurationObject = this.toObject();
    configurationObject.id = configurationObject._id;
    delete configurationObject._id;
    delete configurationObject.__v;
    return configurationObject;
};

const Configuration = mongoose.model<ConfigurationDocument, ConfigurationModel>("Configuration", configurationSchema);
export { Configuration };
