var db=require('../config/connection')
var collection=require('../config/collections')
const bcrypt=require('bcrypt')
const { response } = require('express')
var objectId=require('mongodb').ObjectID

module.exports={
    addCoach:(coach,callback)=>{
       
        
        db.get().collection(collection.SQUAD_COACH).insertOne(coach).then((data)=>{
    
            callback(data.ops[0]._id)

        })
    },

    addGk:(gk,callback)=>{
        db.get().collection(collection.SQUAD_GOALKEEPERS).insertOne(gk).then((data)=>{
            callback(data.ops[0]._id)
        })
    },

    addDf:(df,callback)=>{
        db.get().collection(collection.SQUAD_DEFENDERS).insertOne(df).then((data)=>{
            callback(data.ops[0]._id)
        })
    },
    addMf:(mf,callback)=>{
        db.get().collection(collection.SQUAD_MIDFIELDERS).insertOne(mf).then((data)=>{
            callback(data.ops[0]._id)
        })
    },

    addFw:(fw,callback)=>{
        db.get().collection(collection.SQUAD_FORWARDERS).insertOne(fw).then((data)=>{
            callback(data.ops[0]._id)
        })
    },

   //getting the detiails of squad for viewing in dashboard
    getCoach:()=>{
        return new Promise(async(resolve,reject)=>{
            let coach=await db.get().collection(collection.SQUAD_COACH).find().toArray()
            resolve(coach)

        })
    },

    getGk:()=>{
        return new Promise(async(resolve,reject)=>{
            let goalkeepers=await db.get().collection(collection.SQUAD_GOALKEEPERS).find().toArray()
            resolve(goalkeepers)

        })
    },

    getDf:()=>{
        return new Promise(async(resolve,reject)=>{
            let defenders=await db.get().collection(collection.SQUAD_DEFENDERS).find().toArray()
            resolve(defenders)

        })
    },

    getMf:()=>{
        return new Promise(async(resolve,reject)=>{
            let midfielders=await db.get().collection(collection.SQUAD_MIDFIELDERS).find().toArray()
            resolve(midfielders)

        })
    },

    getFw:()=>{
        return new Promise(async(resolve,reject)=>{
            let forwarders=await db.get().collection(collection.SQUAD_FORWARDERS).find().toArray()
            resolve(forwarders)

        })
    },
    //delete squad table rows in gk,df,coach,mf
    deleteCoach:(coachId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.SQUAD_COACH).removeOne({_id:objectId(coachId)}).then((response)=>{
                //console.log(response);
                resolve(response)
            })
        })
    },
    deleteGk:(gkId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.SQUAD_GOALKEEPERS).removeOne({_id:objectId(gkId)}).then((response)=>{
                //console.log(response);
                resolve(response)
            })
        })
    },
    deleteDf:(dfId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.SQUAD_DEFENDERS).removeOne({_id:objectId(dfId)}).then((response)=>{
                //console.log(response);
                resolve(response)
            })
        })
    },
    deleteMf:(mfId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.SQUAD_MIDFIELDERS).removeOne({_id:objectId(mfId)}).then((response)=>{
                //console.log(response);
                resolve(response)
            })
        })
    },
    deleteFw:(fwId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.SQUAD_FORWARDERS).removeOne({_id:objectId(fwId)}).then((response)=>{
                //console.log(response);
                resolve(response)
            })
        })
    },
    //edit squad page coach table rows
    getCoachDetails:(coachId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.SQUAD_COACH).findOne({_id:objectId(coachId)}).then((coach)=>{
                resolve(coach)
            })
        })
    },
    updateCoach:(coachId,coachDetails)=>{
        console.log(coachDetails,"req.body squadhelper");
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.SQUAD_COACH)
            .updateOne({_id:objectId(coachId)},{
                $set:{
                    Name:coachDetails.Name,
                    Role:coachDetails.Role
                }
            }).then((response)=>{
                resolve()
            })
        })
    },
    //edit and update gk
    getGkDetails:(gkId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.SQUAD_GOALKEEPERS).findOne({_id:objectId(gkId)}).then((gk)=>{
                resolve(gk)
            })
        })
    },
    updateGk:(gkId,gkDetails)=>{
        console.log(gkDetails,"req.body squadhelper");
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.SQUAD_GOALKEEPERS)
            .updateOne({_id:objectId(gkId)},{
                $set:{
                    Name:gkDetails.Name,
                    Club:gkDetails.Club
                }
            }).then((response)=>{
                resolve()
            })
        })
    },
    //edit and update Defenders(df)
    getDfDetails:(dfId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.SQUAD_DEFENDERS).findOne({_id:objectId(dfId)}).then((df)=>{
                resolve(df)
            })
        })
    },
    updateDf:(dfId,dfDetails)=>{
        console.log(dfDetails,"req.body squadhelper");
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.SQUAD_DEFENDERS)
            .updateOne({_id:objectId(dfId)},{
                $set:{
                    Name:dfDetails.Name,
                    Club:dfDetails.Club
                }
            }).then((response)=>{
                resolve()
            })
        })
    },
     //edit and update Middlefielders(mf)
     getMfDetails:(mfId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.SQUAD_MIDFIELDERS).findOne({_id:objectId(mfId)}).then((mf)=>{
                resolve(mf)
            })
        })
    },
    updateMf:(mfId,mfDetails)=>{
        console.log(mfDetails,"req.body squadhelper");
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.SQUAD_MIDFIELDERS)
            .updateOne({_id:objectId(mfId)},{
                $set:{
                    Name:mfDetails.Name,
                    Club:mfDetails.Club
                }
            }).then((response)=>{
                resolve()
            })
        })
    },
     //edit and update Forwaders(fw)
     getFwDetails:(fwId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.SQUAD_FORWARDERS).findOne({_id:objectId(fwId)}).then((fw)=>{
                resolve(fw)
            })
        })
    },
    updateFw:(fwId,fwDetails)=>{
        console.log(fwDetails,"req.body squadhelper");
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.SQUAD_FORWARDERS)
            .updateOne({_id:objectId(fwId)},{
                $set:{
                    Name:fwDetails.Name,
                    Club:fwDetails.Club
                }
            }).then((response)=>{
                resolve()
            })
        })
    }
    




}