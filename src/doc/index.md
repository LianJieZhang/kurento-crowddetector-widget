## Introduction

This [widget](https://github.com/wirecloud-fiware/kurento-crowddetector-widget/tree/develop) provide an easy way for use a video and detect people in the areas selected in your dashboard.

This CrowdDetector widget need a server running as middleware between you and a kurento media server.

The server is this [crowddetector service](https://github.com/wirecloud-fiware/kurento-example-services/tree/develop/kurento-crowddetector) provided by FiWare.

Latest version of this widget is always [provided in FIWARE lab](https://store.lab.fiware.org/search/keyword/CrowdDetector) where you can make use of it on the [Mashup portal](https://mashup.lab.fiware.org/)

## Settings

- **Server URL** - URL of the crowddetector server. - Default: `ws://130.206.81.33:8082/crowddetector`
- **User Camera** - If checked the widget will use the local webcam, if not will use a remote video. - Default: `true`
- **File Path** - The remote URL or path in the server (absolute with file:// or relative) to load when **User Camera** is unchecked. - Default: `videos/6.mp4`

## Wiring

### Input Endpoints

**None**

### Output Endpoints

**None**

## Usage

### Use a remote video.

You have to uncheck the **User Camera** setting and set in the **File Path** setting the video you want.

The video path can be a remote video (`http://...`) or a video in the server in absolute path (`file:///....`) or relative.

### Set polygons to detect.

When you have a video (or local webcam) loaded, the mode will be setted to "Editing" and will be green.

Once you can edit, when you click you will set a vertex and will add an edge with the previous vertex (if exists).

When you want to finish a polygon you can do a double-click (will add a vertex and finish with that) or click the first vertex of the polygon.

You can add all the polygons you want.

### Send the video with the polygons to detect.

Once you've finish at least one polygon, you have to ways to send the polygons to the server and start detecting.

1. Press the `Editing` button to stop the edit.
2. Wait 5 seconds without add or drag any vertex.

## Reference

- [Widget Source Code](https://github.com/wirecloud-fiware/kurento-crowddetector-widget/tree/develop)
- [Server Source Code](https://github.com/wirecloud-fiware/kurento-example-services/tree/develop/kurento-crowddetector)
- [FIWARE Mashup](https://mashup.lab.fiware.org/)

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
