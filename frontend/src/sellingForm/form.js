import React, {Component} from 'react';
import './form.css';

class Form extends Component {
    constructor(props){
        super(props);
        this.state = {
            Category: '',
            Model: '',
            Brand: '',
            Discription: '',
            Image: '',
            SellerDetails: ''
        }
    }

    handleCategoryChange = (e) => {
        this.setState({
            Category: e.target.value
        })
    }

    handleBrandChange = (e) => {
        this.setState({
            Brand: e.target.value
        })
    }

    handleModelChange = (e) => {
        this.setState({
            Model: e.target.value
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

    handleSubmit = (e) => {
        alert(`${this.state.Category}
               ${this.state.Brand}
               ${this.state.Model}
               ${this.state.Discription}
               ${this.state.SellerDetails} 
        `)
        e.preventDefault()
    }
    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <h2><b>SELLING FORM</b></h2>
                <div>
                    <label>Category</label>
                    <input 
                        type='text'
                        value={this.state.Category}
                        onChange={this.handleCategoryChange} 
                    />
                </div>
                <div>
                    <label>Brand</label>
                    <input 
                        type='text'
                        value={this.state.Brand}
                        onChange={this.handleBrandChange} 
                    />
                </div>
                <div>
                    <label>Model</label>
                    <input 
                        type='text'
                        value={this.state.Model}
                        onChange={this.handleModelChange} 
                    />
                </div>
                <div>
                    <label>Discription</label>
                    <textarea 
                        value={this.state.Discription}
                        onChange={this.handleDiscriptionChange}
                    />
                </div>
                <div>
                    <label>Seller</label>
                    <textarea 
                        value={this.state.SellerDetails}
                        onChange={this.handleSellerDetailsChange}
                    />
                </div>
                <button type='submit' id="Btn">Submit</button>
            </form>

        )
    }
}

export default Form;