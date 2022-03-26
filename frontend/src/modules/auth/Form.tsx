import { Formik } from "formik";
import { FC } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { AuthFormtypes, IMainState, UseMainDataContext } from "../State";
import { Login as APILogin, Signup as APISignup } from "./Auth";
import * as Yup from 'yup';
const LoginSchema = Yup.object().shape({
    username: Yup.string()
        .min(5, "Username is Too Short!")
        .max(50, "Username is Too Long!")
        .required('Username is required'),
    password: Yup.string()
        .min(8, "Password is Too Short!")
        .max(50, "Password is Too Long!")
        .required('Password is required'),

});
const SignupSchema = Yup.object().shape({
    username: Yup.string()
        .min(5, "Username is Too Short!")
        .max(50, "Username is Too Long!")
        .required('Username is required'),
    email: Yup.string()
        .required('Email is required')
        .email('Must be a valid email')
        .max(100),
    password: Yup.string()
        .min(8, "Password is Too Short!")
        .max(50, "Password is Too Long!")
        .required('Password is required'),
    password2: Yup.string()
        .min(8, "Password is Too Short!")
        .max(50, "Password is Too Long!")
        .oneOf([Yup.ref('password')], 'Passwords does not match')
        .required('Password is required'),
    agreeterms: Yup.boolean()
        .oneOf([true], "You must accept the terms and conditions")
        .required('Required'),
});

export const LoginForm: FC = (props: any) => {
    const { State, Login, ToggleAuthModal } = UseMainDataContext()
    return (
        <Formik
            initialValues={{ username: '', password: '', rememberme: 'false' }}
            validationSchema={LoginSchema}
            onSubmit={(values, { setSubmitting, setErrors }) => {
                setTimeout(() => {
                    APILogin(values.username, values.password)
                        .then((resp: any) => {
                            Login(resp)
                            
                            console.log(State)
                            //setSubmitting(false);
                        })
                        .catch((error: any) => {
                            console.log(error)
                            setErrors({ username: "username or password is wrong", password: "username or password is wrong" })
                            setSubmitting(false);
                        })

                    //alert(JSON.stringify(values, null, 2));

                }, 400);
            }}>
            {({ values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting, }) => (
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control className={(touched.username && errors.username) ? "is-invalid" : touched.username ? "is-valid" : ""} name="username" type="text" value={values.username} onChange={handleChange}
                            onBlur={handleBlur} placeholder="Enter username" />
                        {touched.username && errors.username ? (
                            <div className="invalid-feedback">{errors.username}</div>
                        ) : null}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control className={(touched.password && errors.password) ? "is-invalid" : touched.password ? "is-valid" : ""} type="password" name="password" value={values.password} onChange={handleChange}
                            onBlur={handleBlur} placeholder="Password" />
                        {touched.password && errors.password ? (
                            <div className="invalid-feedback">{errors.password}</div>
                        ) : null}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" name="rememberme" value={values.rememberme} onChange={handleChange}
                            onBlur={handleBlur} label="Remember me" />
                    </Form.Group>
                    <Form.Group className="d-grid">
                        <Button disabled={errors.password !== undefined || errors.username !== undefined || isSubmitting} className="btn-round" variant="primary" type="submit">
                            Sign in
                        </Button>
                    </Form.Group>
                </Form>
            )
            }
        </Formik >
    )
}

