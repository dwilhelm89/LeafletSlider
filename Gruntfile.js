module.exports = function( grunt ) {
    grunt.initConfig({
        uglify: {
            dist: {
                files: {
                    'dist/leaflet.SliderControl.min.js': 'dist/leaflet.SliderControl.min.js'
                }
            }
        },
        concat: {
            dist: {
                src: [
                    'SliderControl.js'
                ],
                dest: 'dist/leaflet.SliderControl.min.js'
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.registerTask('default', ['concat', 'uglify']);
};