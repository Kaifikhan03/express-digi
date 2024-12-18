import express from 'express'

const app = express()

const port =3000

app.use(express.json())

let teaData =[]
let newId = 1
//add a new tea 
app.post("/teas",(req, res)=>{

    const {name , price}=req.body
    const newData={ id: newId, name, price}
    teaData.push(newData)
    res.status(201).send(newData)
})

// get all tea 
app.get('/teas', (req, res)=>{
    res.status(200).send(teaData)
})

// get a tea with id
app.get('/teas/:id',(req, res)=>{
   const tea= teaData.find(t => t.id === parseInt (req.params.id))
   if (!tea) {
        return res.status(404).send('Tea not found')    
   }
   res.status(200).send(tea)
})

//update tea

app.put('/teas/:id', (req, res) =>{
    const tea= teaData.find(t => t.id === parseInt (req.params.id))
    if (!tea) {
        return res.status(404).send('Tea not found')    
   }
   const {name, price }=req.body
   tea.name = name
   tea.price =price
   res.status(200).send(tea)
})

//delete tea

app.delete('/teas/:id', (req, res) => {
   const index = teaData.findIndex(t => t.id === parseInt(req.params.id))
   if (index === -1) {
    return res.status(404).send('tea not found')
   }
   teaData.splice(index, 1)
   return res.status(204).send('delete')
})


// app.post("/persons",(req, res)=>{

//     const {name , price}=req.body
//     const newData={ id: newId, name, price}
//     personData.push(newData)
//     res.status(201).send(newData)
// })

app.listen(port, () =>{
    console.log(`server is running  at port : ${port}`)
})