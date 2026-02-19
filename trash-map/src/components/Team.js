 // src/components/Team.js
import React, { useEffect } from "react";
import "./../style/team.css";
import * as THREE from "three";

const Team = () => {
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth/600, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    const canvas = document.getElementById("three-canvas");
    renderer.setSize(window.innerWidth, 300);
    canvas.appendChild(renderer.domElement);

    // 3D recycling triangle
    const geometry = new THREE.TorusGeometry(1, 0.3, 16, 100);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff88, wireframe: true });
    const torus = new THREE.Mesh(geometry, material);
    scene.add(torus);

    camera.position.z = 5;

    function animate() {
      requestAnimationFrame(animate);
      torus.rotation.x += 0.01;
      torus.rotation.y += 0.01;
      renderer.render(scene, camera);
    }
    animate();

    return () => {
      canvas.innerHTML = "";
    };
  }, []);

  return (
    <section className="team">
      <h1>Ekipi TiranaBin</h1>
      <div className="team-grid">
        <div className="card">
          <div className="card-inner">
            <div className="card-front">
              <img src="/img/member1.png" alt="Anëtar"/>
              <h3>Ardit</h3>
            </div>
            <div className="card-back">
              <p>Developer | Pasion për teknologjinë e gjelbër</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-inner">
            <div className="card-front">
              <img src="/img/member2.png" alt="Anëtar"/>
              <h3>Elira</h3>
            </div>
            <div className="card-back">
              <p>Designer | Dashuri për qytete të pastra</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-inner">
            <div className="card-front">
              <img src="/img/member3.png" alt="Anëtar"/>
              <h3>Kreshnik</h3>
            </div>
            <div className="card-back">
              <p>Developer | Ekspert në hartat interaktive</p>
            </div>
          </div>
        </div>
      </div>

      {/* Three.js canvas */}
      <div id="three-canvas" className="team-3d"></div>
    </section>
  );
};

export default Team;
