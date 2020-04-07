
var etPoints = {
    js : {
        path : 'src/main.js',
        template : 'public/index.html',
        output : 'dist'
    },
    ts : {
        path : 'src/main.tsx',
        template : 'public/index.html',
        output : 'dist'
    },
    mobile : {
        path : 'src/main.mobile.js',
        template : 'public/mobile.html',
        output : 'mDist'
    }
}

module.exports = {
    dev: {
        template: {
            title: 'hello world!',
            header: false,
            footer: false
        },
        etPoints
    },
    build: {
        template: {
            title: 'an of bitch',
            header: true,
            footer: false
        },
        etPoints
    },

    
}