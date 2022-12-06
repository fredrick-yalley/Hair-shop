const Product = require('../models/productModel');
const cloudniary = require('./../lib/cloudinary');

// exports.uploadVideo = async(req, res) => {
//     await cloudniary.uploader.upload(req.file.path, 
//         {
//             resource_type: "video",
//             folder: "video",
//         },
//         (err, result) => {

//             if(err) {
//                 console.log(err);
//                 return res.status(500).send(err);
//             }
            
//             const upload = new Upload({
//                 name: req.file.originalname,
//                 url: result.url,
//                 cloudinary_id: result.public_id,
//                 description: req.body.description
//             });
//             upload.save((err, result) => {
//                 if(err) {
//                     console.log(err);
//                      res.status(500).send(err);
//                 }
//                     res.status(200).send(result);
//             });
//         })
// };

// exports.uploadImage = async(req, res) => {
//     console.log(req.body);
//      await cloudniary.uploader.upload(req.file.path,
//         {
//             resource_type: 'image',
//             folder: "image",
//         },
//         async(err, result) => {
//             if(err) {
//                 console.log(err);
//                 return res.status(500).send(err);
//             }
            
//             const upload = new Upload({
//                 name: req.file.originalname,
//                 url: result.url,
//                 cloudinary_id: result.public_id,
//                 description: req.body.description
//             });
//            await upload.save((err, result) => {
//                 if(err) {
//                     console.log(err);
//                         res.status(500).send(err);
//                 }
//                     res.status(200).json({result});
//             });
//         })
// };

exports.createProduct = async(req, res) => {
    console.log(req.body);
   try {
    const {name, description, price, image, category} = req.body;

    if (!req.file) {
        console.log("No file received");
        //  res.send({
        //   success: false
        // });
    
      } else {
        console.log('file received');
        //  res.send({
        //   success: true
        // })
    }

    const result = await cloudniary.uploader.upload(req.file.path, {
        folder: "image",
        resource_type: "image"
    })
    // console.log(result);
    const product = await Product.create({
        name,
        description,
        price,
        image_id: result.public_id,
        image_url: result.secure_url,
        category
    })
    // console.log(product);
    res.status(201).json({
        status: "success",
        product: product
    })
   }catch (err) {
        console.log(err);

        throw new Error("sorry")
   }
}





exports.getAllUsers = async(req, res) => {
    try{

         await Product.findAll()
        .then((product) => {
            console.log(product)
            res.status(200).json({data: product});
        })
        .catch(err => {console.log(err.message)});
        
    }catch (error) {
        
    }
};