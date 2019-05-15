// import BowlingScoreBoard from "../utils/bowling";
const {
  BowlingScoreBoard
} = require("../bowling");

test("The total Score should be 30", () => {
  let scoreBoard = new BowlingScoreBoard();

  let newFrames = [{
      type: BowlingScoreBoard.FrameTypes.STRIKE,
      rolls: [10],
    },
    {
      type: BowlingScoreBoard.FrameTypes.STRIKE,
      rolls: [10],
    },
  ];

  scoreBoard.addFrame(newFrames[0], 0);
  scoreBoard.addFrame(newFrames[1], 1);
  expect(scoreBoard.totalScore()).toBe(30);
});

test("Open frame should be a score of 7", () => {
  let scoreBoard = new BowlingScoreBoard();

  let newFrames = [{
    type: BowlingScoreBoard.FrameTypes.OPEN,
    rolls: [5, 2],
  }, ];

  scoreBoard.addFrame(newFrames[0], 0);
  expect(scoreBoard.totalScore()).toBe(7);
});

test("Roll a spare and total score should be 22", () => {
  let scoreBoard = new BowlingScoreBoard();

  let newFrames = [{
      type: BowlingScoreBoard.FrameTypes.SPARE,
      rolls: [5, 5],
    },
    {
      type: BowlingScoreBoard.FrameTypes.OPEN,
      rolls: [5, 2],
    },
  ];

  scoreBoard.addFrame(newFrames[0], 0);
  scoreBoard.addFrame(newFrames[1], 1);
  expect(scoreBoard.totalScore()).toBe(22);
});

test("Check for a perfect game", () => {
  let scoreBoard = new BowlingScoreBoard();
  for (let i = 0; i < 10; i++) {
    scoreBoard.addFrame({
      type: BowlingScoreBoard.FrameTypes.STRIKE,
      rolls: [10]
    }, i);
  }
  scoreBoard.addFrame({
    type: BowlingScoreBoard.FrameTypes.STRIKE,
    rolls: [10]
  }, 10);

  expect(scoreBoard.totalScore()).toBe(300);
});

test("A single strike should have a score of 10", () => {
  let scoreBoard = new BowlingScoreBoard();

  let newFrame = {
    type: BowlingScoreBoard.FrameTypes.STRIKE,
    rolls: [10],
  };

  scoreBoard.addFrame(newFrame, 0);
  expect(scoreBoard.totalScore()).toBe(10);
});