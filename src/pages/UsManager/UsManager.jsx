import React, { useContext, useEffect, useState } from 'react'
import './UsManager.scss'
import InputCustom from '../../components/Input/InputCustom'
import { Button, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { quanLyNguoiDungServ } from '../../services/quanLyNguoiDung';
import { quanLyPhimServ } from '../../services/quanLyPhim';
import { getAllUserThunk } from '../../redux/slice/userSlice';

const UsManager = () => {



  // chạy api bên redux toolkit
  let dispatch = useDispatch()
  useEffect(() => {

    dispatch(getAllUserThunk("data"))

  }, [])

  // lấy dữ liệu từ api thông qua redux toolkit
  let { arrUser } = useSelector((state) => state.userSlice)
  // console.log(arrUser)




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
    // return{...item, key:index+1}

  }
  )
  let data = newArrUser;
  // useEffect(data=newArrUser,[newArrUserState])

  // tìm user, k tim thay thi thong bao

  let [nameInput, setNameInpput] = useState()
  let handelonchange = (e) => {
    setNameInpput(e.target.value)
  }
  let [user,setUser]=useState()
  let userTam=[]
  let handleFindUser = () => {
    let index = newArrUser.findIndex((item) => {
      return item.taiKhoan == nameInput
    }
    );
    if(index==-1){
      document.querySelector(".notify_find_user").style.display="block"
      setUser(false)
    }else{
      
      userTam.push(newArrUser[index])
      setUser(userTam)
      document.querySelector(".notify_find_user").style.display="none"
    }
  }




  return (
    <div>
      <button className='add_user py-2 px-5 rounded bg-blue-600 text-white hover:bg-blue-700'>Thêm người dùng</button>
      <div className='flex items-center  space-x-2'>
        <div className='w-11/12'>
          <InputCustom className='mt-0 mb-2 ' onChange={handelonchange} placeholder={"Nhập tên tài khoản"} />
        </div>

        <button className='add_user  px-5 rounded bg-blue-600 text-white hover:bg-blue-700  h-10 ' onClick={handleFindUser}>Tìm</button>
      </div>
      <p className='text-red-600 hidden notify_find_user'>Không có tài khoản này </p>


      {/* ant layout table */}
      <Table columns={columns} dataSource={user?user:data} />





      {/* layout popup */}
      <div className='edit_user'>
        <button>Thêm người dùng</button>
      </div>
    </div>
  )
}

export default UsManager