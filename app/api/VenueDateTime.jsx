import _ from 'lodash';

var venue = [
  {
    id: 'Bishan',
    dateTime: [
      '30th Jul, 9:00 - 10:00am',
      '30th Jul, 4:00 - 5:00pm',
      '6th Aug, 9:00 - 10:00am',
      '6th Aug, 4:00 - 5:00pm'
    ]
  },
  {
    id: 'Buangkok',
    dateTime: [
      '30th Jul, 9:00 - 10:00am',
      '30th Jul, 4:00 - 5:00pm',
      '6th Aug, 9:00 - 10:00am',
      '6th Aug, 4:00 - 5:00pm'
    ]
  },
  {
    id: 'Jurong',
    dateTime: [
      '31st Jul, 4:00 - 5:00pm',
      '7th Aug, 4:00 - 5:00pm'
    ]
  },
  {
    id: 'Kovan',
    dateTime: [
      '6th Aug, 9:00 - 10:00am',
      '6th Aug, 4:00 - 5:00pm'
    ]
  },
  {
    id: 'Tampines',
    dateTime: [
      '30th Jul, 9:00 - 10:00am',
      '6th Aug, 9:00 - 10:00am'
    ]
  },
  {
    id: 'Thomson',
    dateTime: [
      '30th Jul, 4:00 - 5:00pm',
      '6th Aug, 4:00 - 5:00pm'
    ]
  },
  {
    id: 'Woodlands',
    dateTime: [
      '30th Jul, 4:00 - 5:00pm',
      '6th Aug, 4:00 - 5:00pm'
    ]
  },
  {
    id: 'Yishun',
    dateTime: [
      '30th Jul, 9:00 - 10:00am',
      '6th Aug, 9:00 - 10:00am'
    ]
  }
];

var getDateTime = (id) => {
  var selectedVenue = _.find(venue, {id: id});
  return selectedVenue.dateTime;
};

module.exports = {
  venue: venue,
  getDateTime: getDateTime
};
