import React, { useEffect, useState } from 'react'

const Nhap = () => {
  const obj = {
    name: "John Doe",
    age: 30,
  };
    // Đổi tên key "name" thành "fullName"
  for (const i in obj) {
    if (i === "name") {
      obj["fullName"] = "nguyencongminh";
      delete obj[i];
    }
  }
  console.log(obj);

  return (
    <div>
      <button >cap nhat</button>
    </div>
  )
}
export default Nhap
