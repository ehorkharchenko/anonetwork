import * as io from 'socket.io'
import * as mongoose from 'mongoose'
import * as cryptograph from 'crypto'

const sock: any = io()

const AnonymSchema = new mongoose.Schema({
  "_id": {
    type: String,
    required: true
  },
  "MI": {
    type: String,
    required: true
  },
  "anonym name": {
    type: String,
    required: true
  },
  "anonym id": {
    type: String,
    required: true
  },
  "secure key": {
    type: String,
    required: true
  },
  "emergency key": {
    type: String || Number,
    required: true,
    default: 0
  },
  "friends": {
    type: Object,
    required: true
  },
  "find": {
    type: Object,
    required: true,
    default: {
      "ban": null,
      "warn": 0,
      "pref": {
        "sex": [ 0, 0 ],
        "type": 0,
        "other": {
          "lang": 'English',
          "second": true,
        }
      }
    }
  }
})

mongoose.model('anonyms', AnonymSchema)

mongoose.connect('mongodb://localhost:1750/storage',
{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false 
})
  .then( () => console.log('>  database connect success .. ') )
  .catch( () => console.log('>  database connect failed .. ') )

const Anonym = mongoose.model('anonyms')

const PORT: number = 3650


function find (id): any {

  return new Promise( (resolve, reject) => {
    
    Anonym.find({ _id: id })
      .then(anonyms => {

        resolve(anonyms)
      })
      .catch(err => reject(err) )
  })
}

function emergencyEncrypt (input: string) {
    
    const cryptkey =
      cryptograph
        .createHash('sha512')
        .update(input)
        .digest('hex')
    
    let [ inp, out ]: [ string[], string ] = [ cryptkey.split(''), '' ];

    const table: object = {
      a: '1', b: 'w', c: 'C', d: 'u', e: 'E', f: 'y', g: 'o', h: 'U',
      i: 'a', j: 'i', k: '6', l: 'D', m: 'P', n: 'R', o: 'W', p: '5',
      q: 'B', r: 'n', s: 'f', t: 'j', u: 'b', v: '0', w: 'T', x: 'Y',
      y: 'l', z: '2',
      A: 'r', B: 'V', C: 'J', D: 't', E: 'K', F: 'N', G: 'L', H: 'X',
      I: '9', J: 'p', K: '4', L: 'g', M: '3', N: 'Q', O: 'h', P: 'S',
      Q: 'M', R: 'x', S: 'c', T: 'A', U: 'k', V: 'D', W: 'I', X: 'O',
      Y: '7', Z: 's',
      '0': '8', '1': 'F', '2': 'H', '3': 'v', '4': 'd', 
      '5': 'm', '6': 'q', '7': 'G', '8': 'z', '9': 'e'
    }

    for (let i: number = 0; i < inp.length; i++)
       out += inp[i] + table[i]

    inp = out.split('').reverse()
    out = ''

    for (let i: number = 0; i < 3; i++)
      for (let j: number = 1; i < 109; i++) {
        out += inp[j]

        if (j % 3 === 0)
          out += table[(j - 1)]
      }

  return out = out.split('').reverse() + table[96]

}

