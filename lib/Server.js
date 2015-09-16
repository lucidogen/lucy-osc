'use strict'
const dgram  = require ( 'dgram' )
const decode = require ( 'node-osc/lib/decode' )

const Server = function ( port )
{ let self = this
  port = port || 7031
  self.socket = dgram.createSocket('udp4')
  self.socket.bind ( port )
  self.port = port
  let callbacks = self.callbacks = []
  let map = self.map = {}

  self.socket.on
  ( 'message'
  , function ( data, rinfo )
    { try
      { let message = decode ( data )
        for ( let i = 0, len = callbacks.length; i < len; i++ )
        { callbacks [ i ]
          .apply ( null, message )
        }
        let list = map [ message [ 0 ] ]
        
        if ( typeof list == 'function' )
        { // optimized single value
          list.apply ( null, message )
        }
        else if ( list )
        { for ( let i = 0, len = list.length; i < len; i++ )
          { list [ i ]
            .apply ( null, message )
          }
        }
      }
      catch ( e )
      { console.log ( `Could not decode incomming OSC message (${ e.message }).` )
      }
    }
  )
}
module.exports = Server

Server.prototype.on = function ( url, clbk )
{ let list = this.map [ url ]
  if ( typeof list == 'function' )
  { this.map [ url ] = [ list, clbk ]
  }
  else if ( list )
  { list.push ( clbk )
  }
  else
  { this.map = clbk
  }
}

Server.prototype.setPort = function ( port )
{ if ( port != this.port )
  { this.socket.bind ( port )
    this.port = port
  }
}

Server.prototype.onMessage = function ( clbk )
{ this.callbacks.push ( clbk )
}

