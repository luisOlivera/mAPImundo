var satelite;

require([
    "esri/views/3d/externalRenderers",
    "esri/geometry/SpatialReference"],
function(externalRenderers, SpatialReference) {
    satelite = {
        renderer: null,     
        camera: null,       
        scene: null,        
        ambient: null,      
        sun: null,          
        iss: null,          
        issScale: 200000,                                                    
        issMaterial: new THREE.MeshLambertMaterial({ color: 0xe03110 }),    
        cameraPositionInitialized: false,
        positionHistory: [],    
      
        setup: function(context) {
            this.renderer = new THREE.WebGLRenderer({
                context: context.gl,
                premultipliedAlpha: false
            });
            this.renderer.setPixelRatio(window.devicePixelRatio);
            this.renderer.setSize(context.camera.fullWidth, context.camera.fullHeight);
            this.renderer.autoClearDepth = false;
            this.renderer.autoClearStencil = false;
            this.renderer.autoClearColor = false;
            this.scene = new THREE.Scene();
            var cam = context.camera;
            this.camera = new THREE.PerspectiveCamera(cam.fovY, cam.aspect, cam.near, cam.far);
            this.ambient = new THREE.AmbientLight( 0xffffff, 0.5);
            this.scene.add(this.ambient);
            this.sun = new THREE.DirectionalLight(0xffffff, 0.5);
            this.scene.add(this.sun);

            var issMeshUrl = "obj/iss.obj";
            var loader = new THREE.OBJLoader(THREE.DefaultLoadingManager);
            loader.load(issMeshUrl, function(object3d) {
                console.log("ISS mesh loaded.");
                this.iss = object3d;
                this.iss.traverse( function ( child ) {
                    if ( child instanceof THREE.Mesh ) {
                        child.material = this.issMaterial;
                    }
                }.bind(this));

                this.iss.scale.set(this.issScale,this.issScale,this.issScale);
                this.scene.add(this.iss);
            }.bind(this), undefined, function(error) {
                console.error("Error loading ISS mesh. ", error);
            });
      
            this.positionHistory.push({
                pos: [view.center.latitude, view.center.longitude, 400 * 1000]
            });

            context.resetWebGLState();
        },

        render: function(context) {
            var cam = context.camera;
            this.camera.position.set(cam.eye[0], cam.eye[1], cam.eye[2]);
            this.camera.up.set(cam.up[0], cam.up[1], cam.up[2]);
            this.camera.lookAt(new THREE.Vector3(cam.center[0], cam.center[1], cam.center[2]));
            this.camera.projectionMatrix.fromArray(cam.projectionMatrix);

            if (this.iss) {
                var transform = new THREE.Matrix4();
                transform.fromArray(externalRenderers.renderCoordinateTransformAt(view, [
                view.center.longitude,view.center.latitude, 400000], SpatialReference.WGS84, new Array(16)));
                this.iss.position.set(transform.elements[12], transform.elements[13], transform.elements[14]);
                
                if (this.positionHistory.length > 0 &&  !this.cameraPositionInitialized) {
                    this.cameraPositionInitialized = true;
                    view.goTo({
                        target: [view.center.longitude, view.center.latitude],
                        zoom: 0,
                    });
                }
            }

            var l = context.sunLight;
            this.sun.position.set(
                l.direction[0],
                l.direction[1],
                l.direction[2]
            );
            this.sun.intensity = l.diffuse.intensity;
            this.sun.color = new THREE.Color(l.diffuse.color[0], l.diffuse.color[1], l.diffuse.color[2]);
            this.ambient.intensity = l.ambient.intensity;
            this.ambient.color = new THREE.Color(l.ambient.color[0], l.ambient.color[1], l.ambient.color[2]);

            this.renderer.resetGLState();
            this.renderer.render(this.scene, this.camera);

            externalRenderers.requestRender(view);
            context.resetWebGLState();
        }
    }
});