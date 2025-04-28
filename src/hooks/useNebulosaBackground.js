import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function useNebulosaBackground() {
    const mountRef = useRef(null);

    useEffect(() => {

        if (!mountRef.current) return;

        // Init Scene
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x000000, 0.05);

        const camera = new THREE.PerspectiveCamera(
            75,
            mountRef.current.clientWidth / mountRef.current.clientHeight,
            0.1,
            1000
        );
        camera.position.set(0, 0, 5);

        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight); 
        mountRef.current.appendChild(renderer.domElement);

        // Cambiar el estilo para colocar el lienzo detrás de los otros elementos
        renderer.domElement.style.position = "absolute";
        renderer.domElement.style.alignSelf = "center";
        renderer.domElement.style.top = 0;
        renderer.domElement.style.left = 0;
        renderer.domElement.style.zIndex = -1;

        const geometry = new THREE.BufferGeometry();
        const particlesCount = 12000;
        const positions = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 40;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const textureLoader = new THREE.TextureLoader();
        const particleTexture = textureLoader.load(
            'https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/textures/sprites/circle.png'
        );

        const material = new THREE.PointsMaterial({
            size: 0.5,
            map: particleTexture,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            opacity: 1,
            color: new THREE.Color(0x000000),
        });

        const stars = new THREE.Points(geometry, material);
        scene.add(stars);

        const clock = new THREE.Clock();

        const animate = () => {
            requestAnimationFrame(animate);

            const elapsed = clock.getElapsedTime();

            stars.rotation.y = elapsed * 0.03;
            stars.rotation.x = Math.sin(elapsed * 0.15) * 0.1;
            stars.rotation.z = Math.cos(elapsed * 0.1) * 0.1;

            const hue = (elapsed * 5) % 360;
            stars.material.color.setHSL(hue / 360, 0.8, 0.6);

            stars.material.size = 0.15 + Math.sin(elapsed * 2.0) * 0.05;

            renderer.render(scene, camera);
        };

        animate();

        const handleResize = () => {
            if (mountRef.current) {
                camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            // Eliminar elementos de la escena correctamente
            if (scene && scene.dispose) {
                scene.dispose();
                geometry.dispose();
                material.dispose();
                renderer.dispose();
            }
            if(mountRef.current != undefined){
                mountRef.current.removeChild(renderer.domElement);
            }
        };
    }, []);

    return mountRef;
}
