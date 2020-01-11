/**
 * Creates a box around the element (assumed to be the camera's PoV) which can be used for fade-to-black.
 */

const FADE_DURATION_MS = 750;

AFRAME.registerComponent("fader", {
  schema: {
    direction: { type: "string", default: "none" } // "in", "out", or "none"
  },

  init() {
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(),
      new THREE.MeshBasicMaterial({ color: 0x0, side: THREE.BackSide, opacity: 0, transparent: true })
    );
    mesh.scale.x = mesh.scale.y = mesh.scale.z = 0.05;
    mesh.matrixNeedsUpdate = true;
    this.el.object3D.add(mesh);
    this.mesh = mesh;
  },

  fadeOut() {
    return this.beginTransition("out");
  },

  fadeIn() {
    return this.beginTransition("in");
  },

  async beginTransition(direction) {
    if (this._resolveFinish) {
      throw new Error("Cannot fade while a fade is happening.");
    }

    this.el.setAttribute("fader", { direction });

    return new Promise(res => {
      if (this.mesh.material.opacity === (direction == "in" ? 0 : 1)) {
        res();
      } else {
        this._resolveFinish = res;
      }
    });
  },

  tick(t, dt) {
    const mat = this.mesh.material;
    this.mesh.visible = this.data.direction === "out" || mat.opacity !== 0;
    if (!this.mesh.visible) return;

    if (this.data.direction === "in") {
      mat.opacity = Math.max(0, mat.opacity - (1.0 / FADE_DURATION_MS) * dt);
    } else if (this.data.direction === "out") {
      mat.opacity = Math.min(1, mat.opacity + (1.0 / FADE_DURATION_MS) * dt);
    }

    if (mat.opacity === 0 || mat.opacity === 1) {
      if (this.data.direction !== "none") {
        if (this._resolveFinish) {
          this._resolveFinish();
          this._resolveFinish = null;
        }
      }

      this.el.setAttribute("fader", { direction: "none" });
    }
  }
});
