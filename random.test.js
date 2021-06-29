var RandomAB = require('./random.js') 
var seed = Math.floor((Math.random()+0.01)*10000);

describe("TestRandomDecimal", () => {
  test("Output should be deterministic with the same seed", () => {
    rnd = new RandomAB(43);
    expect(rnd.random_decimal()).toEqual(0.449);
    expect(rnd.random_decimal()).toEqual(0.883);
    expect(rnd.random_decimal()).toEqual(0.77);
    expect(rnd.random_decimal()).toEqual(0.272);
  });
  test("Output should keep between [0, 1)", () => {
    rnd = new RandomAB(seed);
    for (var i = 10000 - 1; i >= 0; i--) {
      output = rnd.random_decimal();
      expect(output).toBeLessThan(1);
      expect(output).toBeGreaterThanOrEqual(0);
    }
  });
});

describe("TestRandomBetween", () => {
  test("Output should be deterministic with the same seed", () => {
    rnd = new RandomAB(43);
    expect(rnd.random_between(1, 3)).toEqual(1.8980000000000001);
    expect(rnd.random_between(1, 3)).toEqual(2.766);
    expect(rnd.random_between(1, 3)).toEqual(2.54);
    expect(rnd.random_between(1, 3)).toEqual(1.544);
  });
  test("Output should keep between [1, 3)", () => {
    rnd = new RandomAB(seed);
    for (var i = 10000 - 1; i >= 0; i--) {
      output = rnd.random_between(1, 3);
      expect(output).toBeLessThan(3);
      expect(output).toBeGreaterThanOrEqual(1);
    }
  });
});

describe("TestRandomInt", () => {
  test("Output should be deterministic with the same seed", () => {
    rnd = new RandomAB(1);
    expect(rnd.random_int(1, 4)).toEqual(2);
    expect(rnd.random_int(1, 4)).toEqual(4);
    expect(rnd.random_int(1, 4)).toEqual(4);
    expect(rnd.random_int(1, 4)).toEqual(4);
    expect(rnd.random_int(1, 4)).toEqual(3);
    expect(rnd.random_int(1, 4)).toEqual(3);
    expect(rnd.random_int(1, 4)).toEqual(2);
    expect(rnd.random_int(1, 4)).toEqual(2);
    expect(rnd.random_int(1, 4)).toEqual(1);
    expect(rnd.random_int(1, 4)).toEqual(3);
  });
  test("Output should keep between [1, 3]", () => {
    rnd = new RandomAB(seed);
    for (var i = 10000 - 1; i >= 0; i--) {
      output = rnd.random_int(1, 3);
      expect(output).toBeLessThanOrEqual(3);
      expect(output).toBeGreaterThanOrEqual(1);
    }
  });
});

describe("TestRandomChoice", () => {
  test("Output should be deterministic with the same seed", () => {
    rnd = new RandomAB(43);
    lst = ['A', 'B', 'C'];
    expect(rnd.random_choice(lst)).toEqual('B');
    expect(rnd.random_choice(lst)).toEqual('C');
    expect(rnd.random_choice(lst)).toEqual('C');
    expect(rnd.random_choice(lst)).toEqual('A');
  });
  test("Output should be A, B or C", () => {
    rnd = new RandomAB(seed);
    lst = ['A', 'B', 'C'];
    for (var i = 10000 - 1; i >= 0; i--) {
      output = rnd.random_choice(lst);
      expect(output == 'A' || output == 'B' || output == 'C').toBe(true);
    }
  });
});

describe("TestSeedZero", () => {
  test("Seed zero should not work", () => {
    rnd = new RandomAB(0);
    for (var i = 10000 - 1; i >= 0; i--) {
      expect(rnd.random_decimal()).toEqual(0);
    }
  });
});

describe("TestNegativeSeed", () => {
  test("Negative seed should work", () => {
    rnd = new RandomAB(-12189);
    expect(rnd.random_decimal()).toEqual(0.798);
    expect(rnd.random_decimal()).toEqual(0.619);
    expect(rnd.random_decimal()).toEqual(0.554);
    for (var i = 10000 - 1; i >= 0; i--) {
      output = rnd.random_decimal();
      expect(output).toBeLessThan(1);
      expect(output).toBeGreaterThanOrEqual(0);
    }
  });
});

describe("TestPerlinNoise", () => {
  test("Output should be deterministic with the same seed", () => {
    rnd = new RandomAB(43);
    expect(rnd.noise(0, 0)).toEqual(0.24);
    expect(rnd.noise(1, 0)).toEqual(0.5295);
    expect(rnd.noise(2, 0)).toEqual(0.53125);
    expect(rnd.noise(3, 0)).toEqual(0.5683749999999999);
    expect(rnd.noise(0, 1)).toEqual(0.6228125);
    expect(rnd.noise(1, 1)).toEqual(0.5361875);
    expect(rnd.noise(2, 1)).toEqual(0.11668750000000001);
    expect(rnd.noise(3, 1)).toEqual(0.7484375);
    expect(rnd.noise(0, 2)).toEqual(0.6285625);
    expect(rnd.noise(1, 2)).toEqual(0.3854375);
    expect(rnd.noise(2, 2)).toEqual(0.6769375000000001);
    expect(rnd.noise(3, 2)).toEqual(0.0896875);
    expect(rnd.noise(0, 3)).toEqual(0.6341874999999999);
    expect(rnd.noise(1, 3)).toEqual(0.7606875);
    expect(rnd.noise(2, 3)).toEqual(0.3799375);
    expect(rnd.noise(3, 3)).toEqual(0.478875);
  });
  test("Output should keep between (0, 1)", () => {
    rnd = new RandomAB(seed);
    lst = ['A', 'B', 'C'];
    for (var x = 1000 - 1; x >= 0; x--) {
      for (var y = 100 - 1; y >= 0; y--) {
        output = rnd.noise(x, y);
        expect(output).toBeLessThan(1);
        expect(output).toBeGreaterThan(0);
      }
    }
  });
});