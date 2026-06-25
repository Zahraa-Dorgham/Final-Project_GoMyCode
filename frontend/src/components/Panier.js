import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Table, Button, Card } from 'react-bootstrap';
import { FaTrash, FaMinus, FaPlus, FaShoppingCart, FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { removeFromCart, updateQuantity, clearCart } from '../redux/panierSlice';
import './Panier.css';

const Panier = () => {
    const dispatch = useDispatch();
    const { items } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? 10 : 0;
    const total = subtotal + shipping;

    const handlePlaceOrder = async () => {
        if (!user) return alert('Please login to place an order.');
        if (items.length === 0) return;
        setLoading(true);
        try {
            await axios.post('https://final-project-go-my-code.vercel.app/order/add', {
                user: user._id,
                items: items.map(item => ({
                    product: item._id,
                    name: item.name,
                    image: item.image || item.img,
                    price: item.price,
                    quantity: item.quantity
                })),
                subtotal,
                shipping,
                total
            });
            dispatch(clearCart());
            setOrderSuccess(true);
        } catch (err) {
            console.error('Order failed:', err);
            alert('Failed to place order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return (
            <Container className="my-5 py-5 text-center empty-cart-container">
                <FaShoppingCart size={80} className="mb-4 text-muted" aria-hidden="true" />
                <h2 className="mb-3 fw-bold"> Shopping Card not found</h2>
                <p className="text-muted mb-4"> Please login to see your shopping card.</p>
                <Button as={Link} to="/login" variant="dark" className="rounded-pill px-5 py-3 fw-bold">
                 login
                </Button>
            </Container>
        );
    }

    if (orderSuccess) {
        return (
            <Container className="my-5 py-5 text-center empty-cart-container">
                <FaCheckCircle size={80} className="mb-4" style={{color: '#38a169'}} />
                <h2 className="mb-3 fw-bold">Order Placed Successfully!</h2>
                <p className="text-muted mb-4">Your order has been received and is being processed.</p>
                <Button as={Link} to="/shop" variant="dark" className="rounded-pill px-5 py-3 fw-bold">
                    Continue Shopping
                </Button>
            </Container>
        );
    }

    if (items.length === 0) {
        return (
            <Container className="my-5 py-5 text-center empty-cart-container">
                <FaShoppingCart size={80} className="mb-4 text-muted" />
                <h2 className="mb-3 fw-bold">Your Cart is Empty</h2>
                <p className="text-muted mb-4">It looks like you haven't added anything to your cart yet.</p>
                <Button as={Link} to="/shop" variant="dark" className="rounded-pill px-5 py-3 fw-bold">
                    Continue Shopping
                </Button>
            </Container>
        );
    }

    return (
        <div className="panier-page">
            <div className="panier-hero">
                <Container>
                    <h1>Shopping Cart</h1>
                    <p>Review your items and proceed to checkout.</p>
                </Container>
            </div>

            <Container className="my-5">
                <Row className="g-5">
                    <Col lg={8}>
                        <div className="cart-items-wrapper">
                            <Table responsive className="align-middle cart-table">
                                <thead className="text-uppercase small fw-bold text-muted">
                                    <tr>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item) => (
                                        <tr key={`${item._id}-${item.size}`}>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <div className="product-img-mini">
                                                        <img src={item.img || item.image || 'https://via.placeholder.com/100'} alt={item.name} />
                                                    </div>
                                                    <div className="ms-3">
                                                        <h6 className="mb-0 fw-bold">{item.name}</h6>
                                                        {item.size && <span className="text-muted x-small">Taille: {item.size}</span>}
                                                    </div>
                                                </div>
                                            </td>
                                            <td><span className="fw-medium">{item.price} TND</span></td>
                                            <td>
                                                <div className="quantity-control d-flex align-items-center border rounded-pill px-2 py-1">
                                                    <button onClick={() => dispatch(updateQuantity({ id: item._id, size: item.size, quantity: item.quantity - 1 }))} disabled={item.quantity <= 1}>
                                                        <FaMinus size={12} />
                                                    </button>
                                                    <span className="mx-3 fw-bold">{item.quantity}</span>
                                                    <button onClick={() => dispatch(updateQuantity({ id: item._id, size: item.size, quantity: item.quantity + 1 }))}>
                                                        <FaPlus size={12} />
                                                    </button>
                                                </div>
                                            </td>
                                            <td><span className="fw-bold">{(item.price * item.quantity).toFixed(2)} TND</span></td>
                                            <td>
                                                <button
                                                    className="btn-delete"
                                                    onClick={() => dispatch(removeFromCart({ id: item._id, size: item.size }))}
                                                >
                                                    <FaTrash size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <div className="d-flex justify-content-between mt-4">
                                <Button variant="outline-dark" as={Link} to="/shop" className="rounded-pill px-4">
                                    Continue Shopping
                                </Button>
                                <Button variant="link" className="text-danger" onClick={() => dispatch(clearCart())}>
                                    Clear Cart
                                </Button>
                            </div>
                        </div>
                    </Col>

                    <Col lg={4}>
                        <Card className="summary-card border-0 shadow-sm p-4 rounded-4">
                            <h4 className="fw-bold mb-4">Order Summary</h4>
                            <div className="d-flex justify-content-between mb-3 text-muted">
                                <span>Subtotal</span>
                                <span>{subtotal.toFixed(2)} TND</span>
                            </div>
                            <div className="d-flex justify-content-between mb-3 text-muted">
                                <span>Shipping</span>
                                <span>{shipping.toFixed(2)} TND</span>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between mb-4 mt-2">
                                <span className="fs-5 fw-bold">Total</span>
                                <span className="fs-5 fw-bold text-dark">{total.toFixed(2)} TND</span>
                            </div>
                            <Button 
                                variant="dark" 
                                className="w-100 rounded-pill py-3 fw-bold checkout-btn"
                                onClick={handlePlaceOrder}
                                disabled={loading}
                            >
                                {loading ? 'Placing Order...' : 'Validate Order'}
                            </Button>
                            <div className="payment-methods mt-4 text-center opacity-50">
                                <i className="bi bi-credit-card me-2 fs-4"></i>
                                <i className="bi bi-paypal me-2 fs-4"></i>
                                <i className="bi bi-cash fs-4"></i>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Panier;
