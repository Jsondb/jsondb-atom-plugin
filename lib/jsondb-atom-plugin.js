'use babel';

import JsondbAtomPluginView from './jsondb-atom-plugin-view';
import { CompositeDisposable } from 'atom';

export default {

  jsondbAtomPluginView: null,
  modalPanel: null,
  subscriptions: null,
  lastEditor: null,
  pluginTitle: null,
  pluginEditor: null,
  lastCursorRow: 1,

  activate(state) {
    this.jsondbAtomPluginView = new JsondbAtomPluginView(state.jsondbAtomPluginViewState);
    this.modalPanel = atom.workspace.addRightPanel({
      item: this.jsondbAtomPluginView.getElement(),
      visible: false
    });

    this.pluginTitle = this.jsondbAtomPluginView.getTitleElement()
    this.pluginEditor = this.jsondbAtomPluginView.getEditorElement().getModel()

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'jsondb-atom-plugin:toggle': () => this.toggle()
      }),
      atom.workspace.onDidChangeActivePaneItem (
        (editor: AtomCore.IEditor) => this.setCursorListener())
      //atome.workspace.onDidChangePosition (
      //  (editor: AtomCore.IEditor) => this.showPlugin())
    );
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
    if (!this.modalPanel.isVisible()) {
      console.log('Enabling JsondbAtomPlugin!');
      this.modalPanel.show()
    } else {
      console.log('Disabling JsondbAtomPlugin!');
      this.modalPanel.hide()
    }
  },

  setCursorListener() {
    this.subscriptions.remove(this.lastEditor)
    this.lastEditor = atom.workspace.getActiveTextEditor()
    this.lastEditor.onDidChangeCursorPosition (
      (editor: AtomCore.IEditor) => this.updatePluginText())
  },

  updatePluginText() {
    if (this.modalPanel.isVisible()) {
      //this.editor.selectLinesContainingCursors()
      let rowno = atom.workspace.getActiveTextEditor().getLastCursor().getScreenRow()
      let text = atom.workspace.getActiveTextEditor().lineTextForBufferRow(rowno)
      try {
        let obj = JSON.parse(text);
        text = JSON.stringify(obj, null, 2);
        title = 'Editing Line No: ' + (rowno+1);
        this.pluginTitle.classList.remove('jsondb-atom-plugin-red-title');
        this.pluginTitle.classList.add('jsondb-atom-plugin-title');
      } catch(e) {
        text = '{}'
        title = 'Current Line does not have valid JSON';
        this.pluginTitle.classList.remove('jsondb-atom-plugin-title');
        this.pluginTitle.classList.add('jsondb-atom-plugin-red-title');
      }
      this.pluginTitle.textContent = title;
      this.pluginEditor.setText(text)
      //console.log(text)
    }
  }

  // showPlugin() {
  //   if (this.isJsonDBFile()) {
  //     console.log('It is a jsondb file, now showing jsondb-atom-plugin!')
  //     this.modalPanel.show()
  //   } else {
  //     console.log('It is not a jsondb file!')
  //     this.modalPanel.hide()
  //   }
  // },
  //
  // isJsonDBFile() {
  //   let filePath = atom.workspace.getActiveTextEditor().getPath()
  //   return filePath.endsWith(".jsondb")
  // }
};
