import React from 'react';
import axios from 'axios';

export default class mock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number: 100,
            username: '',
            gender: '',
            dob: '',
            news: true,
            email: '',
            photo: '',
        };
        this.getUser = this.getUser.bind(this);
        this.onChangeNumber = this.onChangeNumber.bind(this);
    }
    componentDidMount() {
        axios.get('http://localhost:5000/users/size')
            .then(response => {
                this.setState({
                    number: 100 - Number(response.data),
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    onChangeNumber(e) {
        this.setState({
            number: e.target.value
        })
    }
    getUser() {
        fetch('https://randomuser.me/api/?results=' + this.state.number)
            .then(response => {
                if (response.ok) return response.json();
                throw new Error('Request failed.');
            })
            .then(data => {
                data.results.map(u => {
                    let user = {
                        username: u.login.username,
                        gender: u.gender,
                        dob: u.dob.date,
                        news: true,
                        email: u.email,
                        photo: u.picture.medium
                    }
                    axios.post('http://localhost:5000/users/', user)
                    .then(res => {
                        console.log(res.data)
                    })
                    console.log(user)
                })
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <h3>Create a user</h3>
                <div className="form-group">
                    <label>Number of users: </label>
                    <input type="number"
                        className="form-control"
                        value={this.state.number}
                        onChange={this.onChangeNumber}>
                    </input>
                </div>
                <button className="btn btn-success" onClick={this.getUser}>Get new user.</button>
            </div >
        );
    }
}
