# Tree Topper

A lightweight **Minecraft Bedrock Edition** behavior pack that chops vertically connected logs in one operation.

Break a log while meeting the activation requirements, and Tree Topper searches above and below the broken block for connected blocks of the **same log type**. It then chops the connected logs, up to the configured limit.

## Features

- Chop connected logs without breaking every block individually.
- Choose whether sneaking is required.
- Optionally require a **Silk Touch** axe.
- Configure which logs and tools are allowed.
- Limit the size of a tree-chopping operation.
- Consume tool durability for each additional log chopped.
- Support for multiple Overworld log types and Nether stems.
- Build a `.mcpack` file on **Windows or Linux** using Bun.

## Installation

### Option 1: Download a release

You don't need to build the project yourself if a prebuilt release is available.

1. Open the [Releases page](https://github.com/Espryra/tree-topper/releases).
2. Download the latest `tree-topper.mcpack` asset, if available.
3. Open the file with Minecraft Bedrock Edition to import it.
4. Enable **Tree Topper** under your world's **Behavior Packs**.

**No experimental features are required by the declared Script API.**

For a dedicated server, extract the `.mcpack` archive into a folder in the server's `development_behavior_packs` directory and enable the pack for the world.

## Configuration

Configuration is defined in [`src/treeTopper/TreeTopperConfig.ts`](src/treeTopper/TreeTopperConfig.ts).

| Setting | Default | Description |
| --- | --- | --- |
| `ActivateOnSneak` | `true` | `true` requires sneaking to activate Tree Topper; `false` requires not sneaking. |
| `RequireSilkTouch` | `false` | Requires Silk Touch on the axe when enabled. |
| `MaxBlocks` | `100` | Maximum number of **additional** connected logs that may be chopped. Operations exceeding the limit are skipped. |
| `Logs` | Vanilla log and stem ID list | Block IDs eligible for tree chopping. |
| `Tools` | Vanilla axe ID list | Item IDs allowed to trigger Tree Topper. |

Example:

```ts
const TreeTopperConfig = {
  ActivateOnSneak: true,
  RequireSilkTouch: false,

  MaxBlocks: 100,

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
  ],
  Tools: [
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
```

Use valid Minecraft Bedrock block and item identifiers when changing the lists.

**Important:** These settings are compiled into the script. After editing the configuration, run `bun run build` again and reinstall the updated pack. Changing a downloaded `.mcpack` does not expose a separate in-game configuration menu.

**Durability:** Each additional log chopped consumes one point of tool durability, regardless of Unbreaking. If the tool has insufficient remaining durability, the additional logs are not chopped.

## Build from source

### Requirements

- [Bun](https://bun.sh/) installed on Windows or Linux
- Git (or a downloaded source ZIP)

Clone the repository and install its dependencies:

```bash
git clone https://github.com/Espryra/tree-topper.git
cd tree-topper
bun install
```

Build the add-on:

```bash
bun run build
```

This compiles the TypeScript code and creates **`tree-topper.mcpack`** in the project root. Import that file into Minecraft or deploy its contents to your Bedrock server.

For development, compile without packaging:

```bash
bun run compile
```

Or automatically rebuild the script when source files change:

```bash
bun run watch
```

The compiled entry point is `scripts/Main.js`.

## How it works

1. Break an enabled log block using an allowed axe.
2. Meet the configured sneaking and Silk Touch requirements.
3. Tree Topper searches vertically above and below the broken block for the same log type.
4. If the connected logs fit within `MaxBlocks` and the tool has sufficient durability, the additional logs are removed.
5. The tool's durability is reduced, and the collected logs are dropped at the original block location.

Only vertically connected blocks of the same type are included. Horizontal or diagonal branches, neighboring trunks, and leaves are not removed. Tree Topper does not distinguish naturally generated logs from player-placed logs.

## Compatibility

- **Platform:** Minecraft Bedrock Edition (behavior pack)
- **Minimum engine version:** `1.26.65` (as declared in `manifest.json`)
- **Script API:** `@minecraft/server` `2.11.0` (stable runtime dependency)

No experimental gameplay settings or Beta APIs are required by the manifest. Check the release notes and your game/server version before installing.

## Source

Created by [Espryra](https://github.com/Espryra).

[View source code](https://github.com/Espryra/tree-topper) · [Download releases](https://github.com/Espryra/tree-topper/releases)
