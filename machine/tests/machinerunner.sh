#!/usr/bin/env bash

x=20;
while [ $x == 20 ]; do
  GUMBALL=$(curl -s http://0.0.0.0:5022/gumball)
  echo $GUMBALL
done