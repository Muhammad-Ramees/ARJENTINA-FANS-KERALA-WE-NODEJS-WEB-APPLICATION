
var express = require('express');
var router = express.Router();

const adminHelpers=require('../helpers/admin-helpers');
const squadHelpers=require('../helpers/squad-helpers');

var router = express.Router();



const verifyAdmin =(req,res,next)=>{
 if(req.session.admin){
  next()
}else{
  res.redirect('/admins/admin-login')
}
}

/* GET admin page. */
router.get('/', function(req, res, next) {
  let admin=req.session.admin
      res.render('admins/index',{admin})
    
 
});
//signup page
router.get('/admin-signup', function(req, res, next) {
      res.render('admins/admin-signup')
    
 
});
//router.get('/squad', function(req, res, next) {
//  res.render('admins/squad')
//});
router.get('/squad',(req,res)=>{
  squadHelpers.getCoach().then((coach)=>{
    squadHelpers.getGk().then((goalkeepers)=>{
      squadHelpers.getDf().then((defenders)=>{
        squadHelpers.getMf().then((midfielders)=>{
          squadHelpers.getFw().then((forwarders)=>{
            res.render('admins/squad',{coach,goalkeepers,defenders,midfielders,forwarders})
          })
        })
      })
    })
  })
})

router.post('/admin-signup', (req, res) => {
      adminHelpers.doSignup(req.body).then((response) => {
        console.log(response);
       
      })
    })
//login page


