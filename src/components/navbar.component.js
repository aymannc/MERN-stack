import React, { Component } from "react";
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand" style={{ color: '#f3ce13' }}>Users.com</Link>
                <div className="collpase navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/" className="nav-link">Users</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/create" className="nav-link">Create a user</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/get" className="nav-link">Get from API</Link>
                        </li>
                    </ul>
                </div>
            </nav >
        );
    }
}