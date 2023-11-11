import mongoose from "mongoose";

import RatingSchema from "../schema/ratingSchema";

export default mongoose.model("Rating", RatingSchema);