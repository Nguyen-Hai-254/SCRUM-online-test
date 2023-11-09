import mongoose from "mongoose";

import UserSchema from "../schema/userSchema.js";

export default mongoose.model("User", UserSchema);