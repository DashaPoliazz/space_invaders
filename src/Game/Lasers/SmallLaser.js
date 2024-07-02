import Laser from "./Laser.js";

const SMALL_LASER_SIZE = 5;
const DAMAGE = 0.3;

class SmallLaser extends Laser {
  constructor(game) {
    super(game);

    this.width = SMALL_LASER_SIZE;
    this.damage = DAMAGE;
  }
  render(context) {
    super.render(context);
  }
}

export default SmallLaser;
