import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

const controls = new OrbitControls(camera, renderer.domElement);

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const geometry1 = new THREE.TorusKnotGeometry(15, 2, 200, 16);
const material1 = new THREE.MeshStandardMaterial({ color: 0xff0505, wireframe: true });
const torusKnot = new THREE.Mesh(geometry1, material1);
scene.add(torusKnot);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff0505, wireframe: true });
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

const pointLight = new THREE.PointLight(0xF9F9F9);
pointLight.position.set(20, 20, 20);

const ambientLight = new THREE.AmbientLight(0xF9F9F9);



scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);


/*
// generate an array of 100 different colors



//function of generate 1 random color
function randColor() {
    let colors = [];
    while (colors.length < 100) {
        do {
            let color = Math.floor((Math.random() * 1000000) + 1);
        } while (colors.indexOf(color) >= 0);
        colors.push("0x" + ("000000" + color.toString(16)).slice(-6));
    }
    return colors;
}
*/

function addStar() {

    const geometry = new THREE.SphereGeometry(0.25, 32, 16);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x, y, z);

    scene.add(star);

}

Array(200).fill().forEach(addStar);

//bluesky background
const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;




const simmonsTexture = new THREE.TextureLoader().load('simmons.jpg');

const simmons = new THREE.Mesh(
    new THREE.BoxGeometry(5, 5, 5),
    new THREE.MeshBasicMaterial({ map: simmonsTexture })
);

simmons.position.x = 10;

scene.add(simmons);


//jupiter

const jupiterTexture = new THREE.TextureLoader().load('Jupiter_Map.jpg');
const normalTexture = new THREE.TextureLoader().load('Jupiter_Normal.jpg');
const jupiter = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial({
        map: jupiterTexture,
        normalmap: normalTexture,
    })
);

jupiter.position.z = 20;
jupiter.position.setX(-10);

scene.add(jupiter);


function moveCamera() {

    const t = document.body.getBoundingClientRect().top;
    jupiter.rotation.y += 0.1;

    simmons.rotation.y += 0.02;

    camera.position.z = t * -0.05;
    camera.position.x = t * -0.0002;

    camera.rotation.y = t * -0.0001;
}

document.body.onscroll = moveCamera;

function animate() {
    requestAnimationFrame(animate);

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.015;
    torus.rotation.z += 0.01;


    torusKnot.rotation.x += -0.005;
    torusKnot.rotation.y += -0.010;
    torusKnot.rotation.z += -0.005;

    jupiter.rotation.y += 0.005;

    controls.update();

    renderer.render(scene, camera);
}

animate()