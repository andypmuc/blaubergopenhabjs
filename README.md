# Introduction

This is a Javascript module with Typescript support for communicating with a Blauberg Vento (and OEMS like Duka One S6w).
The Blauberg Vento is a one room ventilationsystem with a heat exchanger.

This module has roots in the [dukaonesdk](https://github.com/dingusdk/dukaonesdk/blob/master/readme.md) but has been rewritten from scratch in order to better seperate reponsibilites into different classes, while still being able to reuse shared logic.

The primary goal for this module is to create a Javascript client that makes communicating with Blauberg Vento(and its derivatives) a simple task. My personal need is to integrate it into Homebridge and node-red.

## Create project and installation of package

Create a NPM project in a directory by using

```
npm init
```

command and install blaubergopenhabjs package by

```
npm install blaubergopenhabjs
```

The module has the following 2 levels of communication:
1. A low level client that mimics the communication protocol specified by Blauberg.
2. A high level resource that wraps the low level client for easier usage.

Please create a index.js file and try the example below.
 
## Low level Example 

```
import bbohjs from 'blaubergopenhabjs'

const client = new bbohjs.BlaubergVentoClient();

// Find all devices on the local network
const addresses = await client.findDevices();

// Assemble package for reading ON_OFF state
const packet = new Packet(addresses[0].id, '1111', FunctionType.READ, [DataEntry.of(Parameter.ON_OFF)])

// Send package and wait for response.
const response = await client.send(packet, addresses[0].ip);

// Check value
const isOn = response.packet.dataEntries[0].value === 1;
```

## High Level Example

```
import bbohjs from 'blaubergopenhabjs'

const resource = new bbohjs.BlaubergVentoResource();

// Find all devices on the local network
const devices = await resource.findAll();

// Change a device and save it
let device = devices.content[0];
device.speed = 1;
device = await resource.save(device);

```
## Running project

Execute command

```
node index.js
```

[You can see the documentation from Blauberg here](https://blaubergventilatoren.de/uploads/download/b133_4_1en_01preview.pdf)
