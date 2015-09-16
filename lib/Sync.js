'use strict'

const SONG_POS_RE = new RegExp("/sync/song/(\\d+)")
const SYNC_CLIP   = '/sync/clip'
const Continuous  = require ( 'lucy-util' ).Continuous

const Sync = function ( server )
{ let position  = self.position = new Continuous ( 0.8 )

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
      } else {
        let not_done = self.osc_map.every
        ( function ( map )
          { if (map.url) {
              if (url === map.url) {
                map.callback(value, url, map.key)
                return false // stop
              }
            } else if (map.re) {
              let re = map.re.exec(url)
              if (re) {
                re.unshift(value)
                map.callback.apply(re, re)
                return false // stop
              }
            }
            return true
          }
        )
        if (not_done) {
          console.log("OSC message:")
          console.log(url)
        }
      }
    }
  )                    
}

module.exports = Sync
