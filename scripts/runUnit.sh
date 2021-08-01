#!/bin/bash

#
# PORTACS
# piattaforma di controllo mobilità autonoma
#
# Copyright (c) lineCode group <linecode.swe@gmail.com> 2020 - 2021
# Distributed under ISC license (see accompanying file LICENSE).
#

mongod --fork --config /etc/mongod.conf
node PopulateDB.js
node main.js
