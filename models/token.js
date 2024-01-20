
const mongoose = require("mongoose");

const { Schema } = mongoose;

// ParentUser Schema
const parentUserSchema = new Schema(
    {
      token: { type: String, require: true },
      userId: { type: mongoose.SchemaTypes.ObjectId, ref: "ParentUser" },
    },
    { timestamps: true }
  );



// Export both schemas
const ParentUserRefreshToken = mongoose.model("ParentUserRefreshToken",parentUserSchema, "Parenttokens");


module.exports = { ParentUserRefreshToken };
