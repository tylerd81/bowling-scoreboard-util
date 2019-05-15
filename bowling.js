const _FrameTypes = {
  OPEN: "open",
  STRIKE: "strike",
  SPARE: "spare",
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
      if (this.frames[frameNum].type === BowlingScoreBoard.FrameTypes.STRIKE && frameNum + 1 < this.frames.length) {
        // if it is a strike we add the next two rolls (if they exist) to the score for this frame
        let nextFrame = this.frames[frameNum + 1];
        let currScore = 10; // value of a strike

        // check for 10th frame and bonus rolls
        if (frameNum === 9) {
          console.log("will never happen");
          // if on the 10th frame and we have a strike, just add up all the rolls
          let rolls = this.frames[frameNum].rolls;
          this.frames[frameNum].score = rolls.reduce((total, roll) => total + roll);
        } else {
          // get value of next two rolls
          if (nextFrame.rolls.length === 2) {
            currScore += nextFrame.rolls[0] + nextFrame.rolls[1];
          } else {
            // only one roll on this frame
            currScore += nextFrame.rolls[0];

            // check if there is a next frame
            if (frameNum + 2 < this.frames.length) {
              let secondRoll = this.frames[frameNum + 2].rolls;
              if (secondRoll.length !== 0) {
                currScore += secondRoll[0];
              }
            }
          }
          this.frames[frameNum].score = currScore;
        }
      } else if (this.frames[frameNum].type === BowlingScoreBoard.FrameTypes.SPARE && frameNum + 1 < this.frames.length) {
        let currFrame = this.frames[frameNum];

        if (currFrame.rolls.length !== 2) {
          console.error(`Got a spare but ${currFrame.rolls.length} rolls!`);
          return;
        }

        let currScore = currFrame.rolls[0] + currFrame.rolls[1];

        // if it is a spare we add the next ONE roll

        if (frameNum + 1 < this.frames.length) {
          let rolls = this.frames[frameNum + 1].rolls;
          if (rolls.length !== 0) {
            currScore += rolls[0];
          }

        }

        this.frames[frameNum].score = currScore;
      } else {
        // otherwise just add up the rolls for this frame to get the score
        this.frames[frameNum].score = this.frames[frameNum].rolls.reduce((acc, n) => acc + n);
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

// let scoreBoard = new BowlingScoreBoard();

// let newFrames = [{
//     type: BowlingScoreBoard.FrameTypes.STRIKE,
//     rolls: [10],
//   },
//   {
//     type: BowlingScoreBoard.FrameTypes.OPEN,
//     rolls: [7],
//   },
//   {
//     type: BowlingScoreBoard.FrameTypes.OPEN,
//     rolls: [7, 1],
//   }
// ];

// scoreBoard.addFrame(newFrames[0], 0);
// scoreBoard.displayFrames();
// scoreBoard.addFrame(newFrames[1], 1);
// scoreBoard.displayFrames();
// scoreBoard.addFrame(newFrames[2], 1);
// scoreBoard.displayFrames();