'use strict'

require ( 'chai' )
.should ()

const osc  = require ( '../lib/index' )
const Sync = require ( '../lib/Sync'  )

let sync = new Sync ( osc.server () )

describe
( 'Sync'
, function ()
  { describe
    ( '.position'
    , function ()
      { it
        ( 'should exist'
        , function ()
          { sync.position
            .should.be.a ( 'object' )
          }
        )
      }
    ) // .position
  }
)  // lucy-osc

