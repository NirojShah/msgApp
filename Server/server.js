let http = require("http")
let fs = require("fs")
let mongodb = require("mongodb")
let {parse} = require("querystring")


http.createServer((req,res)=>{
    if(req.method==="POST"){
        if(req.headers['content-type']==='application/x-www-form-urlencoded'){
            let msg = ''
            req.on('data',chunk=>{
                msg+=chunk
            })
            let mongoDB = async ()=>{
                let client = await mongodb.MongoClient.connect("mongodb+srv://nirojshah1998:<nirajshah@1057984443>@cluster0.bskbypb.mongodb.net/?retryWrites=true&w=majority")
                let db = await client.db("msgbox")
                let coll = await db.collection("groupMsg")
                let finalMsg = parse(msg)
                coll.insertOne(finalMsg)
                console.log(finalMsg)
            }
            mongoDB()
            res.end('<a href="http://localhost:5000/">msgbox</a>')
        }
    }
    else{
        if(req.url==='/home' || req.url==='/'){
            res.writeHead(200,'ok',{'content-type':'text/html'})
            let html = fs.createReadStream("../MSG/msg.html")
            html.pipe(res)
        }
        else if(req.url==='/script'){
            res.writeHead(200,'ok',{'content-type':'*/*'})
            let js = fs.createReadStream("../MSG/msg.js")
            js.pipe(res)
        }
        else if(req.url==='/msgjson'){
            let mongoDBFetch = async ()=>{
                let client = await mongodb.MongoClient.connect("mongodb://127.0.0.1:27017/")
                let db = await client.db("msgbox")
                let coll = await db.collection("groupMsg")
                let data = await coll.find({}).toArray()
                res.end(JSON.stringify(data))
            }
            mongoDBFetch()
        }
        else if(req.ur==='/clearchat'){
            let mongoDBclear = async ()=>{
                let client = await mongodb.MongoClient.connect("mongodb://127.0.0.1:27017/")
                let db = await client.db("msgbox")
                db.dropCollection("groupMsg",(err)=>{
                    if(err)console.log(err)
                    console.log('first')
                    res.end("cleared.....")
                })
    
                res.end("cleared........")
            }
            mongoDBclear()
        }
        else{
            res.writeHead(404,'page not found',{'content-type':'text/plain'})
            res.write("end...")
        }
    } 
}).listen(5000,(err)=>{
    if(err)console.log(err)
    console.log("STARTED....")
})
