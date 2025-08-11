import React, { useEffect, useState } from 'react'
import { dummyShowsData } from '../../assets/assets';

function AddShows() {
      const currency = import.meta.env.VIRE_CURRENCY
      const [nowPlayingMovies , setNowPlayingMovies] = useState([]);
      const [selectedMovie , setSelectedMovie] = useState(null);
      const [dateTimeSelection , setDateTimeSelection] = useState({});
      const [dateTimeInput , setDateTimeInput] = useState("");
      const [showPrice , setShowPrice] = useState("");
  

        const fetchNowPlayingMovies = async() => {
          setNowPlayingMovies(dummyShowsData)
        };

        useEffect(() => {
          fetchNowPlayingMovies();
        }, []);

  return (
    <div>
      
    </div>
  )
}

export default AddShows
