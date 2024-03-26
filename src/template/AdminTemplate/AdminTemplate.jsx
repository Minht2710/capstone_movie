import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { NavLink, Outlet } from "react-router-dom";
import { Layout, Menu, Button, theme } from "antd";
import { useEffect } from "react";
import { getLocalStorage } from "../../utils/util";
const { Header, Sider, Content } = Layout;

const AdminTemplate = () => {
  useEffect(() => {
    // thực hiện lấy dữ liệu từ local lên để kiểm tra
    // Hello Thành
    const user = getLocalStorage("user");
    // console.log(user);
    if (!user) {
      window.location.href = "https://google.com";
    }
    if (user?.maLoaiNguoiDung !== "QuanTri") {
      window.location.href = "https://google.com";
    }
  }, []);

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Quản lí người dùng, quản lí phim, quản lí lịch chiếu

  return (
    <Layout className="min-h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <VideoCameraOutlined />,
              label: <NavLink to="/admin/quan-li-phim">Quản lí phim</NavLink>,
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: <NavLink to="/admin/them-phim">Tạo phim</NavLink>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminTemplate;
