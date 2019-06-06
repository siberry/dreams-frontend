import React from 'react'
import { DateInput } from 'semantic-ui-calendar-react';
import { Form } from 'semantic-ui-react'

class DreamForm extends React.Component {
  state = {
    date: ''
  }

  componentDidMount() {
    const d = new Date();
    let yesterday = d.getDate() - 1
    if (yesterday < 10) {
      yesterday = "0"+yesterday
    }
    let month = d.getMonth() + 1
    if (month < 10) {
      month = "0"+month
    }
    let defaultDate = yesterday + "-" + month + "-" + d.getFullYear()
    console.log(defaultDate)
    this.setState({
      date: defaultDate
    })
  }

  render() {
    return(
      <Form>
       <DateInput
         name="date"
         placeholder="Date"
         value={this.state.date}
         iconPosition="left"
         onChange={this.handleChange}
       />
      </Form>
    )
  }

  handleChange = (event, {name, value}) => {
    console.log(value)
   if (this.state.hasOwnProperty(name)) {
     this.setState({ [name]: value });
   }
 }
}

export default DreamForm
