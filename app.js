var express = require("express"); // call the express module which is default provded by Node


var app = express(); // now we need to declare our app which is the envoked express application
app.set('view engine','ejs');// Set the template engine 

app.use(express.static("views")); // Allow access to views folder
app.use(express.static("style")); // Allow access to styling folder
app.use(express.static("images")); // Allow access to images


var mysql = require('mysql');

// body parser to get information
var fs = require('fs')
var bodyParser = require("body-parser") // Call body parser modul and make use of it
app.use(bodyParser.urlencoded({extended:true}));

//**************************Start of SQL ****************************

const db = mysql.createConnection({
    host: 'den1.mysql6.gear.host',
    user: 'gallerybd',
    password: 'Ne1PzD?0iS~v',
    database: 'gallerybd'
 });
// Next we need to create a connection to the database

db.connect((err) =>{
     if(err){
        console.log("go back and check the connection details. Something is wrong.")
        // throw(err)
    } 
     else{
        
        console.log('Looking good the database connected')
    }
    
    
})

// this route will create a database table
// app.get('/createtable', function(req,res){
//     // Create a table that will show product Id, name, price, image and sporting activity
    
//     let sql = 'CREATE TABLE Zhen (Id int NOT NULL AUTO_INCREMENT PRIMARY KEY, Name varchar(255), Price int, Image varchar(255), Activity varchar(255))';
    
//      let query = db.query(sql, (err,res) => {
        
//          if(err) throw err;
        
//          console.log(res);
        
//      });
    
//      res.send("You created your first DB Table")
    
//  })

 // This route will create a product 


// app.get('/insert', function(req,res){
//     // Insert a table that will show product Id, name, price, image and sporting activity
//     let sql = 'INSERT INTO Zhen (Name, Price, Image, Activity) VALUES ("polar M400", 199, "polarm400.png", "Running") ';
    
//     let query = db.query(sql, (err,res) => {
        
//         if(err) throw err;
        
//         console.log(res);
        
//     });
    
//     res.send("You created your first Product")
    
// })   
 
 // Url to get the products

app.get('/products', function(req,res){
    // Create a table that will show product Id, name, price, image and sporting activity
    let sql = 'SELECT * FROM Zhen';
    
    let query = db.query(sql, (err,result) => {
        
        if(err) throw err;
        
        console.log(result);
        
        res.render('products', {result})
        
    });
    
    //res.send("You created your first Product")
    
})   

// URL to get the add product page
app.get('/addproduct', function(req,res){
    // Create a table that will show product Id, name, price, image and sporting activity
  
        res.render('addproduct')
        
  
    
})


// post request to write info to the database


app.post('/addproduct', function(req,res){
    
//  let sampleFile = req.files.sampleFile;
//   filename = sampleFile.name;
    
//     sampleFile.mv('./images/' + filename, function(err){
        
//         if(err)
        
//         return res.status(500).send(err);
//         console.log("Image you are uploading is " + filename)
//       // res.redirect('/');
//     })
    
    
    
    
    // Create a table that will show product Id, name, price, image and sporting activity
    let sql = 'INSERT INTO Zhen (Name, Price, Image, Activity) VALUES ("   '+req.body.name+'   ", '+req.body.price+', "'+req.body.image+'", "'+req.body.activity+'") ';
    //   let sql = 'INSERT INTO Zhen (Name, Price, Image, Activity) VALUES ("polar M400", 199, "polarm400.png", "Running") ';

   
   let query = db.query(sql, (err,res) => {
        
        if(err) throw err;
        
        console.log(res);
        
    });
    
    res.redirect('/products')
    //res.send("You created your first Product")
    
})

// URL to get the edit product page

app.get('/editproduct/:id', function(req,res){
    
    
    let sql = 'SELECT * FROM Zhen WHERE Id =  "'+req.params.id+'" ';
    
    let query = db.query(sql, (err,result) => {
        
        if(err) throw err;
        
        console.log(result);
        
        res.render('editproduct', {result})
        
    });
    
    
})
    
 // URL to edit product
   
  app.post('/editproduct/:id', function(req,res){
    // Create a table that will show product Id, name, price, image and description
    let sql = 'UPDATE Zhen SET Name = "   '+req.body.name+'   ", Price = '+req.body.price+', Image = "'+req.body.image+'", Activity = "'+req.body.activity+'" WHERE Id =  "'+req.params.id+'" ';
    
    let query = db.query(sql, (err,res) => {
        
        if(err) throw err;
        
        console.log(res);
        
    });
    
    res.redirect('/products')
    //res.send("You created your first Product")
    
}) 
   
// URL TO delete a product

