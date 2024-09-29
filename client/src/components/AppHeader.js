import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout, Menu, Button } from "antd";

const { Header } = Layout;

const AppHeader = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  const navItems = () => {
    return [
      { title: "Explore", path: "/dashboard" },
      { title: "My Funds", path: "/funds" },
      { title: "Calculator", path: "/calculator" },
      {
        title: "Logout",
        path: "/logout",
        type: "primary",
        content: (
          <Button
            type="primary"
            onClick={handleLogout}
            style={{ marginLeft: "10px" }}
          >
            Logout
          </Button>
        ),
      },
    ];
  };
  const renderNavItems = () => {
    return navItems().map((item, index) => {
      return (
        <Menu.Item key={index}>
          <Link to={item.path}>{item.content || item.title}</Link>
        </Menu.Item>
      );
    });
  };
  return (
    <Header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div className="logo" style={{ color: "white", fontSize: "20px" }}>
       SIPwise
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        style={{ flex: 1, justifyContent: "flex-end" }}
        defaultSelectedKeys={["0"]}
      >
        {isLoggedIn && <>{renderNavItems()}</>}
      </Menu>
    </Header>
  );
};

export default AppHeader;
