# gumballs
A project intended to demonstrate how to use Temporal.io technology

# Installation

## Installing Temporal.io Server

Get the Temporal.io Server and run it using Docker Compose

`git clone https://github.com/temporalio/docker-compose.git`

`cd docker-compose && docker-compose up -d`

or, if you have the later version of Docker Desktop installed

`cd docker-compose && docker compose up -d`

## Installing the Gumball Supplier API

### Optional Environment Variables

`HOST=<DOMAN_NAME_OR_IP_ADDRESS>`

Defaults to `127.0.0.1`

`PORT=<PORT_NUMBER>`

Defaults to `5023`

### Running the Gumball Supplier

Get the source code from GitHub

`git clone https://github.com/reselbob/gumballs`

`cd ./supplier`

`npm run start-supplier`
## Running the Temporal.io worker digital twin for the Gumball machine

### Required Environment Variables

```
SUPPLIER_URL=<URL_OF_SUPPLIER>gumballs
```
Example:

`SUPPLIER_URL=http://127.0.0.1:5023/gumballs/`

### Optional Environment Variables

```
STANDING_ORDER_COUNT=<NUMBER_OF_GUMBALLS_TO_BUY>
```
Defaults to `10`

Example:

`STANDING_ORDER_COUNT=20`

### Running the Temporal.io worker and thus the workflow too.

`cd ../machine`

`npm run start-worker`

### Optional Environment Variables for Gumball Machine API

`HOST=<DOMAN_NAME_OR_IP_ADDRESS>`

Defaults to `127.0.0.1`

`PORT=<PORT_NUMBER>`

Defaults to `5022`

### Running with the Gumball Machine API

`npm run start-machine`

### Interacting with the Gumball Machine API

**Getting a Gumball from the Machine**

```
curl 127.0.0.1:5022/gumball
```
You get a response similar to the following:

```json
{"color":"CLEAR","flavor":"PEPPERMINT"}
```

**Getting the number of Gumballs in inventory**

```
curl 127.0.0.1:5022/gumballs/quantity
```

You get a response similar to the following:

```json
{"quantity":10}
```

**Getting the actual Gumballs in inventory**

```
curl 127.0.0.1:5022/gumballs
```

You get a response similar to the following:

```json
[
  {
    "color": "CLEAR",
    "flavor": "PEPPERMINT"
  },
  {
    "color": "RED",
    "flavor": "CHERRY"
  },
  {
    "color": "YELLOW",
    "flavor": "LEMON"
  },
  {
    "color": "CLEAR",
    "flavor": "PEPPERMINT"
  },
  {
    "color": "GREEN",
    "flavor": "SPEARMINT"
  },
  {
    "color": "GREEN",
    "flavor": "SPEARMINT"
  },
  {
    "color": "RED",
    "flavor": "CHERRY"
  },
  {
    "color": "CLEAR",
    "flavor": "PEPPERMINT"
  },
  {
    "color": "RED",
    "flavor": "CHERRY"
  },
  {
    "color": "GREEN",
    "flavor": "SPEARMINT"
  }
]
```
