/* eslint-disable class-methods-use-this */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable no-underscore-dangle */
import { HomeAssistant } from 'custom-card-helpers';
import { StyleSheetManager } from 'styled-components';
import { render } from 'preact';
import Card from './card';
import { HassContext } from './contexts';

class BoilerplateCard extends HTMLElement {
  private _hass?: HomeAssistant;

  private _config: any;

  set hass(hass: HomeAssistant | undefined) {
    this._hass = hass;
    this._render();
  }

  setConfig(config: any) {
    this._config = config;
    this._render();
  }

  private _render = () => {
    if (!this._hass || !this._config) render('', this);

    render(
      (
        <HassContext.Provider value={{ hass: this._hass, config: this._config }}>
          <StyleSheetManager target={this}>
            { /* @ts-ignore */ }
            <ha-card>
              <Card />
              { /* @ts-ignore */ }
            </ha-card>
          </StyleSheetManager>
        </HassContext.Provider>
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
