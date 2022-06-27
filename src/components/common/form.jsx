import { Component } from 'react';
import Joi from 'joi';
import Input from './input';
import Select from './select';

class Form extends Component {
    state = {
        data: {},
        errors: {}
    };
    
    validate = () => {
        const options = {abortEarly: false};
        const { error } = this.schema.validate(this.state.data, options);
        if(!error) return null;

        const errors = {};
        for (let item of error.details) errors[item.path[0]] = item.message;
        return errors;    
    };

    validateProperty = ({ name, value }) => {
        const obj = {[name]: value};
        const schema = Joi.object({[name]: this.schema.extract(name)});
        const { error } = schema.validate(obj);
        return error ? error.details[0].message : null;
    };

    handleSubmit = e => {
        e.preventDefault();
        
        const errors = this.validate();
        this.setState({ errors: errors || {} });
        if(errors) return;
        
        this.doSubmit();
    };

    handleChange = ({currentTarget: input}) => {
        const errors = {...this.state.errors};
        const errorMessage = this.validateProperty(input);
        if(errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        const data = {...this.state.data};
        data[input.name] = input.value;
        this.setState({ data, errors });
    };

    renderButton = label => {
        return (
            <input disabled={this.validate()} type="submit" className="btn btn-primary" value={label} />
        );
    }

    renderInput = (name, label, type = "text") => {
        const { data, errors } = this.state;

        return (
            <Input 
                name={name}
                type={type}
                value={data[name]} 
                label={label}
                onChange={this.handleChange}
                error={errors[name]}
            />
        );
    }

    renderSelect = (name, label, options) => {
        const { data, errors } = this.state;

        return (
            <Select
                name={name}
                value={data[name]}
                label={label}
                options={options}
                onChange={this.handleChange}
                error={errors[name]}
            />
        )
    }
}
 
export default Form;