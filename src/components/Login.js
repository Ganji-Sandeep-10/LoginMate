import { useState, useEffect } from "react";
import "./Login.css"; // Import the CSS file

function Login() {
    const initialValues = { username: "", email: "", password: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [errorValues, setErrorValues] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    useEffect(() => {
        console.log("Updated Form Values:", formValues);
    }, [formValues]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validate(formValues);
        setErrorValues(errors);

        if (Object.keys(errors).length === 0) {
            console.log("Success...");
            setIsSubmit(true);
            setFormValues(initialValues);
        } else {
            setIsSubmit(false);
        }
    };

    const validate = (values) => {
        const errors = {};
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!values.username) {
            errors.username = "Username is required";
        }

        if (!values.email) {
            errors.email = "Email is required";
        } else if (!emailRegex.test(values.email)) {
            errors.email = "Invalid email format";
        }

        if (!values.password) {
            errors.password = "Password is required";
        } else if (values.password.length < 4) {
            errors.password = "Password must be at least 4 characters";
        } else if (values.password.length > 10) {
            errors.password = "Password must be less than 10 characters";
        }

        return errors;
    };

    return (
        <div className="container">
            {isSubmit && Object.keys(errorValues).length === 0 && (
                <div className="success">Signed in Successfully!</div>
            )}

            <form onSubmit={handleSubmit}>
                <p>Enter your Name</p>
                <input
                    type="text"
                    placeholder="Sandeep"
                    name="username"
                    value={formValues.username}
                    onChange={handleChange}
                />
                {errorValues.username && <p className="error">{errorValues.username}</p>}

                <p>Enter your Email</p>
                <input
                    type="text"
                    placeholder="sandeep07@gmail.com"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                />
                {errorValues.email && <p className="error">{errorValues.email}</p>}

                <p>Enter your Password</p>
                <input
                    type="password"
                    placeholder="*****"
                    name="password"
                    value={formValues.password}
                    onChange={handleChange}
                />
                {errorValues.password && <p className="error">{errorValues.password}</p>}

                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Login;
