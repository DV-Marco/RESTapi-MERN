import React, { Component } from 'react';

export class App extends Component {

    state = {
        title: '',
        description: '',
        _id: '',
        tasks: []
    }

    addTask = (e) =>{
        e.preventDefault();
        if (this.state._id){
            fetch(`api/task/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    M.toast({html: "Task Updated"});
                    this.setState({
                        title: '',
                        description: '',
                        _id: ''
                    });
                    this.getTasks();
                })
        } else {
            fetch('api/task', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(dato => {
                    console.log(dato);
                    M.toast({html: 'Task Saved'});
                    this.setState({title: '', description: ''});
                    this.getTasks();
                })
                .catch(err => console.error(err))
        }
    }

    componentDidMount() {
        this.getTasks();
    }

    getTasks = () =>{
        fetch('api/task')
            .then(res => res.json())
            .then(data => {
                this.setState({tasks: data});
            })
    }

    deleteTask = (id) =>{
        if (confirm('Are you sure you want to delete it?')){
            fetch(`api/task/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    M.toast({html: 'Task Delete'});
                    this.getTasks();
                })
        }
    }

    editTask = (id) => {
        fetch(`api/task/${id}`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    title: data.title,
                    description: data.description,
                    _id: data._id
                })
            });
    }

    handleChange = (e) =>{
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    render(){
        return(
            <div>
                <nav className="light-blue darken-4">
                    <div className="Container">
                        <a href="#" className="brand-logo center">Mern Stack</a>
                    </div>
                </nav>
                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addTask}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="title" onChange={this.handleChange} type="text" value={this.state.title} placeholder="Task Title" />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea name="description" value={this.state.description} onChange={this.handleChange} placeholder="Task Description" className="materialize-textarea" />
                                            </div>
                                        </div>
                                        <button type="submit" className="btn light-blue darken-4">Send</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tasks.map(task => {
                                            return(
                                                <tr key={task.id}>  
                                                    <td>{task.title}</td>
                                                    <td>{task.description}</td>
                                                    <td>
                                                        <button onClick={() => this.deleteTask(task._id)} className="btn waves-effect light-blue darken-4">
                                                            <i class="material-icons">delete</i>
                                                        </button>
                                                        <button onClick={() => this.editTask(task._id)} className="btn waves-effect light-blue darken-4" style={{margin: "4px"}}>
                                                            <i className="material-icons">edit</i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default App;