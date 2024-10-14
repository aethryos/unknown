if (ca.enemy && O[2].enabled) {
  const enemyDistance = s.distance(this, ca.enemy);
  const enemyDirection = s.direction(ca.enemy, this);
  const dist = +document.querySelector("#chat-0").value;

  if (enemyDistance <= dist) {
    const trapEntity = ca.entities.find(a => a && s.distance(a, ca.enemy) < 60 && a.type === 6 && this.mine(a));
    const trapDirection = trapEntity ? s.direction(trapEntity, this) : null;

    if (trapEntity) {
      const angleDiff = Math.abs(enemyDirection - trapDirection);
      const isEnemyInFront = angleDiff < Math.PI / 2;

      if (isEnemyInFront) {
        this.place(4, this.x + Math.cos(enemyDirection) * 70, this.y + Math.sin(enemyDirection) * 70);
      } else {
        const behindDirection = (enemyDirection + Math.PI) % (2 * Math.PI);
        this.place(4, this.x + Math.cos(behindDirection) * 50, this.y + Math.sin(behindDirection) * 50);
      }

      // Improved angle calculations
      const angleStep = Math.PI / 36;
      const angles = Array.from({ length: 72 }, (_, i) => enemyDirection + (i - 36) * angleStep);
      const scores = angles.map(angle => ({
        angle,
        score: s.distance(ca.enemy, this, angle) * Math.cos(s.direction(ca.enemy, this, angle) - enemyDirection)
      }));

      const topScores = scores.sort((a, b) => b.score - a.score).slice(0, 20);
      const validAngles = topScores.map(({ angle }) => angle);

      ca.angles = validAngles;
      this.place(4, ...validAngles);

      // Additional spammy trap placement
      const spamAngles = Array.from({ length: 20 }, (_, i) => enemyDirection + (i - 10) * angleStep);
      this.place(4, ...spamAngles);
    } else {
      ca.angles = [enemyDirection];
      this.place(7, enemyDirection);
    }
  }
}
