import Joi from 'joi';
import React, { Component } from 'react';
import Form from './common/form';

class RegisterForm extends Form {
    state = { 
        data: {username: '', password: '', name:''},
        errors: {}
    };

    schema = Joi.object({
        username: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).label("Username"),
        password: Joi.string().required().min(5).label("Password"),
        name: Joi.string().required().label("Name")
    });

    doSubmit = () => {
        // Call Server
       console.log("Submitted");
   };

    render() { 
        return (
            <div>
                <h1>Register</h1>
                <form>
                    {this.renderInput("username", "Username")}
                    {this.renderInput("password", "Password")}
                    {this.renderInput("name", "Name")}
                    {this.renderButton("Register")}
                </form>
            </div>
        );
    }
}
 
export default RegisterForm;