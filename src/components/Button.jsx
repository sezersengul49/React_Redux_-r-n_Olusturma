import React from 'react'

const Button = ({onClick,btnText}) => {
  return (
   <button className='w-full
   h-10 text-white flex items-center justify-center mt-4 bg-indigo-600 rounded-md border-transparent ' onClick={onClick}>{btnText}</button>
  )
}

export default Button