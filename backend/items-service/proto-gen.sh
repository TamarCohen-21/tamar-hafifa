#!/bin/bash

protoc --plugin=./node_modules/.bin/protoc-gen-ts_proto --ts_proto_out=./src/protocOutput/ ./proto/*.proto --proto_path=./proto --experimental_allow_proto3_optional --ts_proto_opt=esModuleInterop=true