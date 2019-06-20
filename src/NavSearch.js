import React, { Component } from 'react'
import { Menu, Search } from 'semantic-ui-react'
import { connect } from 'react-redux'

class NavSearch extends Component {
  state = {
    isLoading: false,
    value: '',
    results: [],
  }

  handleResultSelect(result) {
    const { type, title, id, userid } = result.result
    if (type === "interpretation") {
      this.props.history.push(`/dream_dictionary/${title.slice(0,1)}/${id}`)
    } else if (type === "dream") {
      this.props.history.push(`/user/${userid}`)
    }
  }

  structureAPIforSearch = (type) => {
    const interpretationResults = this.props.interpretations.filter(interpretation => interpretation.tag_name.toLowerCase().includes(this.state.value.toLowerCase()))
    const dreamResults = this.props.dreams.filter(dream => dream.dream.toLowerCase().includes(this.state.value.toLowerCase()))
    if (type === "dreams") {
      return dreamResults.map(dream => {
        return {
          title: dream.dream.slice(0, 40),
          id: dream.id,
          image: dream.dream_tags[0].img_url,
          type: "dream",
          userid: dream.user.id
        }
      })
    }
    else if (type === "interpretations") {
      return interpretationResults.map(interpretation => {
        return {
          title: interpretation.tag_name,
          id: interpretation.id,
          image: interpretation.img_url,
          type: "interpretation"
        }
      })
    }
  }

  getOptions = () => {
    return {
      dreams: {
        name: "Dreams",
        results: this.structureAPIforSearch("dreams")
      },
      interpretations: {
        name: "Interpretations",
        results: this.structureAPIforSearch("interpretations")
      }
    }
  }

  filterResults = () => {
    const filteredResults = this.getOptions()
    this.setState({
      results: filteredResults
    })
  }

  handleSearchChange = (value) => {
    this.setState({
      value: value.value
    }, this.filterResults)
  }

  render() {
    const { value, results } = this.state
    return (
      <Menu.Item>
      <Search
        category
        placeholder='Search DreamCatchr...'
        onResultSelect={(e, {result }) => this.handleResultSelect({ result })}
        onSearchChange={(e, {value}) => this.handleSearchChange({ value })}
        results={results}
        size="tiny"
        value={value}
      />
      </Menu.Item>
    )
  }
}

function mapStateToProps(state) {
  return {
    dreams: state.dreams,
    interpretations: state.interpretations
  }
}

export default connect(mapStateToProps)(NavSearch)
