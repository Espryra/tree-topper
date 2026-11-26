import {
  EntityComponentTypes,
  ItemComponentTypes,
  ItemStack,
  Player,
  type Block,
  type Dimension,
  type Vector3,
} from "@minecraft/server";
import TreeTopperConfig from "./TreeTopperConfig";

export default abstract class TreeTopperUtils {
  public static MineBlocks(
    player: Player,
    item: ItemStack,
    blockLocation: Vector3,
    blockTypeId: string,
  ): void {
    const blocks = TreeTopperUtils.GetLogBlocks(
      player.dimension,
      blockLocation,
      blockTypeId,
    );

    if (blocks.length === 0 || blocks.length > TreeTopperConfig.MaxBlocks) {
      return;
    }

    const durability = item.getComponent(ItemComponentTypes.Durability);

    if (!durability) {
      return;
    }
    if (durability.maxDurability - durability.damage < blocks.length) {
      player.sendError(
        "Your tool is too damaged to chop these logs! Please repair it first or use a different tool.",
      );
      return;
    }

    try {
      for (const block of blocks) {
        block.setType("minecraft:air");
      }

      const container = player.getComponent(
        EntityComponentTypes.Inventory,
      )?.container;

      if (!container) {
        throw new Error("Player inventory not found.");
      }

      durability.damage += blocks.length;
      container.setItem(player.selectedSlotIndex, item);

      const items: ItemStack[] = [];
      let amount = blocks.length;

      while (amount > 0) {
        const item = new ItemStack(blockTypeId, Math.min(amount, 64));

        items.push(item);
        amount -= item.amount;
      }

      for (const item of items) {
        player.dimension.spawnItem(item, blockLocation);
      }
    } catch (error) {
      console.error(
        `Error while trying to chop logs at ${blockLocation.x}, ${blockLocation.y}, ${blockLocation.z}`,
        error,
      );

      player.sendError("Failed to chop these logs!");
    }
  }
  public static GetLogBlocks(
    dimension: Dimension,
    blockLocation: Vector3,
    blockTypeId: string,
  ): Block[] {
    const blocks: Block[] = [];
    const queue: Vector3[] = [blockLocation];
    const visited = new Set<string>();
    const directions = [
      [0, 1, 0],
      [0, -1, 0],
    ] as const;

    visited.add(`${blockLocation.x},${blockLocation.y},${blockLocation.z}`);

    for (const location of queue) {
      for (const [dx, dy, dz] of directions) {
        const nextLocation = {
          x: location.x + dx,
          y: location.y + dy,
          z: location.z + dz,
        };

        const key = `${nextLocation.x},${nextLocation.y},${nextLocation.z}`;

        if (visited.has(key)) {
          continue;
        }

        visited.add(key);

        try {
          const block = dimension.getBlock(nextLocation);

          if (!block || block.typeId !== blockTypeId) {
            continue;
          }

          blocks.push(block);

          if (blocks.length > TreeTopperConfig.MaxBlocks) {
            return [];
          }

          queue.push(nextLocation);
        } catch {
          // Skip unloaded chunks or invalid coordinates.
          continue;
        }
      }
    }

    return blocks;
  }
}
