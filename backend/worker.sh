#!/bin/bash

Xvfb -ac -screen scrn 1280x2000x24 :9.0 &
export DISPLAY=:9.0

xvfb-run yarn run worker:dev
