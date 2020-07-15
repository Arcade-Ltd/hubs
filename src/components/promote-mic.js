import { SOUND_TOGGLE_MIC } from "../systems/sound-effects-system";

const bindAllEvents = function(elements, events, f) {
  if (!elements || !elements.length) return;
  for (const el of elements) {
    events.length &&
      events.forEach(e => {
        el.addEventListener(e, f);
      });
  }
};
const unbindAllEvents = function(elements, events, f) {
  if (!elements || !elements.length) return;
  for (const el of elements) {
    events.length &&
      events.forEach(e => {
        el.removeEventListener(e, f);
      });
  }
};

AFRAME.registerComponent("promote-mic", {
  schema: {
    eventSrc: { type: "selectorAll" },
    toggleEvents: { type: "array" },
    promoteEvents: { type: "array" },
    demoteEvents: { type: "array" }
  },
  init: function() {
    this.onToggle = this.onToggle.bind(this);
    this.onPromote = this.onPromote.bind(this);
    this.onDemote = this.onDemote.bind(this);
  },

  play: function() {
    const { eventSrc, toggleEvents, promoteEvents, demoteEvents } = this.data;
    bindAllEvents(eventSrc, toggleEvents, this.onToggle);
    bindAllEvents(eventSrc, promoteEvents, this.onPromote);
    bindAllEvents(eventSrc, demoteEvents, this.onDemote);
  },

  pause: function() {
    const { eventSrc, toggleEvents, promoteEvents, demoteEvents } = this.data;
    unbindAllEvents(eventSrc, toggleEvents, this.onToggle);
    unbindAllEvents(eventSrc, promoteEvents, this.onPromote);
    unbindAllEvents(eventSrc, demoteEvents, this.onDemote);
  },

  onToggle: function() {
    console.log("promtoggle");
    if (!NAF.connection.adapter) return;
    if (!this.el.sceneEl.is("entered")) return;

    this.el.sceneEl.systems["hubs-systems"].soundEffectsSystem.playSoundOneShot(SOUND_TOGGLE_MIC);
    if (this.el.is("promoted")) {
      document.querySelector("#AvatarHead").setAttribute("positional", false);
      this.el.removeState("promoted");
    } else {
        document.querySelector("#AvatarHead").setAttribute("positional", true);
      this.el.addState("promoted");
    }
  },

  onPromote: function() {
    if (!NAF.connection.adapter) return;
    if (!this.el.is("promoted")) {
        document.querySelector("#AvatarHead").setAttribute("positional", false);
      this.el.addState("promoted");
    }
  },

  onDemote: function() {
    if (this.el.is("promoted")) {
        document.querySelector("#AvatarHead").setAttribute("positional", true);
      this.el.removeState("promoted");
    }
  }
});
