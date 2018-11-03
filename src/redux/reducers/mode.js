import {NEXT_BENJO, DISPLAY_CATALOG, ROLL} from "../actionTypes"
import BenjoList from "../../BenjoList"
var _ = require('lodash');

const initialState = {
  displayedBenjo: null,
  summonedBenjos: null,
  catalog: false
};

function shuffledList()
{
  return _.shuffle(BenjoList)
}

function roll(mode)
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
console.log("STORE!")
  console.log(summonedBenjos)
  console.log("STORE!")
  return summonedBenjos;
}

export default function (state = initialState, action) {
  switch (action.type) {
    case NEXT_BENJO:
      if (catalog == true) {
        return {...state,
          displayedBenjo: null
        };
      }
      else  {

        var newSummonedBenjos = Object.assign([], state.summonedBenjos);
        var nextBenjo = newSummonedBenjos.shift() || null;
        return {...state,
          displayedBenjo: nextBenjo,
          summonedBenjos: newSummonedBenjos
        };
      }
    case DISPLAY_CATALOG:
      return {...state,
        catalog: true,
        displayedBenjo: null,
        summonedBenjos: null
      };
    case ROLL:
      var summonedBenjos = roll("10ROLLRARITY");
      return {...state,
        catalog:false,
        summonedBenjos: summonedBenjos,
        displayedBenjo: summonedBenjos[0]
      };

    default:
      break;
  }
}
