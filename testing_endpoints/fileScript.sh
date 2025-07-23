#!/bin/bash

ACTION=$1
DATA=$2
PREFIX="http://localhost:4000/api/v1/file"

case $ACTION in
  page)
    curl -X GET "${PREFIX}/files" -d $DATA -b cookies.txt
  ;;
  upload)
    FILENAME=$3
    echo $FILENAME
    curl -X POST "${PREFIX}/upload" -F 'metadata={"phase": "1", "filename": "Random Picture" }' -F "files=@$FILENAME" -b cookies.txt
  ;;
  delete)
    curl -X DELETE "${PREFIX}/delete/${DATA}" -b cookies.txt
  ;;
  download)
    curl -L "${PREFIX}/download/$DATA" -b cookies.txt -o sword.jpg 
  ;;
  *)
    echo "$ACTION is not a valid action"
  ;;
esac


