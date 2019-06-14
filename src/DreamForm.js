import React from 'react'
import { DateInput } from 'semantic-ui-calendar-react';
import { Form, Container, Divider, Button, Dropdown, Loader, Dimmer, Checkbox, Segment } from 'semantic-ui-react'
import { Redirect, } from 'react-router-dom';
import { connect } from 'react-redux'

class DreamForm extends React.Component {
  state = {
    date: '',
    hours_slept: "",
    quality: "",
    state_of_mind: "",
    dream: "",
    tags: [],
    id: undefined,
    privatePost: true,
    tagOptions: []
  }

  generateDropdownOptions() {
    this.setState({
      tagOptions: this.props.interpretations.map(tag => {return { key: tag.tag_name, text: tag.tag_name, value: tag.id }})
    })
  }

  componentDidMount() {
    if(this.props.interpretations.length !== this.state.tagOptions.length){
      this.generateDropdownOptions()
    };

    if (this.props.match.params.selectedTagId) {
      this.setState({
        tags: [parseInt(this.props.match.params.selectedTagId)]
      })
    };

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

    if (this.props.match.params.selectedTagId) {
      this.setState({
        tags: [parseInt(this.props.match.params.selectedTagId)]
      })
    }
    this.setState({
      date: defaultDate
    })
    if (this.props.match.params.id) {
      fetch(`http://localhost:3000/dreams/${this.props.match.params.id}`)
      .then(res => res.json())
      .then(dream => {
        console.log(dream)
        this.setState({
          id: dream.id,
          date: dream.date,
          dream: dream.dream,
          tags: dream.dream_tags.map(tag=>tag.id),
          hours_slept: dream.hours_slept,
          quality: dream.quality,
          state_of_mind: dream.state_of_mind,
          privatePost: dream.private || false,
      }, () => this.props.changeLoadingStatus(false))
    })} else {
      this.props.changeLoadingStatus(false)
    }
  }

  render() {
    return (
      <React.Fragment>
        {!this.props.loading && this.props.currentUser ?
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
                  value={this.state.hours_slept}
                  onChange={this.handleChange}
                  />
              </Form.Field>
              <Form.Field>
                <label>Sleep Quality</label>
                <Form.Input
                  name="quality"
                  placeholder="Sleep Quality"
                  value={this.state.quality}
                  onChange={this.handleChange}
                  />
              </Form.Field>
              <Form.Field >
                <label>State of Mind</label>
                <Form.Input
                  name="state_of_mind"
                  placeholder="What's been on your mind? What's been inspiring you?"
                  value={this.state.state_of_mind}
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
                options={this.state.tagOptions}
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
                onAddItem={this.handleAddition}
                onChange={this.handleChange}
                />
              <Segment compact className="slider">
                <label
                  className="toggle-global"
                  style={this.state.privatePost ? {color: "rgb(0,0,0,.4)"} : null }
                  onClick={() => this.setState(prevState => {return {privatePost: !prevState.privatePost}})}
                  >
                  Public
                </label>
                <Checkbox
                  label="Private"
                  onChange={() => this.setState(prevState => {return {privatePost: !prevState.privatePost}})}
                  slider
                  checked={this.state.privatePost}
                  />
              </Segment>
              <Divider />
              <Button type='submit'>Submit</Button>
            </Form>
          </Container>
          :
          <Container>
            <Dimmer active inverted>
              <Loader inline="centered" size='large' inverted>
                Loading
              </Loader>
            </Dimmer>
          </Container>
        }
        {!this.props.loading && !this.props.currentUser ?
          <Redirect to='/login'/> : null
        }
      </React.Fragment>
    )
  }

  handleSubmit = () => {
    const {date, hours_slept, quality, state_of_mind, dream, tags, privatePost} = this.state
    const user_id = this.props.currentUser.id
    const method = this.state.id ? "PATCH" : "POST"
    const url = this.state.id ? `http://localhost:3000/dreams/${this.state.id}` : "http://localhost:3000/dreams/"
    fetch(url, {
      method: method,
      headers: {
        'Content-Type': "application/json",
        'Accept': "application/json"
      },
      body: JSON.stringify({dream: {date, hours_slept, quality, state_of_mind, dream, user_id}, privatePost, tags})
    })
    .then(() => this.props.changeLoadingStatus(true))
    .then(() => this.props.history.push(`/user/${user_id}`))
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

function mapStateToProps(state) {
  return {
    interpretations: state.interpretations,
    currentUser: state.currentUser,
    loading: state.loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeLoadingStatus: (status) => {
      return dispatch({type: "CHANGE_LOAD_STATUS", payload: status})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DreamForm)
