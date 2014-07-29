troll-mccann
============

troll joe mccann with a twitter bot

### IF YOU'RE ALUNNY AND YOU FORGOT HOW TO DEPLOY

    zip -r tm.zip *
    scp tm.zip digitalocean:
    ssh digitalocean
    killall node # webscale
    rm -rf trollmccann/*
    unzip -d trollmccann/ tm.zip
    source tm_creds.sh
    cd trollmccann
    nohup node index.js > troll.log 2>&1 < /dev/null &
