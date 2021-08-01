#!/bin/bash

#
# PORTACS
# piattaforma di controllo mobilità autonoma
#
# Copyright (c) lineCode group <linecode.swe@gmail.com> 2020 - 2021
# Distributed under ISC license (see accompanying file LICENSE).
#

echo 'Installing MongoDB'
apt-get update
apt-get install gnupg
wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | apt-key add -
echo "deb http://repo.mongodb.org/apt/debian buster/mongodb-org/4.4 main" | tee /etc/apt/sources.list.d/mongodb-org-4.4.list
apt-get update
apt-get install -y mongodb-org=4.4.6 mongodb-org-server=4.4.6 mongodb-org-shell=4.4.6 mongodb-org-mongos=4.4.6 mongodb-org-tools=4.4.6
apt-get autoremove -y
echo 'MongoDB installed'
