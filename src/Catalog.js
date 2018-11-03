var React = require('react');
var BenjoCardMapping = require("./BenjoCardMapping");
var BenjoHandler = require("./BenjoHandler");
var _ = require('lodash');

const rootFolder = process.env.NODE_ENV == "dev"  ? "file:///E:/PKJP2/FGOCG集_製品版/" : ""

class Catalog extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      displayed: null
    };

    this.back = this.back.bind(this);
  }

  getPath(benjoName)
  {
    var path = _.find(BenjoCardMapping, {name: benjoName}).path;
    return rootFolder + path;
  }

  show(benjo)
  {
    this.setState({displayed: benjo});
  }

  back()
  {
    this.setState({displayed: null});
  }

  render()
  {
    if (this.state.displayed != null)
    {
      return <BenjoHandler name={this.state.displayed.name} special={this.state.displayed.special} nextHandler={this.back} />
    }
    return (
      <div className="catalog">
        {this.props.benjoList.map((benjo, i) => {
            return (
              <a className="benjo_link" key={i} href="#" onClick={() => this.show(benjo)} >
                <img className="benjo_card" src={this.getPath(benjo.name)}/>
              </a>
            )
            ;})}
        <a href="#" className="button blueButton" onClick={() => this.props.hideCatalog()}>タイトルを戻る</a>
      </div>
    );
  }
}

module.exports = Catalog
