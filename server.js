import express from 'express'
import 'dotenv/config'
import mock_data from './mock.json' assert {type:'json'}


const  data = mock_data
let  ID = mock_data.length+1

const app = express()


app.use(express.json())

app.get('/api/users',(req,res)=>{
  
   res.status(200).send(data)
})


app.post('/api/users',(req,res)=>{

  if(!data){
   return res.status(404).send('not found ')
}

const {first_name,last_name,email, gender} = req.body
 
   const obj =  {
      id:ID++,
      first_name,
      last_name,
      email,
      gender
   }
      data.push(obj)
   res.status(201).json(data)

})

app.get('/api/users/:id',(req,res)=>{

   const value = data.find(val => val.id === parseInt(req.params.id))

   if(! value){
     return res.status(404).send('id doesn\tt exist')
   }
   res.status(200).send(value)
})

app.put('/api/users/:id',(req,res)=>{
   const val = data.find(val => val.id === parseInt(req.params.id))
   if(!val){
      return res.status(404).send('obj not found ')
    }
   const  {
     
      first_name,
      last_name,
      email,
      gender

   } = req.body

   
      
   val.first_name =   first_name,
   val.last_name =   last_name,
   val.email =   email,
   val.gender =   gender

   
 
  res.status(200).send(val) 
})

app.delete('/api/users/:id',(req,res)=>{
   const del = data.findIndex(val => val.id === parseInt(req.params.id))

   if(del === -1){
      return res.status(404).send('id not found')
   }

 const val =  data.splice(del,1)
 res.status(200).send(val)
})

app.listen(process.env.PORT || 5000,()=>console.log('server '))