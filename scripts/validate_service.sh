#!/bin/bash
# Wait 15 seconds for the service to start
sleep 15

# Set test url according to the environment
if [ $NODE_ENV == "production" ]; then
  URL="https://admin.fleet.congoparkingservice.com"
else
  URL="https://admin.fleet.dev.congoparkingservice.com"
fi

if curl -I "$URL" 2>&1 | grep -w "200\|301" ; then
  echo "$URL is healthy"
  # Slack post request
  curl -X POST -H 'Content-type: application/json' --data '{ "username": "AWS", "icon_url": "https://pbs.twimg.com/profile_images/1399770499199254532/zn_-38Hw.jpg","text":"'$URL' is healthy"}' https://hooks.slack.com/services/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
else
  echo "$URL is not healthy"
  # Slack post request
  curl -X POST -H 'Content-type: application/json' --data '{ "username": "AWS", "icon_url": "https://pbs.twimg.com/profile_images/1399770499199254532/zn_-38Hw.jpg","text":"'$URL' is not healthy"}' https://hooks.slack.com/services/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
fi
