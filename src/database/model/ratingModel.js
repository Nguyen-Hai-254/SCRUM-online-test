import mongoose from "mongoose";

import RatingSchema from "../schema/ratingSchema.js";

export default mongoose.model("Rating", RatingSchema);