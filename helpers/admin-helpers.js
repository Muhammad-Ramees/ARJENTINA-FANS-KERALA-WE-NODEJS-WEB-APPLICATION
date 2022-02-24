var db=require('../config/connection')
var collection=require('../config/collections')
const bcrypt=require('bcrypt')
const { response } = require('express')
var objectId=require('mongodb').ObjectID


module.exports={


    doSignup:(adminData)=>{
        return new Promise(async(resolve,reject)=>{
        adminData.Password=await bcrypt.hash(adminData.Password,10)
        db.get().collection(collection.ADMIN_COLLECTION).insertOne(adminData).then((data)=>{
        resolve(data.ops[0])
    })
    })
    },
    doLogin: (adminData) => {
        return new Promise(async(resolve,reject)=>{
            let loginStatus=false
            let response={}
            let admin=await db.get().collection(collection.ADMIN_COLLECTION).findOne({Email:adminData.Email})
            if(admin){
                bcrypt.compare(adminData.Password,admin.Password).then((status)=>{
                    if(status){
                        console.log("login success-----");
                        response.admin=admin
                        response.status=true
                        resolve(response)
                    }else{
                        console.log('login failed');
                        resolve({status:false})
                    }
                })
            }else{
                console.log('-----login failed---');
                resolve({status:false})

            }
        })
    }

}
        