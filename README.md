# Yet another changelog generator based on git logs
Yeah, I know, you shouldn't generate changelog based on git logs - commit messages.
But I think that it's still better to have any changelog than none at all. And you can
automate it too!

## Usage
You can use this project either as a standalone CLI util or as a dependency in your
node.js project.

### Installation
If you plan to use the project as a standalone util, install it with the ```-g``` (global) flag.

```bash
npm install -g cambios
```

## CLI Usage
```
cambios [--path /home/user/projects/whatever] [--json] [--headAlias 3.0.15] [--template mylog.handlebars] [--noFilter]
```
By default, all the attributes are optional and have sensible defaults.

 - path: where is your git repository located, defaults to current working directory
 - json: should the output be a valid JSON object?
 - headAlias: label for the commits newer than latest release tag. defaults to ```HEAD```
 - template: you can override the [handlebars template](http://handlebarsjs.com/) used to render changelog. Defaults to [default.handlebars](https://github.com/todvora/cambios/blob/master/src/default.handlebars)
 - noFilter: disable filtering of commits containing only a semver number as a message (release or tagging commits, see lower)


 Output to stdout is either a rendered template (markdown by default, see lower) or a JSON object.

## Dependency Usage

The library exports one function, accepting a configuration object with the same
keys as the command line arguments. It returns a promise.

```js
var cambios = require('cambios');
cambios({
  path: '/home/user/projects/whatever',
  json: true,
  headAlias: '3.0.15',
  template: 'mylog.handlebars'
  noFilter: false
})
.then(data => console.log(data))
.catch(err => console.error(err));
```

## Example output
```bash
cambios --path /home/todvora/projects/gitbook-plugin-image-captions
```

```
## HEAD / 2016-11-06
  * releases produced only on latest version of gitbook
  * dev dependencies update

Contributors: Tomas Dvorak

## 3.1.0 / 2016-11-04
  * dependencies update
  * #19: page variables interpolation inside image caption
  * processing based on HTML rendered pages, removed regex markdown parsing
  * travis - node version
  * dependencies update
  * tests compare html structure instead of plain strings

Contributors: Tomas Dvorak

## 3.0.2 / 2016-07-13
  * travis - test in gitbook 3.2
  * Fixed #17: Plugin breaks when there is a item in SUMMARY using a Anchor link
  * minor code cleanup

Contributors: Tomas Dvorak

## 3.0.1 / 2016-06-20
  * Merge branch &#x27;tianshuo-patch-1&#x27;
  * added test for #15
  * Fixed space formatting
  * Delete redundant closing brace
  * Checks for link existance in SUMMARY.md
  * dropped travis support for gitbook 3.0

Contributors: Tianshuo, Tomas Dvorak

```

## Filtering
The library filters all commits, that has only a version number as a message (like ```3.0.5``` or ```v1.2.5```). Those commits have usually zero value in the changelog anyway.
If you don't want to be this commits filtered, use the ```noFilter``` option (both CLI and depedency usage available).



For an example JSON output and the structure provided to a template, see [this test case](https://github.com/todvora/cambios/blob/master/tests/assets/expected.json).

## License
[MIT License](https://github.com/todvora/cambios/blob/master/LICENSE.txt), see a [human readable explanation](http://choosealicense.com/licenses/mit/) of the MIT license.
