Kurento CrowdDetector widget
======================

The kurento CrowdDetector widget is a WireCloud widget that provides an easy way for use a video and detect people in the areas selected in your dashboard.

This CrowdDetector widget need a
[service](https://github.com/wirecloud-fiware/kurento-example-services-scala)
running as middleware between you and a kurento media server. You can find an
instance of this service on FIWARE Lab
(https://wirecloudkurento.lab.fiware.org/). This server is used by default, but
you can deploy your own version and configure this widget for using it instead.

Latest version of this widget is always [provided in FIWARE lab](https://store.lab.fiware.org/search/keyword/KurentoStarterKit) where you can make use of it on the [Mashup portal](https://mashup.lab.fiware.org/)

Build
-----

Be sure to have installed [Node.js](http://node.js) and [Bower](http://bower.io)
in your system. For example, you can install it on Ubuntu and Debian running the
following commands:

```bash
curl -sL https://deb.nodesource.com/setup | sudo bash -
sudo apt-get install nodejs
sudo apt-get install npm
sudo npm install -g bower
```

If you want the last version of the widget, you should change to the `develop` branch:

```bash
git checkout develop
```

Install other npm dependencies by running: (need root because some libraries use applications, check package.json before to be sure)

```bash
sudo npm install
```

For build the widget you need download grunt:

```bash
sudo npm install -g grunt-cli
```

And now, you can use grunt:

```bash
grunt
```

If everything goes well, you will find a wgt file in the `dist` folder.

## Documentation

Documentation about how to use this widget is available on the
[User Guide](src/doc/userguide.md). Anyway, you can find general information
about how to use widgets on the
[WireCloud's User Guide](https://wirecloud.readthedocs.io/en/stable/user_guide/)
available on Read the Docs.

## Copyright and License

Copyright 2015 CoNWeT Lab., Universidad Politecnica de Madrid

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
