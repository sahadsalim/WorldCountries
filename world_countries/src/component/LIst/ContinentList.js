import { Fragment } from "react";

const ContinentList = (props) => {
  const continentList = props.continent.map((c, index) => {
    return (
      <div
        key={index}
        onClick={() => props.onContinentSelect(c)}
        className={`block px-4 py-2 mt-2 text-sm font-bold  bg-gray-200 rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline ${props.selected===c?"border-2 border-blue-700 text-blue-600":"text-gray-900"}`}
        style={{ cursor: "pointer" }}
      >
        {c}
      </div>
    );
  });
  return (
    <Fragment>
      <h1 className="text-lg">Continents {props.selected}</h1>
      {continentList}
    </Fragment>
  );
};
export default ContinentList;
