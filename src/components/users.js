import React, { Component } from 'react';
import axios from 'axios';
import { ListGroup, Modal, Button } from 'react-bootstrap';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import * as Moment from "moment";



/** @type {*Api for showing  the user Details} */
const userDetail = `https://run.mocky.io/v3/788d7eab-0bcc-40c2-9d7c-d47dadea94bc`;


/** @type {*styling for Div element} */
const parentContainerStyles = {
    marginTop: '2%',
    position: 'absolute',
    width: '100%',
    display: 'table'
};


class Users extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userList: [],
            id: '',
            show: false,
            timeDuration: [],
            startDate: new Date()


        }
    }


    /**
     *Api call for showing list of the name
     *
     * @memberof Users
     */
    componentDidMount() {
        axios.get(userDetail)
            .then(res => {
                this.setState({ userList: res.data.members })
            })

    }


    /**
     *function for close the modal 
     *
     * @memberof Users
     */
    handelClose() {
        this.setState({ show: false })
    }


    /**
     *function for open modal on click of the list item call 
     *
     * @param {*} time passing timing of activity onClick of listItem
     * @param {*} id passing id of each user onClick of listItem
     * @memberof Users
     */
    handelOPen(time, id) {
        this.setState({
            show: true,
        })

        this.setState({
            timeDuration: time,
            id: id
        })
        console.log('time', time[0].start_time)
    }


    handleChange = date => {
        this.setState({
            startDate: date
        });

    };
   



    render() {

        return (
            <div style={parentContainerStyles}>
                <h2 style={{ color: "#ff6666" }}>Assignment for FullThrottle Labs</h2>
                <ListGroup as="ul" style={{ marginTop: "1%" }}>
                    {this.state.userList.map((detail, id) =>
                        <ListGroup.Item key={detail.id} variant="success"

                            onClick={(time, id) => { this.handelOPen(detail.activity_periods, detail.id) }}
                        >
                            {detail.real_name}
                        </ListGroup.Item>)}


                </ListGroup>

                {this.state.show && (
                    <div>

                        <Modal className="container"
                            show={this.state.show}
                            onHide={() => this.handelClose()}
                            dialogClassName="modal-90w"
                            aria-labelledby="example-custom-modal-styling-title"
                        >
                            <Modal.Header closeButton>
                                <Modal.Title id="example-custom-modal-styling-title" style={{ color: "#ff6666" }}>
                                    Time Ranges Active On A Day of {this.state.id}
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <DatePicker
                                    selected={this.state.startDate}
                                    onChange={this.handleChange}
                                   

                                />

                            </Modal.Body>
                            {this.state.timeDuration.map((data, id) => {
                                return (

                                    <Modal.Body key={id}>

                                        <h6 style={{ color: "#00b300" }}> Start Time: {data.start_time}</h6>
                                        <h6 style={{ color: "#00b300" }}>End Time: {data.end_time}</h6>
                                    </Modal.Body>)
                            })}

                        </Modal>

                    </div>
                )}

            </div>
        );
    }
}



export default Users;