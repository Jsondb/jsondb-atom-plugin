'use babel';

import JsondbAtomPluginView from './jsondb-atom-plugin-view';
import { CompositeDisposable } from 'atom';

export default {

  jsondbAtomPluginView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.jsondbAtomPluginView = new JsondbAtomPluginView(state.jsondbAtomPluginViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.jsondbAtomPluginView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'jsondb-atom-plugin:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.jsondbAtomPluginView.destroy();
  },

  serialize() {
    return {
      jsondbAtomPluginViewState: this.jsondbAtomPluginView.serialize()
    };
  },

  toggle() {
    console.log('JsondbAtomPlugin was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
