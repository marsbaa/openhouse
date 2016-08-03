import _ from 'lodash';

var venue = [
  {
    id: 'Bishan',
    dateTime: [
      '6th Aug, 9:00 - 10:00am',
      '6th Aug, 4:00 - 5:00pm'
    ],
    address: '10 Bishan Street 13 S(579795)'
  },
  {
    id: 'Buangkok',
    dateTime: [
      '6th Aug, 9:00 - 10:00am',
      '6th Aug, 4:00 - 5:00pm'
    ],
    address: '983 Buangkok Crescent S(530983)'
  },
  {
    id: 'Jurong',
    dateTime: [
      '7th Aug, 4:00 - 5:00pm'
    ],
    address: '4 Fourth Chin Bee Road S(619698)'
  },
  {
    id: 'Kovan',
    dateTime: [
      '6th Aug, 9:00 - 10:00am',
      '6th Aug, 4:00 - 5:00pm'
    ],
    address: '60 Hougang Street 21 S(548738)'
  },
  {
    id: 'Tampines',
    dateTime: [
      '6th Aug, 9:00 - 10:00am'
    ],
    address: '1/A Tampines Street 92 S(528882)'
  },
  {
    id: 'Thomson',
    dateTime: [
      '6th Aug, 4:00 - 5:00pm'
    ],
    address: '596 Upper Thomson Road S(574427)'
  },
  {
    id: 'Woodlands',
    dateTime: [
      '6th Aug, 4:00 - 5:00pm'
    ],
    address: '200 Industrial Park E7 S(757177)'
  },
  {
    id: 'Yishun',
    dateTime: [
      '6th Aug, 9:00 - 10:00am'
    ],
    address: '81 Lor Chencharu S(769198)'
  }
];

var getDateTime = (id) => {
  var selectedVenue = _.find(venue, {id: id});
  return selectedVenue.dateTime;
};

var getAddress = (id) => {
  var selectedVenue = _.find(venue, {id: id});
  return selectedVenue.address;
};

module.exports = {
  venue: venue,
  getDateTime: getDateTime,
  getAddress: getAddress
};
