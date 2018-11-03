var React = require('react');
var _ = require('lodash');

var BenjoMapping = require('./BenjoMapping');

//const rootFolder = "file:///E:/PKJP2/FGOCG集_製品版/"
const rootFolder = ""

function optionsToNumber(options)
{
  var a = [options.special, options.contracted, options.hair, options.tan, options.rakugaki, options.clothes, options.text];
  var b = a.reduce((res, x) => res << 1 | x);
  return b;
}

class BenjoDisplay extends React.Component {
  build_url() {
    var url = rootFolder;

    var myOptions = _.clone(this.props);

    if (!this.props.special_allowed)
    {
      myOptions.special = false;
    }

    var numberKey = optionsToNumber(myOptions);

    var pathMap = _.find(BenjoMapping, {name: myOptions.name}).pathMap;
    var path = _.find(pathMap, {bitmap: numberKey}).path;

    return url + path;
  }

  render() {
    return (
      <img id="benjo" src={this.build_url()} />
    );
  }
}

module.exports = BenjoDisplay;
