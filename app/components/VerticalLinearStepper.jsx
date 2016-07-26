import React from 'react';
import _ from 'lodash';
import VenueDateTime from 'VenueDateTime';
import firebaseRef from 'app/firebase';
import isEmail from 'validator/lib/isEmail';
import isNumeric from 'validator/lib/isNumeric';
import isLength from 'validator/lib/isLength';
import isDate from 'validator/lib/isDate';

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
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
    fontSize: 12
  },
  paperStyle: {
  width: 270,
  margin: 5,
  textAlign: 'left',
  display: 'inline-block',
  padding: 10
  }
};

class VerticalLinearStepper extends React.Component {

  state = {
    finished: false,
    stepIndex: 0,
    dateTimes: VenueDateTime.getDateTime('Bishan'),
    selectedVenue: '',
    dateTime: '',
    value: null,
    email: '',
    mobile: '',
    emailError: '',
    mobileError: '',
    dateError: ''
  };

  handleChange = (event, index, value) => this.setState({value});

  handleNext = () => {
    const {stepIndex,selectedVenue, dateTime, email, mobile} = this.state;
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
    else if (stepIndex === 2){
      if (email != '' && mobile != '') {
        this.setState({
          stepIndex: stepIndex + 1,
          finished: stepIndex >= 2,
        });
      }
    }
  };

