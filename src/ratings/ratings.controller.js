const ratings  = require("../data/ratings-data");


//List
function list(req, res){
    const { noteId } = req.params;
    const ratingsFilter = ratings.filter((rating) => rating.noteId === Number(noteId));
    if (noteId){
        res.json({ data: ratingsFilter })
    } else {
        res.json({ data: ratings })
    }
}

//Read
function read(req, res){
    res.json({ data: res.locals.rating });
}

function ratingExists(req, res, next){
    const { ratingId } = req.params;
    const foundRating = ratings.find((rating) => rating.id === Number(ratingId));
    if (foundRating){
        res.locals.rating = foundRating;
        next();
    } else {
        next({
          status: 404,
          message: `Rating id could not be found: ${ratingId}` 
        })
    }
}

module.exports = {
    list, 
    read: [ratingExists, read],
}





