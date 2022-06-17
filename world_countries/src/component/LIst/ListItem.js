import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setFavorite } from "../../redux/actions";

const ListItem = (props) => {
  const dispatch = useDispatch();
  const [country, setCountry] = useState(props.country);
  useEffect(() => {
    setCountry(props.country);
  }, [props.country]);

  const setFavorites = (name) => {
    dispatch(setFavorite(name));
  };
  return (
    <tr>
      <td className="text-left text-lg text-white font-semibold">{country?.name}</td>
      <td className="text-center text-sm">
        <button className="bg-blue-500 p-2 rounded-sm">View Details</button>
      </td>
      <td className="text-center text-sm">
        <button
          className="bg-gray-900 p-2 rounded-sm"
          onClick={() => setFavorites(country.name)}
        >
          {country.isFavorite
            ? "Remove Favorite"
            : `Add to favorites ${country.isFavorite}`}
        </button>
      </td>
    </tr>
  );
};
export default ListItem;
