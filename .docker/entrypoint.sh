#!/bin/bash

yarn
yarn typeorm migration:run
yarn goliven
