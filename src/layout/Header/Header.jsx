import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "./../../assets/img/PoiopTicket.jpg";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { getLocalStorage } from "../../utils/util";
import { Button, Drawer } from "antd";
import "./_header.scss";

export default function Header() {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const userLocal = getLocalStorage("user");
  // console.log(userLocal);
  const menuBar = [
    { titleMenu: "Trang Chủ", path: "#header" },
    { titleMenu: "Lịch Chiếu", path: "#lichChieu" },
    { titleMenu: "Danh Sách Phim", path: "#banner" },
    { titleMenu: "Tin Tức", path: "#listMovie" },
  ];
  // console.log(menuBar);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("user");
    onClose();
    // Redirect or do any additional logic after logout
  };

  // scroll element (kéo đến phần tử id)
  const scrollToElement = (path) => {
    const element = document.querySelector(path);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* header kích thước laptop */}
      <header className="navbarPop w-full" id="header">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <NavLink
              to="/"
              className="flex -m-1.5 p-1.5 justify-center items-center"
            >
              <img className="logoBrand h-10 w-auto" src={logo} alt="" />
              <h1 className="brandName ml-3">PopTicket</h1>
            </NavLink>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {menuBar.map((menu, index) => (
              <button
                key={index}
                onClick={() => scrollToElement(menu.path)}
                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >
                {menu.titleMenu}
              </button>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {userLocal ? (
              <NavLink
                onClick={showDrawer}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                {userLocal.hoTen}
              </NavLink>
            ) : (
              <NavLink
                to="/sign-in"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Đăng Nhập
              </NavLink>
            )}
          </div>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          {/* responsive header */}
          <div className="fixed inset-0 z-10" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <NavLink to="/" className="-m-1.5 p-1.5">
                <span className="sr-only">PopTicket</span>
                <img className="h-8 w-auto" src={logo} alt="" />
              </NavLink>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {menuBar.map((menu, index) => (
                    <button
                      key={index}
                      onClick={() => scrollToElement(menu.path)}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {menu.titleMenu}
                    </button>
                  ))}
                </div>
                <div className="py-6">
                  {userLocal ? (
                    <Button
                      onClick={showDrawer}
                      className="text-sm font-semibold leading-6 text-gray-900"
                    >
                      {userLocal.hoTen}
                    </Button>
                  ) : (
                    <NavLink
                      to="/sign-in"
                      className="text-sm font-semibold leading-6 text-gray-900"
                    >
                      Đăng Nhập
                    </NavLink>
                  )}
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

      {/* thông tin cá nhân */}
      <Drawer
        // title="Thoong"
        zIndex={1300}
        placement={"right"}
        closable={false}
        onClose={onClose}
        open={open}
        // key={"left"}
      >
        <div className="flex w-full justify-between">
          <div className="flex items-center justify-center">
            <h3 className="brandName">Thông Tin Cá Nhân</h3>
          </div>
          <button onClick={onClose}>
            <i class="fa-sharp fa-solid fa-xmark text-3xl"></i>
          </button>
        </div>
        <div className="w-full">
          <table>
            <thead>
              <td>
                <th className="w-1/4"></th>
                <th className="w-3/4"></th>
              </td>
            </thead>
            <tbody>
              {/* họ và tên  */}
              <tr>
                <td className="tagName w-1/4">Họ và Tên:</td>
                <td className="text-right w-3/4">
                  <p>{userLocal?.hoTen}</p>
                </td>
              </tr>
              <tr>
                <td className="tagName w-1/4">Email:</td>
                <td className="text-right w-3/4">
                  <p>{userLocal?.email}</p>
                </td>
              </tr>
              <tr>
                <td className="tagName w-1/4">Số Điện Thoại:</td>
                <td className="text-right w-3/4">
                  <p>{userLocal?.soDT}</p>
                </td>
              </tr>
            </tbody>
          </table>
          <button
            className=""
            onClick={() => {
              handleLogout();
            }}
          >
            Đăng Xuất
          </button>
        </div>
      </Drawer>
    </>
  );
}
