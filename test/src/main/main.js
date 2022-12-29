import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import gsap from 'gsap'
// import  *  as dat from "dat.gui"
// 创建场景
const scene = new THREE.Scene();
// 创建相机
const width = window.innerWidth;
const height = window.innerHeight;
const camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 1000)
// 设置相机位置
camera.position.set(0, 0 , 10)
scene.add(camera)

const shaderMaterial = new THREE.ShaderMaterial({
    // 顶点着色器
    vertexShader: `
        void main() {
            gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1);
        }
    `,
    // 片元着色器
    fragmentShader: `
       void main() {
          gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
       }
    `
})

// 平面
const geometry = new THREE.PlaneGeometry( 1, 1 );
// const material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
const plane = new THREE.Mesh( geometry, shaderMaterial );
scene.add( plane );

// 坐标轴的对象
const axesHelper = new THREE.AxesHelper( 6 );
scene.add( axesHelper );

// 渲染
const renderer = new THREE.WebGLRenderer()
renderer.setSize(width, height)
document.body.appendChild(renderer.domElement)

// 控制器
const controls =  new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;

function render() {
    controls.update()
    renderer.render(scene, camera)
    requestAnimationFrame(render)
}

render ()

// 双击全屏
window.addEventListener("dblclick", ()=>{
    const fullScreenElement = document.fullscreenElement;
    if(!fullScreenElement) {
        renderer.domElement.requestFullscreen()
    }else{
        document.exitFullscreen()
    }
})

// 屏幕自适应
window.addEventListener("resize",() => {
    // 更新摄像头
    camera.aspect = window.innerWidth / window.innerHeight;
    // 更新摄像机的投影矩阵 
    camera.updateProjectionMatrix();
    // 更新渲染器的像素比
    renderer.setSize(window.innerWidth, window.innerHeight);
    // 设置渲染器像素比例
    renderer.setPixelRatio(window.devicePixelRatio)
})