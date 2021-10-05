const express=require('express')
const app=express()
const fs=require('fs')
const port=3000
let data=require('./data/podcasts.json')
const bodyParser= require('body-parser')
app.use(bodyParser.json())


app.listen(port)


function filterById(id){
    const result= data.filter(pod=>pod.id==id)
    if(result.length===0){
        return null
    }
    return result
}

function writePodToDb(){
    fs.writeFile('./data/podcasts.json',JSON.stringify(data), (err)=>{
        if(err) {
            throw err;
        }
    })
}

function deletePod(id){
    data=data.filter(pod=>pod.id!= id)
    writePodToDb()
}

function addNewPod(podcast){
    data.push(podcast)
    writePodToDb()
}

function updatePod(updatedPod){
    let podToUpdate=data.filter(pod=> pod.id==updatedPod.id)[0]
    podToUpdate={...podToUpdate,...updatedPod}
    data=data.filter(pod=>pod.id!=podToUpdate.id)
    data.push(podToUpdate)
    writePodToDb()
}


app.get('/podcast/:id',(req,res)=>{
    const id=req.params.id
    if(!id){
        res.status(400).send('No id entered')
    }
   const result=filterById(id)
    res.send(result)
})

app.post('/podcast/new',(req,res)=>{
    const id=filterById(req.body.id)
    if(id){
        res.status(400).send('This podcast already exists')
    }
    else{
        addNewPod(req.body)
        res.status(200).send('The podcast has been added')
    }
})


app.delete('/podcast/:id',(req,res)=>{
    const id=req.params.id
    if(!id){
        res.status(400).send('No id entered')
    }
    const result=filterById(id)
    if(!result){
        res.status(404).send('This podcast does not exist, therefore cannot be deleted')
    }
    else {
        deletePod(id)
        res.status(200).send('The item has been deleted successfully')
    }
})


app.put('/podcast/:id',(req,res)=>{
    const id=req.params.id
    if(!id){
        res.status(400).send('No id entered')
    }
    const result=filterById(id)
    if(!result){
        res.status(404).send('This podcast does not exist, therefore cannot be updated')
    }
    else {
        updatePod(req.body)
        res.status(200).send('The item has been updated successfully')
    }
})


console.log('listening on port '+ port+ '...')
