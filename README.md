#MTGDeckBuilder


requires a .env in "src" folder should look like this:

NODE_ENV=development

SERVER_HOST={host}
SERVER_PORT={port}

VIEW_ENGINE=ejs
VIEW_FOLDER=views

SESSION_SECRET={secret}
SESSION_RESAVE=false
SESSION_SAVE_UNITIALIZED=true
SESSION_NAME=_mtgdeckbuilder
SESSSION_SECURE=false
SESSION_ROLLING=true
SESSION_COOKIE_AGE=3600000

DB_HOST={host}
DB_USER={user}
DB_PASSWORD={password}
DB_SCHEMA={schema}

ENCRYPTION_SALT=10

PROXY_BASE=https://api.scryfall.com/cards/
PROXY_SYMBOLS=https://api.scryfall.com/symbology
PROXY_SEARCH_BASE=search?order=name&unique=cards&page=
PROXY_QUERY_BASE=&q=legal%3Astandard
PROXY_QUERY_PARAM_NAME=+name%3A

SEARCH_PAGE_SIZE=175

@Authors
Aaron Kelly, Ryan Garcia, Brandon Connor, Shawn Xu
