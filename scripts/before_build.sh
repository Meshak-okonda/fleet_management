#!/bin/bash

cp next.config.prod.js next.config.js

if [[ $CODEBUILD_INITIATOR == *"dev"* ]] ; then
  echo "CODEBUILD_INITIATOR is dev"
  sed -i "s+app_common_name+fleet.dev.congoparkingservice.com+g" next.config.js
else
  echo "CODEBUILD_INITIATOR is not dev"
  sed -i "s+app_common_name+fleet.congoparkingservice.com+g" next.config.js
fi

cat next.config.js