sock.on('connection', function (socket: any) {

    socket.on('enter', (data: any, callback) => {

      function crypto () {
        
        const hash = 
          cryptograph
            .createHash('sha512')
            .update(data['secure key'])
            .digest('hex')
        
        let [ input, output ]: [ string[], string] = [ hash.split(''), '' ]
        
        const table: object = 
        {
          a: '1', b: 'w', c: 'C', d: 'u', e: 'E', f: 'y', g: 'o', h: 'U',
          i: 'a', j: 'i', k: '6', l: 'D', m: 'P', n: 'R', o: 'W', p: '5',
          q: 'B', r: 'n', s: 'f', t: 'j', u: 'b', v: '0', w: 'T', x: 'Y',
          y: 'l', z: '2',
          A: 'r', B: 'V', C: 'J', D: 't', E: 'K', F: 'N', G: 'L', H: 'X',
          I: '9', J: 'p', K: '4', L: 'g', M: '3', N: 'Q', O: 'h', P: 'S',
          Q: 'M', R: 'x', S: 'c', T: 'A', U: 'k', V: 'D', W: 'I', X: 'O',
          Y: '7', Z: 's',
          '0': '8', '1': 'F', '2': 'H', '3': 'v', '4': 'd', 
          '5': 'm', '6': 'q', '7': 'G', '8': 'z', '9': 'e'
        }

        for (let [i, bool]: [ number, boolean ] = [ 0, false ]; i < input.length; i++) {

          if (bool) output += table[input[i]]

          output += input[i]
          bool = !bool
        }
        
        return output = output.split('').reverse().join('') + 
               table[input[16]] + table[input[32]] + 
               table[input[64]] + table[input[127]]
      }

      Anonym.find({ 'anonym name': data['anonym name'], 'anonym id': data['anonym id'] })
        .then(anonyms => {
          
          if (anonyms.length > 0) {
            
            if (anonyms[0]['secure key'] === crypto() )
              callback({
                _id:  anonyms[0]['_id'],
                auth: true
              })

            else
              callback({ auth: false })

          } else
              callback({ auth: false })

        })
        .catch(err => {
          
          console.log(err)
          callback({ auth: -1 })
        })
    })
    
    socket.on('generate emergency key', (data, callback) => {
      
      const generate = new Promise( (resolve, reject) => {
        
        const input = function (str = ''): string {
          
          const symbols_list: string[] = 
          [ 
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 
            'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 
            'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
          ]

          for (let i: number = 1; i <= 3096; i++)
             str += symbols_list[Math.floor(Math.random() * Math.floor(62) )]
          
          return str
        } ()

        resolve({
          key: emergencyEncrypt,
          file: input 
        })

      })

      Anonym.find({ 'anonym name': data['anonym name'], 'anonym id': data['anonym id'] })
        .then(anonyms => {
          
          if (anonyms.length === 1) {
            
            generate
              .then( (data: any) => {

                anonyms[0]['emergency key'] = data.key

                callback({
                  _id:  anonyms[0]['_id'],
                  file: data.file
                })
              })

          } else
              callback(-1)
        })
        .catch(err => console.log(err) )
    })

    /* GET method */
    socket.on('get', (data, callback) => {
      
      find(data['_id'])
        .then(anonyms => {

            if (anonyms.length > 0)
              if (data.key !== undefined) {
                callback(anonyms[0][data.key])

              } else if (data.keys !== undefined) {

                  const output = {}

                  for (let i = 0; i < data.keys.length; i++)
                    output[data.keys[i]] = anonyms[0][data.keys[i]]

                  callback(output)

              } else
                  callback(-1)
            
            else
              callback(0)
        })
    })
    
    /* PUSH method */
    socket.on('push', (data, callback) => {

      find(data['_id'])
        .then(anonyms => {

          if (anonyms.length > 0) {
            if (data.key !== undefined) {
              if (data.method === 'on')
                anonyms[0][data.key] = data.val
              
              else if (data.method === 'in')
                if (data.to === 'arr')
                  anonyms[0][data.key] = [ ...anonyms[0][data.key], data.val]
                
                else if (data.to === 'obj')
                  anonyms[0][data.key][data.val.key] = data.val.val

            } else if (data.keys !== undefined) {
                data.keys.map(key => {
                
                  if (data.method === 'on')
                    anonyms[0][key] = data.vals[data.keys.indexOf(key)]

                  else if (data.method === 'in')
                    if (data.to === 'arr')
                      anonyms[0][key].push(data.vals[data.keys.indexOf(key)])

                    else if (data.to === 'obj')
                      anonyms[0][key][data.vals[data.keys.indexOf(key)].key] = data.vals[data.keys.indexOf(key)].val
                })

            } else
                callback(-1)

            anonyms[0].save()
              .then(obj => callback(obj.friends) )
              .catch(err => console.log(err) )

          } else
              callback(-1)
          
        })
        .catch()
    })
    
    /* DELETE method */
    socket.on('delete', (data, callback) => {

    })
    
    /* EDIT method */
    socket.on('edit', (data, callback) => {
      
      find(data['_id'])
        .then( anonyms => {
           
          if (anonyms.length > 0) {
            if (data.key !== undefined) 
              anonyms[0][data.key] = data.key
            
            else if (data.keys !== undefined)
              data.keys.map(key =>{
                
                anonyms[0][key[0]] = key[1]
              })

            anonyms[0].save()
              .then(obj  => callback(true) )
              .catch(err => callback(-1)   )

          } else
              callback(-1)

        })
        .catch(err => console.log(err) )
    })
    

    /* My Friends API */ 
    socket.on('get friends', (data, callback) => {
      
      Anonym.findById(data['_id'])
        .then(anonym => {
          console.log(anonym)
          callback(anonym['friends'])
        })
        .catch(err => console.log(err) )
    })

    socket.on('friend push', (data, callback) => {
      
      Anonym.findById(data['_id'])
        .then(anonym => {
            
            Anonym.updateOne({ _id: anonym['_id']}, { friends: [ ...anonym['friends'], data.friend ] })
              .then( () => callback(true) )
              .catch(err => console.log(err) )

        })
        .catch(err => console.log(err) )
    })

    socket.on('friend delete', (data, callback) => {

      Anonym.findById(data['_id'])
        .then(async anonym => {
          
          const friends = anonym['friends'].filter( (friend) => friend.MI !== data.MI )

          await Anonym.updateOne({ _id: anonym['_id'] }, { friends: friends })
                  .then()
                  .catch(err => console.log(err) )
        })
        .catch(err => console.log(err) )

    })

})

sock.listen(PORT, console.log(` \n>  M - API run on Ip: localhost:${PORT}`) )