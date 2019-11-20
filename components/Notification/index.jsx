import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import actions from "./actions";

import "./style.scss";

class Notification extends Component {
    constructor(props) {
        super(props)
    }



    handleClose = () => {
        const { hideNotification } = this.props
        hideNotification();
    }

    render() {
        const { open, message, type } = this.props.notification;

        return (
            <Fragment>
                <div className="notification">
                    <div className={`alert alert-${type} alert-dismissible fade ${open}`} role="alert">
                        {message} &nbsp;

                    <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.handleClose}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>

            </Fragment >
        );
    }

}

export default connect(state => state, actions)(Notification);