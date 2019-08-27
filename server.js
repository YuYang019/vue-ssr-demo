const express = require('express');
const fs = require('fs');
const { createBundleRenderer } = require('vue-server-renderer');
const path = require('path');
const resolve = file => path.resolve(__dirname, file);

const templatePath = resolve('./src/index.template.html');
const serverInfo =
    `express/${require('express/package.json').version} ` +
    `vue-server-renderer/${
        require('vue-server-renderer/package.json').version
    }`;

const app = express();

let readyPromise;
let renderer;
const isProd = process.env.NODE_ENV === 'production';

function createRenderer(bundle, options) {
    return createBundleRenderer(bundle, options);
}

if (isProd) {
    const template = fs.readFileSync(templatePath, 'utf-8');
    const bundle = require('./dist/vue-ssr-server-bundle.json');
    const clientManifest = require('./dist/vue-ssr-client-manifest.json');
    renderer = createRenderer(bundle, {
        template,
        clientManifest
    });
} else {
    readyPromise = require('./build/dev-server.js.js')(
        app,
        templatePath,
        (bundle, options) => {
            renderer = createRenderer(bundle, options);
        }
    );
}

const serve = (path, cache) =>
    express.static(resolve(path), {
        maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
    });

// app.use(compression({ threshold: 0 }));
// app.use(favicon('./public/logo-48.png'))
app.use('/dist', serve('./dist', true));
// app.use('/public', serve('./public', true))
// app.use('/manifest.json', serve('./manifest.json', true))
app.use('/service-worker.js', serve('./dist/service-worker.js'));

function render(req, res) {
    const s = Date.now();

    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Server', serverInfo);

    const handleError = err => {
        if (err.url) {
            res.redirect(err.url);
        } else if (err.code === 404) {
            res.status(404).send('404 | Page Not Found');
        } else {
            // Render Error Page or Redirect
            res.status(500).send('500 | Internal Server Error');
            console.error(`error during render : ${req.url}`);
            console.error(err.stack);
        }
    };

    const context = {
        title: 'Vue HN 2.0', // default title
        url: req.url
    };
    renderer.renderToString(context, (err, html) => {
        if (err) {
            return handleError(err);
        }
        console.log('render to String');
        res.send(html);
        if (!isProd) {
            console.log(`whole request: ${Date.now() - s}ms`);
        }
    });
}

app.get('*', isProd ? render : (req, res) => {
    readyPromise.then(() => render(req, res));
});

app.listen(8080, err => {
    console.log(`server started at localhost:${8080}`);
});