router.get('/admin-login', (req, res) => {
  let admin =req.session.admin
          console.log("login page opened");
        res.render('admins/admin-login',{adminss:true,admin,"loginErr": req.session.adminLoginErr})
        req.session.adminLoginErr = false
          
        
      
    })
    //----------------admin login---------------//
    router.post('/admin-login', (req, res) => {
      console.log("----------------------------login page is opened------------");

      adminHelpers.doLogin(req.body).then((response)=>{
        if(response.status){
          req.session.adminloggedIn=true
          req.session.admin=response.admin
          res.redirect('/admins')
        }else{
          req.session.adminLoginErr = "Invalid Username or password"
          res.redirect('/admins/admin-login')
        }
      })
       
    })

    router.get('/admin-logout', (req, res) => {
      req.session.admin=null
      req.session.adminLoggedIn=null
      res.redirect('/admins/')
    })

    

    router.get('/fixture',(req,res)=>{
      res.render('admins/fixture')
    })

   // Add coach page

    router.get('/add-coach',(req,res)=>{
      squadHelpers.getCoach().then((coach)=>{
      res.render('admins/add-coach',{coach})
      })
    })
    router.post('/add-coach',(req,res)=>{
      
      squadHelpers.addCoach(req.body,(id)=>{
        let image=req.files.image
       
        image.mv('./public/squad/'+id+'.jpg',(err)=>{
          if(!err){
            squadHelpers.getCoach().then((coach)=>{
              res.render('admins/add-coach',{coach})
            })
          }else{
            console.log(err)
          }
    
        })
        squadHelpers.getCoach().then((coach)=>{
        res.render('admins/add-coach',{coach})
      })
      })
    
      })
    
   

  // add hoalkeeper page
    router.get('/add-gk',(req,res)=>{
      squadHelpers.getGk().then((goalkeepers)=>{
      res.render('admins/add-gk',{goalkeepers})
      })
      
    })
    router.post('/add-gk',(req,res)=>{
  
      squadHelpers.addGk(req.body,(id)=>{
        let image=req.files.image
        image.mv('./public/squad/'+id+'.jpg',(err)=>{
          if(!err){
            squadHelpers.getGk().then((goalkeepers)=>{
              res.render('admins/add-gk',{goalkeepers})
              })
          }else{
            console.log(err)
          }
    
        })
        squadHelpers.getGk().then((goalkeepers)=>{
          res.render('admins/add-gk',{goalkeepers})
          })
      })
    
    })


    router.get('/add-df',(req,res)=>{
      squadHelpers.getDf().then((defenders)=>{
      res.render('admins/add-df',{defenders})
      })
    })
    router.post('/add-df',(req,res)=>{
  
      squadHelpers.addDf(req.body,(id)=>{
        let image=req.files.image
        image.mv('./public/squad/'+id+'.jpg',(err)=>{
          if(!err){
            squadHelpers.getDf().then((defenders)=>{
              res.render('admins/add-df',{defenders})
              })
          }else{
            console.log(err)
          }
    
        })
        squadHelpers.getDf().then((defenders)=>{
          res.render('admins/add-df',{defenders})
          })
      })
    
    })
    router.get('/add-mf',(req,res)=>{
      squadHelpers.getMf().then((midfielders)=>{
      res.render('admins/add-mf',{midfielders})
      })
    })

    router.post('/add-mf',(req,res)=>{
  
      squadHelpers.addMf(req.body,(id)=>{
        let image=req.files.image
        image.mv('./public/squad/'+id+'.jpg',(err)=>{
          if(!err){
            squadHelpers.getMf().then((midfielders)=>{
              res.render('admins/add-mf',{midfielders})
              })          
            }else{
            console.log(err)
          }
    
        })
        squadHelpers.getMf().then((midfielders)=>{
          res.render('admins/add-mf',{midfielders})
          })
      })
    })

    

    router.get('/add-fw',(req,res)=>{
      squadHelpers.getFw().then((forwarders)=>{
      res.render('admins/add-fw',{forwarders})
      })
    })

    router.post('/add-fw',(req,res)=>{
  
      squadHelpers.addFw(req.body,(id)=>{
        let image=req.files.image
        image.mv('./public/squad/'+id+'.jpg',(err)=>{
          if(!err){
            squadHelpers.getFw().then((forwarders)=>{
              res.render('admins/add-fw',{forwarders})
              })          }else{
            console.log(err)
          }
    
        })
        squadHelpers.getFw().then((forwarders)=>{
          res.render('admins/add-fw',{forwarders})
          })      })
    
    })
    //delete rows in squad tables
    router.get('/delete-coach/:id', (req, res) => {
      let coachId = req.params.id
      console.log(coachId);
      squadHelpers.deleteCoach(coachId).then((response) => {
        const fs = require("fs")

        const pathToFile = "./public/squad/"+coachId+".jpg"
        
        fs.unlink(pathToFile, function(err) {
          if (err) {
            throw err
          } else {
            console.log("Successfully deleted the file.")
          }
        })
        res.redirect('/admins/squad/')
      })
    })

    router.get('/delete-gk/:id', (req, res) => {
      let gkId = req.params.id
      console.log(gkId);
      squadHelpers.deleteGk(gkId).then((response) => {
        const fs = require("fs")

        const pathToFile = "./public/squad/"+gkId+".jpg"
        
        fs.unlink(pathToFile, function(err) {
          if (err) {
            throw err
          } else {
            console.log("Successfully deleted the file.")
          }
        })
        res.redirect('/admins/squad/')
      })
    })

    router.get('/delete-df/:id', (req, res) => {
      let dfId = req.params.id
      console.log(dfId);
      squadHelpers.deleteDf(dfId).then((response) => {
        const fs = require("fs")

        const pathToFile = "./public/squad/"+dfId+".jpg"
        
        fs.unlink(pathToFile, function(err) {
          if (err) {
            throw err
          } else {
            console.log("Successfully deleted the file.")
          }
        })
        res.redirect('/admins/squad/')
      })
    })

    router.get('/delete-mf/:id', (req, res) => {
      let mfId = req.params.id
      console.log(mfId);
      squadHelpers.deleteMf(mfId).then((response) => {
        const fs = require("fs")

        const pathToFile = "./public/squad/"+mfId+".jpg"
        
        fs.unlink(pathToFile, function(err) {
          if (err) {
            throw err
          } else {
            console.log("Successfully deleted the file.")
          }
        })
        res.redirect('/admins/squad/')
      })
    })


    router.get('/delete-fw/:id', (req, res) => {
      let fwId = req.params.id
      console.log(fwId);
      squadHelpers.deleteFw(fwId).then((response) => {
        const fs = require("fs")

        const pathToFile = "./public/squad/"+fwId+".jpg"
        
        fs.unlink(pathToFile, function(err) {
          if (err) {
            throw err
          } else {
            console.log("Successfully deleted the file.")
          }
        })
        res.redirect('/admins/squad/')
      })
    })
    //edit and update table   rows in squad page started
  //edit coach
    router.get('/edit-coach/:id',async (req, res) => {
     
      let coach = await squadHelpers.getCoachDetails(req.params.id)
      
      console.log(coach);
      res.render('admins/edit-coach', { coach })
      })
    
    router.post('/edit-coach/:id', (req, res) => {

      console.log(req.body);
      
      let id = req.params.id
      squadHelpers.updateCoach(req.params.id,req.body).then(() => {
        
        res.redirect('/admins/squad')
        if (req.files.Image) {
          let image = req.files.Image
          image.mv('./public/squad/' + id + '.jpg')
        }
      })
    })
    //edit Goal keeper
    router.get('/edit-gk/:id', async (req, res) => {
      
      let gk = await squadHelpers.getGkDetails(req.params.id)
      console.log(gk);
      res.render('admins/edit-gk', { gk })
    })
    router.post('/edit-gk/:id', (req, res) => {

      console.log(req.body);
      
      let id = req.params.id
      squadHelpers.updateGk(req.params.id,req.body).then(() => {
        
        res.redirect('/admins/squad')
        if (req.files.Image) {
          let image = req.files.Image
          image.mv('./public/squad/' + id + '.jpg')
        }
      })
    })
     //edit defender
     router.get('/edit-df/:id', async (req, res) => {
      
      let df = await squadHelpers.getDfDetails(req.params.id)
      console.log(df);
      res.render('admins/edit-df', { df })
    })
    router.post('/edit-df/:id', (req, res) => {

      console.log(req.body);
      
      
      let id = req.params.id
      squadHelpers.updateDf(req.params.id,req.body).then(() => {
        
        res.redirect('/admins/squad')
        if (req.files.Image) {
          let image = req.files.Image
          image.mv('./public/squad/' + id + '.jpg')
        }
      })
    })
    //edit mid fielders
    router.get('/edit-mf/:id', async (req, res) => {
      
      let mf = await squadHelpers.getMfDetails(req.params.id)
      console.log(mf);
      res.render('admins/edit-mf', { mf })
    })
    router.post('/edit-mf/:id', (req, res) => {

      console.log(req.body);
      
      
      let id = req.params.id
      squadHelpers.updateMf(req.params.id,req.body).then(() => {
        
        res.redirect('/admins/squad')
        if (req.files.Image) {
          let image = req.files.Image
          image.mv('./public/squad/' + id + '.jpg')
        }
      })
    })
    
    //edit Forwader
    router.get('/edit-fw/:id', async (req, res) => {
      
      let fw = await squadHelpers.getFwDetails(req.params.id)
      console.log(fw);
      res.render('admins/edit-fw', { fw })
    })
    router.post('/edit-fw/:id', (req, res) => {

      console.log(req.body);
      
      
      let id = req.params.id
      squadHelpers.updateFw(req.params.id,req.body).then(() => {
        
        res.redirect('/admins/squad')
        if (req.files.Image) {
          let image = req.files.Image
          image.mv('./public/squad/' + id + '.jpg')
        }
      })
    })
    
module.exports = router;
