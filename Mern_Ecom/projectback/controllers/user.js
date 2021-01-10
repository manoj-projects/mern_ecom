const { reduce, orderBy } = require("lodash");
const User = require("../models/user");

// get userbyId

exports.getUserById = (req, res, next, id) =>{
    User.findById(id).exec((err, user) => {
        if(err || !user)
        {
            return res.status(400).json({
                error : "NO user was found in Db"
            });
        }
        req.profile = user;
        next();
    });
}
//get user

exports.getUser =(req, res) =>{
    req.profile.salt = undefined;
    req.profile.encry_password= undefined;
    req.profile.createdAt= undefined;
    req.profile.updatedAt= undefined;
    return res.json(req.profile);
}
// get all user

exports.getAllUsers = (req, res) =>{
User.find().exec((err, users)=>{

    if(err || !users)
    {
        return res.status(400).json({
            error : "NO user were found in the database"

        });
        
    }
    res.json(users);
});
}

// update user

exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(
      { _id: req.profile._id },
      { $set: req.body },
      { new: true, useFindAndModify: false },
      (err, user) => {
        if (err) {
          return res.status(400).json({
            error: "You are not authorized to update this user"
          });
        }
        user.salt = undefined;
        user.encry_password = undefined;
        res.json(user);
      }
    );
  }

  // user purchase List

    exports.userPurchaseList = (req, res) =>{
      Order.find({user: req.profile._id}).populate("user","_id name")
      .exec((err, order)=> {
        if(err)
        {
            return res.status(400).json({
                 error : "No Order in this account"
            });
        }
        return res.json(order);
      });
  }


  //push order in purchase list

  exports.pushOrderInPurchaseList = (req, res, next) =>
  {
     let purchases =[];

     req.body.order.products.foreach(product =>{
       purchases.push({

         _id : product._id,
         name : product.name,
         description : product.description,
         category : product.category,
         quantity : product.quantity,
         amount : req.body.order.amount,
         transaction_id : req.body.order.transaction_id

       });
     });

     // store in db

     User.findOneAndUpdate(
       {_id : req.profile._id},
       {$push : {purchases : purchases}},
       {new : true},
       (err, purchases) =>{
         if(err)
         {
           return res.status(400).json({
             error : "Unable to save purchase list"
           })
         }
         next();
       })
  
  }
