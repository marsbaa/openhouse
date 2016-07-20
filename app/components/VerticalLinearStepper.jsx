import React from 'react';
import _ from 'lodash';
import VenueDateTime from 'VenueDateTime';

import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

const styles = {
  block: {
    maxWidth: 300,
  },
  radioButton: {
    marginBottom: 10,
    lineHeight: 9,
  },
};

class VerticalLinearStepper extends React.Component {

  state = {
    finished: false,
    stepIndex: 0,
    dateTimes: VenueDateTime.getDateTime('Bishan'),
    selectedVenue: '',
    dateTime: ''
  };

  handleNext = () => {
    const {stepIndex,selectedVenue, dateTime} = this.state;
    if (stepIndex === 0) {
      if (selectedVenue === '') {

      }
      else if (selectedVenue != '') {
        this.setState({
          stepIndex: stepIndex + 1,
          finished: stepIndex >= 2,
        });
      }
    }
    else if (stepIndex === 1) {
      if (dateTime != '') {
        this.setState({
          stepIndex: stepIndex + 1,
          finished: stepIndex >= 2,
        });
      }
    }
    else {
      this.setState({
        stepIndex: stepIndex + 1,
        finished: stepIndex >= 2,
      });
    }

  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  handleDateTime = (dateTimes) => {
    this.setState({
      dateTimes
    });
  };

  handleSelectedDateTime = (dateTime) => {
    this.setState({
      dateTime
    })
  }

  handleVenue = (venue) => {
    this.setState({
      selectedVenue: venue
    });
  };

  renderDateTime = (e) => {
    var venue = e.target.value;
    var dateTimes = VenueDateTime.getDateTime(venue);
    this.handleVenue(venue);
    this.handleDateTime(dateTimes);
  };

  getDateTime = () => {
    const {dateTimes} = this.state;
    var dateTimeOptions = _.map(dateTimes, (dateTime) => {
      console.log(dateTime);
      var count = 0;
      return <RadioButton value={dateTime} key={dateTime} label={dateTime} style={styles.radioButton} />
  });
    console.log(dateTimeOptions);
    return dateTimeOptions;
  };

  handleDateTimeSelection = (e) => {
    var dateTime = e.target.value;
    this.handleSelectedDateTime(dateTime);
  };

  renderStepActions(step) {
    const {stepIndex, selectedVenue, dateTime} = this.state;
    var step0Message = '';
    if (stepIndex === 0 && selectedVenue === '') {
      step0Message = <h6 style={{color: 'red'}}>Please select a venue</h6>
    }
    if (stepIndex === 1 && dateTime === '') {
      step0Message = <h6 style={{color: 'red'}}>Please select a Date & Time</h6>
    }
    return (
      <div>{step0Message}
      <div style={{margin: '12px 0'}}>
        <RaisedButton
          label={stepIndex === 2 ? 'Finish' : 'Next'}
          disableTouchRipple={true}
          disableFocusRipple={true}
          primary={true}
          onTouchTap={this.handleNext}
          style={{marginRight: 12, backgroundColor: '#f3911e'}}
        />
        {step > 0 && (
          <FlatButton
            label="Back"
            disabled={stepIndex === 0}
            disableTouchRipple={true}
            disableFocusRipple={true}
            onTouchTap={this.handlePrev}
          />
        )}
      </div>
      </div>
    );
  }

  render() {
    var {finished, stepIndex, dateTimes, selectedVenue, dateTime} = this.state;



    return (
      <div style={{maxWidth: 380, maxHeight: 400, margin: 'auto'}}>
        <Stepper activeStep={stepIndex} orientation="vertical">
          <Step>
            <StepLabel style={{fontSize: '20px'}}>Select Venue</StepLabel>
            <StepContent>
              <RadioButtonGroup onChange={this.renderDateTime.bind(this)} name="Venue">
                <RadioButton
                  value="Bishan"
                  label={<div><div>Bishan </div><div style={{fontSize:'10px'}}>Kuo Chuan Presbyterian Secondary School<br/>10 Bishan Street 13 Singapore 579795</div></div>}
                  style={styles.radioButton}
                  labelStyle={{lineHeight: '14px'}}
                />
                <RadioButton
                  value="Buangkok"
                  label={<div><div>Buangkok</div><div style={{fontSize:'10px'}}>The ARK Buangkok<br/>983 Buangkok Cresent Singapore 530983</div></div>}
                  style={styles.radioButton}
                  labelStyle={{lineHeight: '14px'}}
                />
                <RadioButton
                  value="Jurong"
                  label={<div><div>Jurong</div><div style={{fontSize:'10px'}}>Jurong Futsal Centre<br/>4 Fourth Chin Bee Rd Singapore 619698</div></div>}
                  style={styles.radioButton}
                  labelStyle={{lineHeight: '14px'}}
                />
                <RadioButton
                  value="Kovan"
                  label={<div><div>Kovan</div><div style={{fontSize:'10px'}}>Kovan Sports Centre<br/>60 Hougang Street 21 Singapore 548738</div></div>}
                  style={styles.radioButton}
                  labelStyle={{lineHeight: '14px'}}
                />
                <RadioButton
                  value="Punggol"
                  label={<div><div>Punggol</div><div style={{fontSize:'10px'}}>Punggol Sports Hub<br/>6 Tebing Lane Singapore 828835</div></div>}
                  style={styles.radioButton}
                  labelStyle={{lineHeight: '14px'}}
                />
                <RadioButton
                  value="Tampines"
                  label={<div><div>Tampines</div><div style={{fontSize:'10px'}}>SAFRA Tampines<br/>1/A Tampines Street 92 Singapore 528882</div></div>}
                  style={styles.radioButton}
                  labelStyle={{lineHeight: '14px'}}
                />
                <RadioButton
                  value="Thomson"
                  label={<div><div>Thomson</div><div style={{fontSize:'10px'}}>The ARK Thomson<br/>596 Upper Thomson Road Singapore 574427</div></div>}
                  style={styles.radioButton}
                  labelStyle={{lineHeight: '14px'}}
                />
                <RadioButton
                  value="Woodlands"
                  label={<div><div>Woodlands</div><div style={{fontSize:'10px'}}>Woodlands Recreation Centre<br/>200 Industrial Park E7  Singapore 757177</div></div>}
                  style={styles.radioButton}
                  labelStyle={{lineHeight: '14px'}}
                />
                <RadioButton
                  value="Yishun"
                  label={<div><div>Yishun</div><div style={{fontSize:'10px'}}>ORTO Park<br/>81 Lor Chencharu Singapore 769198</div></div>}
                  style={styles.radioButton}
                  labelStyle={{lineHeight: '14px'}}
                />
              </RadioButtonGroup>
              {this.renderStepActions(0)}
            </StepContent>
          </Step>
          <Step>
            <StepLabel style={{fontSize: '20px'}}>Select Date & Time</StepLabel>
            <StepContent>
              <h5>Selected Venue: {selectedVenue}</h5>
              <RadioButtonGroup onChange={this.handleDateTimeSelection.bind(this)} name="DateTime">
                {this.getDateTime()}
              </RadioButtonGroup>
              {this.renderStepActions(1)}
            </StepContent>
          </Step>
          <Step>
            <StepLabel style={{fontSize: '20px'}}>Enter Child's Details</StepLabel>
            <StepContent>
              <h5>Selected Venue: {selectedVenue}</h5>
              <h5>Selected Date & Time: {dateTime}</h5>
              <SelectField value={this.state.value}     onChange={this.handleChange} floatingLabelText="No. of Children Attending">
                <MenuItem value={1} primaryText="1" />
                <MenuItem value={2} primaryText="2" />
                <MenuItem value={3} primaryText="3" />
                <MenuItem value={4} primaryText="4" />
              </SelectField>
              <TextField
                floatingLabelText="Child's Name"
              />
              <TextField
                floatingLabelText="Date of Birth"
              />
              <TextField
                floatingLabelText="Email"
              />
              <TextField
                floatingLabelText="Mobile Number"
              />
              {this.renderStepActions(2)}
            </StepContent>
          </Step>
        </Stepper>
        {finished && (
          <p style={{margin: '20px 0', textAlign: 'center'}}>
            <a
              href="#"
              onClick={(event) => {
                event.preventDefault();
                this.setState({stepIndex: 0, finished: false});
              }}
            >
              Click here
            </a> to reset the example.
          </p>
        )}
      </div>
    );
  }
}

export default VerticalLinearStepper;
