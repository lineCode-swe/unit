#!/bin/bash

mongod --fork --config /etc/mongod.conf
node PopulateDB.js
node main.js
