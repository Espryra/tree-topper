import {
  ItemComponentTypes,
  PlayerBreakBlockAfterEvent,
  world,
} from "@minecraft/server";
import TreeTopperConfig from "./TreeTopperConfig";
import TreeTopperUtils from "./TreeTopperUtils";

export default class TreeTopperHandler {
  public constructor() {
    world.afterEvents.playerBreakBlock.subscribe((event) =>
      this.OnBreak(event),
    );
  }

  private OnBreak(event: PlayerBreakBlockAfterEvent): void {
    const {
      block,
      player,
      itemStackAfterBreak: item,
      brokenBlockPermutation: brokenBlock,
    } = event;

    if (
      !item ||
      !TreeTopperConfig.Logs.includes(brokenBlock.type.id) ||
      !TreeTopperConfig.Tools.includes(item.typeId) ||
      player.isSneaking !== TreeTopperConfig.ActivateOnSneak
    ) {
      return;
    }
    if (TreeTopperConfig.RequireSilkTouch) {
      const enchantComponent = item.getComponent(
        ItemComponentTypes.Enchantable,
      );

      if (
        !enchantComponent ||
        !enchantComponent.getEnchantment("minecraft:silk_touch")
      ) {
        return;
      }
    }

    TreeTopperUtils.MineBlocks(
      player,
      item,
      block.location,
      brokenBlock.type.id,
    );
  }
}
