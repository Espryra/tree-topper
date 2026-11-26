const TreeTopperConfig = {
  ActivateOnSneak: true, // If true, the player must be sneaking to activate tree topper. If false, the player must not be sneaking to activate tree topper.
  RequireSilkTouch: false, // If true, the player must have a tool with the Silk Touch enchantment to activate tree topper. If false, any tool can be used to activate tree topper.

  MaxBlocks: 100, // The maximum number of blocks that can be chopped in one tree topper operation. This is to prevent lag and potential crashes.

  Logs: [
    "minecraft:oak_log",
    "minecraft:spruce_log",
    "minecraft:birch_log",
    "minecraft:jungle_log",
    "minecraft:acacia_log",
    "minecraft:dark_oak_log",
    "minecraft:crimson_stem",
    "minecraft:warped_stem",
    "minecraft:mangrove_log",
    "minecraft:cherry_log",
    // List of logs that can be chopped. Add or remove logs as needed.
  ],
  Tools: [
    // List of tools that can be used to chop the logs. Add or remove tools as needed.
    "minecraft:wooden_axe",
    "minecraft:stone_axe",
    "minecraft:copper_axe",
    "minecraft:iron_axe",
    "minecraft:golden_axe",
    "minecraft:diamond_axe",
    "minecraft:netherite_axe",
  ],
};

export default TreeTopperConfig;
