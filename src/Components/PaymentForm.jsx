import React from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css'
import { Form, Row, Col, Button} from 'react-bootstrap';

export default class PaymentForm extends React.Component {
    state = {
        cvc: '',
        expiry: '',
        focus: '',
        name: '',
        number: '',
    };

    handleInputFocus = (e) => {
        this.setState({ focus: e.target.name });
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;

        this.setState({ [name]: value });
    }

    createDate = (expiry) => {
        var mm = expiry.substring(0, 2)
        var yy = expiry.substring(3)
        var year = ('20' + yy);
        var month = (parseInt(mm) - 1).toString();
        return new Date(year, month);
    }

    submitForm = () => {
        this.props.callback({
            cvc: this.state.cvc,
            expiry: this.createDate(this.state.expiry),
            name: this.state.name,
            number: this.state.number
        })
    }

    render() {
        return (
            <div id="PaymentForm">
                <Cards className="mb"
                    cvc={this.state.cvc}
                    expiry={this.state.expiry}
                    focused={this.state.focus}
                    name={this.state.name}
                    number={this.state.number}
                />
                <Form className="mt" ref={c => (this.form = c)} onSubmit={this.handleSubmit}>
                    <Form.Group >
                        <Form.Control
                            type="tel"
                            name="number"
                            className="form-control"
                            placeholder="Card Number"
                            pattern="[\d| ]{16,22}"
                            required
                            onChange={this.handleInputChange}
                            onFocus={this.handleInputFocus}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="Name"
                            required
                            onChange={this.handleInputChange}
                            onFocus={this.handleInputFocus}
                        />
                    </Form.Group>
                    <Row>
                        <Col md={6}>
                            <Form.Control
                                type="tel"
                                name="expiry"
                                className="form-control"
                                placeholder="Valid Thru"
                                pattern="\d\d/\d\d"
                                required
                                onChange={this.handleInputChange}
                                onFocus={this.handleInputFocus}
                            />
                        </Col>
                        <Col md={6}>
                            <Form.Control
                                type="tel"
                                name="cvc"
                                className="form-control"
                                placeholder="CVC"
                                pattern="\d{3,4}"
                                required
                                onChange={this.handleInputChange}
                                onFocus={this.handleInputFocus}
                            />
                        </Col>
                    </Row>
                    <div className="mt">
                        <Button className="mb" onClick={this.submitForm} variant="primary">Submit Order</Button>
                    </div>
                </Form>
            </div>
        );
    }
}