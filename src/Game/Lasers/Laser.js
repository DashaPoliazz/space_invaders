class Laser {
  constructor(game) {
    this.game = game;
    this.x = 0;
    this.y = 0;
    this.height = this.game.height - 50;
  }
  render(context) {
    this.x =
      this.game.player.x + this.game.player.width * 0.5 - this.width * 0.5;

    this.game.player.energy -= this.damage;

    context.save();
    context.fillStyle = "gold";
    context.fillRect(this.x, this.y, this.width, this.height);
    context.fillStyle = "white";
    context.fillRect(
      this.x + this.width * 0.2,
      this.y,
      this.width * 0.6,
      this.height,
    );
    context.restore();

    // slowing the damage down (it's to easy to play with 0.3 dmg per frame)
    if (this.game.spriteUpdate) {
      this.game.waves.forEach((wave) => {
        // There is only one wave in the game, so it's not n^2 time complexity
        wave.enemies.forEach((enemy) => {
          if (this.game.checkCollision(this, enemy)) {
            enemy.hit(this.damage);
          }
        });
      });

      this.game.bosses.forEach((boss) => {
        if (this.game.checkCollision(this, boss) && boss.y >= 0) {
          boss.hit(this.damage);
        }
      });
    }
  }
}

export default Laser;
