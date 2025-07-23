#!/bin/bash

ACTION=$1
DATA=$2
PREFIX="http://localhost:4000/api/v1/ticket"

case $ACTION in
  create)
    FILENAME=$3
    curl -X POST "${PREFIX}/create" -F 'metadata={"title":"First Ticket","priority":"1","team":"Programmer"}' -F "images=@${FILENAME}" -b cookies.txt
  ;;
  page)
    curl -X GET "${PREFIX}/getPage" -H "Content-Type: application/json" -d $DATA -b cookies.txt
  ;;
  ticket)
    curl -X GET "${PREFIX}/getSpecific?id=${DATA}" -b cookies.txt
  ;;
  remove)
    curl -X DELETE "${PREFIX}/remove?id=${DATA}" -b cookies.txt
  ;;
  update)
    ID=$3
    curl -X PATCH "${PREFIX}/update?id=${ID}" -H "Content-Type: application/json" -d ${DATA} -b cookies.txt
  ;;
  info)
    curl -X GET "${PREFIX}/user" -b cookies.txt
  ;;
  *)
    echo "$ACTION is not a valid action"
  ;;
esac

