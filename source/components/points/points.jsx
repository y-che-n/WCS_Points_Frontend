import React, { Component } from 'react'
import { Form, Input, Button, Segment, Statistic, Card } from 'semantic-ui-react'

import axios from 'axios'

import styles from './points.scss'

class Points extends Component {

    constructor() {
        super();
        this.state = {
            value: '',
            events: [],
            message: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
    }

    handleSubmit() {
        axios.get('http://points-api.illinoiswcs.org/api/users/' + this.state.value).then( (response) => {
            const events = response.data.data.attended_events;
            const committees = response.data.data.committees;
            const office_hours = response.data.data.office_hours;

            let event_points = 0;
            let committee_points = committees.length * 0.5;
            let office_hour_points = office_hours.length * 0.5;

            // sort events from most to least recent
            events.sort(function(a, b) {
                var dateA = new Date(a.date).getTime();
                var dateB = new Date(b.date).getTime();
                if (dateA > dateB) {
                  return -1;
                }
                if (dateA < dateB) {
                  return 1;
                }

                // names must be equal
                return 0;
            });

            events.forEach( (event) => {
                event_points += event.points
            });

            const total_points = event_points + committee_points + office_hour_points;
            const message = `You have ${total_points} total points. (${event_points} event points, ${committee_points} committee points, and ${office_hour_points} office hour points)`

            this.setState({
                message: message,
                events: events
            });
        });
    }

    handleEnter(tgt) {
      if (tgt.charCode === 13) {
        this.handleSubmit();
      }
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render() {

        const events = this.state.events.map( (event) => {

            
            if (event.category === "Corporate") {
                return(
                    <Segment className="Events__corp" padded>
  
                        <div className="Events__flex">
                            <div className="Events__flexItem">
  
                                <h3>{event.name}</h3>
  
                                <h5 className="muted">{ new Date(event.date).toLocaleDateString("en-US", {year: "numeric", month: "short", day: "numeric"}) }</h5>
                            </div>
                            <div className="Events__flexItem">
                                <Statistic className="Events_statistic" size='tiny'>
                                  <Statistic.Value>{event.attendees.length}</Statistic.Value>
                                  <Statistic.Label>Attended</Statistic.Label>
                                </Statistic>
                            </div>
                        </div>
                    </Segment>
                )
              } else if (event.category === "General Meeting") {
                return(
                    <Segment className="Events__gm" padded>
  
                        <div className="Events__flex">
                            <div className="Events__flexItem">
  
                                <h3>{event.name}</h3>
  
                                <h5 className="muted">{ new Date(event.date).toLocaleDateString("en-US", {year: "numeric", month: "short", day: "numeric"}) }</h5>
                            </div>
                            <div className="Events__flexItem">
                                <Statistic className="Events_statistic" size='tiny'>
                                  <Statistic.Value>{event.attendees.length}</Statistic.Value>
                                  <Statistic.Label>Attended</Statistic.Label>
                                </Statistic>
                            </div>
                        </div>
                    </Segment>
                )
              } else if (event.category === "Tech Team") {
                return(
                    <Segment className="Events__techTeam" padded>
  
                        <div className="Events__flex">
                            <div className="Events__flexItem">
  
                                <h3>{event.name}</h3>
  
                                <h5 className="muted">{ new Date(event.date).toLocaleDateString("en-US", {year: "numeric", month: "short", day: "numeric"}) }</h5>
                            </div>
                            <div className="Events__flexItem">
                                <Statistic className="Events_statistic" size='tiny'>
                                  <Statistic.Value>{event.attendees.length}</Statistic.Value>
                                  <Statistic.Label>Attended</Statistic.Label>
                                </Statistic>
                            </div>
                        </div>
                    </Segment>
                )
              } else if (event.category === "Social") {
                return(
                    <Segment className="Events__social" padded>
  
                        <div className="Events__flex">
                            <div className="Events__flexItem">
  
                                <h3>{event.name}</h3>
  
                                <h5 className="muted">{ new Date(event.date).toLocaleDateString("en-US", {year: "numeric", month: "short", day: "numeric"}) }</h5>
                            </div>
                            <div className="Events__flexItem">
                                <Statistic className="Events_statistic" size='tiny'>
                                  <Statistic.Value>{event.attendees.length}</Statistic.Value>
                                  <Statistic.Label>Attended</Statistic.Label>
                                </Statistic>
                            </div>
                        </div>
                    </Segment>
                )
              } else if (event.category === "Mentoring") {
                return(
                    <Segment className="Events__mentoring" padded>
  
                        <div className="Events__flex">
                            <div className="Events__flexItem">
  
                                <h3>{event.name}</h3>
  
                                <h5 className="muted">{ new Date(event.date).toLocaleDateString("en-US", {year: "numeric", month: "short", day: "numeric"}) }</h5>
                            </div>
                            <div className="Events__flexItem">
                                <Statistic className="Events_statistic" size='tiny'>
                                  <Statistic.Value>{event.attendees.length}</Statistic.Value>
                                  <Statistic.Label>Attended</Statistic.Label>
                                </Statistic>
                            </div>
                        </div>
                    </Segment>
                )
              } else if (event.category === "Outreach") {
                return(
                    <Segment className="Events__outreach" padded>
  
                        <div className="Events__flex">
                            <div className="Events__flexItem">
  
                                <h3>{event.name}</h3>
  
                                <h5 className="muted">{ new Date(event.date).toLocaleDateString("en-US", {year: "numeric", month: "short", day: "numeric"}) }</h5>
                            </div>
                            <div className="Events__flexItem">
                                <Statistic className="Events_statistic" size='tiny'>
                                  <Statistic.Value>{event.attendees.length}</Statistic.Value>
                                  <Statistic.Label>Attended</Statistic.Label>
                                </Statistic>
                            </div>
                        </div>
                    </Segment>
                )
              } else {
  
              return(
                  <Segment className="Events__event" padded>
  
                      <div className="Events__flex">
                          <div className="Events__flexItem">
  
                              <h3>{event.name}</h3>
  
                              <h5 className="muted">{ new Date(event.date).toLocaleDateString("en-US", {year: "numeric", month: "short", day: "numeric"}) }</h5>
                          </div>
                          <div className="Events__flexItem">
                              <Statistic className="Events_statistic" size='tiny'>
                                <Statistic.Value>{event.attendees.length}</Statistic.Value>
                                <Statistic.Label>Attended</Statistic.Label>
                              </Statistic>
                          </div>
                      </div>
                  </Segment>
              )
            }
          })

        return(
            <div>
                <h1>Points</h1>
                <Card fluid className="Points">
                  <Card.Content>


                    <br />

                    <Input fluid icon='search' placeholder='Enter your NetID ...' value={this.state.value} onChange={this.handleChange} onKeyPress={this.handleEnter}/>
                    <br />
                    <Button onClick={this.handleSubmit} fluid>Check Points</Button>
                    <br/>
                    <div className = "points-message">
                        <h3>{ this.state.message }</h3>
                    </div>

                    { events }
                  </Card.Content>
                </Card>
            </div>
        )
    }
}

export default Points
