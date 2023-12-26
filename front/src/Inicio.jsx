import { Outlet, Link } from 'react-router-dom'

export function Inicio() {
    return (
        <div className='container mt-4'>
            <h1 className='text-center'>ETH e-commerce</h1>
            <div className='text-end'>
                <Link className='mx-2' to="/productos">Products</Link>
                <Link to="/cesta">Cart</Link>
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    )
}