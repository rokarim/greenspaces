import React from 'react';
import TextField from '../components/TextField';
import TextArea from '../components/TextArea';
import Select from '../components/Select';

class FormContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      title: '',
      ratingOptions: [1, 2, 3, 4, 5],
      rating: '',
      body: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleChange(event){
    this.setState({[event.target.name]: event.target.value})
  }

  handleFormSubmit(event){
    event.preventDefault();
    let formPayload ={
      title: this.state.title,
      rating: this.state.rating,
      body: this.state.body
    }
    this.props.addReview(formPayload)
    // this.setState({title: '',
    //               rating: '',
    //               body: ''})
    }

  render() {
    return(
      <div className='form'>
      <h3>New Review</h3>
      <form onSubmit={this.handleFormSubmit}>
        <TextField
          className="input-label"
          content={this.state.title}
          label='Title'
          name='title'
          handlerFunction={this.handleChange}
        />
        <Select
          handlerFunction={this.handleChange}
          name='rating'
          label='Rating'
          options={this.state.ratingOptions}
          selectedOption={this.state.rating}
        />
        <TextArea
          className="input-label"
          content={this.state.body}
          label='Body'
          name='body'
          handlerFunction={this.handleChange}
        />
        <div className="button-container" >
          <input className="button" type="submit" value="Submit" />
        </div>
      </form>
      </div>
    )
  }
}

export default FormContainer;
