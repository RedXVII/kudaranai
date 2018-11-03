var React = require('react');
var BenjoDisplay = require("./BenjoDisplay");

class BenjoHandler extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contracted: false,
      hair: true,
      tan: false,
      rakugaki: false,
      clothes: true,
      text: true,
      special: false
    };

    this.contract_toggle = this.contract_toggle.bind(this);
    this.hair_toggle = this.hair_toggle.bind(this);
    this.tan_toggle = this.tan_toggle.bind(this);
    this.rakugaki_toggle = this.rakugaki_toggle.bind(this);
    this.clothes_toggle = this.clothes_toggle.bind(this);
    this.special_toggle = this.special_toggle.bind(this);
    this.text_toggle = this.text_toggle.bind(this);
    this.next = this.next.bind(this);

  }

  contract_toggle() {
    this.setState(state => ({
      contracted: !state.contracted
    }));
  }

  hair_toggle() {
    this.setState(state => ({
      hair: !state.hair
    }));
  }

  tan_toggle() {
    this.setState(state => ({
      tan: !state.tan
    }));
  }

  rakugaki_toggle() {
    this.setState(state => ({
      rakugaki: !state.rakugaki
    }));
  }

  clothes_toggle() {
    this.setState(state => ({
      clothes: !state.clothes
    }));
  }

  special_toggle() {
    this.setState(state => ({
      special: !state.special
    }));
  }


  text_toggle() {
    this.setState(state => ({
      text: !state.text
    }));
  }

  next() {
    this.setState(state => ({
      contracted: false
    }));
    this.props.nextHandler();
  }


  render() {
    var special_button;
    if (this.props.special)
    {
      special_button = <a href="#" className="button pinkButton" onClick={this.special_toggle} >{this.state.special ? "裸にして"  : "便女霊衣を着て"}</a>
    }
    return(
      <div className="benjo_handler" >
        <div className="sideBar">
          <a href="#" className="button pinkButton" onClick={this.hair_toggle} >{this.state.hair ? "陰毛消して"  : "陰毛生えて"}</a>
          <a href="#" className="button pinkButton" onClick={this.tan_toggle} >{this.state.tan ? "肌色"  : "褐色"}</a>
          <a href="#" className="button pinkButton" onClick={this.rakugaki_toggle} >{this.state.rakugaki ? "独り占め"  : "フレンドポイント稼ぐ"}</a>
          <a href="#" className="button pinkButton" onClick={this.clothes_toggle} >{this.state.clothes ? "裸にして"  : "着衣を着て"}</a>
          <a href="#" className="button pinkButton" onClick={this.text_toggle} >{this.state.text ? "声を封印" : "声を開放"}</a>
          <a href="#" className="button pinkButton" onClick={this.contract_toggle} >{this.state.contracted ? "記憶改竄"  : "契約"}</a>
          <a href="#" className="button blueButton" onClick={this.next} >次の便女</a>
          {special_button}
        </div>
        <BenjoDisplay {...this.state} name={this.props.name} special_allowed={this.props.special}/>
      </div>
    )

  }

}

module.exports = BenjoHandler
