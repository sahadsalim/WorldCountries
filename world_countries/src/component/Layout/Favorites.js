import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import List from "../list/list";
import Header from "./header";

const Favorites=(props)=>{
    const [fav,setFav]=useState([]);
    useEffect(() => {
        setFav(props.countries.filter((country)=>country.isFavorite===true));
    }, [props.countries])
    
    return(
        <Fragment>
      <Header />
      <button className="text-lg m-2 p-2 rounded-md bg-gray-900"><Link to="../home">⬅️ Back </Link></button>
        {fav.length>0?<List title="Favorite" countries={fav} />:null}
        </Fragment>
    )
}
export default Favorites;