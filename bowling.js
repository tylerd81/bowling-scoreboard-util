const _FrameTypes = {
  OPEN: "open",
  STRIKE: "strike",
  SPARE: "spare",
  BONUS: "bonus"
};

class BowlingScoreBoard {

  static get FrameTypes() {
    return _FrameTypes;
  }
  constructor() {
    this.frames = [];
  }

  addFrame(frame, currentFrameNum) {
    this.frames.splice(currentFrameNum, 1, frame); // will replace frame each time

    for (let frameNum = 0; frameNum < this.frames.length; frameNum++) {
      let currFrame = this.frames[frameNum];
      let currScore = 0;
      let rolls = [];
      let nextFrame = null;

      switch (this.frames[frameNum].type) {
        case BowlingScoreBoard.FrameTypes.STRIKE:
          currScore = 10;

          // need values of next 2 rolls if they exist
          if (frameNum + 1 < this.frames.length) {
            nextFrame = this.frames[frameNum + 1];
            rolls = nextFrame.rolls;
            if (nextFrame.type === BowlingScoreBoard.FrameTypes.STRIKE) {
              currScore += 10;
              //check for next frame again
              if (frameNum + 2 < this.frames.length) {
                let nextNextFrame = this.frames[frameNum + 2];
                let rolls = nextNextFrame.rolls;
                if (rolls.length !== 0) {
                  currScore += rolls[0];
                }
              }
              currFrame.score = currScore;
            } else {
              currScore += rolls.reduce((total, score) => total + score);
              currFrame.score = currScore;
            }
          } else {
            currFrame.score = currScore;
          }
          break;

        case BowlingScoreBoard.FrameTypes.SPARE:
          currScore = 10;
          // check for value of next roll if any
          if (frameNum + 1 < this.frames.length) {
            nextFrame = this.frames[frameNum + 1];
            rolls = nextFrame.rolls;
            if (rolls.length !== 0) {
              currScore += rolls[0];
            }
          }
          currFrame.score = currScore;
          break;

        case BowlingScoreBoard.FrameTypes.OPEN:
          currFrame.score = currFrame.rolls.reduce((total, score) => total + score);
          break;

        case BowlingScoreBoard.FrameTypes.BONUS:
          // don't add the bonus roll in
          currFrame.score = 0;
          break;
      }
    }
  }

  totalScore() {
    let initialScore = 0;
    return this.frames.reduce((total, frame) => total + frame.score, initialScore);
  }

  displayFrames() {
    const displayFrame = function (frameData) {
      console.log('---------------------------------------');
      switch (frameData.type) {
        case BowlingScoreBoard.FrameTypes.OPEN:
          console.log("Open Frame");
          break;
        case BowlingScoreBoard.FrameTypes.SPARE:
          console.log("Spare");
          break;
        case BowlingScoreBoard.FrameTypes.STRIKE:
          console.log("Strike");
      }

      console.log(`Number of rolls: ${frameData.rolls.length}`);
      console.log(`Score: ${frameData.score}`);
      console.log('---------------------------------------\n');
    }

    this.frames.forEach(frame => displayFrame(frame));
  }
}

module.exports = {
  BowlingScoreBoard
};