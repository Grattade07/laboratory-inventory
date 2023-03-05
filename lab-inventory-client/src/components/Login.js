import { useState } from "react";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from "react-redux";
import { addJWToken, removeJWToken, setIsLoggedIn, setIsAdmin } from "../store/inventory";

/* component used to login in the user */
function Login () {
    const [userNameLogin, setUserNameLogin] = useState("")
    const [passwordLogin, setPasswordLogin] = useState("")
    const [userNameAdd, setUserNameAdd] = useState("")
    const [passwordAdd, setPasswordAdd] = useState("")
    const [userAdmin, setUserAdmin] = useState(false)
    const [message, setMessage] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const isLoggedIn = useSelector((state) => state.inventory.isLoggedIn)

    const dispatch = useDispatch()
    
    /* functions and variable to handle sign up modal displaying */
    const [showSignUp, setShowSignUp] = useState(false);

    const handleCloseSignUp = () => setShowSignUp(false);
    const handleShowSignUp = () => setShowSignUp(true);

    /*  function and variable to handle change password modal displaying */

    const [showChangePassword, setShowChangePassword] = useState(false);

    const handleCloseChangePassword = () => setShowChangePassword(false);
    const handleShowChangePassword = () => setShowChangePassword(true);

    /* sends post request to add a new user to the database */
    function postNewUser(url = "", data = {}) {
        return fetch(url, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => {
            setMessage(res.message)
            res.message === "This user already exists" ? setTimeout(resetMessage,2000) : 
            setTimeout(handleCloseSignUp, 2000) && 
            dispatch(addJWToken(res.token)) && 
            dispatch(setIsLoggedIn(res.isLoggedIn)) && 
            dispatch(setIsAdmin(res.isAdmin))
        })
    }

    /* sends a post request to login the user with the given details */
    function loginUser(url = "", data = {}) {
        return fetch(url, {
            method:"POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => {
            dispatch(addJWToken(res.token))
            dispatch(setIsLoggedIn(res.isLoggedIn))
            dispatch(setIsAdmin(res.isAdmin))
        })
    }

    /* sends put request to update the user's password */
    function changePassword(url = "", data ={}) {
        return fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => {
            setMessage(res.message)
            res.message === "New Password and Confirmation Password do not match" ? setTimeout(resetMessage, 5000) : setTimeout(handleCloseChangePassword, 2000) && setTimeout(resetMessage, 2000)
        })
    }

    /* resets displayed message from server in modal */
    function resetMessage() {
        setMessage("")
    }

    /* shows if the user is logged in */
    if (isLoggedIn) {
        return (
            <section id="login-welcome">
                <h4>Hello, {userNameLogin}!</h4>

                {/* button logs out the user */}
                <Button onClick={() => {
                    dispatch(setIsLoggedIn(false))
                    dispatch(removeJWToken())
                    }}>Logout</Button>
            </section>
        )
    } else {
    return (
        <Form id="signin-form">
            
            <div id="signin-header">
                <h3 className="underline">Sign In</h3>
            </div>

            <section id="signin" className="underline">

            <Form.Group controlId="formUsername">
                <Form.Label>User Name:</Form.Label>
                <Form.Control type="text" placeholder="Enter Username..." onChange={(e) => setUserNameLogin(e.target.value)}/>
            </Form.Group>
            
            <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" placeholder="Enter Password..." onChange={(e) => setPasswordLogin(e.target.value)}/>
            </Form.Group>

            {/* button shows the modal to change the user password */}
            <Button onClick={
                handleShowChangePassword
            } id="changePasswordButton">Forgot Password?</Button>

            {/* modal used to change the user password */}
            <Modal show={showChangePassword} onHide={handleCloseChangePassword}>
                    <Modal.Header closeButton>

                    <Modal.Title>Enter New Details</Modal.Title>
    
                    </Modal.Header>

                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="changePasswordUsername">
                                <Form.Label>Username:</Form.Label>
                                <Form.Control type="text" placeholder="Username..." onChange={(e) => {setUserNameLogin(e.target.value)}}/>
                            </Form.Group>

                            <Form.Group controlId="newPassword">
                                <Form.Label>New Password:</Form.Label>
                                <Form.Control type="password" placeholder="New Password..." onChange={(e) => {setNewPassword(e.target.value)}}/>
                            </Form.Group>

                            <Form.Group controlId="confirmPassword">
                                <Form.Label>Confirm Password:</Form.Label>
                                <Form.Control type="password" placeholder="Confirm Password..." onChange={(e) => {setConfirmPassword(e.target.value)}}/>
                            </Form.Group>

                            <h5 style={{textAlign: "center",
                            color: "red"}}>{message}</h5>
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>

                    <Button variant="secondary" onClick={handleCloseChangePassword}>
                        Close
                    </Button>

                    {/* buttons sends request to update the user password */}
                    <Button variant="primary" onClick={() => {
                        changePassword("/users/changePassword", {
                            username: userNameLogin,
                            newPassword: newPassword,
                            confirmPassword: confirmPassword
                        })
                        }}>
                        Submit
                    </Button>

                    </Modal.Footer>

                </Modal>
            
            {/* button send request to login the user */}
            <Button variant="primary" type="button" id="signin-button" onClick={() => loginUser("/users/login", {
                username: userNameLogin,
                password: passwordLogin
            })}>
                SIGN IN
            </Button>
                
            </section>

            <section id="new-user">
                <h4>New User?</h4>
                
                {/* button shows the sign up modal */}
                <Button variant="primary" type="button" id="signup-button" onClick={handleShowSignUp}>SIGN UP</Button>

                {/* modal to sign up the user */}
                <Modal show={showSignUp} onHide={handleCloseSignUp}>
                    <Modal.Header closeButton>

                    <Modal.Title>Enter Login Details</Modal.Title>
    
                    </Modal.Header>

                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="signupUsername">
                                <Form.Label>Username:</Form.Label>
                                <Form.Control type="text" placeholder="Username..." onChange={(e) => {setUserNameAdd(e.target.value)}}/>
                            </Form.Group>

                            <Form.Group controlId="signupPassword">
                                <Form.Label>Password:</Form.Label>
                                <Form.Control type="password" placeholder="Password..." onChange={(e) => {setPasswordAdd(e.target.value)}}/>
                            </Form.Group>

                            <Form.Group controlId="signupAdmin">
                                <Form.Label>Admin?:</Form.Label>
                                <Form.Check type="radio" label="Yes" name="adminCheck" onChange={(e) => {setUserAdmin(true)}}/>
                                <Form.Check type="radio" label="No" name="adminCheck" onChange={(e) => {setUserAdmin(false)}}/>
                            </Form.Group>

                            <h5 style={{textAlign: "center"}}>{message}</h5>
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>

                    <Button variant="secondary" onClick={handleCloseSignUp}>
                        Close
                    </Button>

                    {/* button sends request to register the user */}
                    <Button variant="primary" onClick={() => {
                        postNewUser("/users/register", {
                            username: userNameAdd,
                            password: passwordAdd,
                            admin: userAdmin
                        })
                        setUserNameLogin(userNameAdd)
                        }}>
                        Submit
                    </Button>

                    </Modal.Footer>

                </Modal>
            </section>
            
        </Form>
    )
    }
}

export default Login