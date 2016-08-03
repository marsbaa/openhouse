import axios from 'axios';

var sendSMS = (msg) => {
  var URL = "https://www.isms.com.my/isms_send.php?un=firstkick&pwd=firstkick123&type=1&sendid=6591010666";

  URL = URL + msg;

  axios.get(URL).then ((res) => {
    console.log(res);
}).catch((res) => {
    console.log(res);
  });
};

module.exports = {
  sendSMS : sendSMS
};
