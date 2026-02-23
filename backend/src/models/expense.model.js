import mongoose from 'mongoose'

const expenseSchema = new mongoose.Schema({
    amount : {
        type : Number,
        required : true
    },
    date : {
        type : Date,
        required : true
    },
    description : {
        type : String,
        required : true
    }
},{timestamp :true})

const Expense = mongoose.model("Expense",expenseSchema)