echo "Applying Migrations on"
echo $HEROKU_APP_NAME

cd hasura

hasura migrate apply --database-name default --endpoint $HEROKU_APP_NAME

hasura metadata apply --endpoint $HEROKU_APP_NAME