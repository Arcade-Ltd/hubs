var material;

AFRAME.registerComponent('alpha-video', {

    schema: {
      width: {type: 'number', default: 1},
      height: {type: 'number', default: 1},
      depth: {type: 'number', default: 1},
      color: {type: 'color', default: '#AAA'}
    },
  
    init: function () {
      var data = this.data;
      var el = this.el;

      this.geometry = new THREE.PlaneBufferGeometry( 5, 5);
      material = new THREEx.ChromaKeyMaterial("https://dl.dropbox.com/s/8qkot2sqh4qo7vd/videoplayback.mp4", 0xd432); 
      this.material = material;
      this.mesh = new THREE.Mesh(this.geometry, this.material);
      el.setObject3D('mesh', this.mesh);

      material.startVideo();

    },
  
    tick() {
        material.update();
    }
  });