  handleSubmission = () => {
    const {selectedVenue, dateTime, email, mobile, value} = this.state;

    var ohRef = firebaseRef.child('openhouse');
    var newRef = ohRef.push({
      selectedVenue,
      dateTime,
      email,
      mobile,
      children: {}
    });

    _.times(value, i => {
      var childName = document.getElementById(("Name"+(i+1))).value;
      var dateOfBirth = document.getElementById(("DOB"+(i+1))).value;
      console.log(dateOfBirth);
      var radios = document.getElementsByName(("Gender"+(i+1)));
      var gender = '';
      for (var i = 0, length = radios.length; i < length; i++) {
          if (radios[i].checked) {
             gender = radios[i].value;
              break;
          }
      }
      console.log(gender);
      var childRef = newRef.child('children');
      childRef.push({
        childName,
        dateOfBirth,
        gender
      });
    });

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

  handleDate = (e) => {
    var dateOfBirth = e.target.value;
    console.log(dateOfBirth);
    if (isDate(dateOfBirth)) {
      this.setState({
        dateError: ''
      });
      console.log('suceess');
    }
    else {
      this.setState({
        dateError: 'Enter a valid Date format'
      })
    }
  }


  generateCard = (count) => {
    if (count === 1) {
      return (
      <Card style={{maxWidth:'100%', margin: '2px'}} key={count}>
        <CardHeader
          title="Child's Details"
          subtitle=""
          actAsExpander={false}
          showExpandableButton={false}
        />
      <CardText expandable={false}>
          <TextField fullWidth={true} id='Name1' floatingLabelText="Child's Name"
            style={{fontSize: '12px'}}
          />
        <TextField fullWidth={true} id='DOB1'
            floatingLabelText="Date of Birth (DD/MM/YYYY)"
            style={{fontSize: '12px'}}
            onBlur={this.handleDate.bind(this)}
            errorText={this.state.dateError}
          />
        <RadioButtonGroup name="gender" defaultSelected="boy" name='Gender1'>
          <RadioButton
            value="boy"
            label="Boy"
            style={styles.radioButton}
          />
          <RadioButton
            value="girl"
            label="Girl"
            style={styles.radioButton}
          />
      </RadioButtonGroup>
        </CardText>
        <CardActions expandable={true}>
          <FlatButton label="Action1" />
          <FlatButton label="Action2" />
        </CardActions>
      </Card>
    )}
    else if (count > 1) {
      var cardCode = _.times(count, i => {
        var imgURL = `/images/${i+1}.png`;
        return (
          <div>
            <Card key={i+1} style={{maxWidth: '100%', margin: '2px'}}>
              <CardHeader
                title={<div>Child {i+1} Details</div>}
                subtitle=""
                avatar={imgURL}
              />
            <CardText expandable={false}>
                <TextField fullWidth={true}
                  floatingLabelText="Child's Name"
                  id={'Name' + (i+1)}
                  style={{fontSize: '12px'}}
                />
                <TextField fullWidth={true}
                  floatingLabelText="Date of Birth (DD/MM/YYYY)"
                  id={'DOB' + (i+1)}
                  style={{fontSize: '12px'}}
                  onBlur={this.handleDate.bind(this)}
                  errorText={this.state.dateError}
                />
              <RadioButtonGroup name="gender" defaultSelected="boy" name={'Gender' + (i+1)}>
                  <RadioButton
                    value="boy"
                    label="Boy"
                    style={styles.radioButton}
                  />
                  <RadioButton
                    value="girl"
                    label="Girl"
                    style={styles.radioButton}
                  />
                </RadioButtonGroup>
              </CardText>
              <CardActions expandable={true}>
                <FlatButton label="Action1" />
                <FlatButton label="Action2" />
              </CardActions>
            </Card>
            <br></br>
          </div>
        )
      })
      return cardCode;
    }
  }

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

  handleEmail = (e) => {
    var email = e.target.value;

    if (isEmail(email)) {
      this.setState({
        email,
        emailError: ''
      });

    }
    else {
      this.setState({
        emailError: 'Enter a valid Email'
      })
    }
  };

  handleMobile = (e) => {
    var mobile = e.target.value
    console.log(mobile);
    if (isLength(mobile, 8) && isNumeric(mobile)) {
      this.setState({
        mobile,
        mobileError: ''
      });
      console.log('success');

    }
    else {
      this.setState({
        mobileError: 'Enter a valid Mobile Number'
      });
    }
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
      var count = 0;
      return <RadioButton value={dateTime} key={dateTime} label={dateTime} style={styles.radioButton} />
  });
    return dateTimeOptions;
  };

  handleDateTimeSelection = (e) => {
    var dateTime = e.target.value;
    this.handleSelectedDateTime(dateTime);
  };

  renderStepActions(step) {
    const {stepIndex, selectedVenue, dateTime, email, mobile} = this.state;
    var step0Message = '';
    var step2EmailMessage = '';
    var step2MobileMessage = '';
    var step2ChildMessage = '';
    if (stepIndex === 0 && selectedVenue === '') {
      step0Message = <strong style={{fontSize:'10px',color: 'red'}}>Please select a venue</strong>
    }
    if (stepIndex === 1 && dateTime === '') {
      step0Message = <strong style={{fontSize:'10px',color: 'red'}}>Please select a Date & Time</strong>
    }
    if (stepIndex === 2 && email === '') {
      step2EmailMessage = <strong style={{fontSize:'10px',color: 'red'}}>Please enter your email</strong>
    }
    if (stepIndex === 2 && mobile === '') {
      step2MobileMessage = <strong style={{fontSize:'10px',color: 'red'}}>Please enter your mobile</strong>
    }
    return (
      <div>{step0Message}
        {step2EmailMessage}<br/>
        {step2MobileMessage}
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
    var {finished, stepIndex, dateTimes, selectedVenue, dateTime,value} = this.state;



    return (
      <section>
        <div className="wrapper">
          <div style={{maxWidth:'60%', margin:'0 auto'}}>
            <h1>REGISTER NOW</h1>
          </div>
          <Stepper activeStep={stepIndex} orientation="vertical">
            <Step>
              <StepLabel style={{fontSize: '16px' }}>Select Venue</StepLabel>
              <StepContent>
                <RadioButtonGroup onChange={this.renderDateTime.bind(this)} name="Venue" >
                  <RadioButton
                    value="Bishan"
                    label={<div><div style={{fontSize:'12px', fontWeight:'500'}}>Bishan </div><div style={{fontSize:'9px'}}>Kuo Chuan Presbyterian Secondary School<br/>10 Bishan Street 13 Singapore 579795</div></div>}
                    style={styles.radioButton}
                    labelStyle={{lineHeight: '14px'}}
                  />
                  <RadioButton
                    value="Buangkok"
                    label={<div><div style={{fontSize:'12px', fontWeight:'500'}}>Buangkok</div><div style={{fontSize:'9px'}}>The ARK Buangkok<br/>983 Buangkok Cresent Singapore 530983</div></div>}
                    style={styles.radioButton}
                    labelStyle={{lineHeight: '14px'}}
                  />
                  <RadioButton
                    value="Jurong"
                    label={<div><div style={{fontSize:'12px', fontWeight:'500'}}>Jurong</div><div style={{fontSize:'9px'}}>Jurong Futsal Centre<br/>4 Fourth Chin Bee Rd Singapore 619698</div></div>}
                    style={styles.radioButton}
                    labelStyle={{lineHeight: '14px'}}
                  />
                  <RadioButton
                    value="Kovan"
                    label={<div><div style={{fontSize:'12px', fontWeight:'500'}}>Kovan</div><div style={{fontSize:'9px'}}>Kovan Sports Centre<br/>60 Hougang Street 21 Singapore 548738</div></div>}
                    style={styles.radioButton}
                    labelStyle={{lineHeight: '14px'}}
                  />
                  <RadioButton
                    value="Tampines"
                    label={<div><div style={{fontSize:'12px', fontWeight:'500'}}>Tampines</div><div style={{fontSize:'9px'}}>SAFRA Tampines<br/>1/A Tampines Street 92 Singapore 528882</div></div>}
                    style={styles.radioButton}
                    labelStyle={{lineHeight: '14px'}}
                  />
                  <RadioButton
                    value="Thomson"
                    label={<div><div style={{fontSize:'12px', fontWeight:'500'}}>Thomson</div><div style={{fontSize:'9px'}}>The ARK Thomson<br/>596 Upper Thomson Road Singapore 574427</div></div>}
                    style={styles.radioButton}
                    labelStyle={{lineHeight: '14px'}}
                  />
                  <RadioButton
                    value="Woodlands"
                    label={<div><div style={{fontSize:'12px', fontWeight:'500'}}>Woodlands</div><div style={{fontSize:'9px'}}>Woodlands Recreation Centre<br/>200 Industrial Park E7  Singapore 757177</div></div>}
                    style={styles.radioButton}
                    labelStyle={{lineHeight: '14px'}}
                  />
                  <RadioButton
                    value="Yishun"
                    label={<div><div style={{fontSize:'12px', fontWeight:'500'}}>Yishun</div><div style={{fontSize:'9px'}}>ORTO Park<br/>81 Lor Chencharu Singapore 769198</div></div>}
                    style={styles.radioButton}
                    labelStyle={{lineHeight: '14px'}}
                  />
                </RadioButtonGroup>
                {this.renderStepActions(0)}
              </StepContent>
            </Step>
            <Step>
              <StepLabel style={{fontSize: '16px'}}>Select Date & Time</StepLabel>
              <StepContent>
                <strong style={{fontSize: '13px'}}>Selected Venue: <strong style={{textDecoration: 'underline' }}>{selectedVenue}</strong></strong>
                <RadioButtonGroup onChange={this.handleDateTimeSelection.bind(this)} name="DateTime">
                  {this.getDateTime()}
                </RadioButtonGroup>
                {this.renderStepActions(1)}
              </StepContent>
            </Step>
            <Step>
              <StepLabel style={{fontSize: '16px'}}>Enter Child's Details</StepLabel>
              <StepContent style={{maxWidth: '100%'}}>
                <strong style={{fontSize: '13px'}}>Selected: <strong style={{textDecoration: 'underline' }}>{selectedVenue} {dateTime}</strong></strong>
                  <TextField
                    fullWidth={true}
                    floatingLabelText="Email" onBlur={this.handleEmail.bind(this)}
                    id='emailField'
                    errorText = {this.state.emailError}
                    style={{fontSize: '13px'}}
                  />
                  <TextField
                    fullWidth={true}
                    floatingLabelText="Mobile Number" onBlur={this.handleMobile.bind(this)}
                    errorText = {this.state.mobileError}
                    style={{fontSize: '13px'}}
                  />
                <SelectField
                  fullWidth={true} value={this.state.value}     onChange={this.handleChange}
                  style={{fontSize: '13px'}} floatingLabelText="No. of Children Attending">
                  <MenuItem value={1} primaryText="1" />
                  <MenuItem value={2} primaryText="2" />
                  <MenuItem value={3} primaryText="3" />
                  <MenuItem value={4} primaryText="4" />
                </SelectField>
                {this.generateCard(value)}
                {this.renderStepActions(2)}
              </StepContent>
            </Step>
          </Stepper>
          {finished && this.handleSubmission()}
        </div>
      </section>

    );
  }
}

export default VerticalLinearStepper;
