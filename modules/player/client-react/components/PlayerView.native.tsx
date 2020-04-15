import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { TranslateFunction } from '@gqlapp/i18n-client-react';

import { Asset } from 'expo-asset';
import { Audio, Video } from 'expo-av';
import * as Font from 'expo-font';

import { Button, primary } from '@gqlapp/look-client-react-native';
import { Ionicons } from '@expo/vector-icons';

const audioBookPlaylist = [
  {
    title: 'Hamlet - Act I',
    author: 'William Shakespeare',
    source: 'Librivox',
    uri: 'https://ia800204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act1_shakespeare.mp3',
    imageSource: 'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg'
  },
  {
    title: 'Hamlet - Act II',
    author: 'William Shakespeare',
    source: 'Librivox',
    uri: 'https://ia600204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act2_shakespeare.mp3',
    imageSource: 'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg'
  },
  {
    title: 'Hamlet - Act III',
    author: 'William Shakespeare',
    source: 'Librivox',
    uri: 'http://www.archive.org/download/hamlet_0911_librivox/hamlet_act3_shakespeare.mp3',
    imageSource: 'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg'
  },
  {
    title: 'Hamlet - Act IV',
    author: 'William Shakespeare',
    source: 'Librivox',
    uri: 'https://ia800204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act4_shakespeare.mp3',
    imageSource: 'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg'
  },
  {
    title: 'Hamlet - Act V',
    author: 'William Shakespeare',
    source: 'Librivox',
    uri: 'https://ia600204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act5_shakespeare.mp3',
    imageSource: 'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg'
  }
];

class Player extends React.Component {
  public state = {
    isPlaying: false,
    playbackInstance: null,
    currentIndex: 0,
    volume: 1.0,
    isBuffering: false
  };

  public async componentDidMount() {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
        shouldDuckAndroid: true,
        staysActiveInBackground: true,
        playThroughEarpieceAndroid: true
      });

      this.loadAudio();
    } catch (e) {
      // console.log(e);
    }
  }

  public async loadAudio() {
    const { currentIndex, isPlaying, volume } = this.state;

    try {
      const playbackInstance = new Audio.Sound();
      const source = {
        uri: audioBookPlaylist[currentIndex].uri
      };

      const status = {
        shouldPlay: isPlaying,
        volume
      };

      playbackInstance.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate);
      await playbackInstance.loadAsync(source, status, false);
      this.setState({ playbackInstance });
    } catch (e) {
      // console.log(e);
    }
  }

  public handlePlayPause = async () => {
    const { isPlaying, playbackInstance } = this.state;
    isPlaying ? await playbackInstance.pauseAsync() : await playbackInstance.playAsync();

    this.setState({
      isPlaying: !isPlaying
    });
  };

  public handlePreviousTrack = async () => {
    const { playbackInstance } = this.state;
    // let { laybackInstance, currentIndex } = this.state;
    let { currentIndex } = this.state;
    if (playbackInstance) {
      await playbackInstance.unloadAsync();
      currentIndex < audioBookPlaylist.length - 1 ? (currentIndex -= 1) : (currentIndex = 0);
      this.setState({
        currentIndex
      });
      this.loadAudio();
    }
  };

  public handleNextTrack = async () => {
    const { playbackInstance } = this.state;
    // let { playbackInstance, currentIndex } = this.state;
    let { currentIndex } = this.state;
    if (playbackInstance) {
      await playbackInstance.unloadAsync();
      currentIndex < audioBookPlaylist.length - 1 ? (currentIndex += 1) : (currentIndex = 0);
      this.setState({
        currentIndex
      });
      this.loadAudio();
    }
  };

  public renderFileInfo() {
    const { playbackInstance, currentIndex } = this.state;
    return playbackInstance ? (
      <View style={styles.trackInfo}>
        <Text style={[styles.trackInfoText, styles.largeText]}>{audioBookPlaylist[currentIndex].title}</Text>
        <Text style={[styles.trackInfoText, styles.smallText]}>{audioBookPlaylist[currentIndex].author}</Text>
        <Text style={[styles.trackInfoText, styles.smallText]}>{audioBookPlaylist[currentIndex].source}</Text>
      </View>
    ) : null;
  }

  public render() {
    return (
      <View>
        <Image
          style={styles.albumCover}
          source={{ uri: 'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg' }}
        />
        <View style={styles.controls}>
          <TouchableOpacity style={styles.control} onPress={this.handlePreviousTrack}>
            <Ionicons name="ios-skip-backward" size={48} color="#444" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.control} onPress={this.handlePlayPause}>
            {this.state.isPlaying ? (
              <Ionicons name="ios-pause" size={48} color="#444" />
            ) : (
              <Ionicons name="ios-play-circle" size={48} color="#444" />
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.control} onPress={this.handleNextTrack}>
            <Ionicons name="ios-skip-forward" size={48} color="#444" />
          </TouchableOpacity>
        </View>
        {this.renderFileInfo()}
      </View>
    );
  }
}

interface PlayerViewProps {
  t: TranslateFunction;
}

const PlayerView = ({ t }: PlayerViewProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.element}>
        <Player />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  element: {
    paddingTop: 30
  },
  box: {
    textAlign: 'center',
    marginLeft: 15,
    marginRight: 15
  },
  albumCover: {
    width: 250,
    height: 250
  },
  controls: {
    flexDirection: 'row'
  },
  control: {
    margin: 20
  },
  trackInfoText: {
    textAlign: 'center',
    flexWrap: 'wrap',
    color: '#550088'
  },
  largeText: {
    fontSize: 22
  },
  smallText: {
    fontSize: 16
  },
  control: {
    margin: 20
  },
  controls: {
    flexDirection: 'row'
  }
});

export default PlayerView;
