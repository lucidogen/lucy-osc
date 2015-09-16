'use strict'

const Continuous  = require ( 'lucy-util' ).Continuous

const SONG_POS_RE = new RegExp("/sync/song/(\\d+)")
const SYNC_CLIP   = '/sync/clip'

const Sync = function ( server )
{ let self = this
  let position = self.position = new Continuous ( 0.8 )

  server.onMessage
  ( function ( url, value )
    { let re  = SONG_POS_RE.exec ( url )
      if ( re )
      { if ( value > 0)
        { // ignore note off
          position.setValue
          ( parseInt ( re[1] ) )
        }
      }
      else if (url === '/sync/song')
      { position.setValue(value, elapsed() + self.sync_delta)
      }
      else if (url === '/sync/pause')
      { if (value === 1) {
          position.stop()
        } else {
          position.start()
        }
      }
    }
  )                    
}

module.exports = Sync
