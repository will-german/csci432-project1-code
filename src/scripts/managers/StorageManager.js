"use strict";

export default class BrowserStorageManager {
    constructor() {
        this.storageTypes = [
            'local',
            'session'
        ];
    }

    /**
     * @param {object} obj
     */
    #isObjectAndValid(obj) {
        if (typeof obj !== 'object' || obj === null) {
            throw new Error("Argument is null object.");
        }

        if (!"storageName" in obj || obj.storageName === null) {
            throw new Error("Argument requires a non-null storageName property.");
        }
    }

    /**
     * 
     * @param {string} str 
     * @returns
     */
    #isEmpty(str) {
        return (!str);
    }

    /**
     * 
     * @param {string} key 
     * @returns
     */
    get(key) {
        let obj = localStorage.getItem(key);

        if (obj !== null) {
            return JSON.parse(obj);
        }

        obj = sessionStorage.getItem(key);

        if (obj !== null) {
            return JSON.parse(obj);
        }

        return null;
    }

    /**
     * @param {object} obj 
     * @param {string} key 
     * @param {string} value 
     * @param {boolean} isMeta
     */

    set(obj, key, value, isMeta) {
        try {
            this.#isObjectAndValid(obj);
        } catch (exception) {
            return exception;
        }

        if (this.#isEmpty(key)) {
            throw new Error(`Invalid key argument: ${key}`);
        }

        if (this.#isEmpty(value)) {
            throw new Error(`Invalid value argument: ${value}`);
        }

        if (isMeta !== true && isMeta !== false) {
            throw new Error(`Invalid isMeta argument: ${isMeta}`);
        }

        if (isMeta) {
            obj.metadata[key] = value;
        } else {
            obj[key] = value;
        }

        obj.metadata.LastModified = new Date();
        return obj;
    }

    /**
     * Append relevant metadata to the given object.
     * @param {object} obj 
     * @returns
     */
    create(obj) {
        try {
            this.#isObjectAndValid(obj);
        } catch (exception) {
            return exception;
        }

        const metadata = {
            'DateCreated': new Date(),
            'LastModified': new Date(),
        };

        obj["metadata"] = metadata;

        return obj;
    }

    /**
     * Store an object in the designated storageType
     * @param {object} obj 
     * @param {string} storageType 
     */
    store(obj, storageType) {
        try {
            this.#isObjectAndValid(obj);
        } catch (exception) {
            return exception;
        }

        if (!this.storageTypes.includes(storageType)) {
            throw new Error(`Invalid storageType: ${storageType}`);
        }

        switch (storageType) {
            case 'local': {
                localStorage.setItem(obj.storageName, JSON.stringify(obj));
                break;
            };
            case 'session': {
                sessionStorage.setItem(obj.storageName, JSON.stringify(obj));
                break;
            };
            default: {
                throw new Error(`Failed to store ${obj} in ${storageType}Storage`);
            }
        }
    }

    /**
     * Remove a given key from all storageTypes
     * @param {string} key 
     */
    delete(key) {
        if (this.#isEmpty(key)) {
            throw new Error(`Invalid key: ${key}`);
        }

        localStorage.removeItem(key);
        sessionStorage.removeItem(key);
    }

};