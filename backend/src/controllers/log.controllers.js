import User from "../models/user.model.js";
import LogBook from "../models/logbook.model.js";

export const clinicallog = async (req, res) => {
  const {
    name,
    age,
    examinationDate,
    clinicalSpeciality,
    cc,
    hpi,
    DX,
    treatmentPlan,
    GA,
    VS,
    Respiratory,
    CVS,
    GI,
    CNS,
  } = req.body;

  try {
    if (
      !name ||!examinationDate ||!clinicalSpeciality ||!cc ||!hpi ||!DX ||!treatmentPlan
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const userId = req.user._id;

    const newLog = new LogBook({
      user: userId,
      name,
      age,
      examinationDate,
      clinicalSpeciality,
      cc,
      hpi,
      DX,
      treatmentPlan,
      pe: [
        {
          GA: GA?.join(', ') || "",
          VS: VS?.join(', ') || "",
          Respiratory: Respiratory?.join(', ') || "",
          CVS,
          GI,
          CNS,
        },
      ],
    });
    await newLog.save();
    res.status(201).json({ message: "New log has been created" });
  } catch (error) {
    console.error("Error saving the log:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//Accessing
export const LogView=async(req,res)=>{

  try {
     const result= await LogBook.find({user:req.user._id}).populate("user","username email")
     res.status(200).json(result)
     
  } catch (error) {
    console.log("error fetching the log",error)
    res.status(500).json({message:"server error"})
  }

};

export const LogDelete=async(req,res)=>{
      try {
        const logId=req.params.id
        const userId=req.user._id

        const logdel= await LogBook.findOne({_id:logId,user:userId})

        if(!logdel){
          return res.status(404).json({message:"unAutherized/Log not found"})
        }

        await LogBook.deleteOne({_id:logId})
           res.status(200).json({message:"Log deleted"})
      } catch (error) {
          console.log(error)
          res.status(500).json({message:"server error"})
      }
}
