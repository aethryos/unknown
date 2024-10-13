update() {
  if (this.alive) {
    const b = m == "Lite";
    const c = this.y > 8050 && this.y < 8800;
    var a = 7;
    const d = ca.entities.find(a => a && s.distance(a, this) < 60 && a.type == 6 && !this.mine(a));
    const e = ca.oldDetectingInsta;
    const f = ca.breaking;
    ca.oldDetectingInsta = false;
    ca.breaking = false;
    if (O[1].enabled && d) {
      if (!f) {
        this.quad(d);
      }
      const b = s.direction(d, this);
      ca.oldTrap = d;
      if (this.old_weapon != 1) {
        this.old_weapon = 1;
        this.select(1);
      }
      this.equip(11);
      this.hit(b);
      ca.breaking = true;
    } else if (f && !b) {
      const a = s.direction(ca.oldTrap, this);
      this.place(7, a);
      ca.oldTrap = null;
    }
    if (c) {
      a = 9;
    }
    if (!b && ca.enemy) {
      const f = s.distance(this, ca.enemy);
      const g = ca.enemy.hat;
      a = this.getHat(f, g, c, d);
      //Anti insta
      if (O[4] && ca.enemy && !b) {
        const b = ca.entities.filter(a => a && a.type == 0 && a.hat == 2 && !this.mine(a) && n.includes(a.weapon) && s.distance(this, a) < 200);
        const c = this.hat != 4 || a != 4;
        if (b.length != 0 && c && !e) {
          a = 4;
          ca.oldDetectingInsta = true;
        }
      }
    }
// Auto-spike
if (O[5].enabled && ca.enemy) {
    const angle = s.direction(ca.enemy, this);
    const dist = document.querySelector("#chat-2").value;

    // Calculate the distance to the enemy
    const distanceToEnemy = s.distance(ca.enemy, this);

    // Check if the distance is within the specified range
    if (distanceToEnemy <= dist) {
        // Check if the angle is within a valid range for placing the spike
        const angleThreshold = 90; // Adjust this value as needed
        const playerAngle = s.direction(this, ca.enemy);
        const angleDifference = Math.abs(playerAngle - angle);

        // Ensure the angle difference is within the threshold
        if (angleDifference <= angleThreshold) {
            this.place(4, angle);
        }
    }
}
// auto-insta
const trap = ca.entities.find(a => a && s.distance(a, this) <= 70 && a.type == 6);
if (O[7].enabled && ca.enemy && s.distance(ca.enemy, this) <= 120 && ca.enemy.hat != 4 && ca.enemy.hat != 6 && !trap) {
  setTimeout(() => {
  const angle = s.direction(ca.enemy, this);
  this.equip(2);
  this.place(4, angle);
  this.select(0);
  this.hit(angle);
  this.select(1);
  });
}
// Visuals
if (I[4].enabled) {
  createOverlay();
} else {
  deleteOverlay();
}

// Auto-Attack
const dist = document.querySelector("#chat-1").value;
if (O[6].enabled && ca.enemy && s.distance(ca.enemy, this) <= dist) {
  const trap = ca.entities.find(a => a && s.distance(a, this) <= 70 && a.type == 6 && !this.mine(a));
  const angle = s.direction(ca.enemy, this);
  if (!trap) {
  this.select(0);
  this.hit(angle);
  }
}

let gridToggleElement = document.querySelector("#grid-toggle");
    if (gridToggleElement.checked) {
      console.log("disabling grids")
      gridToggleElement.click();
    }
let displayPingToggleElement = document.querySelector("#display-ping-toggle");
if (displayPingToggleElement.checked) {
    console.log("very cool script by very cool dude")
} else {
      displayPingToggleElement.click();
}

//Auto heal
      if (this.health < 100 && O[0].enabled) {
        if (this.health < 36 && !b) {
          a = 4;
        }
          this.place(2);
      }
// placer
if (!d && ca.enemy && O[2].enabled) {
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

// Quickselect implementation (you can use a library or implement your own)
function quickselect(arr, k) {
  if (k < 0 || k >= arr.length) return [];
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(x => x.score < pivot.score);
  const middle = arr.filter(x => x.score === pivot.score);
  const right = arr.filter(x => x.score > pivot.score);
  if (k < left.length) return quickselect(left, k);
  if (k < left.length + middle.length) return middle;
  return quickselect(right, k - left.length - middle.length);
}
        if (!c && !this.items.includes(15) && X[0].enabled && this.age < 6 && Date.now() - ca.mill > 200) {
          const a = Math.atan2(this.y - this.oldY, this.x - this.oldX);
          this.place(5, a);
          ca.mill = Date.now();
        }
      }
      if (O[3].enabled) {
        this.equip(a);
      }
    }
  }
  auto_replace(a, b) {}
  choose(a) {
    this.packet(14, a);
  }
  autoselect(a) {
    if (a != 15) {
      return;
    }
    setTimeout(() => {
      this.select(1);
    }, 100);
  }
  listener(a) {
    const b = a.data;
    const c = s.parseMessage(b);
    if (c.type === p.died) {
      this.alive = false;
      this.kills = 0;
      this.age = 0;
    }
