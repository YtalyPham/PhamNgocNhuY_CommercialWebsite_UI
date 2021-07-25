import React, { Component } from "react";
import { Link } from "react-router-dom";
import { del, get, post } from "../../httpHelper";
import "./content.css";
export default class Test extends React.Component {
  state = {
    userList: [],
  };
  componentDidMount() {
    this.fetchUserList();
  }
  fetchUserList() {
    get("/users").then((response) => {
      this.setState({ userList: response.data });
      console.log({ userList: response.data });
    });
  }
  handleDeleteUser(userId) {
    del(`/user/${userId}`).then((response) => {
      console.log(response);
      this.setState({
        userList: this.state.userList.slice(),
      });
      // this.fetchUserList();
    });
  }
  handleAddNewUser() {
    post('/users',{
      name:'asdf',
      email:'asdf@gmail.com',
    }).then((response) => {
      console.log(response.data);
      this.fetchUserList();
    }); 
  }
  render() {
    return (
      <div>
        <table id="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {this.state.userList.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => this.handleDeleteUser(user.id)}>
                    Delete
                  </button>
                  <Link to={`/admin/${user.id}`}>
                   <button>Edit</button>
                  </Link>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={() => this.handleAddNewUser()}>Add new User</button>
      </div>
    );
  }
}
