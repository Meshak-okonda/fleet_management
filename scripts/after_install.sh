#!/bin/bash
# Set Environments variables

# Check if global.env exists else return error
if [ -f "/etc/profile" ]; then
  source "/etc/profile"
else
  echo "global /etc/profile not found"
  exit 1
fi

sed -i "s+app_common_name+$FLEET_MANAGEMENT_APP_COMMON_NAME+g" /home/ubuntu/fleet-management/ssr/admin/next.config.js
