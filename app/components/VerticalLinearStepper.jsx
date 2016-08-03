import React from 'react';
import _ from 'lodash';
import VenueDateTime from 'VenueDateTime';
import {firebaseRef} from 'app/firebase';
import isEmail from 'validator/lib/isEmail';
import isNumeric from 'validator/lib/isNumeric';
import isLength from 'validator/lib/isLength';
import isDate from 'validator/lib/isDate';
import moment from 'moment';
import SMS from 'SMS';


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
    dateError: '',
    childDetails: 0
  };

  handleChange = (event, index, value) => this.setState({value});

  handleNext = () => {
    const {stepIndex,selectedVenue, dateTime, email, mobile, value, childDetails} = this.state;

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
      if (email != '' && mobile != '' && value != null) {
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

    var childNames = '';
    if (value === 1) {
      var childName = document.getElementById("Name1").value;
      childNames = childNames + `${childName}%20`;
      var dateOfBirth = document.getElementById("DOB1").value;
      var radios = document.getElementsByName("Gender1");
      var gender = '';
      for (var i = 0, length = radios.length; i < length; i++) {
          if (radios[i].checked) {
             gender = radios[i].value;
              break;
          }
      }
      var childRef = newRef.child('children');
      childRef.push({
        childName,
        dateOfBirth,
        gender
      });
    }
    else if (value > 1) {
      _.times(value, i => {
        var childName = document.getElementById(("Name"+(i+1))).value;
        if (i != (value-1)) {
          childNames = childNames + `${childName}%2F`;
        }
        else {
          childNames = childNames + `${childName}%20`;
        }

        var dateOfBirth = document.getElementById(("DOB"+(i+1))).value;
        var radios = document.getElementsByName(("Gender"+(i+1)));
        var gender = '';
        for (var i = 0, length = radios.length; i < length; i++) {
            if (radios[i].checked) {
               gender = radios[i].value;
                break;
            }
        }
        var childRef = newRef.child('children');
        childRef.push({
          childName,
          dateOfBirth,
          gender
        });
      });
    }
    var address = encodeURIComponent(VenueDateTime.getAddress(selectedVenue));

    var msg = `&msg=Your%20Open House%20registration%20at%20 ${selectedVenue}%20(${address})%20on%20 ${dateTime}%20has%20been%20confirmed%2E%20Please%20get%20${childNames}to%20be%20in%20sports%20attire%20with%20running%20shoes%2e%20See%20you%20then%2e` + `&dstno=65${mobile}`;

    SMS.sendSMS(msg);

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
    var dateOfBirth = e.target.value
    if (moment(dateOfBirth, 'DD/MM/YYYY', true).isValid()) {
      this.setState({
        dateError: ''
      });
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
      <CardText>
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
            className='radio-button'
          />
          <RadioButton
            value="girl"
            label="Girl"
            className='radio-button'
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
            <CardText>
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
                    className='radio-button'
                  />
                  <RadioButton
                    value="girl"
                    label="Girl"
                    className='radio-button'
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
    if (isLength(mobile, 8) && isNumeric(mobile)) {
      this.setState({
        mobile,
        mobileError: ''
      });

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
      return <RadioButton value={dateTime} key={dateTime} label={dateTime} className='radio-button' />
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
          <div style={{maxWidth: 380, margin: 'auto'}}>
            <Stepper activeStep={stepIndex} orientation="vertical">
              <Step>
                <StepLabel className='step-label'>Select Venue</StepLabel>
                <StepContent>
                  <RadioButtonGroup onChange={this.renderDateTime.bind(this)} name="Venue" >
                    <RadioButton
                      value="Bishan"
                      label={<div><div className='text-bold'>Bishan </div><div className='text-small'>Kuo Chuan Presbyterian Secondary School<br/>10 Bishan Street 13 Singapore 579795</div></div>}
                      className='radio-button'
                      labelStyle={{lineHeight: '14px'}}
                    />
                    <RadioButton
                      value="Buangkok"
                      label={<div><div className='text-bold'>Buangkok</div><div className='text-small'>The ARK Buangkok<br/>983 Buangkok Cresent Singapore 530983</div></div>}
                      className='radio-button'
                      labelStyle={{lineHeight: '14px'}}
                    />
                    <RadioButton
                      value="Jurong"
                      label={<div><div className='text-bold'>Jurong</div><div className='text-small'>Jurong Futsal Centre<br/>4 Fourth Chin Bee Rd Singapore 619698</div></div>}
                      className='radio-button'
                      labelStyle={{lineHeight: '14px'}}
                    />
                    <RadioButton
                      value="Kovan"
                      label={<div><div className='text-bold'>Kovan</div><div className='text-small'>Kovan Sports Centre<br/>60 Hougang Street 21 Singapore 548738</div></div>}
                      className='radio-button'
                      labelStyle={{lineHeight: '14px'}}
                    />
                    <RadioButton
                      value="Tampines"
                      label={<div><div className='text-bold'>Tampines</div><div className='text-small'>SAFRA Tampines<br/>1/A Tampines Street 92 Singapore 528882</div></div>}
                      className='radio-button'
                      labelStyle={{lineHeight: '14px'}}
                    />
                    <RadioButton
                      value="Thomson"
                      label={<div><div className='text-bold'>Thomson</div><div className='text-small'>The ARK Thomson<br/>596 Upper Thomson Road Singapore 574427</div></div>}
                      className='radio-button'
                      labelStyle={{lineHeight: '14px'}}
                    />
                    <RadioButton
                      value="Woodlands"
                      label={<div><div className='text-bold'>Woodlands</div><div className='text-small'>Woodlands Recreation Centre<br/>200 Industrial Park E7  Singapore 757177</div></div>}
                      className='radio-button'
                      labelStyle={{lineHeight: '14px'}}
                    />
                    <RadioButton
                      value="Yishun"
                      label={<div><div className='text-bold'>Yishun</div><div className='text-small'>ORTO Park<br/>81 Lor Chencharu Singapore 769198</div></div>}
                      className='radio-button'
                      labelStyle={{lineHeight: '14px'}}
                    />
                  </RadioButtonGroup>
                  {this.renderStepActions(0)}
                </StepContent>
              </Step>
              <Step>
                <StepLabel className='step-label'>Select Date & Time</StepLabel>
                <StepContent>
                  <strong style={{fontSize: '14px'}}>Selected Venue: <strong style={{textDecoration: 'underline' }}>{selectedVenue}</strong></strong>
                  <RadioButtonGroup onChange={this.handleDateTimeSelection.bind(this)} name="DateTime">
                    {this.getDateTime()}
                  </RadioButtonGroup>
                  {this.renderStepActions(1)}
                </StepContent>
              </Step>
              <Step>
                <StepLabel className='step-label'>Enter Child's Details</StepLabel>
                <StepContent style={{maxWidth: '100%'}}>
                  <strong style={{fontSize: '14px'}}>Selected: <strong style={{textDecoration: 'underline' }}>{selectedVenue} {dateTime}</strong></strong>
                    <TextField
                      fullWidth={true}
                      floatingLabelText="Email" onBlur={this.handleEmail.bind(this)}
                      id='emailField'
                      errorText = {this.state.emailError}
                      style={{fontSize: '14px'}}
                    />
                    <TextField
                      fullWidth={true}
                      floatingLabelText="Mobile Number" onBlur={this.handleMobile.bind(this)}
                      errorText = {this.state.mobileError}
                      style={{fontSize: '14px'}}
                    />
                  <SelectField
                    fullWidth={true} value={this.state.value}     onChange={this.handleChange}
                    style={{fontSize: '14px'}} floatingLabelText="No. of Children Attending">
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
            {finished &&
              (
          <p style={{margin: '20px 0', textAlign: 'center'}}>
            <strong>Thank you for registering</strong> to join our Open House at <strong>{this.state.selectedVenue} on the {this.state.dateTime}</strong>.<br/><br/>

            You would like to know that your child could come in <strong style={{color: '#f59600'}}>sports attire, running shoes</strong> and bring along a <strong style={{color: '#f59600'}}>water bottle</strong> as there will be regular water breaks.<br/><br/>
          </p>
        )
            }
            {finished && this.handleSubmission()}
          </div>
        </div>
      </section>

    );
  }
}

export default VerticalLinearStepper;
