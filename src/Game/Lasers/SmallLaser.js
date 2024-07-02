import Laser from "./Laser.js";

const SMALL_LASER_SIZE = 5;

class SmallLaser extends Laser {
  constructor(game) {
    super(game);

    this.width = SMALL_LASER_SIZE;
  }
  render(context) {
    super.render(context);
  }
}

export default SmallLaser;
