import Joi from 'joi';
import React from 'react';
import Form from './common/form';

class LoginForm extends Form {
    state = {
        data: { username: '', password: '' },
        errors: {}
    };
    
    schema = Joi.object({
        username: Joi.string().required().label("Username"),
        password: Joi.string().required().label("Password")
    });

    doSubmit = () => {
         // Call Server
        console.log("Submitted");
    };

    render() { 
        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("username", "Username")}
                    {this.renderInput("password", "Password", "password")}
                    {this.renderButton("Login")}
                </form>
            </div>
        );
    }
}
 
export default LoginForm;