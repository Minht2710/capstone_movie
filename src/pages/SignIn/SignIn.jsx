import React, { useContext } from "react";
import InputCustom from "../../components/Input/InputCustom";
import * as registerAnimation from "./../../assets/animation/register.json";
import Lottie from "react-lottie";
import { useFormik } from "formik";
import * as Yup from "yup";
import { NavLink } from "react-router-dom";
import { quanLyNguoiDungServ } from "../../services/quanLyNguoiDung";
import { NotifyContext } from "../../template/UserTemplate/UserTemplate";
import { useNavigate } from "react-router-dom";
import { getLocalStorage, saveLocalStorage } from "../../utils/util";
import Cookies from "js-cookie";

const SignIn = () => {
  const notify = useContext(NotifyContext);
  const navigate = useNavigate();

  const { handleChange, handleBlur, values, errors, touched, handleSubmit } =
    useFormik({
      initialValues: {
        taiKhoan: "",
        matKhau: "",
      },
      onSubmit: async (values) => {
        // console.log(values);
        // đưa dữ liệu lên backend xử lí và hiển thị thông báo cho người dùng
        try {
          // gửi dữ liệu lên backend
          const res = await quanLyNguoiDungServ.dangNhap(values);
         
          saveLocalStorage("user", res.data.content);
          const user = getLocalStorage("user");
          // console.log(user);
          notify("Đăng nhập thành công");

          setTimeout(() => {
            user?.maLoaiNguoiDung === "QuanTri"
              ? navigate("/admin")
              : navigate("/");
          }, 1000);
          // console.log(user)
        } catch (error) {
          console.log(error);
          notify(error.response.data.content);
        }
      },
      validationSchema: Yup.object({
        taiKhoan: Yup.string().required("Vui lòng nhập mật khẩu"),
        matKhau: Yup.string().required("Vui lòng nhập mật khẩu"),
      }),
    });

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: registerAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="h-screen flex">
      <div className="animation_signIn w-7/12 flex items-center justify-center">
        <Lottie options={defaultOptions} height={400} width={400} />
      </div>
      <div className="form_signIn w-5/12 flex items-center justify-center flex-col">
        <div className="p-10 border border-gray-400 rounded-md space-y-5">
          <h1>Đăng nhập vào movie CyberSoft</h1>
          <form onSubmit={handleSubmit} className="space-y-5">
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
            <InputCustom
              placeholder="Vui lòng nhập mật khẩu"
              id="matKhau"
              label="Mật khẩu"
              onChange={handleChange}
              type="password"
              onBlur={handleBlur}
              error={errors.matKhau}
              touched={touched.matKhau}
              name="matKhau"
              value={values.matKhau}
            />
            <div>
              <p>
                Chưa có tài khoản ư? bấm
                {/* nếu     NavLink to="sign-up"    thì bên route: components signUp phải đặt là con của component hiện tại này. tại component này phải thêm <outLet/>  */}
                <NavLink to="/sign-up" className="mx-1 text-blue-500">
                  vào đây
                </NavLink>
                để đăng ký.
              </p>

              <button
                type="submit"
                className="py-2 px-5 bg-black text-white rounded-md w-full mt-2"
              >
                Đăng nhập
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
