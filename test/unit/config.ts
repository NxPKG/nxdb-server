import { RxTestStorage } from 'nxdb';
import { getRxStorageMemory } from 'nxdb/plugins/storage-memory';
import { wrappedValidateAjvStorage } from 'nxdb/plugins/validate-ajv';
import { setConfig, getConfig } from 'nxdb/plugins/test-utils';

const config = (() => {
    setConfig({
        storage: {
            name: 'memory',
            getStorage: () => wrappedValidateAjvStorage({ storage: getRxStorageMemory() }),
            getPerformanceStorage: () => {
                return {
                    storage: wrappedValidateAjvStorage({ storage: getRxStorageMemory() }),
                    description: 'memory'
                };
            },
            hasPersistence: true,
            hasMultiInstance: false,
            hasAttachments: true,
            hasReplication: true
        }
    });
    console.log('# use RxStorage: ' + getConfig().storage.name);
    return getConfig();
})();
export default config;
