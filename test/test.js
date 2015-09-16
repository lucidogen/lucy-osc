'use strict'

require ( 'chai' )
.should ()

const osc = require ( '../lib/index' )

describe
( 'osc'
, function ()
  { describe
    ( '#on'
    , function ()
      { it
        ( 'should exist'
        , function ()
          { osc.on
            .should.be.a ( 'function' )
          }
        )
      }
    ) // #on

    describe
    ( '#onMessage'
    , function ()
      { it
        ( 'should exist'
        , function ()
          { osc.onMessage
            .should.be.a ( 'function' )
          }
        )
      }
    ) // #onMessage

    describe
    ( '#sync'
    , function ()
      { it
        ( 'should exist'
        , function ()
          { osc.sync
            .should.be.a ( 'function' )
          }
        )
      }
    ) // #sync
  }
)  // lucy-osc
