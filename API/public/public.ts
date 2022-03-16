import * as io from 'socket.io'
import * as mongoose from 'mongoose'

const PORT: number = 3750

/* init publication model for mongoose */
const PublicationSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  dateOfPublish: {
    type: String,
    required: true
  },
  pref: {
    type: Object,
    required: true,
    default: {
      author: 'author name',
      authorVisible: false,
      submitIssue:   false,
    }
  }
})

mongoose.model('publications', PublicationSchema)
const Publication = mongoose.model('publications')

// connect to database
mongoose.connect('mongodb://localhost:1750/publications-storage',
{
    useUnifiedTopology: true,
    useNewUrlParser: true
})
  .then( () => console.log('  database connect success .. ') )
  .catch( () => console.log('  database connect failed .. ') )


const sock: any = io()

/*  sockets  */
sock.on('connection', function (socket: any) {
  
  socket.on('publish', function (data: any, callback) {
    
    const idcreator = (id: string) => {
          
      const symbols: string[] = 
      [
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B',
        'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
        'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 
        'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 
        'y', 'z'
      ]
  
      for (let i: number = 1; i <= 63; i++)
        id += symbols[Math.floor(Math.random() * Math.floor(62) )]
      
      return id
    }

    const publication = new Publication ({
      _id: idcreator(''),
      type: data.type,
      content: data.content,
      dateOfPublish: '10.27.2020(10:28:20)'
    }).save()
      .then( (publication) => {
        console.log(publication)
        callback(true)
      })
      .catch( (err) => {
        
        console.log(err)
        callback(false)
      })
    
  })

  socket.on('get publication', function (data: any, callback) {

  })


  socket.on('get fresh publications', function (data: any, callback) {
    
    callback([])

  })
  

  socket.on('get hot publications', function (data: any, callback) {
    
    callback([])
  })

})

sock.listen(PORT, console.log(`\n  Publications API run on Ip: localhost:${PORT} `) )

