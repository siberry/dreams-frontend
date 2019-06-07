import React from 'react'
import { DateInput } from 'semantic-ui-calendar-react';
import { Form, Container, Divider, Button, Dropdown } from 'semantic-ui-react'

class DreamForm extends React.Component {
  state = {
    date: '',
    hours_slept: "",
    quality: "",
    state_of_mind: "",
    dream: "",
    tags: [],
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

  generateDropdownOptions(tags) {
    return tags.map(tag => {return { key: tag.tag_name, text: tag.tag_name, value: tag.id }})
  }

  render() {
    console.log(this.state)
    return(
      <Container text>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>Date</label>
            <DateInput
              name="date"
              closable
              placeholder="Date"
              value={this.state.date}
              iconPosition="left"
              onChange={this.handleChange}
              />
          </Form.Field>
          <Form.Field >
            <label>Hours Slept</label>
            <Form.Input
              name="hours_slept"
              min="0"
              type="number"
              placeholder="Hours Slept"
              value={this.state.hoursSlept}
              onChange={this.handleChange}
              />
          </Form.Field>
          <Form.Field>
            <label>Sleep Quality</label>
            <Form.Input
              name="quality"
              placeholder="Sleep Quality"
              value={this.state.sleepQuality}
              onChange={this.handleChange}
              />
          </Form.Field>
          <Form.Field >
            <label>State of Mind</label>
            <Form.Input
              name="state_of_mind"
              placeholder="What's been on your mind? What's been inspiring you?"
              value={this.state.stateOfMind}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Divider />
          <Form.TextArea
            placeholder="Dream..."
            name="dream"
            value={this.state.dream}
            onChange={this.handleChange}
            rows={8}
            />
            <Dropdown
              compact
              options={this.generateDropdownOptions(this.props.interpretations)}
              placeholder='dream tags'
              name="tags"
              clearable
              upward={false}
              scrolling
              closeOnBlur
              search
              selection
              fluid
              multiple
              closeOnChange
              value={this.state.tags}
              loading={this.props.loading}
              allowAdditions
              onAddItem={this.handleAddition}
              onChange={this.handleChange}
            />
          <Divider />
          <Button type='submit'>Submit</Button>
        </Form>
      </Container>
    )
  }

  handleSubmit = () => {
    const {date, hours_slept, quality, state_of_mind, dream, tags} = this.state
    const user_id = this.props.currentUser.id
    fetch('http://localhost:3000/dreams', {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
        'Accept': "application/json"
      },
      body: JSON.stringify({dream: {date, hours_slept, quality, state_of_mind, dream, user_id}, tags})
    })
  }

  handleChange = (event, {name, value}) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  }

  handleAddition = (e, { value }) => {
    this.setState(prevState => ({
      tagOptions: [{ text: value, value }, ...prevState.tagOptions],
    }))
  }
}

export default DreamForm
