import React, { Component } from 'react';
import "./App.css"

class Home extends Component {
    url = 'http://localhost:8001/courses/'
    state = {
        show: false,
        data: [],
        rating: 1,
    }

    componentDidMount = () => {
        // Write your code here
        this.handleGetData();
    }


    handleGetData = () => {
        fetch(this.url + "get")
            .then((res) => res.json())
            .then((json) => {
                this.setState({ data: json })
            })
    }

    handleApply = async (id) => {
        const requestOption = {
            method : 'post',
            headers : {'Content-Type' : 'application/json'}
        };
        fetch(this.url + 'enroll/' + id, requestOption)
        .then(() => {
            this.handleGetData()
        })
    };

    handleRating = (e) => {
        this.setState({rating: e.target.value})
    }

    handleAddRating = async (id) => {
        const requestOption = {
            method : 'PATCH',
            headers : {'Content-Type' : 'application/json'},
            body: JSON.stringify({rating: this.state.rating})
        };
        fetch(this.url + 'rating/' + id, requestOption)
        .then(() => {
            this.handleGetData()
        }) 
    }

    handleDrop = async (id) => {
        const requestOption = {
            method : 'DELETE',
            headers : {'Content-Type' : 'application/json'}
        };
        fetch(this.url + 'drop/' + id, requestOption)
        .then(() => {
            this.handleGetData()
        })
    }

    render() {
        return (
            <div className="home">
                <header>
                    <h2>ABC Learning</h2>
                </header>
                {/* write your code here */}
                <div className="cardContainer">
                    {this.state.data.map(courses => {
                        return (
                            <div className="card">
                                <ul>
                                    <div className="header">
                                        <li>{courses.courseName}</li>
                                        <li>{courses.courseDept}</li>
                                        <li>{courses.description}</li>

                                        {courses.isApplied &&
                                            <li>
                                                {!courses.isRated &&
                                                    <li>Rate:
                                                        <select className="rating" name="rating" onChange={this.handleRating}>
                                                            <option>1</option>
                                                            <option>2</option>
                                                            <option>3</option>
                                                            <option>4</option>
                                                            <option>5</option>
                                                        </select>
                                                        <button className="rate" onClick={() => this.handleAddRating(courses._id)}>Add</button>
                                                    </li>
                                                }
                                                {courses.isApplied &&
                                                    <button className="drop" onClick={() => this.handleDrop(courses._id)}>Drop Course</button>
                                                }
                                            </li>
                                        }
                                        {!courses.isApplied &&
                                            <li><button className="btn" onClick={() => this.handleApply(courses._id)}>Apply</button></li>
                                        }
                                    </div>
                                    <div className='footer'>
                                        <li>{courses.duration} hrs . {courses.noOfRatings} Ratings . {courses.rating}/5</li>
                                    </div>
                                </ul>
                            </div>
                        )
                    })}
                    <div className="card">
                        <ul>
                            <div className="header">
                                <li></li>
                                <li></li>
                                <li></li>
                                <li>
                                    <li>Rate:
                                        <select className="rating" name="rating">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </select>
                                        <button className="rate">Add</button>
                                    </li>
                                    <button className="drop">Drop Course</button>
                                </li>
                                <li><button className="btn">Apply</button></li>
                            </div>
                            <div className='footer'>
                                <li></li>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        )

    }
}