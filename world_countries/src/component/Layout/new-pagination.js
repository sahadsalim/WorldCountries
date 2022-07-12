import { useEffect, useState } from "react";

const NewPagination = ({ totalItems, numberOfItem, onPagination, page }) => {
  useEffect(() => {
    setPagination();
  }, [totalItems, numberOfItem, page]);
  const [items, setItems] = useState(0);
  const [pages, setPages] = useState([]);
  const [buttons1, setButtons1] = useState({ prev: true, next: true });
  let itemsCount=Math.ceil(totalItems / numberOfItem);
  const setPagination = () => {
    setItems(itemsCount);
    let pages1 = [];
    if (page<4) {
      if (itemsCount>4) {
        for (let index = 1; index <= 3; index++) {
          pages1.push({ text: index+"", val: index, disabled: false });
        }
        pages1.push({ text: "...", val: "", disabled: true });
        pages1.push({ text: itemsCount+"", val: itemsCount, disabled: false });
      }else{
        for (let index = 1; index <= 3; index++) {
          if (index<=itemsCount) {
            pages1.push({ text: index+"", val: index, disabled: page===index?true:false });            
          }
        }
      }

    }else{
      if ((items-page)>3) {
        pages1.push({ text: '1', val: 1, disabled: false });
        pages1.push({ text: "...", val: "", disabled: true });
        pages1.push({ text: (page-1)+"", val: (page-1), disabled: false });
        pages1.push({ text: page+"", val: page, disabled: false });
        pages1.push({ text: (page+1)+"", val: (page+1), disabled: false });
        pages1.push({ text: "...", val: "", disabled: true });

      } else {
        pages1.push({ text: '1', val: 1, disabled: false });
        pages1.push({ text: "...", val: "", disabled: true });
        for (let index = 0; index < 3; index++) {
          pages1.push({ text: (itemsCount-(2-index))+"", val: (itemsCount-(2-index)), disabled: false });
        }
      }
    }
    setPages([...pages1]);
    setNextAndPrev();
  };
  const setNextAndPrev = () => {
    if (page === 1) {
      if (totalItems === 1) {
        setButtons1({ prev: true, next: true });
      } else {
        setButtons1({ prev: true, next: false });
      }
    } else if (page === itemsCount) {
      setButtons1({ prev: false, next: true });
    } else {
      setButtons1({ prev: false, next: false });
    }
  };
  const buttonClicked=(state)=>{
    onPagination(state?page+1:page-1);
  }
  return (
    <>
    <span>page:{page} and item:{items}</span>
    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-center">
      <div>
        <p className="text-sm">
        Showing &nbsp;&nbsp;
          <span className="font-medium">
             {((page-1) * numberOfItem)+1}
          </span>
          &nbsp;&nbsp;to&nbsp;&nbsp;
          <span className="font-medium"> {page * numberOfItem} </span>
          &nbsp;&nbsp;of&nbsp;&nbsp;
          <span className="font-medium"> {totalItems} </span>
          &nbsp;&nbsp;results &nbsp;&nbsp;
        </p>
      </div>
      <div>
        <nav
          className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
          aria-label="Pagination"
        >
          <button onClick={()=>buttonClicked(false)}  disabled={buttons1.prev}
            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <span className="sr-only">
              Previous 
            </span>
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {pages.map((pageVal,index) => (
            <button key={index} disabled={pageVal.disabled}
                onClick={()=>onPagination(pageVal.val)}
              aria-current="page"
              className={"z-10  border-indigo-500  relative inline-flex items-center px-4 py-2 border text-sm font-medium "+(page===pageVal.val? 'bg-indigo-600 text-white':'bg-indigo-50 text-indigo-600')}
            >
              {pageVal.text}
            </button>
          ))}

          <button  onClick={()=>buttonClicked(true)} disabled={buttons1.next}
            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <span className="sr-only" >
              Next
            </span>
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </nav>
      </div>
    </div>
    </>
  );
};
export default NewPagination;
