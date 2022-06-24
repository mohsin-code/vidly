import React, { Component } from 'react';
import Form from './common/form';

class MovieForm extends Form {
    render() { 
        const {match, history} = this.props;
        return ( 
            <div>
                <h1 className="m-2">Movie Form {match.params.id}</h1>
                <form>
                    {this.renderInput("username", "Username")}
                    {this.renderInput("password", "Password", "password")}
                    {this.renderInput("name", "Name")}
                </form>
                <button className="btn btn-primary m-2" onClick={() => history.push('/movies')}>Save</button>
            </div>
        );
    }
}
 
export default MovieForm;