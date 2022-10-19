# gumballs
A project demonstrates how to use Temporal.io durable workflow technology to emulate a IoT scenario designed with the Actor pattern. The project emulates a Gumball machine that disburses a gumball on demand. And, when the supply of gumballs in the machine runs low, the workflow code replenishes the gumballs in the machine from a supplier located at an external website.



| Take the interactive tutorial|
|----|
|The this project has an interactive tutorial hosted on [Instruqt](https://instruqt.com/) that demonstrates how to install the Temporalite server as well as the demonstration code that used the Temporalite server to ensure that the codes workflow is durable.<br /> <br />You can access the interactive tutorial by clicking on [this link](https://play.instruqt.com/embed/cogarttech/tracks/working-with-temporal-io?token=em_Tg2FIHcUfS_yY-0f).|

# Installation

## Setting up the development environment

The code requires that Node.js and the TypeScript compiler are installed on your computer.

### Installing Node.js on a computer running Ubuntu

`sudo snap install node --classic`

### Installing the TypeScript compiler on a computer running Ubuntu

`sudo npm install ts-node -g`

## Installing Temporalite Server

In a separate terminal window execute the following commands:

Create a working directory in which to install the Temporalite server and then navigate to it

`mkdir temporalserver && cd temporalserver`

Download the latest version of [Temporalite](https://github.com/temporalio/temporalite)

`wget https://github.com/temporalio/temporalite/releases/download/v0.2.0/temporalite_0.2.0_linux_amd64.tar.gz`

Extract the files from the downloaded `.tar.gz` file.

`tar xvf temporalite_0.2.0_linux_amd64.tar.gz`

Start Temporalite in the background

`nohup ./temporalite start --namespace default --ip 0.0.0.0 &`


## Installing the Gumball Supplier API

Execute teh following steps in a new terminal window

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
