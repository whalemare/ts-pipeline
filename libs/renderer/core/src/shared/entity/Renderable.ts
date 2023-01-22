export interface Renderable<Item = void, RenderOutput = void> {
  render(item: Item, frame: number): RenderOutput
}
