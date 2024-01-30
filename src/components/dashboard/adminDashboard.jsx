import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  PlaySquareOutlined,
} from "@ant-design/icons";
import "../dashboard/admin.css";
import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Table from "./Table";
import TableUser from "./Table";
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default function AdminDashboard({ children }, props) {
  const validateUser = useSelector((state) => state.loginReducer);
  const [roleUser, setuserRole] = useState("");

  useEffect(() => {
    if (validateUser.users) {
      const { role } = validateUser.users.data.user;

      setuserRole(role);
    }
  }, [validateUser, roleUser]);

  return (
    <div>
      <Layout style={{ height: "50rem" }}>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {}}
          onCollapse={(collapsed, type) => {}}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              {roleUser === "student" ? (
                <Link to="/auth/tdata" state={{ role: roleUser }}>
                  {" "}
                  Student Table
                </Link>
              ) : roleUser === "lecture" ? (
                <Link to="/auth/tdata" state={{ role: roleUser }}>
                  Lecture Table
                </Link>
              ) : roleUser === "admin" ? (
                <Link to="/auth/admin" state={{ role: roleUser }}>
                  Admin Table
                </Link>
              ) : null}
            </Menu.Item>

            <Menu.Item key="2" icon={<UserOutlined />}>
              {roleUser === "student" ? (
                <Link to="/auth/user" state={{ role: roleUser }}>
                  {" "}
                  Student Profile
                </Link>
              ) : roleUser === "lecture" ? (
                <Link to="/auth/user" state={{ role: roleUser }}>
                  Lecture Profile
                </Link>
              ) : roleUser === "admin" ? (
                <Link to="/auth/user" state={{ role: roleUser }}>
                  admin Profile
                </Link>
              ) : null}
            </Menu.Item>

            {roleUser === "admin" ? (
              <>
                <Menu.Item key="4" icon={<PlaySquareOutlined />}>
                  <Link to="paytable" state={{ role: roleUser }}>
                    Payment
                  </Link>
                </Menu.Item>
              </>
            ) : (
              <Menu.Item key="3" icon={<VideoCameraOutlined />}>
                {roleUser === "student" ? (
                  <Link to="/auth/enroll" state={{ role: roleUser }}>
                    Enroll Course
                  </Link>
                ) : roleUser === "lecture" ? (
                  <Link to="/auth/session" state={{ role: roleUser }}>
                    Add Sessions
                  </Link>
                ) : roleUser === "admin" ? (
                  <Link to="/auth/register" state={{ role: roleUser }}>
                    Add User
                  </Link>
                ) : null}
              </Menu.Item>
            )}

            {roleUser === "student" ? (
              <Menu.Item key="4" icon={<PlaySquareOutlined />}>
                <Link to="/auth/payment" state={{ role: roleUser }}>
                  Payment
                </Link>
              </Menu.Item>
            ) : roleUser === "lecture"?  <>
            
            
            <Menu.Item key="5" icon={<PlaySquareOutlined />}>
                <Link to="lecTable" state={{ role: roleUser }}>
                  Student List
                </Link>
                </Menu.Item></>:null}

            <Menu.Item key="9" icon={<VideoCameraOutlined />}>
              <Link
                to="/"
                onClick={() => {
                  localStorage.setItem("");
                }}
              >
                Log Out
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header
            className="site-layout-sub-header-background"
            style={{ padding: 0 }}
          />
          <Content style={{ margin: "24px 16px 0" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
                  <div><h1 className="headingContainer" ><span className="heading2">IHM Hotel School</span><span className="spanhead2"> CourseWork</span></h1></div>
              <Outlet />
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            ICH HOTEL SCHOOL 
          </Footer>
        </Layout>
      </Layout>
      ,
    </div>
  );
}
