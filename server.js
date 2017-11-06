//Get requirements and set instances
const expr = require("express");
const body = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
var validurl= require('valid-url');
//const shortUrl = require("./models/shorturl");
//set app
const app = expr();
app.use(cors());
app.use(body.json());
///*
const Schema = mongoose.Schema;
const urlSchema = new Schema({
    originalUrl: String,
    shortenedUrl: String
},{timestamps: true});

const shortUrl = mongoose.model('shortUrl',urlSchema);

//*/

//Connect to the database
//mongoose.connect("mongodb://ahammadunny2:Namboorimadham#1@ds12345.mlab.com:56789/ahammadunny");
mongoose.connect(process.env.MONGODB_URI="mongodb://ahammadunny3:Namboorimadham@ds121345.mlab.com:21345/ahammadunny");

app.use(expr.static(__dirname +'/public'));
//get request for the url that needs to be shortened
app.get('/new', (req, res) => {
//app.get("/new/:urlToShorten(*)", (req,res,next)=>{
   // var { urlToShorten } = req.params; 
  var urlToShorten = req.query['web'];
  
    //Check to see if valid url
//var regex = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
 var regex = new RegExp ("^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.//[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$");
    if(regex.test(urlToShorten)===true){
    //  if(validurl.isUri(urlToShorten)){
 //   /*
      shortUrl.findOne({originalUrl: urlToShorten}, function (err, doc){
    if (doc){
      // base58 encode the unique _id of that document and construct the short URL
     // this line was here shortUrl = config.webhost + base58.encode(doc._id);

      // since the document exists, we return it without creating a new entry
   // return  res.send({shortenedUrl: shorturl});
      return res.send(doc.shortenedUrl);
    } else {
      // The long URL was not found in the long_url field in our urls
      // collection, so we need to create a new entry:
      var short = Math.floor(Math.random()*100000).toString();
      var data = new shortUrl({
        originalUrl: urlToShorten,
        shortenedUrl: short
      });

      // save the new link
      data.save(function(err) {
        if (err){
          console.log(err);
        }
        return res.json(data);
        })
        }
        })

  //    */
      /*
       var short = Math.floor(Math.random()*100000).toString();
       var data = new shortUrl({
            originalUrl: urlToShorten,
           shortenedUrl: short
        })

        data.save((err)=>{
            if(err){
                 res.send('Error saving to database, try again');
            }
        });
        return res.json(data);
   */
    }
    
       
  else if(!Number.isInteger(Number(urlToShorten))){
  var      data = new shortUrl({
        originalUrl: urlToShorten,
        shortenedUrl: "Invalid URL Entered"
    });
    return res.json(data);
    }
//})
    

//Query database and forward to URL
else {
//app.get("/short/:urlToForward",(req,res,next)=>{
    // var shorterUrl = req.params.urlToForward;

    shortUrl.findOne({'shortenedUrl':urlToShorten},(err,data)=>{
        if(err){
             res.send("Error reading database");
        }
        else if(!data) { res.send(" website not found in the database")}
      
       else  {
           var re = new RegExp("^(http||https)://","i");
          
        var stringin = data.originalUrl;
      //    var stringToCheck = data,originalUrl;
         if(stringin.indexOf("http://") == 0 || stringin.indexOf("https://") == 0)
            {
          
       // if(re.test(stringToCheck)===true){
             return res.redirect(301,data.originalUrl);
        }
        else{ 
            return res.redirect(301, 'http://'+data.originalUrl);
        }

        }
    })
}
})
//}) for app.get(the first one)






//listen on port
app.listen("3000", ()=>{
    console.log("Shit be workin, yo");
})