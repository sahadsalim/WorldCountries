import React from 'react'
import ReactDom from 'react-dom'

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#FFF',
  padding: '50px',
  zIndex: 1000,width:'300px'
}

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 1000
}

const Modal=({ open, children, onClose })=> {
  if (!open) return null
  return ReactDom.createPortal(
    <>
      {/* <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}> */}
        {/* <div className='flex'><button className='text-red-500' onClick={onClose}>Close Modal</button></div>
        <div> */}
        <div id="authentication-modal" tabIndex="-1" className="fixed flex h-modal items-center justify-center left-0 md:h-full md:inset-0 overflow-x-hidden overflow-y-auto right-0 top-0 w-full z-50">
    <div className="relative p-4 w-full max-w-md h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="authentication-modal">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>  
            </button>
        {children}
        </div>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  )
}
  export default Modal;