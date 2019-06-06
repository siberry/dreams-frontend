import React from 'react'
import { DateInput } from 'semantic-ui-calendar-react';
import { Form, Container, Divider, Button, Dropdown } from 'semantic-ui-react'

class DreamForm extends React.Component {
  state = {
    date: '',
    hoursSlept: "",
    sleepQuality: "",
    stateOfMind: "",
    dream: "",
    tagOptions: [],
    tags: []
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
    this.setState({
      date: defaultDate
    })
  }

  render() {
    return(
      <Container text>
        <Form >
          <Form.Field>
            <label>Date</label>
            <DateInput
              name="date"
              placeholder="Date"
              value={this.state.date}
              iconPosition="left"
              onChange={this.handleChange}
              />
          </Form.Field>
          <Form.Field >
            <label>Hours Slept</label>
            <Form.Input
              type="number"
              placeholder="Hours Slept"
              value={this.state.hoursSlept}
              onChange={this.handleChange}
              />
          </Form.Field>
          <Form.Field>
            <label>Sleep Quality</label>
            <Form.Input
              placeholder="Sleep Quality"
              value={this.state.sleepQuality}
              onChange={this.handleChange}
              />
          </Form.Field>
          <Form.Field >
            <label>State of Mind</label>
            <Form.Input
              placeholder="What's been on your mind? What's been inspiring you?"
              value={this.state.stateOfMind}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Divider />
          <Form.TextArea
            placeholder="Dream..."
            value={this.state.dream}
            onChange={this.handleChange}
            rows={8}
            />
            <Dropdown
              options={this.state.tagOptions}
              placeholder='dream tags'
              search
              selection
              fluid
              multiple
              allowAdditions
              value={this.state.tags}
              onAddItem={this.handleAddition}
              onChange={this.handleChange}
            />
          <Divider />
          <Button type='submit'>Submit</Button>
        </Form>
      </Container>
    )
  }

  handleChange = (event, {name, value}) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  }

  handleAddition = (e, { value }) => {
    this.setState(prevState => ({
      options: [{ text: value, value }, ...prevState.options],
    }))
  }

  handleChange = (e, { value }) => this.setState({ currentValues: value })
}

export default DreamForm
