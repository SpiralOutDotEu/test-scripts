function twoSum(num, target) {
  const map = new Map();

  for (let i = 0; i < num.length; i++) {
    const complement = target - num[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  throw new Error("No two numbers reach target");
}

// example
const nums = [2, 7, 12, 15];
const target = 9;
console.log(twoSum(nums, target));
