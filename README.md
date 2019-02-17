react-native-emoji-panel
===

Customized emoji panel for react-native.

![screen-shoots](./Example/screen-shoots.gif)

## Installation

`npm install react-native-emoji-panel`

## Properties

#### `onPick`

* Required
* Type: Function

Press the emoji btn, then the function will be called with a argument `emoji`(the emoji code you picked).

#### `bgColor`

* Optional
* Type: String
* Default: `'#E2E2E2'`

The backgroundColor for your emoji panel.

#### `showSwitchMenu`

* Optional
* Type: Boolean
* Default: `true`

Control whether show the switch menu of your panel.

#### `onDelete`

* Optional
* Type: Function

If you set an event handler for this property, a delete btn would appear on your every emoji page of the panel, and the function will be called after you press the delete btn.

## Usage

```
import React, { Component } from 'react';
import {
  AppRegistry,
  TextInput,
  StyleSheet,
  Text,
  View
} from 'react-native';
import EmojiPanel from 'react-native-emoji-panel';

export default class Example extends Component {
  constructor(props) {
    super(props);
    this.handlePick = this.handlePick.bind(this);
    this.state = {
      inputText: ''
    }
  }

  render() {
    const { inputText } = this.state;

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={text => this.setState({ inputText: text })}
        />
        <EmojiPanel onPick={this.handlePick} />
      </View>
    );
  }

  handlePick(emoji) {
    const { inputText } = this.state;

    this.setState({ inputText: inputText + emoji });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEFEF',
  },
  input: {
    marginTop: 20,
    paddingHorizontal: 15,
    height: 40,
    backgroundColor: 'white',
  },
});

AppRegistry.registerComponent('Example', () => Example);
```

## Run example

```
cd ./Example
npm install
```

## License

[MIT](LICENSE)

