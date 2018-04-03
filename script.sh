#!/usr/bin/env bash

apt-get update
apt-get install -y nodejs
apt-get install -y nodejs-legacy
apt-get install -y npm
apt-get install -y git
debconf-set-selections <<< "mysql-server mysql-server/root_password password 1234"
debconf-set-selections <<< "mysql-server mysql-server/root_password_again password 1234"
apt-get install -y mysql-server

if [[ $(cd project) ]]
then
    git pull https://github.com/Fermonx/actividad_4.git

else
mkdir project
cd project || exit
git clone https://github.com/Fermonx/actividad_4.git
fi

cd
cd project
cd actividad_4
sudo npm install
npm install bower
npm install forever
npm start
