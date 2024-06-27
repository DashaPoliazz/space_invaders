import Enemy from "./Enemy.js";

class Beetlemorph extends Enemy {
  constructor(game, positionX, positionY) {
    super(game, positionX, positionY);
    this.image = document.getElementById("beetlemorph");
  }
}

export default Beetlemorph;
