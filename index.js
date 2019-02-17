import React, { Component, PropTypes } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Emoji from './lib/emoji';

const WINDOW_WIDTH = Dimensions.get('window').width;

class EmojiPanel extends Component {
  constructor(props) {
    super(props);
    this.EMOJI_ARR = this.formatEmojiArr(Emoji.map);
  }

  render() {
    const { bgColor } = this.props;
    const style4Bg = bgColor ? { backgroundColor: bgColor } : { backgroundColor: '#E2E2E2' };

    return (
      <View>
        <ScrollView
          style={[styles.panel, style4Bg]}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          bounces={false}
          pagingEnabled={true}
        >
          {this.renderPages()}
        </ScrollView>
      </View>
    );
  }

  renderPages() {
    const {
      showSwitchMenu,
      onDelete
    } = this.props;

    return this.EMOJI_ARR.map((pageData, pageNum) => {
      return (
        <View style={styles.page} key={pageNum}>
          { pageData.map((emoji, index) => this.renderBtn(emoji, index)) }
          { showSwitchMenu !== false && this.renderSwitchMenu(pageNum) }
        </View>
      );
    });
  }

  renderBtn(emoji, key) {
    if (emoji === ':delete:') {
      const { onDelete } = this.props;

      return (
        <TouchableOpacity style={styles.btn} key={key} onPress={onDelete.bind(this)}>
          <Image style={styles.iconDelete} source={require('./images/icon-delete.png')}/>
        </TouchableOpacity>
      );
    }

    const { onPick } = this.props;

    return (
      <TouchableOpacity style={styles.btn} key={key} onPress={onPick.bind(this, emoji)}>
        <Text style={styles.emoji} allowFontScaling={false}>{emoji}</Text>
      </TouchableOpacity>
    );
  }

  renderSwitchMenu(index) {
    const
      pages = this.EMOJI_ARR.length,
      menuWidth = 6 * pages + 8 * ( pages - 1 ),
      style4Menu = {
        left: ( WINDOW_WIDTH - menuWidth ) / 2,
        width: menuWidth
      };
    let items = [];

    for (let i = 0; i < pages; i++) {
      const style4Item = i === index ? styles.switchItemCrt : styles.switchItemGrey;

      items.push(<View style={[styles.switchItem, style4Item]} key={i}></View>);
    }
    return <View style={[styles.switchMenu, style4Menu]}>{items}</View>;
  }

  formatEmojiArr(emojiMap) {
    const { onDelete } = this.props;
    const size = onDelete ? 26 : 27;
    let srcArr = [],
        disArr = [];

    emojiMap.forEach((v) => { srcArr.push(v); });

    for (let i = 0; i < srcArr.length; i += size) {
      let emojis = srcArr.slice(i, i + size);

      if (onDelete) {
        emojis.push(':delete:');
      }
      disArr.push(emojis);
    }
    return disArr;
  }
};

EmojiPanel.propTypes = {
  bgColor: PropTypes.string,
  showSwitchMenu: PropTypes.bool,
  onDelete: PropTypes.func,
  onPick: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  panel: {
    width: WINDOW_WIDTH,
    height: 160,
  },
  page: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 20,
    paddingHorizontal: 26,
    width: WINDOW_WIDTH,
    height: 160,
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    width: Math.floor((WINDOW_WIDTH - 52) / 9) - 1,
    height: 30,
  },
  emoji: {
    color: '#000',
    fontSize: 20,
  },
  iconDelete: {
    width: 22,
    height: 16,
    resizeMode: 'stretch',
  },
  switchMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 15,
    height: 6,
  },
  switchItem: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  switchItemCrt: {
    backgroundColor: '#666666',
  },
  switchItemGrey: {
    backgroundColor: '#CCCCCC',
  },
});

export default EmojiPanel;
