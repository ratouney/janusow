git add .
git commit -am "RatouScript : Autodeploy"
git checkout master
git pull
git merge development
git push --all
ssh root@79.137.85.104
