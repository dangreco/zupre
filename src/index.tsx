/* eslint-disable class-methods-use-this */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable no-underscore-dangle */
import { HomeAssistant } from 'custom-card-helpers';
import { StyleSheetManager } from 'styled-components';
import { render } from 'preact';
import store from 'store';
import Card from './card';

class BoilerplateCard extends HTMLElement {
  set hass(hass: HomeAssistant | undefined) {
    store.setState({ hass });
    this._render();
  }

  setConfig(config: any) {
    store.setState({ config });
    this._render();
  }

  private _render = () => {
    render(
      (
        <StyleSheetManager target={this}>
          { /* @ts-ignore */ }
          <ha-card>
            <Card />
            { /* @ts-ignore */ }
          </ha-card>
        </StyleSheetManager>
      ), this,
    );
  };

  getCardSize() {
    return 1;
  }
}

customElements.define('boilerplate-card', BoilerplateCard);

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    customCards?: any[];
  }
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'boilerplate-card',
  name: 'Boilerplate Card',
  preview: false,
  description: 'Boilerplate Card x React',
});
