import { Fragment, useEffect, useState } from "react";
import NewPagination from "../layout/new-pagination";
import ListItem from "./list-item";
let PageSize = 5;
const List = (props) => {
  useEffect(() => {
    setCountries(props.countries);
    setPage(1);
  }, [props.countries]);
  const [countries, setCountries] = useState(props.countries);
  const [page,setPage]=useState(1);
  const listItem = countries.slice((page-1) * Math.floor(PageSize), (page*PageSize)).map((country, index) => {
    return <ListItem key={index} country={country} />;
  });
  const onCheck=(evt)=>{
    setPage(evt)
  }
  return (
    <Fragment>
      <div className="wrapper m-2 flex-1">
        <h1 className="text-lg capitalize text-center">
        {props.title} - ({countries.length})
        </h1>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-lg text-left text-gray-900">Name</th>
              <th colSpan={2} className="text-lg text-center text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody>{listItem}</tbody>
        </table>
      </div>
      <NewPagination totalItems={countries.length} numberOfItem={PageSize} page={page} onPagination={onCheck}></NewPagination>
    </Fragment>
  );
};

export default List;
