#!/bin/bash

sudo chown -R ubuntu:ubuntu /home/ubuntu/fleet-management/ssr/admin
cd /home/ubuntu/fleet-management/ssr/admin

export PORT=3010

if pm2 restart fm-admin; then
  echo "FLEET MANAGAMENT WEB APP RESTARTED"
else
  pm2 start server.js --name fm-admin
  echo "FLEET MANAGAMENT WEB APP STARTED"
fi
