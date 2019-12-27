
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
const Exercise = props => (
    <tr>
        <td><img src={props.exercise.photo} alt="user pic" sizes="30px" /> </td>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.gender}</td>
        <td>{props.exercise.dob}</td>
        <td>{props.exercise.news}</td>
        <td>{props.exercise.email}</td>
        <td>
            <Link className="btn btn-primary" to={"/edit/" + props.exercise._id}>edit</Link>
            <button className="btn btn-danger ml-2" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</button>
        </td>
    </tr>
)
const Navigator = props => (
    <li class="page-item"><Link class="page-link" to={"/" + props.page + "/" + props.size}>{props.page}</Link></li>
)
export default class MoviesList extends Component {
    constructor(props) {
        super(props);
        this.deleteExercise = this.deleteExercise.bind(this);
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.state = {
            search: '',
            page: '',
            size: '',
            number: '',
            users: [],
            originalList: []
        }
    }
    componentDidMount() {
        this.setState({
            size: this.props.match.params.size,
            page: this.props.match.params.page,
        })
        axios.get("http://localhost:5000/users/size").then((res) => this.setState({ number: Number(res.data) })
        ).catch((err) => console.error(err))
        axios.get("http://localhost:5000/users/" + this.props.match.params.page + "/" + this.props.match.params.size)
            .then((res) => this.setState({ users: res.data, originalList: res.data })
            ).catch((err) => console.error(err))
    }
    deleteExercise(id) {
        axios.delete('http://localhost:5000/users/' + id)
            .then(res => {
                console.log(res.data);
                this.setState({
                    users: this.state.users.filter(el => el._id !== id),
                    originalList: this.state.users.filter(el => el._id !== id)
                })
            })
            .catch(err => console.error(err))
    }
    exerciseList() {
        return this.state.users.map(currentexercise => {
            return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id} />;
        })
    }
    pagesList() {
        // for (let i = this.state.number, j=1; i > 0; i -= this.state.size, j++)
            return <Navigator page={this.state.page} size={this.state.size} />
    }
    onChangeSearch(e) {
        let search = e.target.value.toLowerCase()
        let displayedusers = this.state.originalList.filter((m) => m.username.toLowerCase().includes(search))
        this.setState({
            search: search,
            users: displayedusers
        });
    }
    render() {
        return (
            <div>
                <h3>Users list</h3>
                <div className="form-group row float-right">
                    <label className="mt-2">Search For: </label>
                    <div className="col">
                        <input type="text"
                            required
                            className="form-control"
                            placeholder="Title"
                            value={this.state.search}
                            onChange={this.onChangeSearch}>
                        </input>
                    </div>
                </div>
                <table className="table">
                    <thead className="thead-light">
                        <tr>

                            <th>photo</th>
                            <th>username</th>
                            <th>gender</th>
                            <th>dob</th>
                            <th>news</th>
                            <th>email</th>
                            <th>actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.exerciseList()}
                    </tbody>
                </table>

                <nav aria-label="Page navigation example">
                    <ul class="pagination">
                        {this.pagesList()}
                    </ul></nav>
            </div>
        )
    }
}