export const SignupForm: FC = (props: any) => {
    const { State, Login, ToggleAuthModal } = UseMainDataContext()
    return (
        <div>
            <Formik
                initialValues={{ username: '', email: '', password: '', password2: '', agreeterms: 'false' }}
                validationSchema={SignupSchema}
                onSubmit={(values, { setSubmitting, setErrors }) => {
                    setTimeout(() => {
                        //alert(JSON.stringify(values, null, 2));
                        APISignup(values.username, values.password, values.email, values.password2, values.agreeterms)
                            .then((resp) => {
                                APILogin(values.username, values.password)
                                    .then((resp: any) => {
                                        Login(resp)
                                        setSubmitting(false);
                                    })
                                    .catch((error: any) => {
                                        console.log(error)
                                        setSubmitting(false);
                                    })
                            })
                            .catch((error) => {
                                console.log(error);
                                setErrors({ username: "username is already taken" })
                            })
                        setSubmitting(false);
                    }, 400);
                }}>
                {({ values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting, }) => (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control className={(touched.email && errors.email) ? "is-invalid" : touched.email ? "is-valid" : ""} name="email" type="email" value={values.email} onChange={handleChange}
                                onBlur={handleBlur} placeholder="Enter your email" />
                            {touched.email && errors.email ? (
                                <div className="invalid-feedback">{errors.email}</div>
                            ) : null}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control className={(touched.username && errors.username) ? "is-invalid" : touched.username ? "is-valid" : ""} name="username" type="text" value={values.username} onChange={handleChange}
                                onBlur={handleBlur} placeholder="Enter username" />
                            {touched.username && errors.username ? (
                                <div className="invalid-feedback">{errors.username}</div>
                            ) : null}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control className={(touched.password && errors.password) ? "is-invalid" : touched.password ? "is-valid" : ""} type="password" name="password" value={values.password} onChange={handleChange}
                                onBlur={handleBlur} placeholder="Password" />
                            {touched.password && errors.password ? (
                                <div className="invalid-feedback">{errors.password}</div>
                            ) : null}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword2">
                            <Form.Label>Re-enter Password</Form.Label>
                            <Form.Control className={(touched.password2 && errors.password2) ? "is-invalid" : touched.password2 ? "is-valid" : ""} type="password" name="password2" value={values.password2} onChange={handleChange}
                                onBlur={handleBlur} placeholder="Re-enter Password" />
                            {touched.password2 && errors.password2 ? (
                                <div className="invalid-feedback">{errors.password2}</div>
                            ) : null}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check className={(touched.agreeterms && errors.agreeterms) ? "is-invalid" : touched.agreeterms ? "is-valid" : ""} type="checkbox" name="agreeterms" value={values.agreeterms} onChange={handleChange}
                                onBlur={handleBlur} label="Agree to Terms & Conditions" />
                            {touched.agreeterms && errors.agreeterms ? (
                                <div className="invalid-feedback">{errors.agreeterms}</div>
                            ) : null}
                        </Form.Group>
                        <Form.Group className="d-grid">
                            <Button disabled={errors.password != undefined || errors.agreeterms != undefined || errors.email != undefined || errors.password2 != undefined || errors.username != undefined || isSubmitting} className="btn-round" variant="primary" type="submit">
                                Signup
                            </Button>
                        </Form.Group>

                    </Form>

                )}
            </Formik>

        </div>

    )
}

export function AuthModalContainer(props: any) {
    const { ToggleAuthModal, State } = UseMainDataContext()
    const { Auth } = State
    return (
        <Modal {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton className="text-center">
                <Modal.Title id="contained-modal-title-vcenter">
                    Login/Signup
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {Auth.Form === AuthFormtypes.Login && <LoginForm />}
                {Auth.Form === AuthFormtypes.Signup && <SignupForm />}
            </Modal.Body>
            {Auth.Form === AuthFormtypes.Login &&
                <Modal.Footer className="d-flex justify-content-center">
                    <div className="signup-section" >Not a member yet? <a role="button" onClick={() => { ToggleAuthModal(AuthFormtypes.Signup) }} className="link-info"> Sign Up</a>.</div>
                </Modal.Footer>}
            {Auth.Form === AuthFormtypes.Signup &&
                <Modal.Footer className="d-flex justify-content-center">
                    <div className="signup-section" >Have an account? <a role="button" onClick={() => { ToggleAuthModal(AuthFormtypes.Login) }} className="link-info"> Sign in</a>.</div>
                </Modal.Footer>}

        </Modal>
    );
}

