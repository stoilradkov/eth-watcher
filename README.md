# Eth-watcher

A small service to watch and filter ethereum transactions based on defined configurations.

## Installation
### Prerequisites
- node version - 16.x.x
- npm version - 8.x.x
- docker
### Installation
1. An infura api key is required to connect to an ethereum network -  [Infura](https://infura.io/)
2. Clone the repo - ```git clone https://github.com/stoilradkov/eth-watcher.git```
3. Install npm packages
- ```cd dynamicConfiguration``` -> ```npm i```
- ```cd transactionWatcher``` -> ```npm i```
4. Create .env files in `dynamicConfiguration` and `transactionWatcher`. 

Example .env file in `dynamicConfiguration` :
```
NODE_ENV=development
PORT=5000 // or any other port
MONGO_URI=mongodb://username:password@mongodb:27017/configuration?authSource=admin
REDIS_URI=redis://cache:6379

MONGO_INITDB_ROOT_USERNAME=username
MONGO_INITDB_ROOT_PASSWORD=password
MONGO_LOCAL_PORT=27017
MONGO_DOCKER_PORT=27017
MONGO_INITDB_DATABASE=configuration
```

Example .env file in `transactionWatcher` :
```
NODE_ENV=development
PORT=5001
REDIS_URI=redis://cache:6379
POSTGRES_URI=postgres://username:password@postgres:5432/transactions
CONFIGURATION_API_URI=http://api:5000
INFURA_API_KEY=123 // your api key
ETHEREUM_NETWORK=ropsten

POSTGRES_USER=username
POSTGRES_PASSWORD=password
POSTGRES_LOCAL_PORT=5432
POSTGRES_DOCKER_PORT=5432
POSTGRES_DB=transactions

REDIS_LOCAL_PORT=6379
REDIS_DOCKER_PORT=6379
```

5. Run docker compose
- In `dynamicConfiguration` - `docker compose build` -> `docker compose up`
- In `transactionWatcher` - `docker compose build` -> `docker compose up`

The transaction watcher service relies on the dynamic configuration api to retrieve initial config, so it's recommended to wait for the dynamic configuration service to start up first. However, it's still possible to retrieve the config at a later time when it is updated by a user.