app.get('/delete/:id', function(req,res){
    
        let sql = 'DELETE FROM Zhen WHERE Id =  "'+req.params.id+'" ';
    
    let query = db.query(sql, (err,result) => {
        
        if(err) throw err;
        
        console.log(result);
  
    });
    
    res.redirect('/products')
    
    
})



//**************************End of SQL ******************************

// ******************************************From here is JSON data ********************************
var contact = require("./model/contact.json");

// set up simple hello world application using the request and response function
app.get('/', function(req, res) {
res.render("index"); // we set the response to send back the string hello world
console.log("Hello World"); // used to output activity in the console
});


app.get('/contacts', function(req,res){
    res.render("contacts", {contact}); //Get the contacts page when somebody visits the /contacts url
    console.log("I found the about page");
});

// app.get('/about', function(req,res){
//     res.render("about"); //Get the about page when somebody visits the /contacts url
//     console.log("I found the contacts page");
// });




// Get the contact us page
app.get('/add', function(req, res) {
res.render("add"); // we set the response to send back the string I found the contact us page
console.log("I found the contact us page"); // used to output activity in the console
});


//post request to send JSON data to server
app.post("/add",function(req,res){
   
   //Step 1 is to find the largest id in the JSON file 
   function getMax(contacts, id){ // function is called getMax
   var max // the max variable is declared here but still unknown
   
    for (var i=0; i<contacts.length; i++){ // loop through the contacts in the json file as long as there are contacts to read
        
        if(!max || parseInt(contact[i][id])> parseInt(max[id]))
        max = contacts[i];
    }
    return max;
    
    }
    // make a new ID for the next item in the JSON file
     maxCid = getMax(contact,"id") // calls the getMax function from above and passes in parameters
    
    var newId = maxCid.id + 1; // add 1 to old largest to make new largest
    // show the result in the console
    console.log("new Id is " + newId)
    // we need to get access to what the user types in the form
    // and pass it to our JSON file as the new data
    
    var contactsx = {
        id: newId,
        name: req.body.name,
        comment: req.body.comment,
        email: req.body.email
        
    }
    fs.readFile('./model/contact.json','utf8', function readfileCallback(err){
        if(err) {
            throw(err)
        } else {
            
            contact.push(contactsx); // add the new data to the JSON file
            json = JSON.stringify(contact, null, 4); // this line structures the JSON so it's easy on the eye
            fs.writeFile('./model/contact.json',json, 'utf8')
        }
    })
    
    res.redirect('/contacts');
    
    
});

// Now we code for the edit JSON date

// *** get page to edit 
app.get('/editcontact/:id', function(req,res){
    // Now we build the actual information based on the changes made by the user 
   function chooseContact(indOne){
       return indOne.id === parseInt(req.params.id)
       }


  var indOne = contact.filter(chooseContact)
    
   res.render('editcontact', {res:indOne}); 
    
});

// *** Perform the edit

 app.post('/editcontact/:id', function(req,res){
     
     //firstly we need to stringify our JSON data so it can be call as a variable an modified as needed
     var json = JSON.stringify(contact)
     
     // declare the incoming id from the url as a variable
     var keyToFind = parseInt(req.params.id)
    
    // use predetermined JavaScript functionality to map the data and find the Information i need
    var index = contact.map(function(contact) {return contact.id}).indexOf(keyToFind)
    
    // the next three lines get the content from the body where the user fills in the form 
    var z = parseInt(req.params.id);
    var x = req.body.name   
    var y = req.body.comment
    // The next section pushes the new data into the json file in place of the data to be updated
    contact.splice(index, 1, {name: x, comment: y, email: req.body.email, id: z })
    
    
    // Now we reformat the JSON and push it back to the actual file 
    json = JSON.stringify(contact, null, 4); // this line structures the JSON so it's easy on the eye
    fs.writeFile('./model/contact.json',json,'utf8',function(){})
    
    res.redirect("/contacts");
})

app.get ('/deletecontact/:id', function(req,res){
    
    
    
    // firstly we need to stringify our JSON data so it can be call as a variable an modified as needed
    var json = JSON.stringify(contact)
    
    // declare the incoming id from the url as a variable 
    var keyToFind = parseInt(req.params.id)
    
    // use predetermined JavaScript functionality to map the data and find the information I need 
    var index = contact.map(function(contact) {return contact.id}).indexOf(keyToFind)
    

    contact.splice(index, 1)
    
  
    
    // now we reformat the JSON and push it back to the actual file
    json = JSON.stringify(contact, null, 4); // this line structures the JSON so it is easy on the eye
    fs.writeFile('./model/contact.json',json, 'utf8', function(){})
    
    res.redirect("/contacts");
    
    
    
})


// this code provides the server port for our application to run on
app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
console.log("Yippee its running");
  


});
