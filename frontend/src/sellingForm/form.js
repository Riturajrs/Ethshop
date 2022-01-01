import React, {Component} from 'react';
import './form.css';
import { Form, Button, Label, Input, TextArea } from 'semantic-ui-react';

class form extends Component {
    constructor(props){
        super(props);
        this.state = {
            Product: '',
            Price: '',
            Discription: '',
            Image: '',
            SellerDetails: ''
        }
    }

    handleProductChange = (e) => {
        this.setState({
            Product: e.target.value
        })
    }

    handlePriceChange = (e) => {
        this.setState({
            Price: e.target.value
        })
    }

    handleDiscriptionChange = (e) => {
        this.setState({
            Discription: e.target.value
        })
    }    

    handleSellerDetailsChange = (e) => {
        this.setState({
            SellerDetails: e.target.value
        })
    }

    handleImageChange = (e) => {
        this.setState({
            Image: e.target.value
        })
    }

    handleSubmit = (e) => {
        alert(`${this.state.Product}
               ${this.state.Price}
               ${this.state.Discription}
               ${this.state.SellerDetails} 
        `)
        e.preventDefault()
    }
    render(){
        return (
            <div>
                <link
                    async
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
                />
               
                <Form onSubmit={this.handleSubmit}>
                    <div className='header'>List Your Product Here</div>
                    <Form.Group widths="equal">
                        <Form.Field>
                            <Label>Product</Label>
                            <Input
                                type='text'
                                value={this.state.Product}
                                onChange={this.handleProductChange}
                            />
                        </Form.Field>
                        <Form.Field className='price-box'>
                            <Label>Price</Label>
                            <Input
                                type='text'
                                value={this.state.Price}
                                onChange={this.handlePriceChange}
                                label='ETH'
                                labelPosition='right'
                            />
                        </Form.Field>
                    </Form.Group>
                    <Form.Field>
                        <Label>Product Details</Label>
                        <TextArea
                            value={this.state.Discription}
                            onChange={this.handleDiscriptionChange} 
                        />
                    </Form.Field>
                    <Form.Field className='img-box'>
                        <Label>Images</Label>
                        <Input
                            type='file'
                            value={this.state.Image}
                            onChange={this.handleImageChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Label>Seller Details</Label>
                        <TextArea
                            value={this.state.SellerDetails}
                            onChange={this.handleSellerDetailsChange}
                        />
                    </Form.Field>
                    <Button type='submit'>Submit</Button>
                </Form>
            </div>
        )
    }
}

export default form;