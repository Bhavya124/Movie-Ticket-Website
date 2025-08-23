import Booking from "../models/Booking.js";
import Show from "../models/Show.js";


// func to check the avaiability of selected seats 
const checkSeatsAvaialbility = async (showId , selectedSeats) => {
    try{
        const shwoData = await Show.findById(showId)
        if(!shwoData) return false;

        const occupiedSeats = shwoData.occupiedSeats;

        const isAnySeatTaken = selectedSeats.some(seat => occupiedSeats[seat]);

        return !isAnySeatTaken;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}

export const createBooking = async (req , res)=> {
    try{
        const {userId} = req.auth();
        const {showId , selectedSeats} = req.body;
        const { origin } = req.headers;

        const isAvailable = await checkSeatsAvaialbility(showId , selectedSeats)

        if(!isAvailable){
            return res.json({success: false , message : "Selected seats are not available."})
        }

        //GEr the seats details'

        const showData = await Show.findById(showId).populate('movie');

        //Create a new booking

        const booking = await Booking.create({
            user: userId,
            show : showId,
            amount : showData.showPrice * selectedSeats.length,
            bookedSeats : selectedSeats
        })

        selectedSeats.map((seat) => {
            showData.occupiedSeats[seat] = userId;
        })

        showData.markModified('occupiedSeats');

        await showData.save();

        //Stripe GAteway Initialize

        res.json({success : true , message: 'booked successfully'})



    }catch (error){
        console.log(error.message);
        res.json({success : false , message: error.message})

    }
}

export const getOccupiedSeats = async (req,res) => {
    try{

        const {showId} =req.params;
        const {showData} = await Show.findById(showId)

        const occupiedSeats = Object.keys(showData.occupiedSeats)
        res.json({success : true , occupiedSeats})

        


    }catch (error){
        console.log(error.message);
        res.json({success : false , message : error.message})
    }
}