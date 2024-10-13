  if (ca.enemy && O[2].enabled) {
    const enemyDistance = s.distance(this, ca.enemy);
    const enemyDirection = s.direction(ca.enemy, this);
    const dist = document.querySelector("#chat-0").value;

    if (enemyDistance <= dist) {
      const trapEntity = ca.entities.find(a => a && s.distance(a, ca.enemy) < 60 && a.type == 6 && this.mine(a));
      const trapDirection = trapEntity ? s.direction(trapEntity, this) : null;

      if (trapEntity) {
        // Check if the enemy is in front of you
        const angleDifference = Math.abs(enemyDirection - trapDirection);
        const isEnemyInFront = angleDifference < Math.PI / 2; // Adjust this threshold as needed

        if (isEnemyInFront) {
          // Place spikes in front of you
          const frontDistance = 70; // Updated front distance
          const frontX = this.x + Math.cos(enemyDirection) * frontDistance;
          const frontY = this.y + Math.sin(enemyDirection) * frontDistance;
          this.place(4, frontX, frontY);
        } else {
          // Place spikes behind you
          const behindDirection = (enemyDirection + Math.PI) % (2 * Math.PI);
          const behindDistance = 50; // Adjust this value to change the distance of the spikes
          const behindX = this.x + Math.cos(behindDirection) * behindDistance;
          const behindY = this.y + Math.sin(behindDirection) * behindDistance;
          this.place(4, behindX, behindY);
        }

        // Place additional traps to block the enemy's path
        const angles = [];
        for (let i = 0; i < 36; i += 10) { // Reduced iterations
          const angle = (i * Math.PI) / 180;
          angles.push(angle);
        }

        const scores = [];
        for (let i = 0; i < angles.length; i++) {
          const angle = angles[i];
          const distance = s.distance(ca.enemy, this, angle);
          const direction = s.direction(ca.enemy, this, angle);
          const score = distance * Math.cos(direction - enemyDirection);
          scores.push({ angle, score });
        }

        // Use quickselect to sort the scores
        const sortedScores = quickselect(scores, scores.length - 10); // Get the top 10 scores

        const validAngles = [];
        for (let i = 0; i < sortedScores.length; i++) {
          if (sortedScores[i].score > 0) {
            validAngles.push(sortedScores[i].angle);
          }
        }

        ca.angles = validAngles;
        this.place(4, ...ca.angles);
      } else {
        // Improve the place(7) part to better decide where to place the trap
        ca.angles = [enemyDirection];
        this.place(7, enemyDirection);
      }
    }
  }
