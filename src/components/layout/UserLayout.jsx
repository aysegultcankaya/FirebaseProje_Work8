import React, { Component } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Container } from "rsuite";
import TopHeader from "./TopHeader";
import { getCurrentUser, isLogin } from "../../redux/authSlice";
import { useSelector } from 'react-redux'

const UserLayout = ({ children, ...rest }) => {
    return (
        <Container>
            <TopHeader />
            {children}
        </Container>
    )
}

const UserLayoutRoute = () => {

    const isAuth = useSelector(isLogin)
    const currentUser = useSelector(getCurrentUser)
    if (isAuth && currentUser)
        return <Navigate to="/" replace />;
    return (
        <UserLayout>
            <Outlet />
        </UserLayout>
    )
};

export default UserLayoutRoute