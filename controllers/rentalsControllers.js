
const {alert} = require('node-popup')
const AWS = require('aws-sdk')
require('dotenv').config();
const fetch = require("node-fetch");
const Tool = require("../models/Tool");
const Tool_transection = require("../models/Tool_transection");


AWS.config.update({
  region: 'ap-south-1',
  credentials:{
  "accessKeyId": process.env.ACCESS_KEY,
  "secretAccessKey": process.env.SECRET_ACCESS_KEY,
  "region": process.env.BUCKET_REGION,
   }
  })
  // console.log('Access key is: ', process.env.ACCESS_KEY)
// console.log('Access key is: ', process.env.ACCESS_KEY)


//   var s3 = new AWS.S3( { params: {Bucket: process.env.BUCKET_NAME} } );



module.exports.rentels_get = (req, res) => {
  res.render("rentals/rentals");
};


module.exports.issue_get = async (req, res) => {
  var tools = [];
  
  tools  = await Tool.find({available:true})
   
  res.render("rentals/issue_rent", { tools: tools });
};
module.exports.return_item_get = async (req, res) => {
  const transections = await Tool_transection.find({})
  let phones_set = new Set();
  transections.forEach(transection=>phones_set.add(transection.phone))
  phones_set = Array.from(phones_set)
  
  res.render("rentals/return_item", {phones: phones_set});
};

module.exports.register_tool_get = (req, res)=>{
  res.render('rentals/register_tool')
}


module.exports.register_tool_post= async (req, res)=>{

  try{
      
      // const tool = await Tool.create(req.body);
      // if(tool._id)res.send(tool)
      Tool.create(req.body).then(tool=>res.send(tool)).catch(err=>res.send({'error':err.message}))
  }catch(err){
    res.send({'error': err.message})
  }

}

module.exports.rent_issue_post = async(req, res)=>{

  if(req.body.pic_url != '' && !checkCustomer(req.body.phone)){
  const s3 = new AWS.S3();
  const buffer = Buffer.from(req.body.pic_url.split(",")[1], 'base64');
  // AWS.config.update({
  //   region: 'ap-south-1',
  //   credentials:{
  //   "accessKeyId": process.env.ACCESS_KEY,
  //   "secretAccessKey": process.env.SECRET_ACCESS_KEY,
  //   "region": process.env.BUCKET_REGION,
  //    }
  // })

  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: req.body.phone+'.jpeg', 
    Body: buffer,
    // ContentType: req.files.file.mimetype
  };
  


  s3.upload(params, (err, data)=>{
    if(err){
      console.log('error in picture upload!!', err)
      res.send(err)
    }
    Tool_transection.create({customer_name: req.body.customer_name,
      tool: req.body.tool,
      phone: req.body.phone,
      address: req.body.address,
       date:req.body.date,
       photo_url:data.Location,
       remarks:req.body.remarks
     }).then(tool_trans=>res.send(tool_trans)).catch(err=>{res.send({'error': 'Error in transection:'+err.message})})  
  } )
    
  
//   await s3.upload(params, function(err, data) {
//     if (err) {
//       console.log(err)
//       res.send(err)
//         throw err;
//     }
    
//     console.log(`File uploaded successfully. ${data.Location}`);
//     res.send("File is loaded at :"+data.Location)
// });
}else{

Tool_transection.create({customer_name: req.body.customer_name,
  tool: req.body.tool,
  phone: req.body.phone,
  address: req.body.address,
   date:req.body.date,
   photo_url:'',
   remarks:req.body.remarks
 }).then(tool_trans=>res.send(tool_trans)).catch(err=>{res.send({'error': 'Error in transection:'+err.message})})  

}
}




const checkCustomer = (phone)=>{
  Tool_transection.find({phone}).then(transections=>{transections.forEach(transection => {
    if(transection.photo_url != '')return true;
  })
  return false
}
  )
  
}


module.exports.rental_details_get = async (req, res)=>{
  const phone = req.query.phone
  const tools = await Tool.find({})
  var dict = {}
  tools.forEach(tool=>dict[tool.tool] = tool.default_rent)
  var response = {}
  var result = new Array()
  Tool_transection.find({phone}).then(transections=>{
    // console.log(transections)
    
    for(var i=0;i<transections.length;i++){
      const diffTime = new Date()-transections[i].date;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      result.push({...transections[i]._doc,
        default_rent : dict[transections[i].tool],
        total_days : diffDays,
        total_rent : diffDays*dict[transections[i].tool]
      })
      // console.log(transections[i])
    }
    

    // transections.forEach(transection=>{
    //   const diffTime = new Date()-transection.date;
    //   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      
    //   response = {
    //     ...transection
    //   }
    //   // response[default_rent] = dict[transection.tool];
    //   // response[number_of_days] = diffDays;
    //   // response[total_rent]= diffDays*dict[transection.tool]
    //   // console.log(response)

    //   result.add(response._doc)
    // })
    
    res.send(result)}).catch(err=>res.send(err))
  
  
}