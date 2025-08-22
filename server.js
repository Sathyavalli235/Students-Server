const mongoose=require('mongoose');
const express=require('express');
const cors=require('cors');
const Student=require('./Models/Student');

const app=express();
app.use(cors());
app.use(express.json());

//connection
mongoose.connect("mongodb://localhost:27017/studentDB",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(()=>
console.log("Mongodb Connected")
)
.catch((err)=>
console.log("Not Connected",err))


//post
app.post('/api/students/register',async(req,res)=>{
        const {name,email,course}=req.body;
        const student=new Student({name,email,course});
        try{
        await student.save();
        res.status(200).send("Data Saved")
    }
       catch(err){
        res.status(500).send("Data Not Added");
    }
})

//get
app.get('/api/students',async(req,res)=>{
    try{
        const student= await Student.find();
        res.json(student);
    }
    catch(err){
        res.status(500).send("Not fetched")
    }
})

//server port
const PORT=5000;
app.listen(PORT,() =>{
    console.log(`Server is running in port ${PORT}`)
})  