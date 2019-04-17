cd ~/Desktop
mongodump --db=exxy
cd ~/Desktop/dump/exxy
zip dump.zip *
mv dump.zip ~/Desktop
rm -r ~/Desktop/dump