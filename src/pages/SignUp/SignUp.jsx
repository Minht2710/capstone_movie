import React, { useContext } from 'react'
import Lottie from 'react-lottie';
import * as animationData from "../../assets/animation/register.json"
import * as yup from 'yup'
import InputCustom from '../../components/Input/InputCustom';
import { useFormik } from 'formik';
import { quanLyNguoiDungServ } from '../../services/quanLyNguoiDung';
import { NotifyContext } from '../../template/UserTemplate/UserTemplate';
import { NavLink, useNavigate } from 'react-router-dom';


const SignUp = () => {
  let notify=useContext(NotifyContext)
  let navigate=useNavigate()
  
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }
  let {handleChange,handleSubmit, values ,errors, handleBlur,touched   } = useFormik({
    initialValues:{
      taiKhoan:""
      ,matKhau:""
      ,email:""
      ,soDt:""
      // ,maNhom:"GP01" mã nhóm backend tự tạo cho mình nên trong đây khỏi truyền
      ,hoTen:""
    },
    onSubmit: async (values) => { 
      // console.log(values)
      try {
        let res = await quanLyNguoiDungServ.dangky(values)
        notify("Đăng ký thành công, khách hàng sẽ được chuyển hướng về trang đăng nhập")
        setTimeout(() => {navigate("/sign-in")  },2000)
      } catch (error) {
        notify(error.response.data.content);
      }


     },
     validationSchema: yup.object({
      taiKhoan:yup.string().required("Vui lòng không bỏ trống")
   
      ,matKhau:yup.string().matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/, "Mật khẩu có ít nhất 8 ký tự và Bao gồm: chữ hoa, chữ thường, số")
      ,email:yup.string().email("Vui lòng kiểm tra định dạng email").required("Vui lòng không bỏ trống")
      ,soDt:yup.string().matches(/^(0[2|3|4|5|6|7|8|9]{1})([0-9]{8,9})$/,"Vui lòng nhập đúng số điện thoại")
      ,hoTen:yup.string().required("Vui lòng không bỏ trống")
     })


  })

  return (
    <div className='h-screen flex'>
      <div className="animation_signUp w-7/12 flex items-center justify-center">
        <Lottie options={defaultOptions} height={400} width={400} />
      </div>

      <section className="bg-gray-50 w-5/12 ">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

          <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                Tạo Tài Khoản
              </h1>
              <form className="space-y-4 md:space-y-6 text-black" action="#" onSubmit={handleSubmit}>
                <div >
                  <InputCustom
                    placeholder="Vui lòng nhập tài khoản"
                    id="taiKhoan"
                    label="Tài khoản"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.taiKhoan}
                    touched={touched.taiKhoan}
                    name="taiKhoan"
                    value={values.taiKhoan}
                  />
                </div>

                <div >
                  <InputCustom
                    placeholder="Vui lòng nhập mật khẩu"
                    id="matKhau"
                    label="Mật Khẩu"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.matKhau}
                    touched={touched.matKhau}
                    name="matKhau"
                    value={values.matKhau}
                    // type='password'
                  />
                </div>

                <div >
                  <InputCustom
                    placeholder="Vui lòng nhập email"
                    id="email"
                    label="Email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.email}
                    touched={touched.email}
                    name="email"
                    value={values.email}
                  />
                </div>

                <div >
                  <InputCustom
                    placeholder="Vui lòng nhập số điện thoại"
                    id="soDt"
                    label="Số điện thoại"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.soDt}
                    touched={touched.soDt}
                    name="soDt"
                    value={values.soDt}
                  />
                </div>

                <div >
                  <InputCustom
                    placeholder="Vui lòng nhập Họ Tên"
                    id="hoTen"
                    label="Họ Tên"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.hoTen}
                    touched={touched.hoTen}
                    name="hoTen"
                    value={values.hoTen}
                  />
                </div>

                

               
    



                {/* button */}
                <div>
                  <button type="submit" className="w-full text-white bg-black border-black  hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Create an account</button>
                </div>

                <p className="text-sm font-light text-gray-500 ">
                  {/* Already have an account? <a href="#" className="font-medium text-primary-600 hover:underline ">Login here</a> */}
                  Already have an account? <NavLink to='/sign-in' className="font-medium text-primary-600 hover:underline ">Login here</NavLink>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>


    </div>
  )
}

export default SignUp