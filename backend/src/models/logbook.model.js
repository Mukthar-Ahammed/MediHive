import mongoose from 'mongoose';

const logbookSchema=new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

    name:{
        type:String,
        required:true,
    },
    age:{
        type:String,
        required:true,
    },

    examinationDate:{
        type:Date,
        required:true,
    },

    clinicalSpeciality:{
        type:String,
        required:true,
    },

    cc:{
        type:String,
        required:true,
    },

    hpi:{
        type:String,
        required:true
    },
    pe:[{
        GA:{
            type:String,
            required:false,
        },
        VS:{
            type:String,
            required:false,
        },
        Respiratory:{
            type:String,
            required:false,
        },
        CVS:{
            type:String,
            required:false,
        },
        GI:{
            type:String,
            required:false,
        },
        CNS:{
            type:String,
            required:false,
        },
    }],
    DX:{
        type:String,
        required:true
    },
    treatmentPlan:{
        type:String,
        required:true,
    },

},
{timestamps:true}
)

const LogBook = mongoose.model("Logbook",logbookSchema)

export default LogBook