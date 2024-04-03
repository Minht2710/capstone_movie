import React, { useContext, useEffect } from 'react'
import { NotifyContext } from '../../template/AdminTemplate/AdminTemplate'
import axios from 'axios'
import { getLocalStorage } from '../../utils/util'
import { NavLink } from 'react-router-dom'
import { LeftOutlined } from '@ant-design/icons'
import InputCustom from '../../components/Input/InputCustom'
import * as Yup from "yup"
import { useFormik } from 'formik'

const FormUpdateUs = ({ userEdit }) => {
    let userLocal = getLocalStorage("user")
    let tokenUser = userLocal.accessToken
    let notify = useContext(NotifyContext)


    let { handleSubmit, handleChange, setFieldValue, values, errors, handleBlur, touched } = useFormik(
        {
            initialValues: {
                taiKhoan: userEdit.taiKhoan,
                matKhau: userEdit.matKhau,
                email: userEdit.email,
                soDt: userEdit.soDt,
                maNhom: "GP01",
                maLoaiNguoiDung: userEdit.maLoaiNguoiDung,
                hoTen: userEdit.hoTen
            },
            onSubmit: (values) => {
                axios({
                    url: `https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
                    method: "POST",
                    data: values,
                    headers: {
                        Authorization: `Bearer ${tokenUser}`,
                        TokenCybersoft: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAxMCIsIkhldEhhblN0cmluZyI6IjAxLzA5LzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcyNTE0ODgwMDAwMCIsIm5iZiI6MTY5ODY4NTIwMCwiZXhwIjoxNzI1Mjk2NDAwfQ.CPY1b9IiMcklQZ9hjqIzrdiOlQ5YnV4VpzGu_yZr7G0"
                    }
                })
                    .then((res) => {
                        console.log(res.data)
                        notify("sửa thành công")
                    })
                    .catch((err) => {
                        console.log(err.response.data.content)
                        // notify(err.response.data.content)

                    });
            },
            validationSchema: Yup.object({
                taiKhoan: Yup.string().required("Vui lòng không bỏ trống"),
                matKhau: Yup.string().matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/, "Mật khẩu có ít nhất 8 ký tự và Bao gồm: chữ hoa, chữ thường, số").required("Vui lòng không bỏ trống"),
                email: Yup.string().email("Vui lòng kiểm tra định dạng email").required("Vui lòng không bỏ trống"),
                soDt: Yup.string().matches(/^(0[2|3|4|5|6|7|8|9]{1})([0-9]{8,9})$/, "Vui lòng nhập đúng số điện thoại").required("Vui lòng không bỏ trống"),
                maLoaiNguoiDung: Yup.string().required("Vui lòng không bỏ trống"),
                hoTen: Yup.string().required("Vui lòng không bỏ trống"),
            })
        }
    )
    useEffect(() => {
        setFieldValue("taiKhoan", userEdit.taiKhoan);
        setFieldValue("matKhau", userEdit.matKhau);
        setFieldValue("email", userEdit.email);
        setFieldValue("soDt", userEdit.soDt);
        setFieldValue("maLoaiNguoiDung", userEdit.maLoaiNguoiDung);
        setFieldValue("hoTen", userEdit.hoTen);


        // Cập nhật các trường khác tương tự nếu cần
    }, [userEdit, setFieldValue]);

    let handleBack = () => {
        document.querySelector(".popup_add_user2").style.display = "none"
      }

    return (
    <div className='popup_add_user2 '>

        <p className='w-full text-center font-bold text-xl text-blue-600' >Tạo Tài Khoản</p>

        <form onSubmit={handleSubmit}>
            <InputCustom touched={touched.taiKhoan} onBlur={handleBlur} value={values.taiKhoan} onChange={
                (e) => {
                    handleChange(e);

                }}
                className='mt-0 mb-2 ' name={"taiKhoan"} label={"Tài khoản"} placeholder={"Nhập tên tài khoản"} />
            {errors.taiKhoan && touched.taiKhoan ? (<p className='text-sm text-red-500' >{errors.taiKhoan} </p>) : null}
            <InputCustom touched={touched.matKhau} onBlur={handleBlur} value={values.matKhau} onChange={
                (e) => {
                    handleChange(e);

                }} className='mt-0 mb-2 ' name={"matKhau"} label={"Mật khẩu"} placeholder={"Nhập tên Mật khẩu"} />
            {errors.matKhau && touched.matKhau ? (<p className='text-sm text-red-500' >{errors.matKhau} </p>) : null}
            <InputCustom touched={touched.hoTen} onBlur={handleBlur} value={values.hoTen} onChange={
                (e) => {
                    handleChange(e);

                }} className='mt-0 mb-2 ' name={"hoTen"} label={"Họ Tên"} placeholder={"Nhập tên Họ Tên"} />
            {errors.hoTen && touched.hoTen ? (<p className='text-sm text-red-500' >{errors.hoTen} </p>) : null}

            <InputCustom touched={touched.email} onBlur={handleBlur} value={values.email} onChange={
                (e) => {
                    handleChange(e);

                }} className='mt-0 mb-2 ' name={"email"} label={"Email"} placeholder={"Nhập tên Email"} />
            {errors.email && touched.email ? (<p className='text-sm text-red-500' >{errors.email} </p>) : null}

            <InputCustom touched={touched.soDt} onBlur={handleBlur} value={values.soDt} onChange={
                (e) => {
                    handleChange(e);

                }} className='mt-0 mb-2 ' name={"soDt"} label={"Số điện thoại"} placeholder={"Nhập tên Số điện thoại"} />
            {errors.soDt && touched.soDt ? (<p className='text-sm text-red-500' >{errors.soDt} </p>) : null}

            <div>
                <label htmlFor="" className='font-semibold'>Loại người dùng</label>
                <select
                    onChange={(e) => {
                        setFieldValue("maLoaiNguoiDung", e.target.value);

                    }}
                    value={values.maLoaiNguoiDung}
                    name='maLoaiNguoiDung'
                    className='bg-gray-50 border border-gray-300 rounded p-2.5 w-full mt-2' >
                    <option value="">Chọn loại người dùng</option>
                    <option value="KhachHang">Khách Hàng</option>
                    <option value="QuanTri">Quản Trị</option>
                </select>
                {errors.maLoaiNguoiDung && touched.maLoaiNguoiDung ? (<p className='text-sm text-red-500' >{errors.maLoaiNguoiDung} </p>) : null}

            </div>

            {/* foot popup */}
            <div className='flex align-items-center justify-between mt-5 '>
                <NavLink onClick={handleBack} className="text-blue-500"><LeftOutlined /><LeftOutlined /> Trở lại</NavLink>

                <div className='space-x-1'>
                    {/* <button type='submit' className=' py-2 px-5 rounded bg-blue-600 text-white hover:bg-blue-700' >Thêm</button> */}
                    <button type='submit' className=' py-2 px-5 rounded bg-blue-600 text-white hover:bg-blue-700' >Lưu</button>
                </div>
            </div>

        </form>


    </div>)

}

export default FormUpdateUs
