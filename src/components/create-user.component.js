import React, { Component } from 'react';
import axios from 'axios';

export default class EditMovie extends Component {
    constructor(props) {
        super(props)
        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);
        this.onChangeDOB = this.onChangeDOB.bind(this);
        this.onChangeNews = this.onChangeNews.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePhoto = this.onChangePhoto.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            username: '',
            gender: '',
            dob: '',
            news: true,
            email: '',
            photo: '',
        }
    }
    onChangePhoto(e) {
        this.setState({
            photo: e.target.value
        });
    }
    onChangeUserName(e) {
        this.setState({
            username: e.target.value
        });
    }
    onChangeGender(e) {
        this.setState({
            gender: e.target.value
        })
    }
    onChangeDOB(e) {
        this.setState({
            dob: e.target.value
        })
    }
    onChangeNews(e) {
        this.setState({
            news: e.target.value
        })
    }
    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }
    onSubmit(e) {
        e.preventDefault();
        const user = {
            username: this.state.username,
            gender: this.state.gender,
            dob: Date(this.state.dob),
            news: this.state.news,
            email: this.state.email,
            photo: this.state.photo
        }
        console.log(user);
        axios.post('http://localhost:5000/users/', user)
            .then(res => {
                console.log(res.data)
            }).catch((err) => console.error(err.data));
    }
    render() {
        return (
            <div>
                <h3>Create a user</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Photo: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.photo}
                            onChange={this.onChangePhoto}>
                        </input>
                    </div>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUserName}>
                        </input>
                    </div>
                    <div className="form-group">
                        <label>Gender: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.gender}
                            onChange={this.onChangeGender}
                        />
                    </div>
                    <div className="form-group">
                        <label>dob: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.dob}
                            onChange={this.onChangeDOB}
                        />
                    </div>
                    <div className="form-group">
                        <label>news: </label>
                        <div>
                            <input type="text" max="10"
                                className="form-control"
                                value={this.state.news}
                                onChange={this.onChangeNews}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <div>
                            <input type="email" max="10"
                                className="form-control"
                                value={this.state.email}
                                onChange={this.onChangeEmail}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Movie" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}