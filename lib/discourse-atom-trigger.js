'use babel';

import { CompositeDisposable } from 'atom';

export default {

  subscriptions: null,

  config: {
    enableDiscourseTrigger: {
      type: 'boolean',
      default: true
    },
    discoursePingUrl: {
      type: 'string',
      default: 'http://localhost:3000/atom-file-changed'
    },
    pingExtensions: {
      type: 'string',
      default: 'scss|css'
    }
  },

  activate(state) {
    if (!atom.config.get('discourse-atom-trigger.enableDiscourseTrigger')) {
      return;
    }

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(atom.workspace.observeTextEditors((editor) => {
      editor.onDidSave(async (e) => {
        if (!atom.config.get('discourse-atom-trigger.enableDiscourseTrigger')) {
          return;
        }

        let path = e.path;

        if (path.indexOf('discouse') !== -1 &&
          path.match(atom.config.get('discourse-atom-trigger.pingExtensions'))) {
          console.log('yaz path', path);
        }

        if (path.indexOf('discourse') !== -1) {
          let pingUrl = atom.config.get('discourse-atom-trigger.discoursePingUrl');
          fetch(`${pingUrl}?path=${encodeURIComponent(path)}`);
        }

      })
    }))
  },

  deactivate() {
    this.subscriptions.dispose()
  },

  serialize() {
    return {
    };
  },


};
