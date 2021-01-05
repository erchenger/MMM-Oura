# MagicMirrorModule-Oura

This is a module for the [MagicMirror²](https://github.com/MichMich/MagicMirror/). It displays sleep data from your Oura sleep tracker.

## Installation

1. Go to MagicMirror's `modules`.
2. Run `git clone https://github.com/erchenger/MagicMirrorModule-Oura`. 
3. Go into the newly created directory: `cd MagicMirrorModule-Oura`.
4. Run `npm install` to install the node dependencies.

To use this module, add the following configuration block to the modules array in the `config/config.js` file:

```js
var config = {
  modules: [
    {
      module: "MagicMirrorModule-Oura",
      position: 'top_right', // Or any other region
      config: {
        // See below for configurable options
      }
    }
  ]
};
```

## Configuration options

| Option    | Description                                                                                                     |
| --------- | --------------------------------------------------------------------------------------------------------------- |
| `apiKey` | _Required_ <b>Your [Oura personal access token](https://cloud.ouraring.com/docs/authentication#personal-access-tokens)</b>                                                                                   |
| `interval` | _Optional_ Interval in seconds how often the data should be fetched <br><br>**Type:** `int`(seconds) <br>Default 3600 seconds (1 hour) |
