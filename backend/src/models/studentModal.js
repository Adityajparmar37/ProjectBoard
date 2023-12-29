const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const studentSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        InsitutionName: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)


//hasing the password
studentSchema.pre("save", async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});


//comapring the password
studentSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;