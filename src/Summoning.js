var React = require('react');
var _ = require('lodash');
var BenjoHandler = require("./BenjoHandler");
var Catalog = require("./Catalog");

const BenjoList = [
  {name: "B", rarity:5},
  {name: "イシュタル", rarity:5},
  {name: "カーミラ", rarity:4},
  {name: "ジャック・ザ・リッパー", rarity: 5},
  {name: "ジャンヌ", rarity: 5},
  {name: "スカサハ", rarity:5},
  {name: "ナイチンゲール", rarity:5, special:true},
  {name: "ニトクリス", rarity:4},
  {name: "ネロ", rarity:4, special:true},
  {name: "ブーディカ", rarity:3},
  {name: "マシュ", rarity:3, special:true},
  {name: "モードレッド", rarity:5},
  {name: "玉藻の前", rarity:5},
  {name: "刑部姫", rarity:5},
  {name: "玄奘三蔵", rarity:5},
  {name: "酒呑童子", rarity:5},
  {name: "清姫", rarity:3}
];

class Summoning extends React.Component {



  constructor(props) {
    super(props);

    this.state = {
      summonedBenjos: null,
      catalog: false
    }

    this.next = this.next.bind(this);
    this.roll = this.roll.bind(this);
    this.hideCatalog = this.hideCatalog.bind(this);
  }

  roll(mode)
  {
    var summonedBenjos;
    if (mode == "EVERYONE")
    {
      summonedBenjos =this.shuffledList();
    }
    else if (mode == "10ROLL")
    {
      summonedBenjos = this.shuffledList().slice(0,10);
    }
    else if (mode == "10ROLLRARITY")
    {
      var i;
      summonedBenjos = [];
      var previous = null
      for(i = 0; i < 10; i++)
      {
        var rng = _.random(100);
        var found;
        if (rng > 80){ //SSR
          found = _.find(this.shuffledList(), function(b) { return b.rarity == 5;});
        }
        else if (rng > 50){ //SR
          found = _.find(this.shuffledList(), function(b) { return b.rarity == 4;});
        }
        else{ // R
          found = _.find(this.shuffledList(), function(b) { return b.rarity == 3;});
        }

        if (found == previous) {
          i--;
        }
        else {
          summonedBenjos.push(found);
          previous = found;
        }
      }
    }

    console.log(summonedBenjos)

    this.setState(state => ({
      summonedBenjos: summonedBenjos,
      index: 0
    }));
  }

  shuffledList()
  {
    return _.shuffle(BenjoList)
  }

  next()
  {
    this.setState(state => ({
      index: state.index + 1,
      summonedBenjos: state.index + 1  == state.summonedBenjos.length ? null : state.summonedBenjos
    }));
  }

  showCatalog()
  {
    this.setState({catalog:true});
  }

  hideCatalog()
  {
    this.setState({catalog:false});
  }

  render()
  {
    if (this.state.catalog)
    {
      return( <Catalog benjoList={BenjoList} hideCatalog={this.hideCatalog} />)
    }
    else if (this.state.summonedBenjos == null)
    {
      return (
        <div className="summon_container">
          <div className="summon_system" >
            {process.env.NODE_ENV == "dev" ?
            (<img id="title_screen" src="file://E:/PKJP2/FGOCG集_製品版/04ビューワ用/ピックアップタイトル.jpg"/>) :
            (<img id="title_screen" src="04ビューワ用/ピックアップタイトル.jpg"/>)}
            <div className="title_buttons">
              <a href="#" className="button blueButton" onClick={() => this.showCatalog()}>便女図鑑</a>
              <a href="#" className="button blueButton" onClick={() => this.roll("10ROLLRARITY")}>{"10回召喚"}</a>
            </div>
          </div>
        </div>
      );
    }
    else {
      return <BenjoHandler name={this.state.summonedBenjos[this.state.index].name} special={this.state.summonedBenjos[this.state.index].special} nextHandler={this.next} />
    }

  }

}

module.exports = Summoning
