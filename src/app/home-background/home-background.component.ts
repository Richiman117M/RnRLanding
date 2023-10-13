import { Component, AfterViewInit } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-home-background',
  template: '<div id="scene-container"></div>',
  styleUrls: ['./home-background.component.css']
})
export class HomeBackgroundComponent implements AfterViewInit {

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private stars!: THREE.Points;
  private stars2!: THREE.Points;
  private ambientLight = new THREE.AmbientLight(0xf00);
  private ufo!: THREE.Mesh<THREE.CylinderGeometry, THREE.MeshBasicMaterial>;
  ngAfterViewInit(): void {
    this.initScene();
    this.createStars();
    this.createStars2();
    this.scene.add(this.ambientLight);
    this.animate();
  }

  private initScene(): void {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 5;
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    const container = document.getElementById('scene-container');
    if (container) {
      container.appendChild(this.renderer.domElement);
    }
  }

  private createStars(): void {
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({ color: 0xFFFFFF, size: 0.3 });
    const starsVertices = [];
    for (let i = 0; i < 100000; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = (Math.random() - 0.5) * 2000;
      starsVertices.push(x, y, z);
    }
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
    this.stars = new THREE.Points(starsGeometry, starsMaterial);
    this.scene.add(this.stars);
  }

  private createStars2(): void {
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({ color: 0xFFFFFF, size: 0.5 });
    const starsVertices = [];
    for (let i = 0; i < 1000; i++) {
      const x = (Math.random() - 1.5) * 2000;
      const y = (Math.random() - 1.5) * 2000;
      const z = (Math.random() - 1.5) * 2000;
      starsVertices.push(x, y, z);
    }
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
    this.stars2 = new THREE.Points(starsGeometry, starsMaterial);
    this.scene.add(this.stars2);
  }

 
  private animate(): void {
    const animate = () => {
      requestAnimationFrame(animate);
      if (this.stars && this.stars2) {
        this.stars.rotation.y += 0.0003;
        this.stars2.rotation.y += 0.0003;
      }
      this.renderer.render(this.scene, this.camera);
    };

    animate(); 
  }
}
