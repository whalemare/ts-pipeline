import { Process } from './Process'

export function pipeline<I, O>({ registry }: Process<I, O>) {
  new ReactInkRender().render(registry)

  await registry.run(void 0)

  process.exit(0)
}
