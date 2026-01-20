const express=require('express');

const router=express.Router();

router.post('/upload',upload.single('file'),(req,res)=>{
    if(!req.file){
        return res.status(400).json({error:'NO file uploaded'});
    }
    const fileUrl=`${req.protocol}://${req.get('host')}/${req.file.path}`;
    res.status(200).json({message:'File uploaded successfully',
        file:{originalName:req.file.originalname,fileName:req.file.filename,url:fileUrl}
    })
})

module.exports=router;