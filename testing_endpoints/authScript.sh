#!/bin/bash

ACTION=$1
DATA=$2
PREFIX="http://localhost:4000/api/v1/auth"

case $ACTION in
  login)
    curl -X POST "${PREFIX}/login" -H "Content-Type: application/json" -d $DATA -b cookies.txt -c cookies.txt 
  ;;
  signup) 
    curl -X POST "${PREFIX}/signup" -H "Content-Type: application/json" -d $DATA -b cookies.txt -c cookies.txt
  ;;
  logout) 
    curl -X POST "${PREFIX}/logout" -b cookies.txt -c cookies.txt
  ;;
  info) 
    curl -X GET "${PREFIX}/retrieveUserInfo" -b cookies.txt -c cookies.txt 
  ;;
  reset)
    curl -X PATCH "${PREFIX}/resetPassword" -H "Content-Type: application/json" -d $DATA -b cookies.txt -c cookies.txt
  ;;
  code)
    curl -X POST "${PREFIX}/authCode?email=${DATA}" -b cookies.txt -c cookies.txt
  ;;
  *)
    echo "$ACTION is not a valid action"
  ;;
esac

