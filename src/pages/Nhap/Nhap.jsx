import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'

const Nhap = () => {
  let a = new FormData()
  a.append("tuoi", 33)
  useEffect(() => {
    console.log(a)


  }, [a]
  )



  return (
    <div>
      <input type="file" onChange={(e) => {
        
        
      }
      }/> nhap
    </div>
  )
}

export default Nhap
