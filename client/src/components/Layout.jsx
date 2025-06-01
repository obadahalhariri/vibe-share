import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
    return (
        <>
            <Header />
            <div className="container mt-4" style={{ paddingTop: '50px' }}>
                <Outlet />
            </div>
        </>
    )
}

export default Layout
