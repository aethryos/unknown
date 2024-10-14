function placeTrap(ca, enemy, distance, direction) {
  // Calculate the trap direction based on the enemy's direction
  const trapDirection = direction + (Math.random() - 0.5) * Math.PI / 4;

  // Place the trap at a random distance from the enemy
  const trapX = enemy.x + Math.cos(trapDirection) * (distance + Math.random() * 20);
  const trapY = enemy.y + Math.sin(trapDirection) * (distance + Math.random() * 20);

  // Place the trap
  this.place(4, trapX, trapY);
}

function placeSpike(ca, enemy, distance, direction) {
  // Calculate the spike direction based on the enemy's direction
  const spikeDirection = direction + (Math.random() - 0.5) * Math.PI / 4;

  // Place the spike at a random distance from the enemy
  const spikeX = enemy.x + Math.cos(spikeDirection) * (distance + Math.random() * 20);
  const spikeY = enemy.y + Math.sin(spikeDirection) * (distance + Math.random() * 20);

  // Place the spike
  this.place(7, spikeX, spikeY);
}

if (ca.enemy && O[2].enabled) {
  const enemyDistance = s.distance(this, ca.enemy);
  const enemyDirection = s.direction(ca.enemy, this);
  const dist = +document.querySelector("#chat-0").value;

  if (enemyDistance <= dist) {
    const trapEntity = ca.entities.find(a => a && s.distance(a, ca.enemy) < 60 && a.type === 6 && this.mine(a));

    if (trapEntity) {
      // Place a spike near the trap
      placeSpike(ca, ca.enemy, 30, enemyDirection);

      // Try to break the trap
      this.place(4, trapEntity.x, trapEntity.y);
    } else {
      // Place a trap near the enemy
      placeTrap(ca, ca.enemy, 50, enemyDirection);
    }
  }
}
