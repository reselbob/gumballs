#!/usr/bin/env bash

x=1;
while [ $x == 1 ]; do
  GUMBALL=$(curl -s http://0.0.0.0:5022/gumball)
  echo $GUMBALL
done