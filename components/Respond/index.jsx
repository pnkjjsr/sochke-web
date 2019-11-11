import React, { Component, Fragment } from 'react';

import Button from 'components/Form/Button'

import './style.scss'

class Respond extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <Fragment>
                <form action="">
                    <div className="form-group">
                        <label for="thoughts">Let burst your thoughts</label>
                        <textarea className="form-control" rows="3" name="thoughts"></textarea>
                    </div>

                    <div className="actions text-right">
                        <Button text="I want" variant="btn-primary" action="" />
                    </div>
                </form>
            </Fragment>
        );
    }
}
export default Respond;