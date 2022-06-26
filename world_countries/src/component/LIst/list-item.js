import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setFavorite } from "../../redux/actions";
import Modal from "../layout/modal";

const ListItem = (props) => {
  const dispatch = useDispatch();
  const [country, setCountry] = useState(props.country);
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setCountry(props.country);
  }, [props.country]);

  const setFavorites = (name) => {
    dispatch(setFavorite(name));
  };
  return (
    <tr>
      <td className="text-left text-lg text-white">{country?.name}</td>
      <td className="text-center text-sm" onClick={() => setChecked(!checked)}>
        {checked ? (
          <Modal open={checked} onClose={() => setChecked(!checked)}>
            <div className="p-4">
              <h3 className="text-blue-800 mb-4 text-xl font-medium text-center">{country.altName}</h3>
              <h3 className="text-xl font-medium text-center text-gray-900 dark:text-white">
              Currency : {country.currencyName}
                </h3>
                <h3 className="text-xl font-medium text-center text-gray-900 dark:text-white">
                Continent: {country.continent}
                </h3>
            </div>
          </Modal>
        ) : (
          <button className="bg-blue-500 p-2 rounded-sm">View Details</button>
        )}
      </td>
      <td className="text-center text-sm">
        <button
          className={`bg-gray-900 p-2 rounded-sm ${
            country.isFavorite ? "text-red-600" : "text-green-600"
          }`}
          onClick={() => setFavorites(country.name)}
        >
          {country.isFavorite ? "Remove Favorite  ❌" : `Add to favorites  ❤️`}
        </button>
      </td>
    </tr>
  );
};
export default ListItem;
