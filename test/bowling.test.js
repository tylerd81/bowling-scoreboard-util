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

test("An empty scoreboard should have a score of 0", () => {
  let scoreBoard = new BowlingScoreBoard();
  expect(scoreBoard.totalScore()).toBe(0);
});

test("Total score should be 168", () => {
  let frames = [{
      type: BowlingScoreBoard.FrameTypes.STRIKE,
      rolls: [10]
    },
    {
      type: BowlingScoreBoard.FrameTypes.SPARE,
      rolls: [7, 3]
    },
    {
      type: BowlingScoreBoard.FrameTypes.OPEN,
      rolls: [7, 2]
    },
    {
      type: BowlingScoreBoard.FrameTypes.SPARE,
      rolls: [9, 1]
    },
    {
      type: BowlingScoreBoard.FrameTypes.STRIKE,
      rolls: [10]
    },
    {
      type: BowlingScoreBoard.FrameTypes.STRIKE,
      rolls: [10]
    },
    {
      type: BowlingScoreBoard.FrameTypes.STRIKE,
      rolls: [10]
    },
    {
      type: BowlingScoreBoard.FrameTypes.OPEN,
      rolls: [2, 3]
    },
    {
      type: BowlingScoreBoard.FrameTypes.SPARE,
      rolls: [6, 4]
    },
    {
      type: BowlingScoreBoard.FrameTypes.SPARE,
      rolls: [7, 3]
    },
    {
      type: BowlingScoreBoard.FrameTypes.BONUS,
      rolls: [3]
    },
  ];

  let scoreboard = new BowlingScoreBoard();

  frames.forEach((frame, idx) => scoreboard.addFrame(frame, idx));
  expect(scoreboard.totalScore()).toBe(168);
});

test("Total score should be 51", () => {
  let frames = [{
      type: BowlingScoreBoard.FrameTypes.OPEN,
      rolls: [3, 5]
    },
    {
      type: BowlingScoreBoard.FrameTypes.STRIKE,
      rolls: [10]
    },
    {
      type: BowlingScoreBoard.FrameTypes.STRIKE,
      rolls: [10]
    },
    {
      type: BowlingScoreBoard.FrameTypes.OPEN,
      rolls: [3, 2]
    }
  ];

  let scoreboard = new BowlingScoreBoard();

  frames.forEach((frame, idx) => scoreboard.addFrame(frame, idx));
  expect(scoreboard.totalScore()).toBe(51);

});