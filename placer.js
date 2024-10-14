if (ca.enemy && O[2].enabled) {
  const enemyDistance = s.distance(this, ca.enemy);
  const enemyDirection = s.direction(ca.enemy, this);
  const dist = +document.querySelector("#chat-0").value;

  console.log("Enemy distance:", enemyDistance);
  console.log("Enemy direction:", enemyDirection);

  if (enemyDistance <= dist) {
    const trapEntity = ca.entities.find(a => a && s.distance(a, ca.enemy) < 60 && a.type === 6 && this.mine(a));
    const trapDirection = trapEntity ? s.direction(trapEntity, this) : null;

    console.log("Trap entity:", trapEntity);
    console.log("Trap direction:", trapDirection);

    if (trapEntity) {
      const angleDiff = Math.abs(enemyDirection - trapDirection);
      const isEnemyInFront = angleDiff < Math.PI / 2;

      console.log("Angle diff:", angleDiff);
      console.log("Is enemy in front:", isEnemyInFront);

      if (isEnemyInFront) {
        this.place(4, this.x + Math.cos(enemyDirection) * 70, this.y + Math.sin(enemyDirection) * 70);
      } else {
        const behindDirection = (enemyDirection + Math.PI) % (2 * Math.PI);
        this.place(4, this.x + Math.cos(behindDirection) * 50, this.y + Math.sin(behindDirection) * 50);
      }

      // High-accuracy angle calculations
      const angleStep = 0.1 * Math.PI / 180; // 0.1 degrees
      const angles = Array.from({ length: 3600 }, (_, i) => enemyDirection + i * angleStep);
      const scores = angles.map(angle => ({
        angle,
        score: s.distance(ca.enemy, this, angle) * Math.cos(s.direction(ca.enemy, this, angle) - enemyDirection)
      }));

      console.log("Angles:", angles);
      console.log("Scores:", scores);

      const topScores = quickselect(scores, 15);
      const validAngles = topScores.map(({ angle }) => angle);

      console.log("Top scores:", topScores);
      console.log("Valid angles:", validAngles);

      ca.angles = validAngles;
      this.place(4, ...validAngles);

      // Additional aggressive trap placement
      const spamAngles = Array.from({ length: 15 }, (_, i) => enemyDirection + (i - 7) * angleStep);
      this.place(4, ...spamAngles);

      // Adaptive trap placement
      const adaptAngles = Array.from({ length: 10 }, (_, i) => enemyDirection + (i - 5) * angleStep);
      const adaptScores = adaptAngles.map(angle => ({
        angle,
        score: s.distance(ca.enemy, this, angle) * Math.cos(s.direction(ca.enemy, this, angle) - enemyDirection)
      }));

      console.log("Adapt angles:", adaptAngles);
      console.log("Adapt scores:", adaptScores);

      const topAdaptScores = quickselect(adaptScores, 5);
      const adaptValidAngles = topAdaptScores.map(({ angle }) => angle);

      console.log("Top adapt scores:", topAdaptScores);
      console.log("Adapt valid angles:", adaptValidAngles);

      this.place(4, ...adaptValidAngles);

      // Spike placement
      const spikeAngles = Array.from({ length: 10 }, (_, i) => enemyDirection + (i - 5) * angleStep );
      this.place(7, ...spikeAngles);
    } else {
      ca.angles = [enemyDirection];
      this.place(7, enemyDirection);
    }
  }
}
