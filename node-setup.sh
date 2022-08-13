#!/usr/bin/env bash

echo "
----------------------
  NODE & NPM
----------------------
"

# add nodejs 10 ppa (personal package archive) from nodesource
curl -sL https://deb.nodesource.com/setup_14.x — Node.js 14 LTS "Fermium" | sudo -E bash -

# install nodejs and npm
sudo apt-get install -y nodejs

echo "
----------------------
  PM2
----------------------
"

# install pm2 with npm
sudo npm install -g pm2

# set pm2 to start automatically on system startup
sudo pm2 startup systemd

