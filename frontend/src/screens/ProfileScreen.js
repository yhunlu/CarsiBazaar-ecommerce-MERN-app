import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUserProfile } from "../store/userDetails";

const ProfileScreen = ({ location, history }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();

    const userDetails = useSelector((state) => state.entities.userDetails);
    const { loading, error, user, success } = userDetails;

    const userLogin = useSelector((state) => state.entities.users);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (!userInfo) {
            history.push("/login");
        } else {
            if (!user.name) {
                dispatch(getUserDetails('profile'))
            } else {
                setName(user.name);
                setEmail(user.email);
            }

        }
    }, [dispatch, history, userInfo, user]);

    const submitHandler = (e) => {
        e.preventDefault();
        // DISPATCH LOGIN
        if (password !== confirmPassword) {
            setMessage("Şifreler Aynı Değil !");
        } else {
            dispatch(updateUserProfile({ id: user._id, name, email, password }))
        }
    };

    return (
        <Row>
            <Col md={3}>
                <h2>Kullanıcı Bilgilerim</h2>
                {message && <Message variant="danger">{message}</Message>}
                {success > 0 && <Message variant="success">Güncellendi</Message>}
                {error.length > 0 && <Message variant="danger">{error}</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler} className='d-grid gap-2'>
                    <Form.Group controlId="name">
                        <Form.Label>İsim</Form.Label>
                        <Form.Control
                            type="name"
                            placeholder="İsmini Yaz"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Email Adresini Yaz"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Şifre</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Şifreni Yaz"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="confirmPassword">
                        <Form.Label>Tekrar Şifre</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Tekrar Şifreni Yaz"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Button type="submit" className='btn btn-md btn-outline-success'>
                        Güncelle
                    </Button>
                </Form>
            </Col>
            <Col md={9}>
                <h2>Siparişlerim</h2>
            </Col>
        </Row>

    );
};

export default ProfileScreen;
