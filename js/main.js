$(function() {
	// Other variables

	// Set the scene size.
	var WIDTH = $(window).innerWidth();
	var HEIGHT = $(window).innerHeight();

	// Set some camera attributes.
	var VIEW_ANGLE = 45;
	var ASPECT = WIDTH / HEIGHT;
	var NEAR = 0.1;
	var FAR = 10000;

	var cameraRotation = 0;

	// Get the DOM element to attach to
	var container =
	    document.querySelector('#fire');

	// Create a WebGL renderer, camera
	// and a scene
	var renderer = new THREE.WebGLRenderer({
		alpha: true,
	});
	var camera =
	    new THREE.PerspectiveCamera(
	        VIEW_ANGLE,
	        ASPECT,
	        NEAR,
	        FAR
	    );

	var scene = new THREE.Scene();

	// Add the camera to the scene.
	scene.add(camera);

	// Start the renderer.
	renderer.setSize(WIDTH, HEIGHT);

	// Attach the renderer-supplied
	// DOM element.
	container.appendChild(renderer.domElement);

	// Set up the sphere vars

	// New mesh for FIRE BASE
	var shape = new THREE.Shape();
	shape.moveTo( 24, -57);
	shape.lineTo( 17, -56 );
	shape.lineTo( 15, -53 );
	shape.lineTo( 15, -53 );
	shape.lineTo( 9, -54 );
	shape.lineTo( 6, -55 );
	shape.lineTo( 2, -52 );
	shape.lineTo( -6, -56 );
	shape.lineTo( -11, -56 );
	shape.lineTo( -15, -55 );
	shape.lineTo( -21, -52 );
	shape.lineTo( -22, -43 );
	shape.lineTo( -30, -39 );
	shape.lineTo( -41, -39 );
	shape.lineTo( -40, -33 );
	shape.lineTo( -43, -27 );
	shape.lineTo( -45, -25 );
	shape.lineTo( -45, -21 );
	shape.lineTo( -45, -21 );
	shape.lineTo( -48, -17 );
	shape.lineTo( -42, -9 );
	shape.lineTo( -45, -9 );
	shape.lineTo( -39, -4 );
	shape.lineTo( -34, 3 );
	shape.lineTo( -38, 9 );
	shape.lineTo( -35, 10 );
	shape.lineTo( -28, 18 );
	shape.lineTo( -22, 21 );
	shape.lineTo( -18, 25 );
	shape.lineTo( -18, 25 );
	shape.lineTo( -8, 22 );
	shape.lineTo( 0, 23 );
	shape.lineTo( 10, 24 );
	shape.lineTo( 21, 18 );
	shape.lineTo( 24, 23 );
	shape.lineTo( 26, 18 );
	shape.lineTo( 34, 17 );
	shape.lineTo( 30, 10 );
	shape.lineTo( 32, 6 );
	shape.lineTo( 26, 0 );
	shape.lineTo( 30, -2 );
	shape.lineTo( 28, -9 );
	shape.lineTo( 34, -7 );
	shape.lineTo( 25, -27 );
	shape.lineTo( 28, -31 );
	shape.lineTo( 29, -38 );
	shape.lineTo( 28, -45 );

	var extrudeSettings = {
		steps: 20,
		amount: 80,
		bevelEnabled: true,
		bevelThickness: 20,
		bevelSize: 5,
		bevelSegments: 1
	};

	var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
	var material = new THREE.MeshPhongMaterial( { color: 0xFFFFFF, wireframe:true, vertexColors: THREE.FaceColors } );
	baseFire = new THREE.Mesh( geometry, material ) ;
	baseFire.geometry.colorsNeedUpdate = true;


	// Move fire to be seen full on screen
	baseFire.position.z = -200;

	baseFire.rotation.y = 4;

	// Finally, add the sphere to the scene.
	scene.add(baseFire);

	// Add Light
	var light = new THREE.AmbientLight( 0xFFFFFF, .3 );
	scene.add( light );


	var spotLight = new THREE.SpotLight(0xffffff, 5, 190, 10, 4);
	scene.add(spotLight);

	// DRAW !
	function render() {
		renderer.render(scene, camera);
	}

	var number = -1;
	function update () {
		requestAnimationFrame(update);

		baseFire.rotation.y += 1/32 * 0.1;
		baseFire.rotation.x += 1/32 * 0.1;

		if(number + 1 < baseFire.geometry.faces.length) {
			number += 1;
			setColor(baseFire.geometry.faces[number], 0xFF0000);
			baseFire.geometry.colorsNeedUpdate = true;
		}

		render();
	}
	requestAnimationFrame(update);



	function setColor(face, color) {
		face.color = new THREE.Color(color);
	}

	$(window).on("resize", function() {
		WIDTH = $(window).innerWidth();
		HEIGHT = $(window).innerHeight();
		renderer.setSize(WIDTH, HEIGHT);
		camera.aspect = WIDTH / HEIGHT;
		camera.updateProjectionMatrix();
	});

});