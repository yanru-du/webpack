import qs from 'querystring'

let obj = {
  name: 'zs',
  age: 18
};
obj = qs.stringify(obj)
console.log('----- ' + obj + '-----');

// import _ from 'lodash';
//
// console.log(_.join(['Hello', 'webpack'], ' '));