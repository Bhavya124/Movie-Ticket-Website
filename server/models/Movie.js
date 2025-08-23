import mongoose  from "mongoose";

const movieSchema = new mongoose.Schema(
    {
        _id: {type : String , requireed : true},
        title: {type : String , requireed : true},
        overwiew: {type : String , requireed : true},
        poster_path: {type : String , requireed : true},
        backdrop_path: {type : String , requireed : true},
        release_date: {type : String , requireed : true},
        original_language: {type : String},
        tagline: {type : String},
        genres: {type : Array , required : true},
        casts: {type : Array , required : true},
        vote_average: {type : Number , required : true},
        runtime: {type : Number , required : true},
    } , {timestamps : true}
)

const Movie = mongoose.model('Movie' , movieSchema)
export default Movie;