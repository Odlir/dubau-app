# Dubau App
Sistema de **Facturación Electrónica** Peru , normado por SUNAT.   
Link de produccion [@dubau/dubau-app](http://dubaumetalindustria.com/dubau/).

## Requerimientos
- PHP `8.1` o superior
- Extensiones PHP para Lycet: `soap`, `zlib`, `openssl`, `curl`.
- Composer 2
- Mysql 8.0

## Primeros Pasos
1. cd/front
2. npm install
3. cd/backend
4. composer Insall
5. php artisan migrate
6. php artisan db:seed

### Configuraciones  
En el archivo `.env` ubicado en la raíz del proyecto, podrá cambiar estas configuraciones.
```
###> dubau-app/dubau-app ###
APP_NAME=Laravel
APP_ENV=local
APP_KEY=base64:Tlj8JwpkFAXnLfcxqflRRDONJLZe60KcEm9oNnjHthE=
APP_DEBUG=true
APP_URL=http://localhost

BACK_URL=http://127.0.0.1:8000

LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=dubau
DB_USERNAME=root
DB_PASSWORD=

BROADCAST_DRIVER=log
CACHE_DRIVER=file
FILESYSTEM_DISK=local
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120

MEMCACHED_HOST=127.0.0.1

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=smtp
MAIL_HOST=mailhog
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=
AWS_USE_PATH_STYLE_ENDPOINT=false

PUSHER_APP_ID=
PUSHER_APP_KEY=
PUSHER_APP_SECRET=
PUSHER_HOST=
PUSHER_PORT=443
PUSHER_SCHEME=https
PUSHER_APP_CLUSTER=mt1

VITE_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
VITE_PUSHER_HOST="${PUSHER_HOST}"
VITE_PUSHER_PORT="${PUSHER_PORT}"
VITE_PUSHER_SCHEME="${PUSHER_SCHEME}"
VITE_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"

JWT_SECRET=WWdaqveeY4vA9VPOuQdpxju4oW5Y8CVOQf0luoN5BJFPbKjC7kWSNYtfXYrftrC4

JWT_ALGO=HS256

###< dubau-app/dubau-app ###
```
## Frameworks 
Dubau actualmente utiliza los siguientes complementos.
Las instrucciones sobre cómo usarlos estan en su propia aplicación y están vinculadas a continuación.

| Framework | Link |
| ------ | ------ |
| Boostrap | [https://getbootstrap.com/] |
| JQuery | [https://jquery.com/] |
| Codeigniter | [https://codeigniter.com/] |
