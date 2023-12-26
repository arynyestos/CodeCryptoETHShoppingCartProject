import { useContext, useEffect, useState } from 'react'
import { Contexto } from './main'
import { Link } from 'react-router-dom'
import { ethers } from 'ethers'

export function Cesta() {

    const [estado, setEstado] = useContext(Contexto)
    const total = estado.cesta.reduce((acum, item) => acum + item.total, 0)
    const [cuenta, setCuenta] = useState()
    const [txOk, setTxOk] = useState()
    const [txRechazo, setTxRechazo] = useState()

    useEffect(() => {
        ethereum && ethereum.request({ method: 'eth_requestAccounts' }).then(cuentas => {
            setCuenta(cuentas[0])
            ethereum.on('accountsChanged', (cuentas) => {
                setCuenta(cuentas[0])
            })
        })
    }, [])

    async function pagar() {
        console.log("Inicio pagar...")
        setTxOk(false)
        setTxRechazo(false)
        const paramsTx = {
            to: '0x31e0FacEa072EE621f22971DF5bAE3a1317E41A4', // Cuenta del comercio
            from: ethereum.selectedAddress, // La cuenta activa en Metamask
            value: ethers.utils.parseEther(total.toString()).toHexString()
        }
        try {
            console.log(`Intento enviar tx con ${total} ETH...`)
            const txHash = await ethereum.request({
                method: 'eth_sendTransaction',
                params: [paramsTx],
            })
            setTxOk(txHash) // Transacción enviada
        } catch (error) {
            console.log(error)
            setTxRechazo(error) // Transacción cancelada por el motivo que sea
        } finally {
            // FInal
        }
    }

    return (
        <div>
            <table className='table'>
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {estado.cesta.map(item => (
                        <tr key={item.producto.ProductID}>
                            <td>
                                <Link to={`/productos/${item.producto.ProductID}`}>
                                    {item.producto.ProductName}
                                </Link>
                            </td>
                            <td>{item.producto.UnitPrice}</td>
                            <td>{item.cantidad}</td>
                            <td>{item.total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>Total to pay: {total}</div>
            <div>Wallet: {cuenta}</div>
            <button className='my-3 btn btn-primary' onClick={pagar}>Pay</button>
            {txOk && <div className=' my-3 alert alert-success'>Transaction sent: {txOk}</div>}
            {txRechazo && <div className=' my-3 alert alert-danger'>Transaction canceled: {JSON.stringify(txRechazo.message)}</div>}
        </div>
    )
}