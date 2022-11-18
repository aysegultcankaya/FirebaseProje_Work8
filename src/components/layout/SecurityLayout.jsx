import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Container, Loader } from "rsuite";
import Sidebar from './Sidebar'
import TopHeader from "./TopHeader";
import { getCurrentUser, isLogin, setLogin, setUser } from "../../redux/authSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";

const SecurityLayout = ({ children }) => {
    return (
        <div className="show-fake-browser sidebar-page">
            <Container>
                <Sidebar />
                <Container>
                    <TopHeader />
                    {children}
                </Container>
            </Container>
        </div>
    )
}

const SecurityLayoutRoute = () => {
    let location = useLocation();
    // const [getUser, { isLoading }] = useCurrentUserMutation()
    const dispatch = useAppDispatch()
    useEffect(() => {
        // getUser().unwrap().then(response => {
        //     dispatch(setUser(response))
        // }).catch(err => {
        //     dispatch(setUser(null))
        //     dispatch(setLogin({ auth: (err?.data?.auth || false) }))
        // })
    }, [])

    const isAuth = useAppSelector(isLogin)
    const currentUser = useAppSelector(getCurrentUser)
    if (!isAuth && !currentUser)
        return <Navigate to="/user/login" state={{ from: location }} replace />;

    return (
        <SecurityLayout>
            {/* {isLoading && <Loader size="lg" backdrop content="loading..." vertical />} */}
            <Outlet />
        </SecurityLayout>
    )
};

export default SecurityLayoutRoute