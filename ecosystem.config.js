module.exports = {
    apps: [{
        name: 'app',
        script: './index.js',
        instances: 4,
        exec_mode: 'cluster'
    }]
}