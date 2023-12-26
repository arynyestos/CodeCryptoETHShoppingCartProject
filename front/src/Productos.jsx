import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

export function Productos() {

    const { data, isLoading, error } = useQuery("prods", () => {
        return fetch("http://localhost:7777/productos").then(res => res.json())
    })

    if (isLoading) {
        return <div>Loading products...</div>
    }

    return (
        <div className="container mt-4">
            <h2 className="text-center">Product list</h2>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <table className="table table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Name</th>
                                <th className="text-end" scope="col">Price (ETH)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(producto => (
                                <tr key={producto.ProductID}>
                                    <td>
                                        <Link to={`/productos/${producto.ProductID}`}>
                                            {producto.ProductName}
                                        </Link>
                                    </td>
                                    <td className="text-end">{producto.UnitPrice}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}