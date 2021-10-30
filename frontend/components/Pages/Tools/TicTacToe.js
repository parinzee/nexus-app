import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Button,
} from "react-native";
import { MaterialCommunityIcons as Icon } from "react-native-vector-icons";
import { robotPlayImpossible } from "./Minimax";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gameState: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
      currentPlayer: 1,
    };
  }

  componentDidMount() {
    this.initializeGame();
  }

  initializeGame = () => {
    this.setState({
      gameState: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
      currentPlayer: 1,
    });
  };

  getWinner = () => {
    const NUM_TILES = 3;
    var arr = this.state.gameState;
    var sum;

    //check rows
    for (var i = 0; i < NUM_TILES; i++) {
      sum = arr[i][0] + arr[i][1] + arr[i][2];
      if (sum == 3) {
        return 1;
      } else if (sum === -3) {
        return -1;
      }
    }

    //check columns
    for (var i = 0; i < NUM_TILES; i++) {
      sum = arr[0][i] + arr[1][i] + arr[2][i];
      if (sum == 3) {
        return 1;
      } else if (sum === -3) {
        return -1;
      }
    }

    //check diagonals
    sum = arr[0][0] + arr[1][1] + arr[2][2];
    if (sum == 3) {
      return 1;
    } else if (sum === -3) {
      return -1;
    }
    sum = arr[2][0] + arr[1][1] + arr[0][2];
    if (sum == 3) {
      return 1;
    } else if (sum === -3) {
      return -1;
    }

    //there are no winners
    return 0;
  };

  onTilePress = (row, col) => {
    //don't allow tile to change
    var value = this.state.gameState[row][col];
    if (value !== 0) {
      return;
    }

    var currentPlayer = this.state.currentPlayer;

    //set the correct tile
    var arr = this.state.gameState.slice();
    arr[row][col] = currentPlayer;
    this.setState({
      gameState: arr,
      currentPlayer: currentPlayer * -1,
    });

    if (currentPlayer === 1) {
      this.setState({
        gameState: arr,
        currentPlayer: currentPlayer * -1,
      });
      var location = robotPlayImpossible(arr);
      try {
        arr[location[0]][location[1]] = -1;
      } catch {
        var instance = this;
        Alert.alert("Tie!", "Good job!");
        setTimeout(function () {
          instance.initializeGame();
        }, 1200);
        return 0;
      }
      this.setState({
        gameState: arr,
        currentPlayer: currentPlayer,
      });
    }

    var winner = this.getWinner();
    if (winner == 1) {
      var instance = this;
      Alert.alert("Impossible...");
      setTimeout(function () {
        instance.initializeGame();
      }, 1200);
    } else if (winner == -1) {
      var instance2 = this;
      Alert.alert("Parin's AI won!", "Give up yet?");
      setTimeout(function () {
        instance2.initializeGame();
      }, 1200);
    }
  };

  onNewGamePress = () => {
    this.initializeGame();
  };

  renderIcon = (row, col) => {
    var value = this.state.gameState[row][col];
    switch (value) {
      case 1:
        return <Icon name="close" style={styles.tileX} />;
      case -1:
        return <Icon name="circle-outline" style={styles.tileO} />;
      default:
        return <View />;
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ color: "white", fontSize: 20 }}>
          {this.state.currentPlayer === 1 ? "Your turn!" : "Ai Thinking"}
        </Text>
        <View style={{ paddingTop: 50 }} />

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => this.onTilePress(0, 0)}
            style={[styles.tile, { borderLeftWidth: 0, borderTopWidth: 0 }]}
          >
            {this.renderIcon(0, 0)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onTilePress(0, 1)}
            style={[styles.tile, { borderTopWidth: 0 }]}
          >
            {this.renderIcon(0, 1)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onTilePress(0, 2)}
            style={[styles.tile, { borderRightWidth: 0, borderTopWidth: 0 }]}
          >
            {this.renderIcon(0, 2)}
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => this.onTilePress(1, 0)}
            style={[styles.tile, { borderLeftWidth: 0 }]}
          >
            {this.renderIcon(1, 0)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onTilePress(1, 1)}
            style={[styles.tile, {}]}
          >
            {this.renderIcon(1, 1)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onTilePress(1, 2)}
            style={[styles.tile, { borderRightWidth: 0 }]}
          >
            {this.renderIcon(1, 2)}
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => this.onTilePress(2, 0)}
            style={[styles.tile, { borderLeftWidth: 0, borderBottomWidth: 0 }]}
          >
            {this.renderIcon(2, 0)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onTilePress(2, 1)}
            style={[styles.tile, { borderBottomWidth: 0 }]}
          >
            {this.renderIcon(2, 1)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onTilePress(2, 2)}
            style={[styles.tile, { borderRightWidth: 0, borderBottomWidth: 0 }]}
          >
            {this.renderIcon(2, 2)}
          </TouchableOpacity>
        </View>

        <View style={{ paddingTop: 50 }} />
        <Button
          color="#01BAEF"
          title="New Game"
          onPress={this.onNewGamePress}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    alignItems: "center",
    justifyContent: "center",
  },

  tile: {
    borderWidth: 10,
    width: 100,
    height: 100,
    backgroundColor: "#f2e1c1",
  },

  tileX: {
    color: "#F05D5E",
    fontSize: 60,
    marginLeft: 10,
    marginTop: 10,
  },

  tileO: {
    color: "#094D92",
    fontSize: 60,
    marginLeft: 10,
    marginTop: 10,
  },
});
