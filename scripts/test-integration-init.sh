#!/bin/bash
set -e

source extract-nxdb-version.sh
echo NXDB_VERSION=$NXDB_VERSION


cd ../

npm run build
npm run build:bundle
rimraf -rf ./test-integration

git clone -b ${NXDB_VERSION} https://github.com/nxpkg/nxdb.git ./test-integration --depth 1
# git clone https://github.com/nxpkg/nxdb.git ./test-integration-$STORAGE --depth 1

# copy test files
cp ./test/unit/*.test.ts ./test-integration/test/unit/
cp ./test/unit/test-helpers.ts ./test-integration/test/unit/
cp ./test/unit.test.ts ./test-integration/test


cp nxdb-server.tgz ./test-integration/nxdb-server.tgz

cd ./test-integration

# replace imports
find test -type f -exec sed -i 's|\.\.\/\.\.\/plugins\/server|nxdb-server/plugins/server|g' {} +
find test -type f -exec sed -i 's|\.\.\/\.\.\/plugins\/adapter-express|nxdb-server/plugins/adapter-express|g' {} +
find test -type f -exec sed -i 's|\.\.\/\.\.\/plugins\/replication-server|nxdb-server/plugins/replication-server|g' {} +
find test -type f -exec sed -i 's|\.\.\/\.\.\/plugins\/client-rest|nxdb-server/plugins/client-rest|g' {} +
find test -type f -exec sed -i 's|\.\.\/\.\.\/plugins\/test-utils\/index\.mjs|nxdb/plugins/test-utils|g' {} +

npm install
npm install nxdb@$NXDB_VERSION
npm install ./nxdb-server.tgz

(cd ./node_modules/nxdb-server/ && npm i)

npm run build

# TODO type checking is broken
# npm run check-types


cd ../
