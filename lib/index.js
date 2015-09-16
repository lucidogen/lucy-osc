/*
  # OSC wrapper for lucidity
*/
'use strict'
const osc    = require ( 'node-osc'     )
const Sync   = require ( './Sync'   )
const Server = require ( './Server' )

const lib =
{ VERSION: '0.1.1'
}
module.exports = lib

lib.onMessage = function ( clbk )
{ lib.server ()
  .onMessage ( clbk )
}

let server
lib.server = function ( port )
{ if ( !server )
  { server = new Server
  }
  else if ( port !== undefined )
  { server.setPort ( port )
  }
  return server
}

let sync
lib.sync = function ( clbk )
{ if ( !sync ) sync = new Sync ( lib.server () )
  return sync.position
}

lib.on = function ( url, clbk )
{ lib.server ()
  .on ( url, clbk )
}
