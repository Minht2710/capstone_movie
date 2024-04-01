import React, { useContext, useEffect, useState } from 'react'
import './UsManager.scss'
import InputCustom from '../../components/Input/InputCustom'
import { Button, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { quanLyNguoiDungServ } from '../../services/quanLyNguoiDung';
import { quanLyPhimServ } from '../../services/quanLyPhim';
import { getAllUserThunk } from '../../redux/slice/userSlice';
import { NavLink } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
import { Formik, useFormik } from 'formik';
import * as Yup from "yup"
import { NotifyContext } from '../../template/AdminTemplate/AdminTemplate';

const UsManager = () => {



  // chạy api bên redux toolkit
  let dispatch = useDispatch()
  useEffect(() => {

    dispatch(getAllUserThunk("data"))

  }, [])

  // lấy dữ liệu từ api thông qua redux toolkit
  let { arrUser } = useSelector((state) => state.userSlice)

  // biến chứa dữ liệu để truyền cho compoent table của ant
  const columns = [
    {
      title: 'STT',
      dataIndex: 'key',
    },
    {
      title: 'Tài Khoản',
      dataIndex: 'taiKhoan',
    },
    {
      title: 'Mật Khẩu',
      dataIndex: 'matKhau',
    },
    {
      title: 'Họ Tên',
      dataIndex: 'hoTen',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Số Điện Thoại',
      dataIndex: 'soDT',
    },
    {
      title: 'Thao Tác',
      dataIndex: 'thaoTac',
    },
  ];
  let newArrUser = []
  arrUser.map((item, index) => {
    let a = { ...item }
    a.key = index + 1
    newArrUser.push(a)
  }
  )
  let data = newArrUser;


  // tìm user, k tim thay thi thong bao
  let [nameInput, setNameInpput] = useState()
  let handelonchange = (e) => {
    setNameInpput(e.target.value)
  }
  let [user, setUser] = useState()
  let userTam = []
  let handleFindUser = () => {
    let index = newArrUser.findIndex((item) => {
      return item.taiKhoan == nameInput
    }
    );
    if (index == -1) {
      document.querySelector(".notify_find_user").style.display = "block"
      setUser(false)
    } else {
      userTam.push(newArrUser[index])
      setUser(userTam)
      document.querySelector(".notify_find_user").style.display = "none"
    }
  }


  // thêm người dùng
let notify=useContext(NotifyContext)

  let handleAddUser = () => {
    document.querySelector(".popup_add_user").style.display = "block"

  }
  let handleBack = () => {
    document.querySelector(".popup_add_user").style.display = "none"
  }
  let { handleSubmit, handleChange, setFieldValue, values, errors, handleBlur,touched } = useFormik(
    {
      initialValues: {
        taiKhoan: "",
        matKhau: "",
        email: "",
        soDt: "",
        maNhom: "GP01",
        maLoaiNguoiDung: "",
        hoTen: ""
      },
      onSubmit: async (values) => {
        try {
          let res = await quanLyNguoiDungServ.addUser(values)
          console.log(res)
          notify("thêm thành công")
        } catch (error) {
          // notify(error.response.data.content);
          console.log(error)
        }
      },
      validationSchema: Yup.object({
        taiKhoan: Yup.string().required("Vui lòng không bỏ trống"),
        matKhau: Yup.string().matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/),
        email: Yup.string().email("Vui lòng kiểm tra định dạng email").required("Vui lòng không bỏ trống"),
        soDt: Yup.string().matches(/^(0[2|3|4|5|6|7|8|9]{1})([0-9]{8,9})$/,"Vui lòng nhập đúng số điện thoại"),
        maLoaiNguoiDung:Yup.string().required("Vui lòng không bỏ trống"),
        hoTen: Yup.string().required("Vui lòng không bỏ trống"),
        
      })

    }
  )



  return (
    <div className='usManager'>
      <button className='add_user py-2 px-5 rounded bg-blue-600 text-white hover:bg-blue-700' onClick={handleAddUser}>Thêm người dùng</button>
      <div className='flex items-center  space-x-2'>
        <div className='w-11/12'>
          <InputCustom className='mt-0 mb-2 ' onChange={handelonchange} placeholder={"Nhập tên tài khoản"} />
        </div>
        <button className='find_user  px-5 rounded bg-blue-600 text-white hover:bg-blue-700  h-10 ' onClick={handleFindUser}>Tìm</button>
      </div>
      <p className='text-red-600 hidden notify_find_user'>Không có tài khoản này </p>

      {/* ant layout table */}
      <Table columns={columns} dataSource={user ? user : data} />

      {/* layout popup */}
      <div className='popup_add_user '>

        <p className='w-full text-center font-bold text-xl text-blue-600' >Tạo Tài Khoản</p>

        <form onSubmit={handleSubmit}>
          <InputCustom value={values.taiKhoan} onChange={handleChange} className='mt-0 mb-2 ' name={"taiKhoan"} label={"Tài khoản"} placeholder={"Nhập tên tài khoản"} />
          <InputCustom value={values.matKhau} onChange={handleChange} className='mt-0 mb-2 ' name={"matKhau"} label={"Mật khẩu"} placeholder={"Nhập tên Mật khẩu"} />
          <InputCustom value={values.hoTen} onChange={handleChange} className='mt-0 mb-2 ' name={"hoTen"} label={"Họ Tên"} placeholder={"Nhập tên Họ Tên"} />
          <InputCustom value={values.email} onChange={handleChange} className='mt-0 mb-2 ' name={"email"} label={"Email"} placeholder={"Nhập tên Email"} />
          <InputCustom value={values.soDt} onChange={handleChange} className='mt-0 mb-2 ' name={"soDt"} label={"Số điện thoại"} placeholder={"Nhập tên Số điện thoại"} />

          <div>
            <label htmlFor="" className='font-semibold'>Loại người dùng</label>
            <select onChange={(e) => {
              setFieldValue("maLoaiNguoiDung", e.target.value)
            }
            } className='bg-gray-50 border border-gray-300 rounded p-2.5 w-full mt-2' >
              <option value="">Chọn loại người dùng</option>
              <option value="KhachHang">Khách hàng</option>
              <option value="QuanTri">Quản trị</option>
            </select>
          </div>

          {/* foot popup */}
          <div className='flex align-items-center justify-between mt-5 '>
            <NavLink onClick={handleBack} className="text-blue-500"><LeftOutlined /><LeftOutlined /> Trở lại</NavLink>

            <div className='space-x-1'>
              <button type='submit' className=' py-2 px-5 rounded bg-blue-600 text-white hover:bg-blue-700' >Thêm</button>
              <button className=' py-2 px-5 rounded bg-blue-600 text-white hover:bg-blue-700' >Lưu</button>
            </div>
          </div>

        </form>




      </div>
    </div>
  )
}

export default UsManager