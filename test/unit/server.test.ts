import assert from 'assert';

import {
    RxDocumentData,
    addRxPlugin,
    overwritable
} from 'nxdb/plugins/core';
import {
    createRxServer,
    doesContainRegexQuerySelector,
    mergeServerDocumentFieldsMonad
} from '../../plugins/server';
import {
    nextPort,
    humansCollection
} from 'nxdb/plugins/test-utils';
import { NxDBMigrationPlugin } from 'nxdb/plugins/migration-schema';
import { NxDBDevModePlugin } from 'nxdb/plugins/dev-mode';
import { NxDBLeaderElectionPlugin } from 'nxdb/plugins/leader-election';

import config from './config.ts';
import { authHandler } from './test-helpers.ts';
import { TEST_SERVER_ADAPTER } from './config-server.test.ts';

/**
 * exit with non-zero on unhandledRejection
 */
process.on('unhandledRejection', async function (error, p) {
    console.log('init.test.js: unhandledRejection');

    // use log and error because some CI terminals do not show errors.
    try {
        console.dir(await p);
    } catch (err) {
        console.log((error as any).stack);
        console.dir(error);
        console.log('------- COULD NOT AWAIT p');
        process.exit(5);
    }
    console.dir((error as any).stack);
    console.error(error);
    console.dir(error);
    console.log('------- END OF unhandledRejection debug logs');
    process.exit(5);
});

describe('server.test.ts', () => {
    describe('init', () => {
        it('init', async () => {
            addRxPlugin(NxDBDevModePlugin);
            addRxPlugin(NxDBMigrationPlugin);
            addRxPlugin(NxDBLeaderElectionPlugin);

            assert.ok(overwritable.isDevMode());
            assert.ok(config);
            if (config.storage.init) {
                await config.storage.init();
            }
        });
    });
    describe('basics', () => {
        it('should start end stop the server', async () => {
            const port = await nextPort();
            const col = await humansCollection.create(0);
            const server = await createRxServer({
                adapter: TEST_SERVER_ADAPTER,
                database: col.database,
                authHandler,
                port
            });
            assert.ok(server);
            await col.database.destroy();
        });
    });
    describe('.doesContainRegexQuerySelector()', () => {
        it('should return false', () => {
            assert.strictEqual(doesContainRegexQuerySelector({ selector: { foo: { $eq: 'bar' } } }), false);
            assert.strictEqual(doesContainRegexQuerySelector({ selector: {} }), false);
        });
        it('should return true', () => {
            assert.strictEqual(doesContainRegexQuerySelector({ selector: { foo: { $regex: 'bar' } } }), true);
            assert.strictEqual(doesContainRegexQuerySelector({ selector: { $regex: 'bar' } }), true);
        });
    });
    describe('.mergeServerDocumentFieldsMonad()', () => {
        it('should merge the documents', () => {
            const serverDoc: RxDocumentData<{ id: string, private: string }> = {
                _attachments: {},
                _deleted: false,
                _meta: {
                    lwt: 2000
                },
                _rev: '1-rev',
                id: 'foobar',
                private: 'barfoo'
            };
            const result = mergeServerDocumentFieldsMonad<any>(['private'])({ id: 'foobar' }, serverDoc);
            assert.strictEqual(result.private, 'barfoo');
            assert.strictEqual(result.id, 'foobar');
        });
    });
});
