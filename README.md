
# zupre

A **~55kb** boilerplate card for Home Assistant.

#### Stack:
- [TypeScript](https://github.com/microsoft/TypeScript)
- [zustand](https://github.com/pmndrs/zustand) (state management)
- [styled-components](https://github.com/styled-components/styled-components) (styles)
- [custom-card-helpers](https://github.com/custom-cards/custom-card-helpers) (Home Assistant utils + types)
- [home-assistant-js-websocket](https://github.com/home-assistant/home-assistant-js-websocket) (Home Assistant types)
- [webpack](https://github.com/webpack/webpack) (build system)
- [ESLint](https://github.com/eslint/eslint) (linter)
- [Husky](https://github.com/typicode/husky) (pre-commit hooks)

## Hooks

### `useEntity(entityId: string)`

Retrieves an entity by ID from the Home Assistant state. The entity will be `undefined` if the state
of HA is not loaded or if the entity does not exist.

**Returns:** `HassEntity | undefined`

**Example:**

```ts
...

const Card = () => {
  const sun = useEntity('sun.sun'); // sun: HassEntity | undefined

  return (
    <div style={{ padding: '1rem' }}>
      <p>{ sun?.attributes.friendly_name }</p>
      <p>
        State:
        {' '}
        { sun?.state }
      </p>
    </div>
  );
};

...
```

[![Screenshot-2022-03-10-at-15-57-11-Overview-Home-Assistant.png](https://i.postimg.cc/13fY2p24/Screenshot-2022-03-10-at-15-57-11-Overview-Home-Assistant.png)](https://postimg.cc/CRpNffFV)

### `useConfig()`

Retrieves the current config of the card. Note that `Config` is a type should be customized to the given card's use case.

**Returns:** `Config | undefined`

**Example:**

```ts
...

const Card = () => {
  const config = useConfig(); // config: Config | undefined

  return (
    <div style={{ padding: '1rem' }}>
      <p>{ config?.type }</p>
    </div>
  );
};

...
```
[![Screenshot-2022-03-10-at-15-58-27-Overview-Home-Assistant.png](https://i.postimg.cc/8z9nS7g4/Screenshot-2022-03-10-at-15-58-27-Overview-Home-Assistant.png)](https://postimg.cc/Js3Q34nH)
