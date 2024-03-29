import * as THREE from 'three'
import { extend } from '@react-three/fiber'

// Paul West @prisoner849 https://discourse.threejs.org/u/prisoner849
// https://discourse.threejs.org/t/simple-curved-plane/26647/10
class BentPlaneGeometry extends THREE.PlaneGeometry {
    constructor(radius, ...args) {
        super(...args)
        const negative = radius < 0;
        radius = Math.abs(radius);
         let p = this.parameters
        let hw = p.width * 0.5
        let a = new THREE.Vector2(-hw, 0)
        let b = new THREE.Vector2(0, radius)
        let c = new THREE.Vector2(hw, 0)
        let ab = new THREE.Vector2().subVectors(a, b)
        let bc = new THREE.Vector2().subVectors(b, c)
        let ac = new THREE.Vector2().subVectors(a, c)
        let r = (ab.length() * bc.length() * ac.length()) / (2 * Math.abs(ab.cross(ac)))
        let center = new THREE.Vector2(0, radius - r)
        let baseV = new THREE.Vector2().subVectors(a, center)
        let baseAngle = baseV.angle() - Math.PI * 0.5
        let arc = baseAngle * 2
        let uv = this.attributes.uv
        let pos = this.attributes.position
        let mainV = new THREE.Vector2()
        for (let i = 0; i < uv.count; i++) {
            let uvRatio = 1 - uv.getX(i)
            let y = pos.getY(i)
            mainV.copy(c).rotateAround(center, arc * uvRatio)
            pos.setXYZ(i, mainV.x, y, negative ? mainV.y : -mainV.y);        
        }
        pos.needsUpdate = true
    }
    
}

class MeshSineMaterial extends THREE.MeshBasicMaterial {
    constructor(parameters = {}) {
        super(parameters)
        this.setValues(parameters)
        this.time = { value: 0 }
    }
    onBeforeCompile(shader) {
        shader.uniforms.time = this.time
        shader.vertexShader = `
      uniform float time;
      ${shader.vertexShader}
    `
        shader.vertexShader = shader.vertexShader.replace(
            '#include <begin_vertex>',
            `vec3 transformed = vec3(position.x, position.y + sin(time + uv.x * PI * 4.0) / 4.0, position.z);`
        )
    }
}

extend({ MeshSineMaterial, BentPlaneGeometry })



/*------------------------------
Lerp
------------------------------*/
export const lerp = (v0, v1, t) => v0 * (1 - t) + v1 * t

/*--------------------
Get Piramidal Index
--------------------*/
// Returns an array of decreasing index values in a pyramid shape, starting from the specified index with the highest value. These indices are often used to create overlapping effects among elements.
export const getPiramidalIndex = (array, index) =>
    array.map((_, i) =>
        index === i ? array.length : array.length - Math.abs(index - i)
    )
