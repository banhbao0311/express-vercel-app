import express from 'express'

const app = express();


app.get('/',(req,res,next)=>{
    var json = [
        {
            name : "Nguyen Thanh Nhan",
            yob: "2002",        
        },
        {
            name : "Nguyen The Huy",
            yob: "xxxx",        
        },
        {
            name : "Nguyen Thi Ngoc Mai",
            yob: "xxxx",        
        }
    ]
    res.json(json);
})


app.listen(3000,() =>{
    console.log('app is running');
})