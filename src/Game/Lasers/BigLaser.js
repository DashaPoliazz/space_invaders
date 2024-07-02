import Laser from "./Laser.js";

const BIG_LAZER_SIZE = 20;
const DAMAGE = 1;

class BigLaser extends Laser {
  constructor(game) {
    super(game);

    this.width = BIG_LAZER_SIZE;
    this.damage = DAMAGE;
  }
  render(context) {
    super.render(context);
  }
}

export default BigLaser;
