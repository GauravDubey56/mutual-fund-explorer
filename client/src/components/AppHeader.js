import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout, Menu, Button } from 'antd';

const { Header } = Layout;

const AppHeader = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

return (
    <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="logo" style={{ color: 'white', fontSize: '20px' }}>
            Mutual Fund App
        </div>
        <Menu theme="dark" mode="horizontal" style={{ flex: 1, justifyContent: 'flex-end' }} defaultSelectedKeys={['0']}>
            {isLoggedIn && (
                <>
                    <Menu.Item key="1" >
                        <Link to="/dashboard">Explore</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="/funds">My Funds</Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Button type="primary" onClick={handleLogout} style={{ marginLeft: '10px' }}>
                            Logout
                        </Button>
                    </Menu.Item>
                </>
            )}
        </Menu>
    </Header>
);
};

export default AppHeader;
