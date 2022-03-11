
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

- [`useEntity`](#useentityentityid-string)
- [`useEntities`](#useentitiesentityids-string)
- [`useHistory`](#usehistoryentityid-string-config-historyconfig)
- [`useUser`](#useuser)
- [`useHass`](#usehass)
- [`useConfig`](#useconfig)


### `useEntity(entityId: string)`
---
Retrieves an entity by ID from the Home Assistant state. The entity will be `undefined` if the state
of HA is not loaded or if the entity does not exist.

**Returns:** `HassEntity | undefined`

**Example:**

```tsx
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

### `useEntities(entityIds: string[])`
---
Retrieves a record of entities by their IDs.

**Returns:** `Record<string, HassEntity | undefined>`

**Example:**

```tsx
...

const Card = () => {
  const lights = useEntities([
    'light.lamp',
    'light.ceiling',
    'light.outside',
  ]); // lights: Record<string, HassEntity | undefined>

  return (
    <div style={{ padding: '1rem' }}>
      <pre>
        { JSON.stringify(lights, null, 2) }
      </pre>
    </div>
  );
};

...
```

### `useHistory(entityId: string, config?: HistoryConfig)`
---
Retrieves the history for an entity's state. The optional `config` parameter takes two fields:

- `start: Date` - the starting time/date to base the history on
- `end: Date` - the ending time/date to base the history on

By default, this period is the last 24hrs.

**Types:**

```ts
type Datum = { last_changed: Date, state: string }

interface HistoryConfig = {
  start?: Date;
  end?: Date;
}
```

**Returns:** `{ history: Datum[]; entity: HassEntity | undefined }`

**Example:**

```tsx
...

const Card = () => {
  const { history, entity } = useConfig(); // { history: Datum[]; entity?: HassEntity }

  return (
    <div style={{ padding: '1rem' }}>
      <p>{ entity?.attributes.friendly_name }:</p>
      <p>{ entity?.state }</p>
      <p>
        Changed
        {' '}
        { history.length }
        {' '}
        times.
      </p>
    </div>
  );
};

...
```

### `useUser()`
---
Retrieves the currently signed in user and its corresponding `entity`.

**Returns:** `(CurrentUser & { entity: HassEntity | undefined }) | undefined`


**Example:**

```tsx
...

const Card = () => {
  const user = useUser(); // user: (CurrentUser & { entity: HassEntity | undefined }) | undefined

  return (
    <div style={{ padding: '1rem' }}>
      <p>{ user?.name }</p>
      <img src={user?.entity?.attributes.entity_picture || ''} />
    </div>
  );
};

...
```

### `useHass()`
---
Retrieves current Home Assistant instance. Useful for API/service calls.

**Returns:** `HomeAssistant | undefined`

**Example:**

```tsx
...

const Card = () => {
  const hass = useHass(); // hass: HomeAssistant | undefined

  return (
    <div style={{ padding: '1rem' }}>
      <button
        onClick={
          hass
            ? hass.callService('homeassistant', 'restart')
            : () => {}
        }
      >
        Restart
      </button>
    </div>
  );
};

...
```

### `useConfig()`
---
Retrieves the current config of the card. Note that `Config` is a type should be customized to the given card's use case.

**Returns:** `Config | undefined`

**Example:**

```tsx
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

