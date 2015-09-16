# Lucy OSC [![Build Status](https://travis-ci.org/lucidogen/lucy-live.svg)](https://travis-ci.org/lucidogen/lucy-osc)

Part of [lucidity](http://lucidity.io) project.

## OSC wrapper for lucidity

Usage example:

  ```Javascript
  const osc = require ( 'lucy-osc' )

  osc.on
  ( '/hello'
  , function ( url, value )
    { console.log ( url, value )
    }
  )
  ```

## Installation

Currently only works with [**io.js**](https://iojs.org).

  ```shell
  npm install lucy-osc --save
  ```

## Tests

  ```shell
  npm test
  ```

## Contributing

Please use ['jessy style'](http://github.com/lucidogen/jessy).

Add unit tests for any new or changed functionality.

## Release History

  * 0.1.0